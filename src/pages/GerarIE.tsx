import { ButtonShared } from "@/components/shared/ButtonShared";
import { Copy, RotateCcw } from "lucide-react";
import { BRAZIL_STATES } from "@/lib/constants";


export function GerarIE() {

    return (
        <main>
            <h1 className="font-bold text-2xl text-center mt-8 mb-2">Gerador de Inscrição Estadual</h1>

            <section>
                <h3 className="font-semibold">Estado</h3>
                <select className="w-full mt-2 p-2 border border-gray-300 rounded-md">
                    <option>Selecione um estado</option>
                    {BRAZIL_STATES.map((state) => (
                        <option key={state.value} value={state.value}>
                            {state.label}
                        </option>
                    ))}
                </select>
            </section>

            <ButtonShared title="Gerar Inscriçao Estadual" Icon={RotateCcw} />

            <section className="mt-6 space-y-2">
                <h2 className="font-semibold">Inscrição Estadual Gerada</h2>
                <div className="p-4 border border-gray-500 rounded-lg flex justify-between">
                    <input type="text" disabled placeholder="Número gerado..." />
                    <Copy color="#6a7282" className="cursor-pointer" />
                </div>
            </section>
        </main>
    )
};