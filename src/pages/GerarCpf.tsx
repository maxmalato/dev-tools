import { DocumentGeneratorShared } from "@/components/shared/DocumentGeneratorShared";
import { useLocalDocumentGenerator } from "@/hooks/useLocalDocumentGenerator";
import { generateCpf } from "@/lib/generators";

export function GerarCpf() {
  const { value, handleGenerate, handleCopy } = useLocalDocumentGenerator({
    documentName: "CPF",
    generate: generateCpf,
  });

  return (
    <DocumentGeneratorShared
      title="Gerador de CPF"
      subtitle="Gere um número de CPF válido para seus testes."
      value={value}
      placeholder="XXX.XXX.XXX-XX"
      buttonTitle="Gerar CPF"
      onGenerate={handleGenerate}
      onCopy={handleCopy}
    />
  );
}
