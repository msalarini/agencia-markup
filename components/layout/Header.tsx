'use client'

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/components/providers/AuthProvider"
import { Button } from "@/components/ui/button"
import { AuthModal } from "@/components/auth/AuthModal"
import {
    LogOut,
    CreditCard,
    User,
    ChevronDown,
    Sparkles
} from "lucide-react"

export function Header() {
    const { user, isPro, signOut } = useAuth()
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleSignOut = async () => {
        await signOut()
        setIsMenuOpen(false)
    }

    return (
        <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900">
                    <div className="bg-blue-600 text-white p-1 rounded-lg">
                        <Sparkles className="h-5 w-5" />
                    </div>
                    Agência Markup
                </Link>

                {/* Right Side */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="flex items-center gap-2 hover:bg-slate-100 p-2 rounded-lg transition-colors"
                            >
                                <div className="h-8 w-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-sm">
                                    {user.email?.substring(0, 2).toUpperCase()}
                                </div>
                                <div className="hidden md:block text-left">
                                    <p className="text-sm font-medium text-slate-900 leading-none">
                                        {user.email?.split('@')[0]}
                                    </p>
                                    {isPro && (
                                        <span className="text-[10px] font-bold text-green-600 bg-green-100 px-1.5 py-0.5 rounded-full mt-1 inline-block">
                                            PRO
                                        </span>
                                    )}
                                </div>
                                <ChevronDown className="h-4 w-4 text-slate-500" />
                            </button>

                            {/* Dropdown Menu */}
                            {isMenuOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setIsMenuOpen(false)}
                                    />
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-50 animate-in fade-in zoom-in-95 duration-200">
                                        <div className="px-4 py-2 border-b mb-1">
                                            <p className="text-xs text-slate-500">Logado como</p>
                                            <p className="text-sm font-medium truncate">{user.email}</p>
                                        </div>

                                        <Link
                                            href="/billing"
                                            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <CreditCard className="h-4 w-4" />
                                            Assinatura
                                        </Link>

                                        <button
                                            onClick={handleSignOut}
                                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Sair
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <Button onClick={() => setIsAuthModalOpen(true)}>
                            Entrar
                        </Button>
                    )}
                </div>
            </div>

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
            />
        </header>
    )
}
