import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CheckboxSharedProps {
    id: string;
    label: string;
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
}

export function CheckboxShared({ id, label, checked, onCheckedChange }: CheckboxSharedProps) {
    return (
        <Label
            htmlFor={id}
            className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 cursor-pointer select-none"
        >
            <Checkbox
                id={id}
                checked={checked}
                onCheckedChange={onCheckedChange}
                className="data-[state=checked]:bg-[#26a8ed] data-[state=checked]:border-[#26a8ed] [&_svg]:text-white size-5"
            />
            <span className="text-gray-700 font-medium cursor-pointer text-lg">
                {label}
            </span>
        </Label>
    )
};