"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Pencil, Trash2, ExternalLink, Filter } from "lucide-react"
import { deleteProject } from "@/app/admin/actions"
import { AdminSearch } from "@/components/features/admin/AdminSearch"
import { Project } from "@/types/database"

interface AdminProjectsListProps {
    initialProjects: Project[]
}

export function AdminProjectsList({ initialProjects }: AdminProjectsListProps) {
    const [searchQuery, setSearchQuery] = useState("")

    const filteredProjects = useMemo(() => {
        if (!searchQuery) return initialProjects
        const lowerQuery = searchQuery.toLowerCase()
        return initialProjects.filter(p =>
            p.title.toLowerCase().includes(lowerQuery)
        )
    }, [initialProjects, searchQuery])

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Proyectos</h2>
                    <p className="text-muted-foreground">Gestiona y organiza tus trabajos realizados.</p>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <AdminSearch
                        placeholder="Buscar proyectos..."
                        onSearch={setSearchQuery}
                        className="flex-1 sm:w-64"
                    />
                    <Link href="/admin/projects/new">
                        <Button className="gap-2 shadow-sm">
                            <PlusCircle className="h-4 w-4" />
                            <span className="hidden sm:inline">Nuevo Proyecto</span>
                            <span className="sm:hidden">Nuevo</span>
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Desktop View (Table) */}
            <div className="hidden md:block overflow-hidden rounded-xl border bg-card shadow-sm">
                <div className="relative w-full overflow-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50 border-b">
                            <tr>
                                <th className="h-12 px-6 text-left align-middle font-semibold text-muted-foreground uppercase tracking-wider text-[11px]">Título</th>
                                <th className="h-12 px-6 text-left align-middle font-semibold text-muted-foreground uppercase tracking-wider text-[11px]">Status</th>
                                <th className="h-12 px-6 text-left align-middle font-semibold text-muted-foreground uppercase tracking-wider text-[11px]">Fecha pub.</th>
                                <th className="h-12 px-6 text-right align-middle font-semibold text-muted-foreground uppercase tracking-wider text-[11px]">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {filteredProjects.map((project) => (
                                <tr key={project.id} className="transition-colors hover:bg-muted/30">
                                    <td className="px-6 py-4 align-middle font-medium text-foreground">{project.title}</td>
                                    <td className="px-6 py-4 align-middle">
                                        <span className={cn(
                                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-tight transition-colors shadow-sm",
                                            project.status === 'published'
                                                ? 'bg-emerald-100/80 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/30'
                                                : 'bg-amber-100/80 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border border-amber-200/50 dark:border-amber-800/30'
                                        )}>
                                            {project.status === 'published' ? 'Publicado' : 'Borrador'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 align-middle text-muted-foreground">
                                        {project.published_at ? new Date(project.published_at).toLocaleDateString() : '-'}
                                    </td>
                                    <td className="px-6 py-4 align-middle text-right">
                                        <div className="flex justify-end gap-1.5">
                                            <Link href={`/admin/projects/${project.id}/edit`}>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-colors">
                                                    <Pencil className="h-3.5 w-3.5" />
                                                </Button>
                                            </Link>
                                            <form action={async () => {
                                                if (confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
                                                    await deleteProject(project.id)
                                                }
                                            }}>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive transition-colors">
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredProjects.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
                            <Filter className="h-10 w-10 opacity-20" />
                            <p className="text-sm">No se encontraron proyectos con esos criterios.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile View (Cards) */}
            <div className="grid gap-4 md:hidden">
                {filteredProjects.map((project) => (
                    <Card key={project.id} className="overflow-hidden border-muted/60 shadow-sm">
                        <CardHeader className="pb-3 bg-muted/20">
                            <div className="flex justify-between items-center gap-2">
                                <CardTitle className="text-base font-bold leading-tight line-clamp-1">{project.title}</CardTitle>
                                <span className={cn(
                                    "shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-tight transition-colors shadow-sm",
                                    project.status === 'published'
                                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400'
                                        : 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400'
                                )}>
                                    {project.status === 'published' ? 'PUB' : 'BOR'}
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4 pb-3 text-sm text-muted-foreground">
                            <div className="flex justify-between items-center">
                                <span className="text-[11px] font-medium uppercase tracking-wider">Publicado:</span>
                                <span className="font-medium text-foreground">{project.published_at ? new Date(project.published_at).toLocaleDateString() : '-'}</span>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2 pt-2 pb-4 bg-muted/5">
                            <Link href={`/admin/projects/${project.id}/edit`} className="flex-1">
                                <Button variant="outline" size="sm" className="w-full h-9 gap-2 shadow-xs">
                                    <Pencil className="h-3.5 w-3.5" />
                                    Editar
                                </Button>
                            </Link>
                            <form action={async () => {
                                if (confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
                                    await deleteProject(project.id)
                                }
                            }} className="flex-1">
                                <Button variant="destructive" size="sm" className="w-full h-9 gap-2 shadow-xs">
                                    <Trash2 className="h-3.5 w-3.5" />
                                    Eliminar
                                </Button>
                            </form>
                        </CardFooter>
                    </Card>
                ))}
                {filteredProjects.length === 0 && (
                    <div className="p-10 text-center text-muted-foreground border-2 border-dashed rounded-xl">
                        No se encontraron proyectos.
                    </div>
                )}
            </div>
        </div>
    )
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ")
}
