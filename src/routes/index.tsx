import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import Home from "@/pages/Home";
import ConsultarCnpj from "@/pages/ConsultarCnpj";
import ConsultarPlaca from "@/pages/ConsultarPlaca";
import { GerarSenha } from "@/pages/GerarSenha";
import { GerarIE } from "@/pages/GerarIE";
import { GerarCnpj } from "@/pages/GerarCnpj";

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
                path: "consultar-placa",
                element: <ConsultarPlaca />
            },
            {
                path: "/consultar-cnpj",
                element: <ConsultarCnpj />
            },
            {
                path: "/gerar-cnpj",
                element: <GerarCnpj />
            },
        ]
    }
]);

export function AppRoutes() {
    return <RouterProvider router={router} />;
}