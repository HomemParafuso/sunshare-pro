import { useRef, useEffect, useState } from "react";
import { X } from "lucide-react";

export interface CardType {
  id: string;
  label: string;
  color: string;
  icon?: string;
}

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

interface DraggableCardProps {
  card: CanvasCard;
  onDragMove: (id: string, x: number, y: number) => void;
  onDragEnd: (id: string) => void;
  onLongPress: (id: string) => void;
  onDelete: (id: string) => void;
  onCancelDelete: (id: string) => void;
}

export function DraggableCard({
  card,
  onDragMove,
  onDragEnd,
  onLongPress,
  onDelete,
  onCancelDelete,
}: DraggableCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (card.isDeleting) return;
    
    setIsDragging(true);
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      setOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }

    // Start long press timer
    longPressTimer.current = setTimeout(() => {
      onLongPress(card.id);
    }, 800);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const canvas = cardRef.current?.parentElement;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left - offset.x;
    const y = e.clientY - rect.top - offset.y;

    onDragMove(card.id, Math.max(0, x), Math.max(0, y));
  };

  const handleMouseUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }

    if (isDragging) {
      setIsDragging(false);
      onDragEnd(card.id);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, offset]);

  return (
    <div
      ref={cardRef}
      className={`absolute cursor-move select-none transition-transform ${
        card.isDeleting ? 'scale-110 animate-pulse' : ''
      } ${isDragging ? 'z-50' : 'z-10'}`}
      style={{
        left: card.x,
        top: card.y,
        width: 120,
        height: 60,
      }}
      onMouseDown={handleMouseDown}
    >
      <div
        className={`${card.type.color} text-white rounded-lg h-full flex items-center justify-center font-medium text-sm shadow-lg relative`}
      >
        {card.type.icon && (
          <span className="mr-1 text-lg">{card.type.icon}</span>
        )}
        {card.type.label}

        {card.isDeleting && (
          <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center gap-2">
            <button
              className="bg-destructive text-destructive-foreground p-2 rounded-full hover:bg-destructive/90"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(card.id);
              }}
            >
              <X className="w-4 h-4" />
            </button>
            <button
              className="bg-secondary text-secondary-foreground px-3 py-1 rounded text-xs hover:bg-secondary/90"
              onClick={(e) => {
                e.stopPropagation();
                onCancelDelete(card.id);
              }}
            >
              Cancelar
            </button>
          </div>
        )}

        {/* Connection points */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full" />
        <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full" />
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full" />
        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full" />
      </div>
    </div>
  );
}
