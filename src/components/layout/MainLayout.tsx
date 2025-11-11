import { Outlet } from "react-router-dom";
import { Header } from "../shared/Header";
import { Toaster } from "@/components/ui/sonner";

export default function MainLayout() {
    return (
        <main>
            <Header/>
            <Outlet />
            <Toaster richColors position="top-right"/>
        </main>
    )
};