import { useState } from "react";

import { DocumentGeneratorShared } from "@/components/shared/DocumentGeneratorShared";
import { Label } from "@/components/ui/label";
import { useLocalDocumentGenerator } from "@/hooks/useLocalDocumentGenerator";
import { BRAZIL_STATES } from "@/lib/constants";
import { generateRg, getRgPlaceholder } from "@/lib/generators";

export function GerarRg() {
  const [selectedUf, setSelectedUf] = useState("");
  const { value, handleGenerate, handleCopy, reset } = useLocalDocumentGenerator({
    documentName: "RG",
    generate: () => {
      if (!selectedUf) {
        throw new Error("Selecione um estado para gerar o RG.");
      }

      return generateRg(selectedUf);
    },
  });

  return (
    <DocumentGeneratorShared
      title="Gerador de RG"
      subtitle="Gere um número de RG no padrão do estado selecionado."
      value={value}
      placeholder={getRgPlaceholder(selectedUf)}
      buttonTitle="Gerar RG"
      onGenerate={handleGenerate}
      onCopy={handleCopy}
    >
      <section className="mt-6 space-y-2">
        <Label htmlFor="rg-estado-select">Estado</Label>

        <select
          id="rg-estado-select"
          value={selectedUf}
          onChange={(event) => {
            setSelectedUf(event.target.value);
            reset();
          }}
          className="w-full rounded border px-3 py-2"
        >
          <option value="" disabled>
            Selecione um estado
          </option>
          {BRAZIL_STATES.map((state) => (
            <option key={state.value} value={state.value}>
              {state.label}
            </option>
          ))}
        </select>

        <p className="text-sm text-gray-500">
          O RG tradicional não possui uma regra nacional. Quando não há uma
          regra pública verificável, somente o formato estadual é gerado.
        </p>
      </section>
    </DocumentGeneratorShared>
  );
}
