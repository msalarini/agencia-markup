import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export function TargetAudience() {
    const items = [
        "Donos de pequenas agências que não querem errar no preço.",
        "Vendedores que precisam responder rápido no WhatsApp.",
        "Gente que ainda usa Excel ou calculadora manual."
    ]

    return (
        <section className="py-12" aria-label="Pra quem é">
            <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">
                    Pra quem é o PricePro?
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {items.map((item, index) => (
                        <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow bg-white/80 backdrop-blur">
                            <CardHeader className="pb-2">
                                <CheckCircle2 className="h-8 w-8 text-primary mb-2" />
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-700 font-medium">{item}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
