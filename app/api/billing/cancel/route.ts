import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // In a real app, we would call Mercado Pago API to cancel the subscription here.
        // For this MVP, we just remove the PRO status from the database.

        const { error } = await supabase
            .from('profiles')
            .update({ is_pro: false })
            .eq('id', user.id)

        if (error) {
            console.error('Error cancelling subscription:', error)
            return NextResponse.json({ error: 'Database update failed' }, { status: 500 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Cancel API Error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
