'use client'

import { useAuth } from "@/components/providers/AuthProvider"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Lock, Sparkles } from "lucide-react"

interface ProLockProps {
    children: React.ReactNode
    fallback?: React.ReactNode
}

export function ProLock({ children, fallback }: ProLockProps) {
    const { isPro, user } = useAuth()
    const router = useRouter()

    if (isPro) {
        return <>{children}</>
    }

    return (
        <div className="relative min-h-[400px] flex items-center justify-center">
            {/* Blurred Content */}
            <div className="absolute inset-0 opacity-20 blur-sm pointer-events-none select-none" aria-hidden="true">
                {children}
            </div>

            {/* Lock Overlay */}
            <div className="relative z-10 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-xl shadow-lg p-6 max-w-md mx-auto text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-3 shadow-md">
                    <Lock className="h-6 w-6 text-white" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Recurso Premium
                </h3>

                <p className="text-sm text-slate-600 mb-4">
                    Este recurso está disponível apenas para assinantes PRO.
                    Desbloqueie todo o potencial da sua agência.
                </p>

                <Button
                    onClick={() => router.push('/pro')}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Fazer Upgrade
                </Button>
            </div>
        </div>
    )
}
