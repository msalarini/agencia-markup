import jsPDF from 'jspdf'
import { formatCurrencyValue } from '@/lib/currency/converter'

interface ReportData {
    metrics: {
        totalCalculations: number
        totalRevenue: number
        totalProfit: number
        averageMarkup: number
        conversionRate: number
        averageTicket: number
    }
    evolution: Array<{
        month: string
        count: number
        revenue: number
    }>
    history: Array<{
        date: string
        packageName: string
        finalPrice: number
        profit: number
        currency: string
    }>
}

export const generateReportPDF = async (data: ReportData): Promise<void> => {
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = 20
    let yPosition = margin

    // Helper to check page break
    const checkPageBreak = (heightNeeded: number) => {
        if (yPosition + heightNeeded > pageHeight - margin) {
            pdf.addPage()
            yPosition = margin
        }
    }

    // Header
    pdf.setFontSize(24)
    pdf.setTextColor(59, 130, 246) // primary blue
    pdf.text('LucroTur PRO', margin, yPosition)

    pdf.setFontSize(10)
    pdf.setTextColor(100, 100, 100)
    pdf.text('Relatório de Performance', margin, yPosition + 7)

    yPosition += 20

    // Linha separadora
    pdf.setDrawColor(200, 200, 200)
    pdf.line(margin, yPosition, pageWidth - margin, yPosition)
    yPosition += 15

    // Métricas Principais
    pdf.setFontSize(16)
    pdf.setTextColor(0, 0, 0)
    pdf.text('Resumo Geral', margin, yPosition)
    yPosition += 10

    const metrics = [
        { label: 'Total de Cálculos', value: data.metrics.totalCalculations.toString() },
        { label: 'Receita Total', value: formatCurrencyValue(data.metrics.totalRevenue, 'BRL') },
        { label: 'Lucro Total', value: formatCurrencyValue(data.metrics.totalProfit, 'BRL') },
        { label: 'Ticket Médio', value: formatCurrencyValue(data.metrics.averageTicket, 'BRL') },
        { label: 'Markup Médio', value: `${data.metrics.averageMarkup.toFixed(1)}%` },
        { label: 'Taxa de Conversão', value: `${data.metrics.conversionRate.toFixed(1)}%` },
    ]

    // Grid de Métricas (2 colunas)
    pdf.setFontSize(12)
    metrics.forEach((metric, index) => {
        const col = index % 2
        const x = margin + (col * (pageWidth - margin * 2) / 2)

        pdf.setTextColor(100, 100, 100)
        pdf.text(metric.label, x, yPosition)

        pdf.setTextColor(0, 0, 0)
        pdf.setFont('helvetica', 'bold')
        pdf.text(metric.value, x, yPosition + 6)
        pdf.setFont('helvetica', 'normal')

        if (col === 1) yPosition += 15
    })

    if (metrics.length % 2 !== 0) yPosition += 15
    yPosition += 5

    // Evolução Mensal
    checkPageBreak(60)
    pdf.setFontSize(16)
    pdf.setTextColor(0, 0, 0)
    pdf.text('Evolução Mensal', margin, yPosition)
    yPosition += 10

    // Tabela Simples de Evolução
    pdf.setFontSize(10)
    pdf.setFillColor(240, 240, 240)
    pdf.rect(margin, yPosition, pageWidth - margin * 2, 8, 'F')
    pdf.setTextColor(0, 0, 0)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Mês', margin + 5, yPosition + 6)
    pdf.text('Cálculos', margin + 60, yPosition + 6)
    pdf.text('Receita Estimada', margin + 120, yPosition + 6)
    yPosition += 10

    pdf.setFont('helvetica', 'normal')
    data.evolution.forEach((item, index) => {
        checkPageBreak(10)
        if (index % 2 === 0) {
            pdf.setFillColor(250, 250, 250)
            pdf.rect(margin, yPosition - 4, pageWidth - margin * 2, 8, 'F')
        }

        pdf.text(item.month, margin + 5, yPosition + 2)
        pdf.text(item.count.toString(), margin + 60, yPosition + 2)
        pdf.text(formatCurrencyValue(item.revenue, 'BRL'), margin + 120, yPosition + 2)
        yPosition += 8
    })
    yPosition += 15

    // Histórico Recente
    checkPageBreak(60)
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Últimos Cálculos', margin, yPosition)
    yPosition += 10

    // Header Tabela Histórico
    pdf.setFontSize(9)
    pdf.setFillColor(240, 240, 240)
    pdf.rect(margin, yPosition, pageWidth - margin * 2, 8, 'F')
    pdf.text('Data', margin + 5, yPosition + 6)
    pdf.text('Pacote', margin + 40, yPosition + 6)
    pdf.text('Preço Final', margin + 110, yPosition + 6)
    pdf.text('Lucro', margin + 150, yPosition + 6)
    yPosition += 10

    // Rows Histórico
    pdf.setFont('helvetica', 'normal')
    data.history.forEach((item, index) => {
        checkPageBreak(10)
        if (index % 2 === 0) {
            pdf.setFillColor(250, 250, 250)
            pdf.rect(margin, yPosition - 4, pageWidth - margin * 2, 8, 'F')
        }

        pdf.text(new Date(item.date).toLocaleDateString('pt-BR'), margin + 5, yPosition + 2)

        // Truncate package name if too long
        let packageName = item.packageName || 'Sem nome'
        if (packageName.length > 35) packageName = packageName.substring(0, 32) + '...'
        pdf.text(packageName, margin + 40, yPosition + 2)

        pdf.text(formatCurrencyValue(item.finalPrice, item.currency as any), margin + 110, yPosition + 2)

        pdf.setTextColor(22, 163, 74) // green-600
        pdf.text(formatCurrencyValue(item.profit, item.currency as any), margin + 150, yPosition + 2)
        pdf.setTextColor(0, 0, 0)

        yPosition += 8
    })

    // Footer
    const footerY = pageHeight - 10
    pdf.setFontSize(8)
    pdf.setTextColor(150, 150, 150)
    pdf.text('Gerado por LucroTur PRO', margin, footerY)
    pdf.text(new Date().toLocaleDateString('pt-BR'), pageWidth - margin - 20, footerY)

    // Save
    pdf.save(`relatorio-lucrotur-${new Date().toISOString().split('T')[0]}.pdf`)
}
