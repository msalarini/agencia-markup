'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { supabase } from '@/utils/supabase/client'

export function PaymentStatusHandler() {
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        // Handle payment redirect
        if (searchParams.get('success') === 'true') {
            toast.success('Pagamento aprovado! Bem-vindo ao PRO 🚀')
            // Force session refresh to update PRO status
            supabase.auth.refreshSession()
            // Clean URL
            router.replace('/')
        } else if (searchParams.get('error') === 'true') {
            toast.error('Houve um problema com o pagamento.')
            router.replace('/')
        }
    }, [searchParams, router])

    return null
}
