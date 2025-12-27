import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { MDXRemote } from "next-mdx-remote/rsc"

import { getPostBySlug, getPosts } from "@/lib/api/posts"
import { Badge } from "@/components/ui/badge"

interface BlogPostPageProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateStaticParams() {
    const posts = await getPosts()
    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params
    const post = await getPostBySlug(slug)

    if (!post) {
        notFound()
    }

    return (
        <article className="min-h-screen pb-20 animate-in fade-in duration-700 slide-in-from-bottom-4 pt-6 md:pt-20">
            {/* Main Reading Column */}
            <div className="container max-w-3xl mx-auto px-4 sm:px-6">

                {/* Back Link */}
                <div className="mb-6 md:mb-10">
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Volver al Blog
                    </Link>
                </div>

                {/* Article Header */}
                <header className="space-y-4 md:space-y-6 mb-8 md:mb-10">
                    <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
                        {post.title}
                    </h1>

                    {post.excerpt && (
                        <p className="text-lg md:text-2xl text-muted-foreground leading-relaxed font-light">
                            {post.excerpt}
                        </p>
                    )}

                    {/* Meta / Author Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-6 border-y gap-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                            {post.published_at && (
                                <div className="flex items-center">
                                    <span className="font-medium text-foreground mr-2">Publicado</span>
                                    <time dateTime={post.published_at}>
                                        {new Date(post.published_at).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </time>
                                </div>
                            )}
                            <span className="hidden sm:inline text-muted-foreground/40">•</span>
                            {post.reading_time_minutes && (
                                <div className="flex items-center gap-2">
                                    <Clock className="h-[10px] w-[10px]" />
                                    <span>{post.reading_time_minutes} min de lectura</span>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Cover Image */}
                {post.cover_image && (
                    <figure className="mb-12 md:mb-16">
                        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted">
                            <Image
                                src={post.cover_image}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <figcaption className="mt-4 text-center text-sm text-muted-foreground italic">
                            {post.title}
                        </figcaption>
                    </figure>
                )}

                {/* Content */}
                <div className="prose prose-base md:prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-primary prose-img:rounded-lg leading-loose">
                    {post.content ? (
                        <MDXRemote source={post.content} />
                    ) : (
                        <p className="italic text-muted-foreground text-center py-10">
                            Sin contenido detallado disponible.
                        </p>
                    )}
                </div>

                {/* Footer Tags */}
                <div className="mt-12 md:mt-16 py-12 border-t">
                    <div className="flex flex-wrap gap-2">
                        {post.tags?.map((tag) => (
                            <Badge key={tag.id} variant="secondary" className="px-3 py-1 text-sm font-normal rounded-full">
                                {tag.name}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>
        </article>
    )
}
