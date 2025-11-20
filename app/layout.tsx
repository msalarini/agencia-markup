import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@/components/Analytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Calculadora de Markup para Agência de Turismo | PricePro',
  description: 'Calcule o preço de venda ideal para seus pacotes turísticos em 30 segundos. Ferramenta gratuita e profissional para agências definirem markup, comissão e lucro líquido.',
  keywords: ['calculadora markup', 'agência de turismo', 'precificação viagens', 'calculadora comissão', 'turismo', 'markup turismo', 'preço pacote turistico'],
  authors: [{ name: 'PricePro' }],
  creator: 'PricePro',
  publisher: 'PricePro',
  metadataBase: new URL('https://pricepro.vercel.app'),
  openGraph: {
    title: 'PricePro - Calculadora de Markup para Agências de Turismo',
    description: 'Defina o preço dos seus pacotes em 30 segundos. Calcule margem, comissão e lucro líquido sem planilhas.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'PricePro',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PricePro - Calculadora de Markup para Turismo',
    description: 'Calcule preços, margem e comissão para seus pacotes turísticos em segundos.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Analytics />
        {children}
      </body>
    </html>
  )
}
