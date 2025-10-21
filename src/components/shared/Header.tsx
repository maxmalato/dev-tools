import { Link } from "react-router-dom";

export function Header() {
    return (
        <header>
            <Link to="/">
                <h1 className="font-bold text-3xl text-center">Bem-vindo ao Dev Tools</h1>
                <p className="text-gray-500 text-center mt-2">
                    Sua central de ferramentas para geração e consultas. Escolha uma das opções abaixo para começar.
                </p>
            </Link>
        </header>
    )
}