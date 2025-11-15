import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FormulaCanvas } from "./FormulaCanvas";
import { Settings } from "lucide-react";

interface FormulaBuilderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FormulaBuilderModal({ open, onOpenChange }: FormulaBuilderModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [showCanvas, setShowCanvas] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Novo Tipo de Cálculo</DialogTitle>
          <DialogDescription>
            Configure a lógica de cálculo. As fontes de dados são definidas no cadastro do imóvel.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                placeholder="Ex: Todas Variáveis"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                placeholder="Descreva este tipo de cálculo..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col border rounded-lg overflow-hidden">
            <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-2">
              <h3 className="font-medium">Construir Fórmula</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCanvas(!showCanvas)}
              >
                <Settings className="w-4 h-4 mr-2" />
                {showCanvas ? "Ocultar" : "Configurar"}
              </Button>
            </div>

            {showCanvas && (
              <div className="flex-1 overflow-hidden">
                <FormulaCanvas />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={() => onOpenChange(false)}>
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
