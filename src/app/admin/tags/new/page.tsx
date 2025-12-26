import { TagForm } from "@/components/features/admin/TagForm"

export default function NewTagPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Nueva Etiqueta</h1>
                <p className="text-muted-foreground">
                    Crea una nueva etiqueta para clasificar tus proyectos y posts
                </p>
            </div>

            <TagForm />
        </div>
    )
}
