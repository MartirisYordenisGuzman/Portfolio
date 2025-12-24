import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { MDXRemote } from "next-mdx-remote/rsc"

import { MOCK_POSTS } from "@/lib/dummy-blog"
import { Badge } from "@/components/ui/badge"

interface BlogPostPageProps {
    params: {
        slug: string
    }
}

export function generateStaticParams() {
    return MOCK_POSTS.map((post) => ({
        slug: post.slug,
    }))
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
    const post = MOCK_POSTS.find((p) => p.slug === params.slug)

    if (!post) {
        notFound()
    }

    return (
        <article className="container max-w-3xl py-6 lg:py-12">
            <div className="mb-8">
                <Link
                    href="/blog"
                    className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver al Blog
                </Link>
            </div>

            <header className="mb-8 space-y-4">
                <div className="flex flex-wrap gap-2">
                    {post.tags?.map((tag) => (
                        <Badge key={tag.id} variant="secondary">
                            {tag.name}
                        </Badge>
                    ))}
                </div>
                <h1 className="font-heading text-3xl font-bold leading-tight lg:text-5xl">
                    {post.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <time dateTime={post.published_at || ""}>
                            {new Date(post.published_at!).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </time>
                    </div>
                    {post.reading_time_minutes && (
                        <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{post.reading_time_minutes} min lectura</span>
                        </div>
                    )}
                </div>
            </header>

            {post.cover_image && (
                <div className="mb-8 aspect-video w-full overflow-hidden rounded-lg bg-muted">
                    <img
                        src={post.cover_image}
                        alt={post.title}
                        className="h-full w-full object-cover"
                    />
                </div>
            )}

            <div className="prose prose-lg dark:prose-invert max-w-none">
                {post.content && (
                    <MDXRemote source={post.content} />
                )}
            </div>
        </article>
    )
}
