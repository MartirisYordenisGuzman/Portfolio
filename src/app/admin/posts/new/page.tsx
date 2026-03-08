import { createClient } from "@/lib/supabase/server"
import { PostForm } from "@/components/features/admin/PostForm"

export default async function NewPostPage() {
    const supabase = await createClient()
    const { data: tags } = await supabase.from("tags").select("*")

    return (
        <PostForm allTags={tags || []} />
    )
}
