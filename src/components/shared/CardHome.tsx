import { Link } from "react-router-dom";
import { type LucideIcon } from "lucide-react";

// Props
interface CardHomeProps {
    title: string;
    description: string;
    href: string;
    Icon: LucideIcon;
}

export function CardHome({ title, description, href, Icon }: CardHomeProps) {
    return (
        <Link to={href} className="bg-white rounded-2xl flex flex-col px-6 py-8 my-3 gap-3 items-center shadow-md hover:shadow-lg transition-shadow duration-300">
            <p className="bg-[#e7f6fd] w-fit p-2 rounded-full"><Icon color="#26a8ed" size={35} /></p>
            <h1 className="font-bold text-xl">{title}</h1>
            <h2 className="text-gray-400">{description}</h2>
        </Link>
    )
}