import { createClient } from "@/lib/supabase/server"
import { TagForm } from "@/components/features/admin/TagForm"
import { notFound } from "next/navigation"

interface EditTagPageProps {
    params: Promise<{ id: string }>
}

export default async function EditTagPage({ params }: EditTagPageProps) {
    const { id } = await params
    const supabase = await createClient()

    const { data: tag } = await supabase
        .from("tags")
        .select("*")
        .eq("id", id)
        .single()

    if (!tag) {
        notFound()
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Editar Etiqueta</h1>
                <p className="text-muted-foreground">
                    Modifica los detalles de la etiqueta
                </p>
            </div>

            <TagForm tag={tag} isEditing />
        </div>
    )
}
