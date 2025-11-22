'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { FileDown, Loader2 } from 'lucide-react'
import { generateReportPDF } from '@/lib/pdf/generateReportPDF'
import { toast } from 'sonner'

interface ReportExportProps {
    stats?: any
}

export function ReportExport({ stats }: ReportExportProps) {
    const [loading, setLoading] = useState(false)

    const handleExport = async () => {
        setLoading(true)
        try {
            // Fetch fresh data to ensure we have history as well
            const [statsRes, historyRes] = await Promise.all([
                fetch('/api/calculations/stats'),
                fetch('/api/calculations?limit=20')
            ])

            const statsData = await statsRes.json()
            const historyData = await historyRes.json()

            const reportData = {
                metrics: statsData.metrics,
                evolution: statsData.evolution,
                history: historyData.calculations.map((c: any) => ({
                    date: c.created_at,
                    packageName: c.package_name,
                    finalPrice: c.final_price,
                    profit: c.profit,
                    currency: c.currency
                }))
            }

            await generateReportPDF(reportData)
        } catch (error) {
            console.error('Erro ao exportar relatório:', error)
            toast.error('Erro ao exportar relatório. Tente novamente.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button
            variant="outline"
            onClick={handleExport}
            disabled={loading}
            className="gap-2 w-full md:w-auto"
        >
            {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <FileDown className="h-4 w-4" />
            )}
            Exportar Relatório
        </Button>
    )
}
