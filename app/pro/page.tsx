'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Zap } from "lucide-react"
import { useAuth } from "@/components/providers/AuthProvider"
import { useRouter } from "next/navigation"

export default function ProPage() {
    const { user, isPro, signInWithGoogle } = useAuth()
    const router = useRouter()

    const handleSubscribe = async () => {
        if (!user) {
            signInWithGoogle()
            return
        }

        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
            })
            const data = await response.json()

            if (data.url) {
                window.location.href = data.url
            } else {
                alert("Erro ao iniciar pagamento. Tente novamente.")
            }
        } catch (error) {
            console.error("Checkout error:", error)
            alert("Erro ao conectar com o servidor.")
        }
    }

    return (
        <div className="min-h-screen bg-background py-20 px-4">
            <div className="max-w-3xl mx-auto text-center space-y-8">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                        Desbloqueie todo o potencial da sua Agência
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Tenha acesso a ferramentas exclusivas de IA e maximize seus lucros com o plano PRO.
                    </p>
                </div>

                <Card className="max-w-md mx-auto border-2 border-blue-600 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                        MAIS POPULAR
                    </div>
                    <CardHeader className="pb-8 pt-10">
                        <CardTitle className="text-3xl font-bold">LucroTur <span className="text-blue-600">PRO</span></CardTitle>
                        <CardDescription className="text-lg mt-2">
                            Para agências que querem crescer
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-baseline justify-center gap-1">
                            <span className="text-5xl font-extrabold tracking-tight">R$ 10</span>
                            <span className="text-xl text-muted-foreground font-medium">/mês</span>
                        </div>

                        <ul className="space-y-3 text-left px-6">
                            <li className="flex items-center gap-3">
                                <div className="h-6 w-6 rounded-full bg-green-500/10 dark:bg-green-500/20 flex items-center justify-center shrink-0">
                                    <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                                </div>
                                <span className="text-foreground">Sugestões de Markup com <strong>IA Ilimitada</strong></span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="h-6 w-6 rounded-full bg-green-500/10 dark:bg-green-500/20 flex items-center justify-center shrink-0">
                                    <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                                </div>
                                <span className="text-foreground">Cálculo de Comissões Avançado</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="h-6 w-6 rounded-full bg-green-500/10 dark:bg-green-500/20 flex items-center justify-center shrink-0">
                                    <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                                </div>
                                <span className="text-foreground">Suporte Prioritário</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="h-6 w-6 rounded-full bg-green-500/10 dark:bg-green-500/20 flex items-center justify-center shrink-0">
                                    <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                                </div>
                                <span className="text-foreground">Acesso antecipado a novas features</span>
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter className="pb-10 pt-4 px-6">
                        <Button
                            size="lg"
                            className="w-full text-lg h-12 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20"
                            onClick={handleSubscribe}
                        >
                            {user ? (isPro ? "Você já é PRO!" : "Assinar Agora") : "Entrar para Assinar"}
                            <Zap className="ml-2 h-5 w-5 fill-current" />
                        </Button>
                    </CardFooter>
                </Card>

                <p className="text-sm text-muted-foreground">
                    Cancelamento a qualquer momento. Pagamento seguro.
                </p>
            </div>
        </div>
    )
}
