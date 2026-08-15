import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import Home from "@/pages/Home";
import ConsultarCnpj from "@/pages/ConsultarCnpj";
import { GerarSenha } from "@/pages/GerarSenha";
import { GerarIE } from "@/pages/GerarIE";
import { GerarCnpj } from "@/pages/GerarCnpj";
import { GerarCpf } from "@/pages/GerarCpf";
import { GerarRg } from "@/pages/GerarRg";
import { GerarCnh } from "@/pages/GerarCnh";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/gerar-senha",
                element: <GerarSenha />
            },
            {
                path: "/gerar-ie",
                element: <GerarIE />
            },
            {
                path: "/consultar-cnpj",
                element: <ConsultarCnpj />
            },
            {
                path: "/gerar-cnpj",
                element: <GerarCnpj />
            },
            {
                path: "/gerar-cpf",
                element: <GerarCpf />
            },
            {
                path: "/gerar-rg",
                element: <GerarRg />
            },
            {
                path: "/gerar-cnh",
                element: <GerarCnh />
            },
        ]
    }
]);

export function AppRoutes() {
    return <RouterProvider router={router} />;
}
