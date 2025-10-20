import { Header } from "@/components/shared/Header";
import { Copy, RotateCw } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { CheckboxShared } from "@/components/shared/CheckboxShared";
import { useState } from "react";


export function GerarSenha() {
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);

    return (
        <>
            <Header />
            <main>
                <h1 className="font-bold text-2xl">Gerador de senhas</h1>

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

                <section className="space-y-4 mt-6">
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

                <button className="w-full bg-[#26a8ed] hover:bg-[#1e90cc] transition-colors text-white font-bold py-3 rounded-lg mt-6 flex justify-center items-center gap-2 cursor-pointer">
                    <RotateCw />
                    Gerar Senha
                </button>


            </main>
        </>
    )
}