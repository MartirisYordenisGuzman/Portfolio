import { createClient } from "@/lib/supabase/server"
import { ProjectForm } from "@/components/features/admin/ProjectForm"
import { notFound } from "next/navigation"

interface EditProjectPageProps {
    params: {
        id: string
    }
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
    // In Next.js 15 params might need awaiting but for now let's try direct access or await if needed
    // Actually per Next 15 params promise, we should await params if possible or just use it.
    // Let's assume standard behavior for now.

    // params is a promise in recent canary, but might be object in stable 14/15 depending. 
    // To be safe in newer versions:
    const { id } = await params

    const supabase = await createClient()

    // Fetch project with tags
    const { data: project } = await supabase
        .from("projects")
        .select(`
            *,
            project_tags (
                tags (*)
            )
        `)
        .eq("id", id)
        .single()

    // Fetch all available tags
    const { data: tags } = await supabase.from("tags").select("*")

    if (!project) {
        return notFound()
    }

    // Transform project tags to flattened structure expected by form
    const projectWithTags = {
        ...project,
        tags: project.project_tags?.map((pt: any) => pt.tags) || []
    }

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Editar Proyecto</h2>
            <ProjectForm project={projectWithTags} isEditing allTags={tags || []} />
        </div>
    )
}
