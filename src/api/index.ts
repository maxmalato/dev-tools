import axios from "axios";
import type {
  CnpjDataResponse,
  GenerateInscricaoEstadualdRequest,
  GeneratePasswordRequest,
  GeneratePasswordResponse,
} from "@/types";

interface BrasilApiCnpjResponse {
  razao_social?: string;
  nome_fantasia?: string;
  cnpj?: string;
  logradouro?: string;
  numero?: string;
  bairro?: string;
  municipio?: string;
  uf?: string;
  cep?: string;
  ddd_telefone1?: string | null;
  ddd_telefone2?: string | null;
  ddd_telefone_1?: string | null;
  ddd_telefone_2?: string | null;
  email?: string | null;
  descricao_situacao_cadastral?: string;
  cnae_fiscal_descricao?: string;
}

const apiClient = axios.create({
  baseURL: "https://brasilapi.com.br/api",
});

const LETTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()-_=+[]{};:,.<>?";

const onlyNumbers = (value: string) => value.replace(/\D/g, "");

const formatPhone = (value?: string | null) => {
  if (!value) return "";

  const digits = onlyNumbers(value);

  if (digits.length === 11) {
    return digits.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  }

  if (digits.length === 10) {
    return digits.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
  }

  return value;
};

const formatEmail = (value?: string | null) => value?.trim().toLowerCase() ?? "";

const randomInt = (max: number) => {
  const randomValues = new Uint32Array(1);
  crypto.getRandomValues(randomValues);

  return randomValues[0] % max;
};

const randomDigit = () => randomInt(10);

const randomDigits = (length: number) =>
  Array.from({ length }, () => randomDigit());

const mod11Digit = (
  digits: number[],
  weights: number[],
  options: { useTimesTen?: boolean; tenAs?: number; elevenAs?: number } = {}
) => {
  const sum = digits.reduce((acc, digit, index) => acc + digit * weights[index], 0);

  if (options.useTimesTen) {
    const digit = (sum * 10) % 11;
    return digit === 10 ? 0 : digit;
  }

  const digit = 11 - (sum % 11);

  if (digit === 10) return options.tenAs ?? 0;
  if (digit === 11) return options.elevenAs ?? 0;

  return digit;
};

const mod10Digit = (digits: number[], weights: number[]) => {
  const sum = digits.reduce((acc, digit, index) => acc + digit * weights[index], 0);
  const digit = 10 - (sum % 10);

  return digit === 10 ? 0 : digit;
};

const formatCnpj = (digits: number[]) => {
  const value = digits.join("");

  return value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
};

const calculateCnpjDigit = (digits: number[]) => {
  const weights =
    digits.length === 12
      ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
      : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const sum = digits.reduce((acc, digit, index) => acc + digit * weights[index], 0);
  const rest = sum % 11;

  return rest < 2 ? 0 : 11 - rest;
};

const buildIeWithOneDigit = (
  base: number[],
  weights: number[],
  mode: "mod11" | "mod11TimesTen" | "mod10" = "mod11"
) => {
  const digit =
    mode === "mod10"
      ? mod10Digit(base, weights)
      : mod11Digit(base, weights, { useTimesTen: mode === "mod11TimesTen" });

  return [...base, digit].join("");
};

const generateBahiaIe = () => {
  const base = randomDigits(7);
  const firstDigit = base[0];
  const useMod10 = [0, 1, 2, 3, 4, 5, 8].includes(firstDigit);
  const calculate = (digits: number[], weights: number[]) =>
    useMod10 ? mod10Digit(digits, weights) : mod11Digit(digits, weights);
  const secondCheckDigit = calculate(base, [7, 6, 5, 4, 3, 2, 1]);
  const firstCheckDigit = calculate([...base, secondCheckDigit], [8, 7, 6, 5, 4, 3, 2, 1]);

  return [...base, firstCheckDigit, secondCheckDigit].join("");
};

const generateMinasGeraisIe = () => {
  const base = randomDigits(11);
  const digitsForFirstCheck = [...base.slice(0, 3), 0, ...base.slice(3)];
  const sum = digitsForFirstCheck
    .map((digit, index) => digit * (index % 2 === 0 ? 1 : 2))
    .join("")
    .split("")
    .reduce((acc, digit) => acc + Number(digit), 0);
  const firstCheckDigit = (10 - (sum % 10)) % 10;
  const digitsWithFirstCheck = [...base, firstCheckDigit];
  const secondCheckDigit = mod11Digit(digitsWithFirstCheck, [3, 2, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2]);

  return [...base, firstCheckDigit, secondCheckDigit].join("");
};

const generateParanaIe = () => {
  const base = randomDigits(8);
  const firstCheckDigit = mod11Digit(base, [3, 2, 7, 6, 5, 4, 3, 2]);
  const secondCheckDigit = mod11Digit([...base, firstCheckDigit], [4, 3, 2, 7, 6, 5, 4, 3, 2]);

  return [...base, firstCheckDigit, secondCheckDigit].join("");
};

const generatePernambucoIe = () => {
  const base = randomDigits(7);
  const firstCheckDigit = mod11Digit(base, [8, 7, 6, 5, 4, 3, 2]);
  const secondCheckDigit = mod11Digit([...base, firstCheckDigit], [9, 8, 7, 6, 5, 4, 3, 2]);

  return [...base, firstCheckDigit, secondCheckDigit].join("");
};

const generateSaoPauloIe = () => {
  const base = randomDigits(8);
  const firstCheckDigit =
    base.reduce((acc, digit, index) => acc + digit * [1, 3, 4, 5, 6, 7, 8, 10][index], 0) %
    11 %
    10;
  const partial = [...base, firstCheckDigit, ...randomDigits(2)];
  const secondCheckDigit =
    partial.reduce((acc, digit, index) => acc + digit * [3, 2, 10, 9, 8, 7, 6, 5, 4, 3, 2][index], 0) %
    11 %
    10;

  return [...partial, secondCheckDigit].join("");
};

const generateTocantinsIe = () => {
  const base = [2, 9, 0, 1, ...randomDigits(6)];
  const digitsForCheck = [...base.slice(0, 2), ...base.slice(4)];
  const checkDigit = mod11Digit(digitsForCheck, [9, 8, 7, 6, 5, 4, 3, 2]);

  return [...base, checkDigit].join("");
};

const generateInscricaoEstadualByUf = (uf: string) => {
  switch (uf.toUpperCase()) {
    case "AC": {
      const base = [0, 1, ...randomDigits(9)];
      const firstCheckDigit = mod11Digit(base, [4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
      const secondCheckDigit = mod11Digit([...base, firstCheckDigit], [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
      return [...base, firstCheckDigit, secondCheckDigit].join("");
    }
    case "AL":
      return buildIeWithOneDigit([2, 4, 0, ...randomDigits(5)], [9, 8, 7, 6, 5, 4, 3, 2], "mod11TimesTen");
    case "AP":
      return buildIeWithOneDigit([0, 3, 0, ...randomDigits(5)], [9, 8, 7, 6, 5, 4, 3, 2]);
    case "AM":
    case "CE":
    case "ES":
    case "PB":
    case "PI":
    case "SC":
      return buildIeWithOneDigit(randomDigits(8), [9, 8, 7, 6, 5, 4, 3, 2]);
    case "BA":
      return generateBahiaIe();
    case "DF": {
      const base = [0, 7, ...randomDigits(9)];
      const firstCheckDigit = mod11Digit(base, [4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
      const secondCheckDigit = mod11Digit([...base, firstCheckDigit], [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
      return [...base, firstCheckDigit, secondCheckDigit].join("");
    }
    case "GO":
      return buildIeWithOneDigit([1, 0, ...randomDigits(6)], [9, 8, 7, 6, 5, 4, 3, 2]);
    case "MA":
      return buildIeWithOneDigit([1, 2, ...randomDigits(6)], [9, 8, 7, 6, 5, 4, 3, 2]);
    case "MT":
      return buildIeWithOneDigit(randomDigits(10), [3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
    case "MS":
      return buildIeWithOneDigit([2, 8, ...randomDigits(6)], [9, 8, 7, 6, 5, 4, 3, 2]);
    case "MG":
      return generateMinasGeraisIe();
    case "PA":
      return buildIeWithOneDigit([1, 5, ...randomDigits(6)], [9, 8, 7, 6, 5, 4, 3, 2]);
    case "PR":
      return generateParanaIe();
    case "PE":
      return generatePernambucoIe();
    case "RJ":
      return buildIeWithOneDigit(randomDigits(7), [2, 7, 6, 5, 4, 3, 2]);
    case "RN":
      return buildIeWithOneDigit([2, 0, ...randomDigits(6)], [9, 8, 7, 6, 5, 4, 3, 2], "mod11TimesTen");
    case "RS":
      return buildIeWithOneDigit(randomDigits(9), [2, 9, 8, 7, 6, 5, 4, 3, 2]);
    case "RO": {
      const base = randomDigits(13);
      const checkDigit = mod11Digit(base, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2], {
        tenAs: 1,
      });

      return [...base, checkDigit].join("");
    }
    case "RR": {
      const base = [2, 4, ...randomDigits(6)];
      const sum = base.reduce((acc, digit, index) => acc + digit * (index + 1), 0);
      return [...base, sum % 9].join("");
    }
    case "SE":
      return buildIeWithOneDigit(randomDigits(8), [9, 8, 7, 6, 5, 4, 3, 2], "mod11TimesTen");
    case "SP":
      return generateSaoPauloIe();
    case "TO":
      return generateTocantinsIe();
    default:
      throw new Error("UF inválida para gerar inscrição estadual.");
  }
};

//* Consultar dados de um CNPJ
export const consultarCnpj = async (
  cnpj: string
): Promise<CnpjDataResponse> => {
  const cnpjNumeros = onlyNumbers(cnpj);

  try {
    const { data } = await apiClient.get<BrasilApiCnpjResponse>(
      `/cnpj/v1/${cnpjNumeros}`
    );

    return {
      razao_social: data.razao_social ?? "",
      nome_fantasia: data.nome_fantasia ?? "",
      cnpj: data.cnpj ?? cnpjNumeros,
      logradouro: data.logradouro ?? "",
      numero: data.numero ?? "",
      bairro: data.bairro ?? "",
      municipio: data.municipio ?? "",
      uf: data.uf ?? "",
      cep: data.cep ?? "",
      telefone: formatPhone(
        data.ddd_telefone_1 ||
        data.ddd_telefone1 ||
        data.ddd_telefone_2 ||
        data.ddd_telefone2
      ),
      email: formatEmail(data.email),
      descricao_situacao_cadastral: data.descricao_situacao_cadastral ?? "",
      cnae_fiscal_descricao: data.cnae_fiscal_descricao ?? "",
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error("CNPJ não encontrado.");
    }

    throw new Error("Não foi possível conectar à BrasilAPI.");
  }
};

//* Gerar dados de um CNPJ
export const gerarCnpj = async (): Promise<string> => {
  const base = randomDigits(8).concat([0, 0, 0, 1]);
  const firstCheckDigit = calculateCnpjDigit(base);
  const secondCheckDigit = calculateCnpjDigit([...base, firstCheckDigit]);

  return formatCnpj([...base, firstCheckDigit, secondCheckDigit]);
};

//* Gerar dados de uma Inscrição Estadual
export const gerarInscricaoEstadual = async (
  uf: GenerateInscricaoEstadualdRequest["uf"]
): Promise<string> => generateInscricaoEstadualByUf(uf);

//* Gerar senha
export const gerarSenha = async (
  payload: GeneratePasswordRequest
): Promise<GeneratePasswordResponse> => {
  const length = payload.length ?? 12;
  const characterGroups = [
    payload.letters !== false ? LETTERS : "",
    payload.numbers !== false ? NUMBERS : "",
    payload.symbols ? SYMBOLS : "",
  ].filter(Boolean);

  if (characterGroups.length === 0) {
    throw new Error("Selecione pelo menos um tipo de caractere.");
  }

  const characters = characterGroups.join("");
  const password = Array.from(
    { length },
    () => characters[randomInt(characters.length)]
  ).join("");

  return { password };
};
