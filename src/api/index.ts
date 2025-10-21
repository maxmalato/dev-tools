import axios from "axios";
import { CnpjData } from "@/types";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Função para buscar dados do CNPJ
export const consultarCnpj = async (cnpj: string): Promise<CnpjData> => {
  // Limpar o CNPJ para deixar apenas números
  const cnpjNumeros = cnpj.replace(/\D/g, "");
  const { data } = await apiClient.get<CnpjData>(`/cnpj/${cnpjNumeros}`);

  return data;
};

// Função para gerar Inscrição Estadual
interface GerarIEResponse {
  ie: string;
}

export const gerarInscricaoEstadual = async (
  uf: string
): Promise<GerarIEResponse> => {
  const { data } = await apiClient.post(`/gerar-ie`, { estado: uf });

  return data;
};
