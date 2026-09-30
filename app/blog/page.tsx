import Link from 'next/link'
import { getAllPosts } from '@/lib/blog/loader'

export const metadata = {
    title: 'Blog',
}

export default function BlogIndex() {
    const posts = getAllPosts()

    return (
        <div className="mx-auto max-w-6xl px-6 py-6 space-y-6">
            <header>
                <h1 className="text-3xl font-semibold">Build in Public</h1>
                <p className="mt-2 text-sm text-neutral-400">
                    Notes from building next-supabase-saas.
                </p>
            </header>

            {posts.length === 0 ? (
                <p className="text-neutral-500">No posts yet.</p>
            ) : (
                <ul className="space-y-8">
                    {posts.map((post) => (
                        <li key={post.slug}>
                            <Link href={`/blog/${post.slug}`} className="block group">
                                <time className="text-xs text-neutral-500">{post.date}</time>
                                <h2 className="mt-1 text-xl font-medium group-hover:underline">
                                    {post.title}
                                </h2>
                                <p className="mt-1 text-sm text-neutral-400">{post.excerpt}</p>
                                {post.tags.length > 0 && (
                                    <div className="mt-2 flex gap-2">
                                        {post.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded bg-neutral-800 px-2 py-0.5 text-xs text-neutral-400"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}