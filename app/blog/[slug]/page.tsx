import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getAllPosts, getPostBySlug } from '@/lib/blog/loader'

export async function generateStaticParams() {
    return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const post = getPostBySlug(slug)
    if (!post) return {}
    return {
        title: post.title,
        description: post.excerpt,
    }
}

export default async function PostPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const post = getPostBySlug(slug)

    if (!post) notFound()

    return (
        <article className="mx-auto max-w-6xl px-6 py-16">
            <Link
                href="/blog"
                className="text-xs text-neutral-500 hover:text-neutral-300"
            >
                ← Back to all posts
            </Link>

            <header className="mt-6 mb-10">
                <time className="text-xs text-neutral-500">{post.date}</time>
                <h1 className="mt-1 text-3xl font-semibold">{post.title}</h1>
                {post.tags.length > 0 && (
                    <div className="mt-3 flex gap-2">
                        {post.tags.map((t) => (
                            <span
                                key={t}
                                className="rounded-md bg-neutral-800 px-2 py-0.5 text-xs text-neutral-300"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                )}
            </header>

            <div className="prose prose-invert max-w-none prose-headings:font-semibold prose-a:text-blue-400 prose-code:text-cyan-400 prose-pre:bg-neutral-900">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
            </div>
        </article>
    )
}