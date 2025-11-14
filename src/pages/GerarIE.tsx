import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

// Componentes
import { ButtonShared } from "@/components/shared/ButtonShared";
import { BRAZIL_STATES } from "@/lib/constants";
import { Label } from "@/components/ui/label";

// API
import { gerarInscricaoEstadual } from "@/api";
import { RotateCcw } from "lucide-react";
import { ResultBoxShared } from "@/components/shared/ResultBoxShared";
export function GerarIE() {
    const [selectedUf, setSelectedUf] = useState("");

    const { mutate, data, isPending, error } = useMutation({
        mutationFn: gerarInscricaoEstadual,
        onError: (err) => {
            toast.error("Erro ao gerar Inscrição Estadual.", {
                description: err.message || "Não possível conectar à API."
            });
        },
    });

    const generatedIE = data || "";

    const handleGenerate = () => {
        if (!selectedUf) {
            toast.error("Por favor, selecione um estado.", {
                description: "Você precisa escolher uma UF para gerar a Inscrição Estadual."
            });

            return;
        }

        mutate(selectedUf);
    };

    const handleCopy = () => {
        if (!generatedIE) return;

        navigator.clipboard.writeText(generatedIE);
        toast.success("Copiado!", {
            description: "Inscrição Estadual copiada para a área de transferência."
        });
    };

    return (
        <main className="mt-10">
            <h1 className="font-bold text-2xl text-center mt-8 mb-2">Gerador de Inscrição Estadual</h1>

            <ResultBoxShared
                value={generatedIE}
                placeholder="Sua Inscrição Estadual aparecerá aqui."
                onCopy={handleCopy}
            />

            <section className="mt-6 space-y-2">
                <Label htmlFor="estado-select">Estado</Label>

                <select
                    id="estado-select"
                    value={selectedUf}
                    onChange={(e) => setSelectedUf(e.target.value)}
                    disabled={isPending}
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
            </section>

            <ButtonShared
                title={isPending ? "Gerando..." : "Gerar Inscrição Estadual"}
                Icon={RotateCcw}
                onClick={handleGenerate}
                disabled={isPending}
            />

            {error && (
                <p className="text-red-500 text-center mt-4">{error.message}</p>
            )}
        </main>
    );
};