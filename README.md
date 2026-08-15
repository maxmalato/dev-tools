# 🇧🇷 DGT - Data Generate Tools

![Project Status](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/license-MIT-blue)
![React](https://img.shields.io/badge/react-18.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/typescript-5.0-3178C6?logo=typescript)

Este projeto reúne geradores de dados (CPF, RG, CNH, CNPJ, Inscrição Estadual e Senhas) e consultas a APIs públicas em uma interface moderna, responsiva e performática.

## 🚀 Funcionalidades

O projeto conta atualmente com as seguintes ferramentas:

-   **🔑 Gerador de Senhas:** Cria senhas seguras com opções personalizáveis (tamanho, letras, números, símbolos).
-   **🏢 Gerador de CNPJ:** Gera números de CNPJ válidos (com cálculo de dígito verificador) instantaneamente.
-   **🪪 Gerador de CPF:** Gera números de CPF válidos com os dois dígitos verificadores.
-   **🪪 Gerador de RG:** Gera números de RG conforme o formato do estado selecionado e calcula o dígito verificador quando há uma regra estadual pública verificável.
-   **🚗 Gerador de CNH:** Gera números de registro de CNH válidos com seus dígitos verificadores.
-   **📝 Gerador de Inscrição Estadual:** Gera IEs válidas para todos os 27 estados brasileiros.
-   **🔍 Consulta de CNPJ:** Busca dados cadastrais completos de empresas em tempo real (Razão Social, Endereço, Situação Cadastral, etc.).

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando as melhores práticas e ferramentas do ecossistema React moderno:

-   **Core:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
-   **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
-   **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
-   **Componentes UI:** [Shadcn/UI](https://ui.shadcn.com/)
-   **Gerenciamento de Estado/API:** [TanStack Query (React Query)](https://tanstack.com/query/latest)
-   **Requisições HTTP:** [Axios](https://axios-http.com/)
-   **Roteamento:** [React Router DOM](https://reactrouter.com/)
-   **Ícones:** [Lucide React](https://lucide.dev/)
-   **Feedback Visual:** [Sonner](https://sonner.emilkowal.ski/) (Toasts)
-   **Máscaras de Input:** [React IMask](https://github.com/uNmAnNeR/imaskjs/tree/master/packages/react-imask)

## 📂 Estrutura do Projeto

O projeto segue uma arquitetura modular e escalável:

```bash
src/
├── api/             # Camada de comunicação com APIs e lógicas de geração local
├── assets/          # Imagens e logos estáticas
├── components/
│   ├── layout/      # Layouts globais (MainLayout)
│   ├── shared/      # Componentes reutilizáveis (ButtonShared, ResultBoxShared)
│   └── ui/          # Componentes base do Shadcn/UI
├── lib/             # Utilitários (cn, constants)
├── pages/           # Páginas da aplicação (GerarSenha, ConsultarCnpj, etc.)
├── routes/          # Configuração de rotas
└── types/           # Definições de tipos TypeScript (Interfaces/Types)
