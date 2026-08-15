import { type ReactNode } from "react";
import { RotateCcw } from "lucide-react";

import { ButtonShared } from "./ButtonShared";
import { PageHeader } from "./PageHeader";
import { ResultBoxShared } from "./ResultBoxShared";

interface DocumentGeneratorSharedProps {
  title: string;
  subtitle: string;
  value: string;
  placeholder: string;
  buttonTitle: string;
  onGenerate: () => void;
  onCopy: () => void;
  children?: ReactNode;
}

export function DocumentGeneratorShared({
  title,
  subtitle,
  value,
  placeholder,
  buttonTitle,
  onGenerate,
  onCopy,
  children,
}: DocumentGeneratorSharedProps) {
  return (
    <main className="mt-10">
      <PageHeader title={title} subtitle={subtitle} />

      <ResultBoxShared
        value={value}
        placeholder={placeholder}
        onCopy={onCopy}
      />

      {children}

      <div className="flex justify-center">
        <ButtonShared
          title={buttonTitle}
          Icon={RotateCcw}
          onClick={onGenerate}
        />
      </div>
    </main>
  );
}
