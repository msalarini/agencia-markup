'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/utils/supabase/client'

type AuthContextType = {
    user: User | null
    session: Session | null
    isLoading: boolean
    isPro: boolean
    signInWithGoogle: () => Promise<void>
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isPro, setIsPro] = useState(false)

    useEffect(() => {
        const initAuth = async () => {
            // Check for mock session (for E2E testing)
            if (typeof window !== 'undefined' && (window as any).__MOCK_SESSION__) {
                const mockSession = (window as any).__MOCK_SESSION__
                setSession(mockSession)
                setUser(mockSession.user)
                // In test mode, trust the metadata to avoid network flakes
                setIsPro(mockSession.user.user_metadata?.is_pro ?? false)
                setIsLoading(false)
                return
            }

            const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
                setSession(session)
                setUser(session?.user ?? null)
                checkUserProStatus(session?.user)
                setIsLoading(false)
            })

            return () => subscription.unsubscribe()
        }

        initAuth()
    }, [])

    const checkUserProStatus = async (user: User | null | undefined) => {
        if (!user) {
            setIsPro(false)
            return
        }

        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('is_pro')
                .eq('id', user.id)
                .single()

            if (error) {
                console.error('Error checking PRO status:', error)
                setIsPro(false)
                return
            }

            setIsPro(data?.is_pro ?? false)
        } catch (error) {
            console.error('Unexpected error checking PRO status:', error)
            setIsPro(false)
        }
    }

    const signInWithGoogle = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        })
    }

    const signOut = async () => {
        await supabase.auth.signOut()
        setIsPro(false)
    }

    return (
        <AuthContext.Provider value={{ user, session, isLoading, isPro, signInWithGoogle, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
