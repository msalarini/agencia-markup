'use client'

import { Button } from '@/components/ui/button'
import { MessageCircle, Mail } from 'lucide-react'
import { formatCurrencyValue, type CurrencyCode } from '@/lib/currency/converter'

interface ShareButtonsProps {
    packageName: string
    finalPrice: number
    currency: CurrencyCode
    items?: {
        label: string
        value: string
    }[]
}

export function ShareButtons({ packageName, finalPrice, currency, items = [] }: ShareButtonsProps) {

    const getFormattedText = () => {
        const priceFormatted = formatCurrencyValue(finalPrice, currency)
        let text = `*Orçamento: ${packageName || 'Pacote Turístico'}*\n\n`
        text += `Valor Final: *${priceFormatted}*\n\n`

        if (items.length > 0) {
            text += `Detalhes:\n`
            items.forEach(item => {
                text += `- ${item.label}: ${item.value}\n`
            })
        }

        text += `\n_Gerado por LucroTur_`
        return text
    }

    const handleWhatsApp = () => {
        const text = getFormattedText()
        const url = `https://wa.me/?text=${encodeURIComponent(text)}`
        window.open(url, '_blank')
    }

    const handleEmail = () => {
        const text = getFormattedText()
        const subject = `Orçamento: ${packageName || 'Pacote Turístico'}`
        const body = text.replace(/\*/g, '').replace(/_/g, '') // Remove markdown for email
        const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        window.open(url, '_blank')
    }

    return (
        <div className="flex gap-2 mt-4">
            <Button
                onClick={handleWhatsApp}
                className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white"
                variant="default"
            >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
            </Button>
            <Button
                onClick={handleEmail}
                className="flex-1"
                variant="outline"
            >
                <Mail className="w-4 h-4 mr-2" />
                Email
            </Button>
        </div>
    )
}
