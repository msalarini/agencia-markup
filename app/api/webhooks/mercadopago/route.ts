import { createClient } from '@/utils/supabase/server'
import { MercadoPagoConfig, Payment } from 'mercadopago'
import { NextResponse } from 'next/server'

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });

export async function POST(request: Request) {
    try {
        const url = new URL(request.url)
        const topic = url.searchParams.get('topic') || url.searchParams.get('type')
        const id = url.searchParams.get('id') || url.searchParams.get('data.id')

        if (topic === 'payment' && id) {
            const payment = new Payment(client)
            const paymentData = await payment.get({ id })

            if (paymentData.status === 'approved') {
                const userId = paymentData.external_reference

                if (userId) {
                    const supabase = createClient()

                    // Update user profile to PRO
                    const { error } = await supabase
                        .from('profiles')
                        .update({ is_pro: true })
                        .eq('id', userId)

                    if (error) {
                        console.error('Error updating profile:', error)
                        return NextResponse.json({ error: 'Database update failed' }, { status: 500 })
                    }

                    console.log(`User ${userId} upgraded to PRO!`)
                }
            }
        }

        return NextResponse.json({ received: true })
    } catch (error) {
        console.error('Webhook Error:', error)
        return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
    }
}
