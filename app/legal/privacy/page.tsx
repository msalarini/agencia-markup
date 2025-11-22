import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPolicy() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">Política de Privacidade</CardTitle>
                    <p className="text-muted-foreground">Última atualização: 21 de Novembro de 2024</p>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none space-y-6">
                    <section>
                        <h2 className="text-xl font-semibold mb-2">1. Introdução</h2>
                        <p>
                            A LucroTur (&quot;nós&quot;, &quot;nosso&quot;) respeita a sua privacidade e está comprometida em proteger os dados pessoais que você compartilha conosco. Esta política descreve como coletamos, usamos e protegemos suas informações ao utilizar nossa plataforma de cálculo de markup para turismo.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">2. Coleta de Dados</h2>
                        <p>Coletamos os seguintes tipos de informações:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li><strong>Informações de Conta:</strong> Nome, e-mail e foto (via login social) para identificação e acesso ao plano PRO.</li>
                            <li><strong>Dados de Uso:</strong> Informações sobre como você interage com nossos serviços, incluindo cálculos salvos e preferências.</li>
                            <li><strong>Dados de Pagamento:</strong> Processados de forma segura por nosso parceiro (Mercado Pago). Não armazenamos dados completos de cartão de crédito.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">3. Uso das Informações</h2>
                        <p>Utilizamos seus dados para:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Fornecer e manter nossos serviços.</li>
                            <li>Processar pagamentos e gerenciar sua assinatura.</li>
                            <li>Enviar comunicações importantes sobre sua conta ou atualizações do serviço.</li>
                            <li>Melhorar e personalizar sua experiência na plataforma.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">4. Compartilhamento de Dados</h2>
                        <p>
                            Não vendemos seus dados pessoais. Compartilhamos informações apenas com prestadores de serviços essenciais (como processadores de pagamento e hospedagem) que seguem rigorosos padrões de segurança.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">5. Segurança</h2>
                        <p>
                            Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados contra acesso não autorizado, alteração ou destruição.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">6. Seus Direitos</h2>
                        <p>
                            Você tem o direito de acessar, corrigir ou excluir seus dados pessoais a qualquer momento. Para exercer esses direitos, entre em contato conosco.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">7. Contato</h2>
                        <p>
                            Se tiver dúvidas sobre esta política, entre em contato através do e-mail: suporte@lucrotur.com.br
                        </p>
                    </section>
                </CardContent>
            </Card>
        </div>
    )
}
