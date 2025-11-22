import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@/components/Analytics'
import { AuthProvider } from '@/components/providers/AuthProvider'
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LucroTur - Calculadora de Markup para Agências de Turismo',
  description: 'Calcule o preço de venda ideal para seus pacotes turísticos em 30 segundos. Ferramenta profissional para agências definirem markup, comissão e lucro líquido.',
  keywords: ['calculadora markup', 'agência de turismo', 'precificação viagens', 'calculadora comissão', 'turismo', 'markup turismo', 'preço pacote turistico', 'lucrotur'],
  authors: [{ name: 'LucroTur' }],
  creator: 'LucroTur',
  publisher: 'LucroTur',
  metadataBase: new URL('https://lucrotur.com.br'),
  openGraph: {
    title: 'LucroTur - Calculadora de Markup para Agências de Turismo',
    description: 'Defina o preço dos seus pacotes em 30 segundos. Calcule margem, comissão e lucro líquido sem planilhas.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'LucroTur',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LucroTur - Calculadora de Markup para Turismo',
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
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <Analytics />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'LucroTur',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'BRL',
              },
              description: 'Calculadora de Markup para Agências de Turismo. Defina o preço de venda ideal para seus pacotes.',
            }),
          }}
        />
      </body>
    </html>
  )
}
