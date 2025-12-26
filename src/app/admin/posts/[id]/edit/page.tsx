import { createClient } from "@/lib/supabase/server"
import { PostForm } from "@/components/features/admin/PostForm"
import { notFound } from "next/navigation"

interface EditPostPageProps {
    params: {
        id: string
    }
}

export default async function EditPostPage({ params }: EditPostPageProps) {
    const { id } = await params

    const supabase = await createClient()

    // Fetch post with tags
    const { data: post } = await supabase
        .from("posts")
        .select(`
            *,
            post_tags (
                tags (*)
            )
        `)
        .eq("id", id)
        .single()

    // Fetch all available tags
    const { data: tags } = await supabase.from("tags").select("*")

    if (!post) {
        return notFound()
    }

    // Transform post tags
    const postWithTags = {
        ...post,
        tags: post.post_tags?.map((pt: any) => pt.tags) || []
    }

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Editar Post</h2>
            <PostForm post={postWithTags} isEditing allTags={tags || []} />
        </div>
    )
}
