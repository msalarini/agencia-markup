import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsOfUse() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">Termos de Uso</CardTitle>
                    <p className="text-muted-foreground">Última atualização: 21 de Novembro de 2024</p>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none space-y-6">
                    <section>
                        <h2 className="text-xl font-semibold mb-2">1. Aceitação dos Termos</h2>
                        <p>
                            Ao acessar e utilizar a plataforma LucroTur, você concorda em cumprir e ficar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deverá utilizar nossos serviços.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">2. Descrição do Serviço</h2>
                        <p>
                            A LucroTur é uma ferramenta SaaS (Software as a Service) projetada para auxiliar agências de turismo e agentes independentes no cálculo de markup, precificação de pacotes e gestão de lucros.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">3. Contas e Assinaturas</h2>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Você é responsável por manter a confidencialidade de sua conta e senha.</li>
                            <li>O plano PRO oferece recursos adicionais mediante pagamento de assinatura mensal.</li>
                            <li>O cancelamento da assinatura pode ser feito a qualquer momento, interrompendo a renovação automática para o próximo ciclo.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">4. Propriedade Intelectual</h2>
                        <p>
                            O serviço e seu conteúdo original, recursos e funcionalidades são e permanecerão de propriedade exclusiva da LucroTur e seus licenciadores. O serviço é protegido por direitos autorais e outras leis do Brasil e de países estrangeiros.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">5. Limitação de Responsabilidade</h2>
                        <p>
                            A LucroTur fornece ferramentas de cálculo para auxílio na tomada de decisão, mas não se responsabiliza por eventuais prejuízos financeiros decorrentes do uso da ferramenta. A responsabilidade final pela precificação e conferência dos valores é do usuário.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">6. Alterações nos Termos</h2>
                        <p>
                            Reservamo-nos o direito de modificar ou substituir estes Termos a qualquer momento. Se uma revisão for material, tentaremos fornecer um aviso com pelo menos 30 dias de antecedência antes que quaisquer novos termos entrem em vigor.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">7. Contato</h2>
                        <p>
                            Para questões relacionadas a estes Termos, entre em contato conosco: suporte@lucrotur.com.br
                        </p>
                    </section>
                </CardContent>
            </Card>
        </div>
    )
}
