import { Header } from "@/components/shared/Header";
import { Copy } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { CheckboxShared } from "@/components/shared/CheckboxShared";
import { ButtonShared } from "@/components/shared/ButtonShared";
import { useState } from "react";


export function GerarSenha() {
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);

    return (
        <div>
            <Header />
            <main className="mt-10">
                <h1 className="font-bold text-2xl text-center mb-4">Gerador de senhas</h1>

                <section className="flex gap-4 justify-between items-center bg-[#f1f5f9] rounded-lg p-4">
                    <p className="font-bold text-[#26a8ed]">HJA#@!JJJAKSJK@</p>
                    <div className="bg-[#c5e5f6] p-2 rounded-lg cursor-pointer">
                        <Copy color="#26a8ed" />
                    </div>
                </section>

                <section>
                    <div className="flex justify-between mb-4">
                        <p className="font-semibold">Tamanho da senha</p>
                        <span className="font-bold text-xl text-[#26a8ed]">12</span>
                    </div>
                    <Slider defaultValue={[33]} max={100} step={1} className="bg-gray-300" />
                </section>

                <section className="space-y-4 mt-6 md:grid md:grid-cols-2 md:space-y-0 md:gap-4">
                    <CheckboxShared
                        id="uppercase"
                        label="Maiúsculas"
                        checked={includeUppercase}
                        onCheckedChange={setIncludeUppercase}
                    />

                    <CheckboxShared
                        id="lowercase"
                        label="Minúsculas"
                        checked={includeLowercase}
                        onCheckedChange={setIncludeLowercase}
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

                <ButtonShared title="Gerar senha" />
            </main>
        </div>
    )
}