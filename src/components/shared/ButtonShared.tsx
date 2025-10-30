import { type ButtonHTMLAttributes } from "react";
import { Button } from "../ui/button";
import { type LucideIcon } from "lucide-react";

interface ButtonSharedProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    Icon: LucideIcon;
}

export function ButtonShared({ title, Icon }: ButtonSharedProps) {
    return (
        <Button className="w-full bg-[#26a8ed] hover:bg-[#1e90cc] transition-colors text-white font-bold p-6 rounded-lg mt-6 flex justify-center items-center gap-2 cursor-pointer">
            <Icon color="white" size={30} />
            {title}
        </Button>
    )
}