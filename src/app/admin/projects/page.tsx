import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { PlusCircle, Pencil, Trash2, ExternalLink } from "lucide-react"
import { deleteProject } from "@/app/admin/actions"

export default async function AdminProjectsPage() {
    const supabase = await createClient()
    const { data: projects } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Proyectos</h2>
                <Link href="/admin/projects/new">
                    <Button className="gap-2">
                        <PlusCircle className="h-4 w-4" />
                        Nuevo Proyecto
                    </Button>
                </Link>
            </div>

            <div className="rounded-md border bg-card">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Título</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground whitespace-nowrap">Fecha pub.</th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {projects?.map((project) => (
                                <tr key={project.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <td className="p-4 align-middle font-medium">{project.title}</td>
                                    <td className="p-4 align-middle">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${project.status === 'published'
                                                ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                                                : 'bg-destructive text-destructive-foreground hover:bg-destructive/80'
                                            }`}>
                                            {project.status}
                                        </span>
                                    </td>
                                    <td className="p-4 align-middle whitespace-nowrap">
                                        {project.published_at ? new Date(project.published_at).toLocaleDateString() : '-'}
                                    </td>
                                    <td className="p-4 align-middle text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/admin/projects/${project.id}/edit`}>
                                                <Button variant="ghost" size="icon">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <form action={async () => {
                                                "use server"
                                                await deleteProject(project.id)
                                            }}>
                                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {(!projects || projects.length === 0) && (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center text-muted-foreground">
                                        No hay proyectos creados.
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
