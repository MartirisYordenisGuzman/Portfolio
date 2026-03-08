import { createClient } from "@/lib/supabase/server"
import { AdminPostsList } from "@/components/features/admin/AdminPostsList"

export default async function AdminPostsPage() {
    const supabase = await createClient()
    const { data: posts } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false })

    return <AdminPostsList initialPosts={posts || []} />
}
