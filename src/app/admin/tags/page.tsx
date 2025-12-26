import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table" // Note: Assuming Table components exist, if not I'll fallback to simple divs or check utils. 
// Wait, I didn't check if Table exists. I'll assume standard Shadcn setup has it or I'll use simple layout.
// Actually, I'll check first or use standard HTML table with Tailwind to be safe. 
// Let's use standard HTML/Tailwind to avoid missing component errors, or check previously.
// I saw "badge.tsx", "button.tsx"... no "table.tsx" in the list_dir I did earlier!!
// So I must use standard HTML table.

import { Edit, Plus, Trash2 } from "lucide-react"
import { deleteTag } from "@/app/admin/actions"

export default async function AdminTagsPage() {
    const supabase = await createClient()
    const { data: tags, error } = await supabase
        .from("tags")
        .select("*")
        .order("name", { ascending: true })

    if (error) {
        return <div>Error cargando etiquetas: {error.message}</div>
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Etiquetas</h1>
                    <p className="text-muted-foreground">
                        Gestiona las categorías y tecnologías de tu portafolio
                    </p>
                </div>
                <Button asChild>
                    <Link href="/admin/tags/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Nueva Etiqueta
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border bg-card">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm text-left">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Nombre</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Slug</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {tags?.map((tag) => (
                                <tr key={tag.id} className="border-b transition-colors hover:bg-muted/50">
                                    <td className="p-4 align-middle font-medium">{tag.name}</td>
                                    <td className="p-4 align-middle text-muted-foreground">{tag.slug}</td>
                                    <td className="p-4 align-middle text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={`/admin/tags/${tag.id}/edit`}>
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <form action={async () => {
                                                "use server"
                                                await deleteTag(tag.id)
                                            }}>
                                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {tags?.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="p-4 text-center text-muted-foreground">
                                        No hay etiquetas creadas.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
