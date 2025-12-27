import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2 } from "lucide-react"
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
                    <p className="text-muted-foreground hidden sm:block">
                        Gestiona las categorías y tecnologías de tu portafolio
                    </p>
                </div>
                <Button asChild>
                    <Link href="/admin/tags/new">
                        <Plus className="mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">Nueva Etiqueta</span>
                        <span className="sm:hidden">Nueva</span>
                    </Link>
                </Button>
            </div>

            {/* Desktop View (Table) */}
            <div className="hidden md:block rounded-md border bg-card">
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

            {/* Mobile View (Cards) */}
            <div className="grid gap-4 md:hidden">
                {tags?.map((tag) => (
                    <Card key={tag.id}>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-bold leading-none">{tag.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-2 text-sm text-muted-foreground">
                            <div className="flex justify-between">
                                <span>Slug:</span>
                                <span>{tag.slug}</span>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2 pt-2">
                            <Link href={`/admin/tags/${tag.id}/edit`}>
                                <Button variant="outline" size="sm" className="gap-2">
                                    <Edit className="h-4 w-4" />
                                    Editar
                                </Button>
                            </Link>
                            <form action={async () => {
                                "use server"
                                await deleteTag(tag.id)
                            }}>
                                <Button variant="destructive" size="sm" className="gap-2">
                                    <Trash2 className="h-4 w-4" />
                                    Eliminar
                                </Button>
                            </form>
                        </CardFooter>
                    </Card>
                ))}
                {tags?.length === 0 && (
                    <div className="p-4 text-center text-muted-foreground border rounded-md">
                        No hay etiquetas creadas.
                    </div>
                )}
            </div>
        </div>
    )
}
