import { TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface LogoProps {
    className?: string
    size?: "sm" | "md" | "lg"
    showText?: boolean
    showSubtitle?: boolean
}

export function Logo({ className, size = "md", showText = true, showSubtitle = false }: LogoProps) {
    const sizeClasses = {
        sm: {
            container: "p-1 rounded-lg",
            icon: "h-4 w-4",
            text: "text-lg",
            gap: "gap-2"
        },
        md: {
            container: "p-1.5 rounded-lg",
            icon: "h-5 w-5",
            text: "text-xl",
            gap: "gap-2"
        },
        lg: {
            container: "p-3 rounded-xl",
            icon: "h-10 w-10",
            text: "text-3xl sm:text-4xl",
            gap: "gap-4"
        }
    }

    const currentSize = sizeClasses[size]

    return (
        <div className={cn("flex items-center", currentSize.gap, className)}>
            <div className={cn("bg-primary text-primary-foreground flex items-center justify-center", currentSize.container)}>
                <TrendingUp className={currentSize.icon} />
            </div>
            {showText && (
                <div className="flex flex-col">
                    <span className={cn("font-bold tracking-tight text-foreground leading-none", currentSize.text)}>
                        LucroTur
                    </span>
                    {showSubtitle && (
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mt-1">
                            Gestão de Lucro para Turismo
                        </span>
                    )}
                </div>
            )}
        </div>
    )
}
