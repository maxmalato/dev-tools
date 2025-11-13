import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

// Componentes
import { ButtonShared } from "@/components/shared/ButtonShared";
import { BRAZIL_STATES } from "@/lib/constants";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// API
import { gerarInscricaoEstadual } from "@/api";
import { RotateCcw, Copy } from "lucide-react";
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

            <section className="mt-6 space-y-2">
                <Label htmlFor="estado-select">Estado</Label>

                <Select
                    value={selectedUf}
                    onValueChange={setSelectedUf}
                    disabled={isPending}
                >
                    <SelectTrigger id="estado-select" className="w-full">
                        <SelectValue placeholder="Selecione um estado" />
                    </SelectTrigger>
                    <SelectContent>
                        {BRAZIL_STATES.map((state) => (
                            <SelectItem key={state.value} value={state.value}>
                                {state.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </section>

            <ButtonShared
                title={isPending ? "Gerando..." : "Gerar Inscrição Estadual"}
                Icon={RotateCcw}
                onClick={handleGenerate}
                disabled={isPending}
            />

            <section className="mt-6 space-y-2">
                <Label htmlFor="ie-gerada">Inscrição Estadual Gerada</Label>
                <div className="relative">
                    <Input
                        id="ie-gerada"
                        readOnly
                        disabled
                        value={generatedIE}
                        placeholder="Número gerado..."
                        className="pr-10" // Dando espaço para o ícone
                    />
                    <Copy
                        color="#6a7282"
                        className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4"
                        onClick={handleCopy}
                    />
                </div>
            </section>

            {error && (
                <p className="text-red-500 text-center mt-4">{error.message}</p>
            )}
        </main>
    );
};