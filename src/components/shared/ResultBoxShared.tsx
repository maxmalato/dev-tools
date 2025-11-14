import { Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultBoxSharedProps {
    value: string;
    placeholder?: string;
    onCopy: () => void;
};

export function ResultBoxShared({ value, placeholder, onCopy }: ResultBoxSharedProps) {
    const hasValue = !!value;

    return (
        <section className="flex gap-4 justify-between items-center bg-[#f1f5f9] rounded-lg p-4">
            <p className={cn("font-bold text-lg flex-grow overflow-hidden text-ellipsis whitespace-nowrap", hasValue ? "text-[#26a8ed]" : "text-gray-400")}>
                {hasValue ? value : placeholder}
            </p>

            <div
                onClick={hasValue ? onCopy : undefined}
                className={cn(
                    "bg-[#c5e5f6] p-2 rounded-lg transition-transform active:scale-90",
                    hasValue
                        ? "cursor-pointer"
                        : "cursor-not-allowed opacity-50"
                )}
            >
                <Copy color="#26a8ed" />
            </div>
        </section>
    )
};