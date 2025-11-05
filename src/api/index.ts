import axios from "axios";
import {
  CnpjDataResponse,
  GenerateInscricaoEstadualdRequest,
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
  const { data } = await apiClient.get<string[]>(`/cnpj?new=true`);

  return data[0];
};

//* Gerar dados de uma Inscrição Estadual
//! Verificar se irá funcionar
export const gerarInscricaoEstadual = async (
  uf: GenerateInscricaoEstadualdRequest["uf"]
): Promise<string> => {
  const { data } = await apiClient.get<string[]>(`/inscricao-estadual/random?${uf}`)

  return data[0];
};

//* Gerar senha
//! Verificar se irá funcionar
export const gerarSenha = async (
  payload: GeneratePasswordRequest
): Promise<GeneratePasswordResponse> => {
  const { data } = await apiClient.post<GeneratePasswordResponse>(`/password/generate?${payload}`)

  return data;
};