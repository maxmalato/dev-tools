
export default function ConsultarCnpj() {
    return (
        <main>
            <h1 className="font-bold text-2xl text-center mt-8 mb-2"> Consulta de CNPJ</h1>



            <section className="max-w-5xl mx-auto p-6 space-y-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Dados Principais</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                        <div>
                            <p className="text-sm text-gray-500">Razão Social</p>
                            <p className="font-semibold text-gray-800">EMPRESA EXEMPLO LTDA</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Nome Fantasia</p>
                            <p className="font-semibold text-gray-800">NOME FANTASIA EXEMPLO</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Data de Abertura</p>
                            <p className="font-semibold text-gray-800">01/01/2000</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Situação Cadastral</p>
                            <div className="flex items-center gap-2">
                                <p className="font-semibold text-green-600">ATIVA</p>
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Endereço e Contato</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                        <div>
                            <p className="text-sm text-gray-500">Logradouro</p>
                            <p className="font-semibold text-gray-800">AV. EXEMPLO, 123 - COMPLEMENTO</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Bairro</p>
                            <p className="font-semibold text-gray-800">CENTRO</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Cidade / UF</p>
                            <p className="font-semibold text-gray-800">SÃO PAULO / SP</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">CEP</p>
                            <p className="font-semibold text-gray-800">01000-000</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Telefone</p>
                            <p className="font-semibold text-gray-800">(11) 99999-9999</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">E-mail</p>
                            <p className="hover:underline cursor-pointer">contato@empresaexemplo.com.br</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}