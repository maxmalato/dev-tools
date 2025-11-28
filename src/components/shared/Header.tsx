import { Link } from "react-router-dom";
import logoImg from "@/assets/logo-dgt.png";

export function Header() {
    return (
        <header className="mb-6">
            <Link to="/" className="flex flex-col items-center gap-2">
                <img src={logoImg} alt="DGT" className="h-20 w-auto" />
                <p className="text-gray-500">
                    Sua central de ferramentas para geração e consultas. Escolha uma das opções abaixo para começar.
                </p>
            </Link>
        </header>
    )
}