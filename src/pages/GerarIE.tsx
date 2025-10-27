import { ButtonShared } from "@/components/shared/ButtonShared";
import { Header } from "@/components/shared/Header";
import { Copy } from "lucide-react";


export function GerarIE() {

    return (
        <>
            <Header />
            <main>
                <h1 className="font-bold text-2xl text-center mt-8 mb-2">Gerador de Inscrição Estadual</h1>
                <h2 className="text-gray-500 text-center">Gere um número de Inscrição Estadual válido para o Estado de sua escolha</h2>

                <section>
                    <h3 className="font-semibold">Estado</h3>
                    <select className="w-full mt-2 p-2 border border-gray-300 rounded-md">
                        <option>Selecione um estado</option>
                        <option>Acre</option>
                        <option>Alagoas</option>
                        <option>Amapá</option>
                    </select>
                </section>

                <ButtonShared title="Gerar Inscriçao Estadual" />

                <section className="mt-6 space-y-2">
                    <h2 className="font-semibold">Inscrição Estadual Gerada</h2>
                    <div className="p-4 border border-gray-500 rounded-lg flex justify-between">
                        <input type="text" disabled placeholder="Número gerado..." />
                        <Copy color="#6a7282"/>
                    </div>
                </section>
            </main>
        </>
    )
};