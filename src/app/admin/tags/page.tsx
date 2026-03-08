import { createClient } from "@/lib/supabase/server"
import { AdminTagsList } from "@/components/features/admin/AdminTagsList"

export default async function AdminTagsPage() {
    const supabase = await createClient()
    const { data: tags, error } = await supabase
        .from("tags")
        .select("*")
        .order("name", { ascending: true })

    if (error) {
        return <div>Error cargando etiquetas: {error.message}</div>
    }

    return <AdminTagsList initialTags={tags || []} />
}
