import { Link } from "react-router-dom";
import logoImg from "@/assets/logo-dgt.png";

export function Header() {
    return (
        <header className="mb-6">
            <Link to="/">
                <div className="flex items-center justify-center">
                    <img src={logoImg} alt="DGT" className="h-24 w-auto" />
                    <h1 className="font-bold text-3xl text-center">Bem-vindo ao DGT</h1>
                </div>
                <p className="text-gray-500 text-center">
                    Sua central de ferramentas para geração e consultas. Escolha uma das opções abaixo para começar.
                </p>
            </Link>
        </header>
    )
}