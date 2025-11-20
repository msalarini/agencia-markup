'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense } from "react"

function AuthErrorContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const error = searchParams.get('error')

    return (
        <Card className="w-full max-w-md border-red-200 shadow-lg">
            <CardHeader>
                <CardTitle className="text-red-600">Erro de Autenticação</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4">
                    Não foi possível validar seu login com o Google.
                </p>
                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-3 text-sm text-red-800 dark:text-red-200 font-mono break-all mb-4">
                        {error}
                    </div>
                )}
                <p className="text-sm text-muted-foreground">Isso pode acontecer se:</p>
                <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground space-y-1">
                    <li>A conexão expirou.</li>
                    <li>Você cancelou o login.</li>
                    <li>Houve um erro de configuração no servidor.</li>
                </ul>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => router.push('/')}>
                    Voltar ao Início
                </Button>
                <Button onClick={() => router.push('/')}>
                    Tentar Novamente
                </Button>
            </CardFooter>
        </Card>
    )
}

export default function AuthErrorPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Suspense fallback={<div>Carregando...</div>}>
                <AuthErrorContent />
            </Suspense>
        </div>
    )
}
