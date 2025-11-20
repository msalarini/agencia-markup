import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export interface PDFData {
    packageName: string
    cost: number
    taxes: number
    markup: number
    finalPrice: number
    suggestions?: {
        tipo: string
        markup: number
        precoVenda: number
        justificativa: string
    }[]
    currency?: string
}

export const generatePDF = async (data: PDFData, template: 'simple' | 'detailed' | 'professional' = 'simple'): Promise<void> => {
    const pdf = new jsPDF('p', 'mm', 'a4')

    // Configurações
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = 20
    let yPosition = margin

    // Header
    pdf.setFontSize(24)
    pdf.setTextColor(59, 130, 246) // primary blue
    pdf.text('LucroTur', margin, yPosition)

    pdf.setFontSize(10)
    pdf.setTextColor(100, 100, 100)
    pdf.text('Orçamento Profissional', margin, yPosition + 7)

    yPosition += 20

    // Linha separadora
    pdf.setDrawColor(200, 200, 200)
    pdf.line(margin, yPosition, pageWidth - margin, yPosition)
    yPosition += 10

    // Informações do Pacote
    pdf.setFontSize(16)
    pdf.setTextColor(0, 0, 0)
    pdf.text('Detalhes do Pacote', margin, yPosition)
    yPosition += 10

    pdf.setFontSize(12)
    pdf.setTextColor(60, 60, 60)

    if (data.packageName) {
        pdf.text(`Pacote: ${data.packageName}`, margin, yPosition)
        yPosition += 7
    }

    pdf.text(`Custo Base: ${formatCurrency(data.cost, data.currency)}`, margin, yPosition)
    yPosition += 7

    pdf.text(`Taxas: ${formatCurrency(data.taxes, data.currency)}`, margin, yPosition)
    yPosition += 7

    pdf.text(`Markup: ${data.markup}%`, margin, yPosition)
    yPosition += 10

    // Linha separadora
    pdf.setDrawColor(200, 200, 200)
    pdf.line(margin, yPosition, pageWidth - margin, yPosition)
    yPosition += 10

    // Preço Final (destaque)
    pdf.setFontSize(18)
    pdf.setTextColor(34, 197, 94) // green
    pdf.text('Preço Final', margin, yPosition)

    pdf.setFontSize(24)
    pdf.setFont('helvetica', 'bold')
    pdf.text(formatCurrency(data.finalPrice, data.currency), margin, yPosition + 10)
    pdf.setFont('helvetica', 'normal')
    yPosition += 25

    // Sugestões de IA (se houver)
    if (template !== 'simple' && data.suggestions && data.suggestions.length > 0) {
        pdf.setFontSize(16)
        pdf.setTextColor(0, 0, 0)
        pdf.text('Sugestões da IA', margin, yPosition)
        yPosition += 10

        data.suggestions.forEach((sug, idx) => {
            if (yPosition > pageHeight - 40) {
                pdf.addPage()
                yPosition = margin
            }

            pdf.setFontSize(12)
            pdf.setTextColor(100, 100, 100)
            pdf.text(`${idx + 1}. ${sug.tipo.toUpperCase()}`, margin, yPosition)
            yPosition += 7

            pdf.setFontSize(10)
            pdf.text(`Markup: ${sug.markup}% | Preço: ${formatCurrency(sug.precoVenda, data.currency)}`, margin + 5, yPosition)
            yPosition += 5

            const lines = pdf.splitTextToSize(sug.justificativa, pageWidth - margin * 2 - 5)
            pdf.text(lines, margin + 5, yPosition)
            yPosition += lines.length * 5 + 5
        })
    }

    // Footer
    const footerY = pageHeight - 15
    pdf.setFontSize(8)
    pdf.setTextColor(150, 150, 150)
    pdf.text('Gerado por LucroTur PRO', margin, footerY)
    pdf.text(new Date().toLocaleDateString('pt-BR'), pageWidth - margin - 30, footerY)

    // Download
    const fileName = `orcamento-${data.packageName || 'pacote'}-${Date.now()}.pdf`
    pdf.save(fileName)
}

const formatCurrency = (value: number, currency: string = 'BRL'): string => {
    const currencySymbols: Record<string, string> = {
        BRL: 'R$',
        USD: '$',
        EUR: '€',
        ARS: '$'
    }

    return `${currencySymbols[currency] || 'R$'} ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}
