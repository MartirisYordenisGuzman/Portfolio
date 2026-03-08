import { createClient } from "@/lib/supabase/server"
import { ProjectForm } from "@/components/features/admin/ProjectForm"

export default async function NewProjectPage() {
    const supabase = await createClient()
    const { data: tags } = await supabase.from("tags").select("*")

    return (
        <ProjectForm allTags={tags || []} />
    )
}
