import { DocumentGeneratorShared } from "@/components/shared/DocumentGeneratorShared";
import { useLocalDocumentGenerator } from "@/hooks/useLocalDocumentGenerator";
import { generateCnh } from "@/lib/generators";

export function GerarCnh() {
  const { value, handleGenerate, handleCopy } = useLocalDocumentGenerator({
    documentName: "CNH",
    generate: generateCnh,
  });

  return (
    <DocumentGeneratorShared
      title="Gerador de CNH"
      subtitle="Gere um número de registro de CNH válido para seus testes."
      value={value}
      placeholder="XXXXXXXXXXX"
      buttonTitle="Gerar CNH"
      onGenerate={handleGenerate}
      onCopy={handleCopy}
    />
  );
}
