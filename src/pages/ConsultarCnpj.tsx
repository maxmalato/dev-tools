import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { IMaskInput } from "react-imask";
import { toast } from "sonner";
import { Search, Building2 } from "lucide-react";

import { ButtonShared } from "@/components/shared/ButtonShared";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { consultarCnpj } from "@/api/index";
import type { CnpjDataResponse } from "@/types";
import { PageHeader } from "@/components/shared/PageHeader";

export default function ConsultarCnpj() {
    const [cnpjInput, setCnpjInput] = useState("");
    const { mutate, data, isPending } = useMutation<CnpjDataResponse, Error, string>({
        mutationFn: consultarCnpj,
        onError: (err) => {
            toast.error("Erro ao consultar CNPJ", {
                description: err.message || "Verifique o número digitado e tente novamente."
            });
        },
        onSuccess: () => {
            toast.success("Consulta realizada com sucesso!");
        },
    });
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const cleanCnpj = cnpjInput.replace(/\D/g, "");
        if (cleanCnpj.length !== 14) {
            toast.warning("CNPJ incompleto", {
                description: "Por favor, digite os 14 números do CNPJ."
            });

            return;
        }

        mutate(cleanCnpj);
    }

    return (
        <main>
            <PageHeader
                title="Cosultar CNPJ"
                subtitle="Consulte CNPJ de forma simples e completa"
            />

            <form onSubmit={handleSearch} className="max-w-5xl mx-auto flex flex-col md:flex-row justify-center items-end md:gap-3 p-4">
                <div className="w-full md:w-96">
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <IMaskInput
                        mask="00.000.000/0000-00"
                        value={cnpjInput}
                        onAccept={(value: string) => setCnpjInput(value)}
                        as={Input as any}
                        id="cnpj"
                        placeholder="00.000.000/0000-00"
                        disabled={isPending}
                        className="border border-[#26a8ed] p-2 rounded-lg w-full"
                    />
                </div>

                <ButtonShared
                    Icon={Search}
                    title={isPending ? "Consultando..." : "Consultar CNPJ"}
                    disabled={isPending}
                    type="submit"
                />
            </form>

            {data && (
                <section className="max-w-5xl mx-auto p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Card 1: Dados Principais */}
                    <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
                        <div className="flex items-center gap-2 mb-4">
                            <Building2 className="text-primary h-5 w-5" />
                            <h2 className="text-lg font-semibold text-gray-800">
                                Dados Principais
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                            <div>
                                <p className="text-sm text-gray-500">Razão Social</p>
                                <p className="font-semibold text-gray-800">
                                    {data.razao_social || "-"}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Nome Fantasia</p>
                                <p className="font-semibold text-gray-800">
                                    {data.nome_fantasia || "-"}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">CNPJ</p>
                                <p className="font-semibold text-gray-800">{data.cnpj}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Atividade Principal</p>
                                <p className="font-semibold text-gray-800 text-sm">
                                    {data.cnae_fiscal_descricao || "-"}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Situação Cadastral</p>
                                <div className="flex items-center gap-2">
                                    <p
                                        className={`font-semibold ${data.descricao_situacao_cadastral === "ATIVA"
                                            ? "text-green-600"
                                            : "text-red-600"
                                            }`}
                                    >
                                        {data.descricao_situacao_cadastral}
                                    </p>
                                    <span
                                        className={`w-2 h-2 rounded-full ${data.descricao_situacao_cadastral === "ATIVA"
                                            ? "bg-green-500"
                                            : "bg-red-500"
                                            }`}
                                    ></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Endereço */}
                    <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Endereço e Contato
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                            <div>
                                <p className="text-sm text-gray-500">Logradouro</p>
                                <p className="font-semibold text-gray-800">
                                    {data.logradouro}, {data.numero}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Bairro</p>
                                <p className="font-semibold text-gray-800">{data.bairro}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Cidade / UF</p>
                                <p className="font-semibold text-gray-800">
                                    {data.municipio} / {data.uf}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">CEP</p>
                                <p className="font-semibold text-gray-800">{data.cep}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Telefone</p>
                                <p className="font-semibold text-gray-800">{data.telefone || "-"}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">E-mail</p>
                                <p className="font-semibold text-gray-800 break-all">{data.email || "-"}</p>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {!data && !isPending && (
                <div className="text-center mt-12 text-gray-400">
                    <p>Digite um CNPJ acima para visualizar os dados.</p>
                </div>
            )}
        </main>
    );
}
