import axios from "axios";
import type {
  CnpjDataResponse,
  GenerateCnpj,
  GenerateInscricaoEstadualdRequest,
  GenerateInscricaoEstadualdResponse,
  GeneratePasswordRequest,
  GeneratePasswordResponse,
} from "@/types";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

if (!import.meta.env.VITE_API_BASE_URL) {
  console.error(
    "VITE_API_BASE_URL não está definida no .env.local. A API não funcionará."
  );
}

// FUNÇÕES DA API //

//* Consultar dados de um CNPJ
export const consultarCnpj = async (
  cnpj: string
): Promise<CnpjDataResponse> => {
  // Limpar CNPJ para deixar apenas números
  const cnpjNumeros = cnpj.replace(/\D/g, "");

  const { data } = await apiClient.get<CnpjDataResponse>(
    `/cnpj/${cnpjNumeros}`
  );

  return data;
};

//* Gerar dados de um CNPJ
export const gerarCnpj = async (): Promise<string> => {
  const { data } = await apiClient.get<GenerateCnpj>("/cnpj/random");

  return data.formatted;
};

//* Gerar dados de uma Inscrição Estadual
export const gerarInscricaoEstadual = async (
  uf: GenerateInscricaoEstadualdRequest["uf"]
): Promise<string> => {
  const { data } = await apiClient.get<GenerateInscricaoEstadualdResponse>("/inscricao-estadual/random", {
    params: { uf },
  });

  return data.inscricaoEstadual.replace(" (MOCK)", "");
};

//* Gerar senha
export const gerarSenha = async (
  payload: GeneratePasswordRequest
): Promise<GeneratePasswordResponse> => {
  const { data } = await apiClient.get<GeneratePasswordResponse>(
    "/password/generate",
    {
      params: payload,
    }
  );

  return data;
};
