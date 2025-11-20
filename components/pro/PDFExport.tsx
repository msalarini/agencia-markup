'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { FileDown, Loader2 } from 'lucide-react'
import { generatePDF, PDFData } from '@/lib/pdf/generatePDF'
import { useProStatus } from '@/hooks/useProStatus'
import { ProLock } from './ProLock'

interface PDFExportProps {
    data: PDFData
    template?: 'simple' | 'detailed' | 'professional'
    variant?: 'default' | 'outline' | 'ghost'
    size?: 'default' | 'sm' | 'lg'
}

export const PDFExport = ({ data, template = 'simple', variant = 'default', size = 'default' }: PDFExportProps) => {
    const [isGenerating, setIsGenerating] = useState(false)
    const { isPro } = useProStatus()

    const handleExport = async () => {
        setIsGenerating(true)
        try {
            await generatePDF(data, template)
        } catch (error) {
            console.error('Erro ao gerar PDF:', error)
            alert('Erro ao gerar PDF. Tente novamente.')
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <ProLock>
            <Button
                onClick={handleExport}
                disabled={isGenerating}
                variant={variant}
                size={size}
                className="w-full"
            >
                {isGenerating ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Gerando PDF...
                    </>
                ) : (
                    <>
                        <FileDown className="mr-2 h-4 w-4" />
                        Exportar PDF
                    </>
                )}
            </Button>
        </ProLock>
    )
}
