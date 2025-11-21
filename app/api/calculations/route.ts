import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export interface Calculation {
    id: string
    user_id: string
    created_at: string
    package_name: string
    cost: number
    taxes: number
    markup: number
    commission: number
    final_price: number
    profit: number
    currency: string
    status: 'draft' | 'sent' | 'approved' | 'rejected'
    metadata?: Record<string, any>
}

// GET - Lista cálculos do usuário
export async function GET(request: NextRequest) {
    try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const limit = parseInt(searchParams.get('limit') || '20')
        const offset = parseInt(searchParams.get('offset') || '0')
        const status = searchParams.get('status')
        const currency = searchParams.get('currency')

        let query = supabase
            .from('calculations')
            .select('*', { count: 'exact' })
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1)

        if (status) {
            query = query.eq('status', status)
        }

        if (currency) {
            query = query.eq('currency', currency)
        }

        const { data, error, count } = await query

        if (error) {
            console.error('Erro ao buscar cálculos:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({
            calculations: data,
            total: count,
            limit,
            offset
        })
    } catch (error) {
        console.error('Erro:', error)
        return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
    }
}

// POST - Cria novo cálculo
export async function POST(request: NextRequest) {
    try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
        }

        const body = await request.json()

        const { data, error } = await supabase
            .from('calculations')
            .insert({
                user_id: user.id,
                package_name: body.package_name,
                cost: body.cost,
                taxes: body.taxes || 0,
                markup: body.markup,
                commission: body.commission || 0,
                final_price: body.final_price,
                profit: body.profit,
                currency: body.currency || 'BRL',
                status: body.status || 'draft',
                metadata: body.metadata || {}
            })
            .select()
            .single()

        if (error) {
            console.error('Erro ao criar cálculo:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ calculation: data }, { status: 201 })
    } catch (error) {
        console.error('Erro:', error)
        return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
    }
}

// PUT - Atualiza cálculo
export async function PUT(request: NextRequest) {
    try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
        }

        const body = await request.json()
        const { id, ...updates } = body

        const { data, error } = await supabase
            .from('calculations')
            .update(updates)
            .eq('id', id)
            .eq('user_id', user.id)
            .select()
            .single()

        if (error) {
            console.error('Erro ao atualizar cálculo:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ calculation: data })
    } catch (error) {
        console.error('Erro:', error)
        return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
    }
}

// DELETE - Deleta cálculo
export async function DELETE(request: NextRequest) {
    try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json({ error: 'ID não fornecido' }, { status: 400 })
        }

        const { error } = await supabase
            .from('calculations')
            .delete()
            .eq('id', id)
            .eq('user_id', user.id)

        if (error) {
            console.error('Erro ao deletar cálculo:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Erro:', error)
        return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
    }
}
