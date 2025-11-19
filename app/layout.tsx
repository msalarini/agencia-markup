import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Calculadora de Markup para Agência de Turismo | PricePro',
  description: 'Calcule o preço de venda ideal para seus pacotes turísticos. Ferramenta gratuita para agências de viagens definirem markup, comissão e lucro.',
  keywords: ['calculadora markup', 'agência de turismo', 'precificação viagens', 'calculadora comissão', 'turismo'],
  openGraph: {
    title: 'Calculadora de Markup para Agência de Turismo | PricePro',
    description: 'Defina o preço dos seus pacotes em 30 segundos. Calcule margem, comissão e lucro líquido.',
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
