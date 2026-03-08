import { createClient } from "@/lib/supabase/server"
import { AdminProjectsList } from "@/components/features/admin/AdminProjectsList"

export default async function AdminProjectsPage() {
    const supabase = await createClient()
    const { data: projects } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false })

    return <AdminProjectsList initialProjects={projects || []} />
}
