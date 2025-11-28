import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ButtonShared } from "@/components/shared/ButtonShared";
import { ResultBoxShared } from "@/components/shared/ResultBoxShared";
import { RotateCcw } from "lucide-react";
import { gerarCnpj } from "@/api";
import { PageHeader } from "@/components/shared/PageHeader";

export function GerarCnpj() {
    const { mutate, data, isPending } = useMutation({
        mutationFn: gerarCnpj,
        onError: (err) => {
            toast.error("Erro ao gerar CNPJ.", {
                description: err.message || "Não possível conectar à API."
            });
        },
        onSuccess: () => {
            toast.success("CNPJ gerado com sucesso!");
        }
    });

    const generateCnpj = data || "";

    const handleGenerate = () => {
        mutate();
    };

    const handleCopy = () => {
        if (!generateCnpj) return;

        navigator.clipboard.writeText(generateCnpj);
        toast.success("Copiado!", {
            description: "CNPJ copiado para a área de transferência."
        });
    }
    return (
        <section>
            <PageHeader
                title="Gerador de CNPJ"
                subtitle="Gere um número de CNPJ válido instantaneamente"
            />

            <div className="mt-10 flex flex-col">
                <ResultBoxShared
                    value={generateCnpj}
                    placeholder="XX.XXX.XXX/0001-XX"
                    onCopy={handleCopy}
                />

                <ButtonShared
                    title={isPending ? "Gerando..." : "Gerar CNPJ"}
                    Icon={RotateCcw}
                    onClick={handleGenerate}
                    disabled={isPending}
                    className="self-center"
                />
            </div>
        </section>
    )
};