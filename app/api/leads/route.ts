import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json(
                { error: 'Email inválido' },
                { status: 400 }
            );
        }

        const GOOGLE_SHEET_URL = process.env.GOOGLE_SHEET_WEBHOOK_URL;

        if (GOOGLE_SHEET_URL) {
            await fetch(GOOGLE_SHEET_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    timestamp: new Date().toISOString(),
                    source: 'PricePro Lead Capture',
                }),
            });
        }

        return NextResponse.json(
            { success: true, message: 'Email registrado com sucesso!' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Erro ao salvar lead:', error);
        return NextResponse.json(
            { error: 'Erro ao processar requisição' },
            { status: 500 }
        );
    }
}
