'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useAuth } from "@/components/providers/AuthProvider"
import { useState } from "react"

interface AuthModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    description?: string
}

export function AuthModal({ isOpen, onClose, title = "Acesse sua conta", description = "Faça login para continuar e desbloquear recursos." }: AuthModalProps) {
    const { signInWithGoogle } = useAuth()
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async () => {
        try {
            setIsLoading(true)
            await signInWithGoogle()
        } catch (error) {
            console.error("Login failed:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Button onClick={handleLogin} disabled={isLoading} className="w-full">
                        {isLoading ? "Conectando..." : "Entrar com Google"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
