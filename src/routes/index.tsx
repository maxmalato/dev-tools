import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home";
import ConsultarCnpj from "../pages/ConsultarCnpj";
import ConsultarPlaca from "../pages/ConsultarPlaca";
import { GerarSenha } from "../pages/GerarSenha";

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
                path: "/consultar-cnpj",
                element: <ConsultarCnpj />
            },
            {
                path: "consultar-placa",
                element: <ConsultarPlaca />
            }
        ]
    }
]);

export function AppRoutes() {
    return <RouterProvider router={router} />;
}