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
} from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Logo } from "@/components/ui/logo"
export function Header() {
    const { user, isPro, signOut } = useAuth()
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleSignOut = async () => {
        await signOut()
        setIsMenuOpen(false)
    }

    return (
        <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="hover:opacity-90 transition-opacity">
                    <Logo size="sm" />
                </Link>

                {/* Right Side */}
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="flex items-center gap-2 hover:bg-accent p-2 rounded-lg transition-colors"
                            >
                                <div className="h-8 w-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-sm">
                                    {user.email?.substring(0, 2).toUpperCase()}
                                </div>
                                <div className="hidden md:block text-left">
                                    <p className="text-sm font-medium text-foreground leading-none">
                                        {user.email?.split('@')[0]}
                                    </p>
                                    {isPro && (
                                        <span className="text-[10px] font-bold text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-1.5 py-0.5 rounded-full mt-1 inline-block">
                                            PRO
                                        </span>
                                    )}
                                </div>
                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            </button>

                            {/* Dropdown Menu */}
                            {isMenuOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setIsMenuOpen(false)}
                                    />
                                    <div className="absolute right-0 mt-2 w-48 bg-popover rounded-lg shadow-lg border py-1 z-50 animate-in fade-in zoom-in-95 duration-200">
                                        <div className="px-4 py-2 border-b mb-1">
                                            <p className="text-xs text-muted-foreground">Logado como</p>
                                            <p className="text-sm font-medium truncate text-foreground">{user.email}</p>
                                        </div>

                                        <Link
                                            href="/billing"
                                            className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-accent"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <CreditCard className="h-4 w-4" />
                                            Assinatura
                                        </Link>

                                        <button
                                            onClick={handleSignOut}
                                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-destructive/10"
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
            </div >

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
            />
        </header >
    )
}
