import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

// Importar função da API e os tipos
import { gerarSenha } from "@/api";
import type { GeneratePasswordRequest } from "@/types";

// Importar componentes
import { Slider } from "@/components/ui/slider";
import { CheckboxShared } from "@/components/shared/CheckboxShared";
import { ButtonShared } from "@/components/shared/ButtonShared";
import { toast } from "sonner";
import { ResultBoxShared } from "@/components/shared/ResultBoxShared";
import { ButtonBackShared } from "@/components/shared/ButtonBackShared";


export function GerarSenha() {
    const [passwordLength, setPasswordLength] = useState(12);
    const [includeLetters, setIncludeLetters] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);

    // Lógica da API "gerarSenha"
    const { mutate, data, isPending, error } = useMutation({
        mutationFn: gerarSenha,
        onError: (err) => {
            toast.error("Erro ao gerar a senha.", {
                description: err.message || "Não possível conectar a API.",
            });
        },
    });

    const generatedPassword = data?.password || "";

    const handleGeneratePassword = () => {
        const options: GeneratePasswordRequest = {
            length: passwordLength,
            letters: includeLetters,
            numbers: includeNumbers,
            symbols: includeSymbols,
        };

        mutate(options);
    };

    const handleCopy = () => {
        if (!generatedPassword) return;

        navigator.clipboard.writeText(generatedPassword);

        toast.success("Copiado!", {
            description: "Senha copiada para a área de transferência."
        });
    };

    return (
        <main className="mt-10">
            <h1 className="font-bold text-2xl text-center mb-4">Gerador de senhas</h1>

            <ButtonBackShared />

            <ResultBoxShared
                value={generatedPassword}
                placeholder="Sua senha aparecerá aqui."
                onCopy={handleCopy}
            />

            <section className="mt-6">
                <div className="flex justify-between mb-4">
                    <p className="font-semibold">Tamanho da senha</p>
                    <span className="font-bold text-xl text-[#26a8ed]">{passwordLength}</span>
                </div>
                <Slider
                    value={[passwordLength]}
                    onValueChange={(value) => setPasswordLength(value[0])}
                    min={4}
                    max={128}
                    step={1}
                    className="bg-gray-300"
                    disabled={isPending}
                />
            </section>

            <section className="space-y-4 mt-6 md:grid md:grid-cols-2 md:space-y-0 md:gap-4 lg:grid-cols-3">
                <CheckboxShared
                    id="letters"
                    label="Letras"
                    checked={includeLetters}
                    onCheckedChange={setIncludeLetters}
                />
                <CheckboxShared
                    id="numbers"
                    label="Números"
                    checked={includeNumbers}
                    onCheckedChange={setIncludeNumbers}
                />
                <CheckboxShared
                    id="symbols"
                    label="Símbolos"
                    checked={includeSymbols}
                    onCheckedChange={setIncludeSymbols}
                />
            </section>

            <div className="flex justify-center">
                <ButtonShared
                    title={isPending ? "Gerando..." : "Gerar senha"}
                    Icon={RotateCcw}
                    onClick={handleGeneratePassword}
                    disabled={isPending}
                />
            </div>

            {error && (
                <p className="text-red-500 text-center mt-4">{error.message}</p>
            )}
        </main>
    );
}