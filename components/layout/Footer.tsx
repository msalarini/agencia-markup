import Link from "next/link"

export function Footer() {
    return (
        <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0 px-4 md:px-8">
                <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        &copy; {new Date().getFullYear()} LucroTur. Todos os direitos reservados.
                    </p>
                </div>
                <div className="flex gap-4 text-sm text-muted-foreground">
                    <Link href="/legal/terms" className="hover:underline underline-offset-4">
                        Termos de Uso
                    </Link>
                    <Link href="/legal/privacy" className="hover:underline underline-offset-4">
                        Privacidade
                    </Link>
                    <a href="mailto:suporte@lucrotur.com.br" className="hover:underline underline-offset-4">
                        Contato
                    </a>
                </div>
            </div>
        </footer>
    )
}
