import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Rocket, CheckCircle2 } from "lucide-react"

export function LeadCapture() {
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (email) {
            // Simulate API call
            console.log('Lead captured:', email)
            setSubmitted(true)
            // Reset after 3 seconds
            setTimeout(() => {
                setSubmitted(false)
                setEmail('')
            }, 3000)
        }
    }

    return (
        <Card className="bg-gradient-to-r from-primary to-blue-600 text-primary-foreground border-none shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

            <CardHeader className="text-center relative z-10">
                <CardTitle className="text-2xl mb-2 flex items-center justify-center gap-2">
                    <Rocket className="h-6 w-6" />
                    Versão PRO em breve!
                </CardTitle>
                <CardDescription className="text-primary-foreground/90 text-base max-w-xl mx-auto">
                    Quer ser avisado quando lançarmos recursos avançados como exportação PDF, multi-moeda e relatórios?
                    <br />
                    <span className="font-semibold text-white">Cadastre-se para receber uma oferta especial de lançamento.</span>
                </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
                {submitted ? (
                    <div className="flex flex-col items-center justify-center py-4 animate-in fade-in zoom-in duration-300">
                        <div className="bg-white/20 p-3 rounded-full mb-3">
                            <CheckCircle2 className="h-8 w-8 text-white" />
                        </div>
                        <p className="text-lg font-semibold">Obrigado! Você está na lista.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <Input
                            type="email"
                            placeholder="Seu melhor e-mail"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-white/30"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Button
                            type="submit"
                            variant="secondary"
                            className="font-semibold shadow-lg hover:bg-white hover:text-primary transition-colors"
                        >
                            Me avise
                        </Button>
                    </form>
                )}
            </CardContent>
        </Card>
    )
}
