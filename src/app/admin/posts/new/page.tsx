import { createClient } from "@/lib/supabase/server"
import { PostForm } from "@/components/features/admin/PostForm"

export default async function NewPostPage() {
    const supabase = await createClient()
    const { data: tags } = await supabase.from("tags").select("*")

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Nuevo Post</h2>
            <PostForm allTags={tags || []} />
        </div>
    )
}
