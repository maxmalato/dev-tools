import { Header } from "@/components/shared/Header";
import { Copy } from "lucide-react";

export function GerarSenha() {
    return (
        <>
        <Header/>
        <main>
            <h1 className="font-bold text-2xl">Gerador de senhas</h1>

            <div>
                <p>HJA#@!JJJAKSJK@</p>
                <Copy/>
            </div>
        </main>
        </>
    )
}