import { createClient } from "@/lib/supabase/server"
import { ProjectForm } from "@/components/features/admin/ProjectForm"

export default async function NewProjectPage() {
    const supabase = await createClient()
    const { data: tags } = await supabase.from("tags").select("*")

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Nuevo Proyecto</h2>
            <ProjectForm allTags={tags || []} />
        </div>
    )
}
