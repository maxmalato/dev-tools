import { ButtonBackShared } from "./ButtonBackShared";

interface PageHeaderProps {
    title: string;
    subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
    return (
        <div className="flex items-center gap-4 mb-6 relative md:h-14">
            <ButtonBackShared />

            <div
                className="flex flex-col md:absolute md:left-1/2 md:-translate-x-1/2 text-center">
                <h1 className="font-bold text-2xl text-gray-700">{title}</h1>

                {subtitle && (
                    <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
                )}
            </div>
        </div>
    );
}