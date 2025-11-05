// Consultar CNPJ
export interface CnpjDataRequest {
  cnpj: string;
}
export interface CnpjDataResponse {
  razao_social: string;
  nome_fantasia: string;
  cnpj: string;
  logradouro: string;
  numero: string;
  bairro: string;
  municipio: string;
  uf: string;
  cep: string;
  descricao_situacao_cadastral: string;
  cnae_fiscal_descricao: string;
}

// Gerar CNPJ
export interface GenerateCnpj {
  formatted: string;
  unformatted: string;
}

// Gerar senhas
export interface GeneratePasswordRequest {
  length?: number; // mínimo 4, máximo 128, padrão 12
  letters?: boolean; // padrão true
  numbers?: boolean; // padrão true
  symbols?: boolean; // padrão false
}
export interface GeneratePasswordResponse {
  password: string;
}

// Gerar Inscrição Estadual
export interface GenerateInscricaoEstadualdRequest {
  uf: string;
}

export interface GenerateInscricaoEstadualdResponse {
  uf: string;
  inscricaoEstadual: string;
}