import { randomDigits } from "./random";

interface RgRule {
  baseLength: number;
  format: (base: string) => string;
  checkDigit?: (base: number[]) => string;
}

const groupFromRight = (value: string): string => {
  const groups: string[] = [];

  for (let end = value.length; end > 0; end -= 3) {
    groups.unshift(value.slice(Math.max(0, end - 3), end));
  }

  return groups.join(".");
};

const formatWithPrefix = (prefix: string) => (base: string): string =>
  `${prefix}-${groupFromRight(base)}`;

const formatWithCheckDigit = (base: string, checkDigit: string): string =>
  `${groupFromRight(base)}-${checkDigit}`;

const calculateSaoPauloCheckDigit = (base: number[]): string => {
  const sum = base.reduce(
    (total, digit, index) => total + digit * (index + 2),
    0
  );
  const digit = 11 - (sum % 11);

  if (digit === 10) return "X";
  if (digit === 11) return "0";

  return String(digit);
};

const DEFAULT_RULE: RgRule = {
  baseLength: 8,
  format: groupFromRight,
};

const RG_RULES: Record<string, RgRule> = {
  AC: { baseLength: 8, format: groupFromRight },
  AL: { baseLength: 9, format: (base) => base },
  AP: { baseLength: 6, format: (base) => base },
  AM: { baseLength: 8, format: groupFromRight },
  BA: { baseLength: 8, format: groupFromRight },
  CE: { baseLength: 10, format: (base) => base },
  DF: { baseLength: 7, format: groupFromRight },
  ES: { baseLength: 8, format: groupFromRight },
  GO: { baseLength: 7, format: groupFromRight },
  MA: { baseLength: 9, format: (base) => base },
  MT: { baseLength: 7, format: (base) => base },
  MS: { baseLength: 7, format: (base) => base },
  MG: { baseLength: 8, format: formatWithPrefix("MG") },
  PA: { baseLength: 7, format: (base) => base },
  PB: { baseLength: 7, format: groupFromRight },
  PR: { baseLength: 8, format: groupFromRight },
  PE: { baseLength: 7, format: groupFromRight },
  PI: { baseLength: 7, format: groupFromRight },
  RJ: { baseLength: 8, format: groupFromRight },
  RN: { baseLength: 7, format: groupFromRight },
  RS: { baseLength: 10, format: (base) => base },
  RO: { baseLength: 9, format: (base) => base },
  RR: { baseLength: 6, format: (base) => base },
  SC: { baseLength: 7, format: groupFromRight },
  SP: {
    baseLength: 8,
    format: groupFromRight,
    checkDigit: calculateSaoPauloCheckDigit,
  },
  SE: { baseLength: 7, format: (base) => base },
  TO: { baseLength: 6, format: (base) => base },
};

export function generateRg(uf: string): string {
  const normalizedUf = uf.trim().toUpperCase();
  const rule = RG_RULES[normalizedUf];

  if (!rule) {
    throw new Error("UF inválida para gerar RG.");
  }

  let base = randomDigits(rule.baseLength);

  while (base.every((digit) => digit === base[0])) {
    base = randomDigits(rule.baseLength);
  }

  const rawBase = base.join("");

  if (!rule.checkDigit) return rule.format(rawBase);

  return formatWithCheckDigit(rawBase, rule.checkDigit(base));
}

export function isValidSaoPauloRg(value: string): boolean {
  const normalized = value.replace(/[^\dX]/gi, "").toUpperCase();

  if (!/^\d{8}[\dX]$/.test(normalized)) return false;

  const base = [...normalized.slice(0, 8)].map(Number);

  return calculateSaoPauloCheckDigit(base) === normalized[8];
}

export const getRgPlaceholder = (uf: string): string => {
  const rule = RG_RULES[uf.toUpperCase()] ?? DEFAULT_RULE;
  const placeholderBase = "X".repeat(rule.baseLength);

  if (rule.checkDigit) {
    return formatWithCheckDigit(placeholderBase, "X");
  }

  return rule.format(placeholderBase);
};
