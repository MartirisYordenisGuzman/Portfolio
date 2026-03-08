"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Pencil, Trash2, Filter, Tag as TagIcon } from "lucide-react"
import { deleteTag } from "@/app/admin/actions"
import { AdminSearch } from "@/components/features/admin/AdminSearch"
import { Tag } from "@/types/database"

interface AdminTagsListProps {
    initialTags: Tag[]
}

export function AdminTagsList({ initialTags }: AdminTagsListProps) {
    const [searchQuery, setSearchQuery] = useState("")

    const filteredTags = useMemo(() => {
        if (!searchQuery) return initialTags
        const lowerQuery = searchQuery.toLowerCase()
        return initialTags.filter(t =>
            t.name.toLowerCase().includes(lowerQuery) ||
            t.slug.toLowerCase().includes(lowerQuery)
        )
    }, [initialTags, searchQuery])

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Etiquetas</h2>
                    <p className="text-muted-foreground">Categorías y tecnologías para proyectos y posts.</p>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <AdminSearch
                        placeholder="Buscar etiquetas..."
                        onSearch={setSearchQuery}
                        className="flex-1 sm:w-64"
                    />
                    <Link href="/admin/tags/new">
                        <Button className="gap-2 shadow-sm">
                            <PlusCircle className="h-4 w-4" />
                            <span className="hidden sm:inline">Nueva Etiqueta</span>
                            <span className="sm:hidden">Nueva</span>
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
                                <th className="h-12 px-6 text-left align-middle font-semibold text-muted-foreground uppercase tracking-wider text-[11px]">Nombre</th>
                                <th className="h-12 px-6 text-left align-middle font-semibold text-muted-foreground uppercase tracking-wider text-[11px]">Slug</th>
                                <th className="h-12 px-6 text-right align-middle font-semibold text-muted-foreground uppercase tracking-wider text-[11px]">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {filteredTags.map((tag) => (
                                <tr key={tag.id} className="transition-colors hover:bg-muted/30">
                                    <td className="px-6 py-4 align-middle font-medium text-foreground">
                                        <div className="flex items-center gap-3">
                                            <div className="p-1.5 rounded-md bg-primary/5 text-primary">
                                                <TagIcon className="h-3.5 w-3.5" />
                                            </div>
                                            <span>{tag.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 align-middle text-muted-foreground font-mono text-[12px]">
                                        {tag.slug}
                                    </td>
                                    <td className="px-6 py-4 align-middle text-right">
                                        <div className="flex justify-end gap-1.5">
                                            <Link href={`/admin/tags/${tag.id}/edit`}>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-colors">
                                                    <Pencil className="h-3.5 w-3.5" />
                                                </Button>
                                            </Link>
                                            <form action={async () => {
                                                if (confirm('¿Estás seguro de que deseas eliminar esta etiqueta?')) {
                                                    await deleteTag(tag.id)
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
                    {filteredTags.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
                            <TagIcon className="h-10 w-10 opacity-20" />
                            <p className="text-sm">No se encontraron etiquetas con esos criterios.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile View (Cards) */}
            <div className="grid gap-4 md:hidden">
                {filteredTags.map((tag) => (
                    <Card key={tag.id} className="overflow-hidden border-muted/60 shadow-sm">
                        <CardHeader className="pb-3 bg-muted/20">
                            <div className="flex justify-between items-center gap-2">
                                <CardTitle className="text-base font-bold leading-tight line-clamp-1">{tag.name}</CardTitle>
                                <TagIcon className="h-3.5 w-3.5 text-muted-foreground" />
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4 pb-3 text-sm text-muted-foreground">
                            <div className="flex justify-between items-center">
                                <span className="text-[11px] font-medium uppercase tracking-wider">Slug:</span>
                                <span className="font-mono text-[11px] text-foreground">{tag.slug}</span>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2 pt-2 pb-4 bg-muted/5">
                            <Link href={`/admin/tags/${tag.id}/edit`} className="flex-1">
                                <Button variant="outline" size="sm" className="w-full h-9 gap-2 shadow-xs">
                                    <Pencil className="h-3.5 w-3.5" />
                                    Editar
                                </Button>
                            </Link>
                            <form action={async () => {
                                if (confirm('¿Estás seguro de que deseas eliminar esta etiqueta?')) {
                                    await deleteTag(tag.id)
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
                {filteredTags.length === 0 && (
                    <div className="p-10 text-center text-muted-foreground border-2 border-dashed rounded-xl">
                        No se encontraron etiquetas.
                    </div>
                )}
            </div>
        </div>
    )
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ")
}
