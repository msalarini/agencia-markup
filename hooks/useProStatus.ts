'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase/client'

export const useProStatus = () => {
    const [isPro, setIsPro] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkProStatus = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setIsPro(user?.user_metadata?.is_pro === true)
            setLoading(false)
        }

        checkProStatus()

        const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
            checkProStatus()
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    return {
        isPro,
        loading
    }
}
