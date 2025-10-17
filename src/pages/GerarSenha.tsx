import { Header } from "@/components/shared/Header";
import { Copy } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export function GerarSenha() {
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
            </main>
        </>
    )
}