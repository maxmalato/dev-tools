import { useState } from "react";
import { toast } from "sonner";

interface UseLocalDocumentGeneratorOptions {
  documentName: string;
  generate: () => string;
}

export function useLocalDocumentGenerator({
  documentName,
  generate,
}: UseLocalDocumentGeneratorOptions) {
  const [value, setValue] = useState("");

  const handleGenerate = () => {
    try {
      const generatedValue = generate();

      setValue(generatedValue);
      toast.success(`${documentName} gerado com sucesso!`);
    } catch (error) {
      toast.error(`Erro ao gerar ${documentName}.`, {
        description:
          error instanceof Error
            ? error.message
            : "Não foi possível gerar o documento.",
      });
    }
  };

  const handleCopy = async () => {
    if (!value) return;

    try {
      await navigator.clipboard.writeText(value);
      toast.success("Copiado!", {
        description: `${documentName} copiado para a área de transferência.`,
      });
    } catch {
      toast.error("Não foi possível copiar o documento.");
    }
  };

  const reset = () => setValue("");

  return {
    value,
    handleGenerate,
    handleCopy,
    reset,
  };
}
