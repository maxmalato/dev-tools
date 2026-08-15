const UINT32_RANGE = 2 ** 32;

export function randomInt(max: number): number {
  if (!Number.isInteger(max) || max <= 0) {
    throw new Error("O limite deve ser um número inteiro positivo.");
  }

  const acceptedRange = Math.floor(UINT32_RANGE / max) * max;
  const randomValues = new Uint32Array(1);
  let value: number;

  do {
    crypto.getRandomValues(randomValues);
    value = randomValues[0];
  } while (value >= acceptedRange);

  return value % max;
}

export function randomDigits(length: number): number[] {
  return Array.from({ length }, () => randomInt(10));
}
