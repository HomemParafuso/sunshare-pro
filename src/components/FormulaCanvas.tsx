import { useState, useRef, useCallback, useEffect } from "react";
import { DraggableCard, CardType } from "./DraggableCard";
import { validateFormula } from "@/lib/formulaValidator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const CARD_TYPES: CardType[] = [
  { id: "consumo", label: "Consumo", color: "bg-blue-600", icon: "⚡" },
  { id: "tusd", label: "TUSD", color: "bg-green-600", icon: "$" },
  { id: "te", label: "TE", color: "bg-emerald-600", icon: "$" },
  { id: "ilum_publica", label: "Ilum. Pública", color: "bg-yellow-600", icon: "💡" },
  { id: "icms", label: "ICMS", color: "bg-purple-600", icon: "%" },
  { id: "bandeira", label: "Bandeira", color: "bg-red-600", icon: "🏴" },
  { id: "desconto", label: "Desconto", color: "bg-orange-600", icon: "%" },
  { id: "valor_atual", label: "Valor Atual", color: "bg-indigo-600", icon: "📊" },
];

const OPERATORS = [
  { id: "add", label: "+", color: "bg-slate-700" },
  { id: "subtract", label: "-", color: "bg-slate-700" },
  { id: "multiply", label: "×", color: "bg-slate-700" },
  { id: "divide", label: "÷", color: "bg-slate-700" },
  { id: "open_paren", label: "(", color: "bg-slate-600" },
  { id: "close_paren", label: ")", color: "bg-slate-600" },
  { id: "open_bracket", label: "[", color: "bg-slate-600" },
  { id: "close_bracket", label: "]", color: "bg-slate-600" },
];

interface CanvasCard {
  id: string;
  type: CardType;
  x: number;
  y: number;
  connections: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  isDeleting?: boolean;
}

const CARD_SIZE = { width: 120, height: 60 };
const SNAP_DISTANCE = 80;

export function FormulaCanvas() {
  const [canvasCards, setCanvasCards] = useState<CanvasCard[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const formula = canvasCards.map(c => c.type.label).join(" ");
    const validationErrors = validateFormula(formula);
    setErrors(validationErrors);
  }, [canvasCards]);

  const handleDragStart = (type: CardType) => {
    const newCard: CanvasCard = {
      id: `${type.id}-${Date.now()}`,
      type,
      x: 100,
      y: 100,
      connections: {},
    };
    setCanvasCards(prev => [...prev, newCard]);
    setDraggedCardId(newCard.id);
  };

  const handleDragMove = useCallback((id: string, x: number, y: number) => {
    setCanvasCards(prev => {
      const card = prev.find(c => c.id === id);
      if (!card) return prev;

      // Check collision with other cards
      const hasCollision = prev.some(c => {
        if (c.id === id) return false;
        return (
          Math.abs(c.x - x) < CARD_SIZE.width &&
          Math.abs(c.y - y) < CARD_SIZE.height
        );
      });

      if (hasCollision) return prev;

      return prev.map(c => {
        if (c.id === id) {
          return { ...c, x, y };
        }
        return c;
      });
    });
  }, []);

  const handleDragEnd = useCallback((id: string) => {
    setDraggedCardId(null);
    
    setCanvasCards(prev => {
      const card = prev.find(c => c.id === id);
      if (!card) return prev;

      // Find nearby cards to connect
      const connections = { ...card.connections };
      
      prev.forEach(other => {
        if (other.id === id) return;

        const dx = other.x - card.x;
        const dy = other.y - card.y;

        // Right connection
        if (Math.abs(dy) < 30 && dx > 0 && dx < SNAP_DISTANCE && !connections.right) {
          connections.right = other.id;
        }
        // Left connection
        if (Math.abs(dy) < 30 && dx < 0 && dx > -SNAP_DISTANCE && !connections.left) {
          connections.left = other.id;
        }
        // Bottom connection
        if (Math.abs(dx) < 30 && dy > 0 && dy < SNAP_DISTANCE && !connections.bottom) {
          connections.bottom = other.id;
        }
        // Top connection
        if (Math.abs(dx) < 30 && dy < 0 && dy > -SNAP_DISTANCE && !connections.top) {
          connections.top = other.id;
        }
      });

      return prev.map(c => c.id === id ? { ...c, connections } : c);
    });
  }, []);

  const handleLongPress = (id: string) => {
    setCanvasCards(prev => prev.map(c => 
      c.id === id ? { ...c, isDeleting: true } : c
    ));
  };

  const handleDeleteCard = (id: string) => {
    setCanvasCards(prev => {
      const remaining = prev.filter(c => c.id !== id);
      
      // Check for broken connections
      const hasBrokenConnection = remaining.some(card => 
        Object.values(card.connections).includes(id)
      );

      if (hasBrokenConnection) {
        setErrors(prev => [...prev, "Quebra de conexão detectada após exclusão"]);
      }

      // Remove connections to deleted card
      return remaining.map(c => ({
        ...c,
        connections: Object.fromEntries(
          Object.entries(c.connections).filter(([_, connectedId]) => connectedId !== id)
        ) as CanvasCard['connections']
      }));
    });
  };

  const handleCancelDelete = (id: string) => {
    setCanvasCards(prev => prev.map(c => 
      c.id === id ? { ...c, isDeleting: false } : c
    ));
  };

  return (
    <div className="flex h-full">
      {/* Variáveis Sidebar */}
      <div className="w-64 border-r bg-muted/20 p-4 overflow-y-auto">
        <h4 className="font-medium mb-3">Variáveis</h4>
        <div className="grid grid-cols-2 gap-2 mb-6">
          {CARD_TYPES.map(type => (
            <button
              key={type.id}
              className={`${type.color} text-white p-3 rounded-lg text-xs font-medium hover:opacity-90 transition-opacity`}
              draggable
              onDragStart={() => handleDragStart(type)}
            >
              <span className="block mb-1">{type.icon}</span>
              {type.label}
            </button>
          ))}
        </div>

        <h4 className="font-medium mb-3">Operadores</h4>
        <div className="grid grid-cols-4 gap-2">
          {OPERATORS.map(op => (
            <button
              key={op.id}
              className={`${op.color} text-white p-3 rounded-lg text-lg font-bold hover:opacity-90 transition-opacity aspect-square flex items-center justify-center`}
              draggable
              onDragStart={() => handleDragStart({ id: op.id, label: op.label, color: op.color })}
            >
              {op.label}
            </button>
          ))}
        </div>

        {errors.length > 0 && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {errors.map((error, i) => (
                <div key={i}>{error}</div>
              ))}
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Canvas */}
      <div 
        ref={canvasRef}
        className={`flex-1 relative overflow-auto ${errors.length > 0 ? 'bg-red-500/10' : 'bg-background'} transition-colors`}
        style={{ 
          backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      >
        <div className="absolute inset-0 min-w-full min-h-full">
          {canvasCards.map(card => (
            <DraggableCard
              key={card.id}
              card={card}
              onDragMove={handleDragMove}
              onDragEnd={handleDragEnd}
              onLongPress={handleLongPress}
              onDelete={handleDeleteCard}
              onCancelDelete={handleCancelDelete}
            />
          ))}

          {/* Draw connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {canvasCards.map(card => 
              Object.entries(card.connections).map(([direction, targetId]) => {
                const target = canvasCards.find(c => c.id === targetId);
                if (!target) return null;

                let x1, y1, x2, y2;

                switch (direction) {
                  case 'right':
                    x1 = card.x + CARD_SIZE.width;
                    y1 = card.y + CARD_SIZE.height / 2;
                    x2 = target.x;
                    y2 = target.y + CARD_SIZE.height / 2;
                    break;
                  case 'left':
                    x1 = card.x;
                    y1 = card.y + CARD_SIZE.height / 2;
                    x2 = target.x + CARD_SIZE.width;
                    y2 = target.y + CARD_SIZE.height / 2;
                    break;
                  case 'bottom':
                    x1 = card.x + CARD_SIZE.width / 2;
                    y1 = card.y + CARD_SIZE.height;
                    x2 = target.x + CARD_SIZE.width / 2;
                    y2 = target.y;
                    break;
                  case 'top':
                    x1 = card.x + CARD_SIZE.width / 2;
                    y1 = card.y;
                    x2 = target.x + CARD_SIZE.width / 2;
                    y2 = target.y + CARD_SIZE.height;
                    break;
                  default:
                    return null;
                }

                return (
                  <line
                    key={`${card.id}-${direction}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                  />
                );
              })
            )}
          </svg>
        </div>

        {canvasCards.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            Arraste elementos da paleta para a lousa para organizar a fórmula
          </div>
        )}
      </div>
    </div>
  );
}
