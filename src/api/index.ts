import axios from "axios";
import { CnpjData } from "@/types";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
})

// Função para buscar dados do CNPJ
export const consultarCnpj = async (cnpj: string): Promise<CnpjData> => {
    // Limpar o CNPJ para deixar apenas números
    const cnpjNumeros = cnpj.replace(/\D/g, '');
    const { data } = await apiClient.get<CnpjData>(`/cnpj/${cnpjNumeros}`);

    return data;
};