import { randomDigits } from "./random";

const calculateCpfCheckDigit = (digits: number[]): number => {
  const initialWeight = digits.length + 1;
  const sum = digits.reduce(
    (total, digit, index) => total + digit * (initialWeight - index),
    0
  );
  const remainder = sum % 11;

  return remainder < 2 ? 0 : 11 - remainder;
};

const isRepeatedSequence = (digits: number[]): boolean =>
  digits.every((digit) => digit === digits[0]);

export function formatCpf(value: string): string {
  return value.replace(
    /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
    "$1.$2.$3-$4"
  );
}

export function isValidCpf(value: string): boolean {
  const normalized = value.replace(/\D/g, "");

  if (normalized.length !== 11) return false;

  const digits = [...normalized].map(Number);

  if (isRepeatedSequence(digits)) return false;

  const base = digits.slice(0, 9);
  const firstCheckDigit = calculateCpfCheckDigit(base);
  const secondCheckDigit = calculateCpfCheckDigit([
    ...base,
    firstCheckDigit,
  ]);

  return digits[9] === firstCheckDigit && digits[10] === secondCheckDigit;
}

export function generateCpf(): string {
  let base = randomDigits(9);

  while (isRepeatedSequence(base)) {
    base = randomDigits(9);
  }

  const firstCheckDigit = calculateCpfCheckDigit(base);
  const secondCheckDigit = calculateCpfCheckDigit([
    ...base,
    firstCheckDigit,
  ]);

  return formatCpf([...base, firstCheckDigit, secondCheckDigit].join(""));
}
