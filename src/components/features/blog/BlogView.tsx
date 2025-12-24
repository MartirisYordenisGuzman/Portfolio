"use client"

import { Post } from "@/types/database"
import { BlogList } from "@/components/features/blog/BlogList"
import { useLanguage } from "@/providers/language-provider"

interface BlogViewProps {
    posts: Post[]
}

export function BlogView({ posts }: BlogViewProps) {
    const { t } = useLanguage()

    return (
        <div className="mx-auto w-full max-w-[85vw] py-8 md:py-10">
            <div className="flex flex-col items-start gap-4 pb-8 text-left">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        {t.blog.title}
                    </h1>
                    <p className="text-muted-foreground">
                        {t.blog.description}
                    </p>
                </div>
            </div>
            <BlogList initialPosts={posts} />
        </div>
    )
}
