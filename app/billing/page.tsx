'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/components/providers/AuthProvider"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Loader2, AlertTriangle } from "lucide-react"

export default function BillingPage() {
    const { user, isPro, isLoading } = useAuth()
    const router = useRouter()
    const [isCancelling, setIsCancelling] = useState(false)

    const handleCancel = async () => {
        if (!confirm("Tem certeza que deseja cancelar sua assinatura PRO? Você perderá acesso aos recursos exclusivos.")) {
            return
        }

        setIsCancelling(true)
        try {
            const response = await fetch('/api/billing/cancel', {
                method: 'POST',
            })

            if (response.ok) {
                alert("Assinatura cancelada com sucesso.")
                window.location.reload() // Reload to update AuthProvider state
            } else {
                alert("Erro ao cancelar assinatura. Tente novamente.")
            }
        } catch (error) {
            console.error("Cancel error:", error)
            alert("Erro ao conectar com o servidor.")
        } finally {
            setIsCancelling(false)
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        )
    }

    if (!user) {
        router.push('/')
        return null
    }

    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-foreground">Gerenciar Assinatura</h1>
                    <p className="text-muted-foreground">Visualize e gerencie seu plano atual.</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Plano Atual</CardTitle>
                        <CardDescription>Detalhes da sua assinatura ativa.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-card border rounded-lg">
                            <div>
                                <p className="font-medium text-foreground">
                                    {isPro ? "LucroTur PRO" : "Plano Gratuito"}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {isPro ? "R$ 10,00 / mês" : "Acesso limitado"}
                                </p>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-bold ${isPro ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'}`}>
                                {isPro ? "ATIVO" : "GRÁTIS"}
                            </div>
                        </div>

                        {!isPro && (
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                <h4 className="font-medium text-blue-900 mb-1">Faça Upgrade para o PRO</h4>
                                <p className="text-sm text-blue-700 mb-3">
                                    Desbloqueie sugestões de IA ilimitadas e suporte prioritário.
                                </p>
                                <Button onClick={() => router.push('/pro')} className="bg-blue-600 hover:bg-blue-700">
                                    Ver Planos
                                </Button>
                            </div>
                        )}
                    </CardContent>
                    {isPro && (
                        <CardFooter className="border-t bg-muted/30 px-6 py-4">
                            <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-2 text-amber-600 text-sm">
                                    <AlertTriangle className="h-4 w-4" />
                                    <span>Ao cancelar, você perderá acesso imediato aos recursos PRO.</span>
                                </div>
                                <Button
                                    variant="destructive"
                                    onClick={handleCancel}
                                    disabled={isCancelling}
                                >
                                    {isCancelling && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Cancelar Assinatura
                                </Button>
                            </div>
                        </CardFooter>
                    )}
                </Card>
            </div>
        </div>
    )
}
