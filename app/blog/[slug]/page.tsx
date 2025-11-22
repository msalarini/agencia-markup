import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import ReactMarkdown from 'react-markdown'
import { Calendar, User, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { Metadata } from 'next'

interface Props {
    params: {
        slug: string
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = getPostBySlug(params.slug)

    if (!post) {
        return {
            title: 'Artigo não encontrado',
        }
    }

    return {
        title: `${post.title} | Blog LucroTur`,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            type: 'article',
            publishedTime: post.date,
            authors: [post.author],
        },
    }
}

export async function generateStaticParams() {
    const posts = getAllPosts()
    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export default function BlogPost({ params }: Props) {
    const post = getPostBySlug(params.slug)

    if (!post) {
        notFound()
    }

    return (
        <article className="container mx-auto px-4 py-12 max-w-3xl">
            <Link
                href="/blog"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-blue-600 mb-8 transition-colors"
            >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Voltar para o blog
            </Link>

            <header className="mb-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
                    {post.title}
                </h1>

                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={post.date}>
                            {new Date(post.date + 'T00:00:00').toLocaleDateString('pt-BR')}
                        </time>
                    </div>
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                    </div>
                </div>
            </header>

            <div className="prose prose-blue dark:prose-invert max-w-none">
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
        </article>
    )
}
