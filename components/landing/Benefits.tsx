import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, Users, TrendingUp } from "lucide-react"

export function Benefits() {
    const benefits = [
        {
            title: "Nunca mais esqueça quanto deveria ter cobrado",
            description: "Tenha histórico e segurança em cada orçamento enviado.",
            icon: ShieldCheck
        },
        {
            title: "Padronize o markup da sua equipe",
            description: "Garanta que todos os vendedores sigam a mesma margem de lucro.",
            icon: Users
        },
        {
            title: "Análise de descontos em tempo real",
            description: "Veja se vale a pena aceitar um desconto que o cliente pediu sem prejuízo.",
            icon: TrendingUp
        }
    ]

    return (
        <section className="py-12 bg-muted/30" aria-label="Benefícios">
            <div className="container mx-auto px-4 max-w-6xl">
                <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
                    Por que usar o LucroTur?
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => (
                        <Card key={index} className="flex flex-col items-center text-center border-none shadow-sm hover:shadow-md transition-all">
                            <CardHeader className="pb-2">
                                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 text-primary">
                                    <benefit.icon className="h-6 w-6" />
                                </div>
                                <CardTitle className="text-xl font-semibold">{benefit.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{benefit.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
