import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from 'lucide-react'

export const metadata = {
    title: 'Blog | LucroTur',
    description: 'Dicas e estratégias sobre precificação e gestão para agências de turismo.',
}

export default function BlogPage() {
    const posts = getAllPosts()

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Blog LucroTur</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Conteúdo especializado para ajudar sua agência a vender mais e lucrar melhor.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                        <Card className="h-full transition-all hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800">
                            <CardHeader>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                    <Calendar className="w-4 h-4" />
                                    <time dateTime={post.date}>
                                        {new Date(post.date + 'T00:00:00').toLocaleDateString('pt-BR')}
                                    </time>
                                </div>
                                <CardTitle className="group-hover:text-blue-600 transition-colors line-clamp-2">
                                    {post.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground line-clamp-3">
                                    {post.description}
                                </p>
                                <span className="inline-block mt-4 text-sm font-medium text-blue-600 group-hover:underline">
                                    Ler artigo completo →
                                </span>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}
