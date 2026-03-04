"use client"

import { Post } from "@/types/database"
import { BlogList } from "@/components/features/blog/BlogList"

interface BlogViewProps {
    posts: Post[]
}

export function BlogView({ posts }: BlogViewProps) {

    return (
        <div className="mx-auto w-full max-w-[85vw] py-8 md:py-10">
            <div className="flex flex-col items-start gap-4 pb-8 text-left">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Blog Técnico
                    </h1>
                    <p className="text-muted-foreground">
                        Pensamientos sobre desarrollo de software, arquitectura y buenas prácticas.
                    </p>
                </div>
            </div>
            <BlogList initialPosts={posts} />
        </div>
    )
}
