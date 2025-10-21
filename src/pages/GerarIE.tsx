import { Header } from "@/components/shared/Header";


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
            </main>
        </>
    )
};