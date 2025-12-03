import { CardHome } from "@/components/shared/CardHome";
import { RectangleEllipsis, FileText, BriefcaseBusiness, Building2, Plus } from "lucide-react";

const features = [
    {
        href: "/gerar-senha",
        title: "Gerador de senhas",
        description: "Crie senhas forte e seguras.",
        Icon: RectangleEllipsis
    },
    {
        href: "/gerar-ie",
        title: "Gerador de Inscrição Estadual",
        description: "Gere números de inscrição estadual.",
        Icon: FileText
    },
    {
        href: "/consultar-cnpj",
        title: "Consultar CNPJ",
        description: "Obtenha dados da empresa.",
        Icon: Building2
    },
    {
        href: "/gerar-cnpj",
        title: "Gerador de CNPJ",
        description: "Crie números de CNPJ.",
        Icon: BriefcaseBusiness
    },
    {
        href: "#",
        title: "Nova Ferramenta",
        description: "Em breve mais funcionalidades.",
        Icon: Plus,
        disabled: true
    }
]

export default function Home() {
    return (
        <div className="flex flex-col items-center gap-3">
            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-3">
                {features.map((feature) => (
                    <CardHome
                        key={feature.title}
                        href={feature.href}
                        title={feature.title}
                        description={feature.description}
                        Icon={feature.Icon}
                        disabled={feature.disabled}
                    />
                ))}
            </main>
        </div>
    )
}