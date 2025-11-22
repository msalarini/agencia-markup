import { createClient } from '@/utils/supabase/server'
import { MercadoPagoConfig, Preference } from 'mercadopago'
import { NextResponse } from 'next/server'

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });

export async function POST(request: Request) {
    try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const preference = new Preference(client);

        const response = await preference.create({
            body: {
                items: [
                    {
                        id: 'pro_subscription',
                        title: 'PricePro - Plano PRO',
                        quantity: 1,
                        unit_price: 10.00,
                        currency_id: 'BRL',
                    }
                ],
                payer: {
                    email: user.email!,
                },
                external_reference: user.id, // IMPORTANT: We use this to identify the user in the webhook
                back_urls: {
                    success: `${process.env.NEXT_PUBLIC_BASE_URL}/?success=true`,
                    failure: `${process.env.NEXT_PUBLIC_BASE_URL}/?error=true`,
                    pending: `${process.env.NEXT_PUBLIC_BASE_URL}/?pending=true`,
                },
                auto_return: 'approved',
            }
        });

        return NextResponse.json({ url: response.init_point })
    } catch (error) {
        console.error('Mercado Pago Error:', error)
        return NextResponse.json({ error: 'Error creating preference' }, { status: 500 })
    }
}
