import { Button } from "../ui/button";
import { RotateCw } from "lucide-react";

interface ButtonSharedProps {
    title: string;
}

export function ButtonShared({ title }: ButtonSharedProps) {
    return (
        <Button className="w-full bg-[#26a8ed] hover:bg-[#1e90cc] transition-colors text-white font-bold p-6 rounded-lg mt-6 flex justify-center items-center gap-2 cursor-pointer">
            <RotateCw />
            {title}
        </Button>
    )
}