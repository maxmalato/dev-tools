import { randomDigits } from "./random";

interface CnhCheckDigits {
  first: number;
  second: number;
}

const isRepeatedSequence = (digits: number[]): boolean =>
  digits.every((digit) => digit === digits[0]);

const calculateCnhCheckDigits = (base: number[]): CnhCheckDigits => {
  const firstSum = base.reduce(
    (total, digit, index) => total + digit * (9 - index),
    0
  );
  const firstRemainder = firstSum % 11;
  const first = firstRemainder > 9 ? 0 : firstRemainder;
  const adjustment = firstRemainder > 9 ? 2 : 0;

  const secondSum = base.reduce(
    (total, digit, index) => total + digit * (index + 1),
    0
  );
  let secondRemainder = (secondSum % 11) - adjustment;

  if (secondRemainder < 0) secondRemainder += 11;

  const second = secondRemainder > 9 ? 0 : secondRemainder;

  return { first, second };
};

export function isValidCnh(value: string): boolean {
  const normalized = value.replace(/\D/g, "");

  if (normalized.length !== 11) return false;

  const digits = [...normalized].map(Number);

  if (isRepeatedSequence(digits)) return false;

  const { first, second } = calculateCnhCheckDigits(digits.slice(0, 9));

  return digits[9] === first && digits[10] === second;
}

export function generateCnh(): string {
  let base = randomDigits(9);

  while (isRepeatedSequence(base)) {
    base = randomDigits(9);
  }

  const { first, second } = calculateCnhCheckDigits(base);

  return [...base, first, second].join("");
}
