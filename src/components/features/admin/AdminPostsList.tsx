"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Pencil, Trash2, Filter, FileText } from "lucide-react"
import { deletePost } from "@/app/admin/actions"
import { AdminSearch } from "@/components/features/admin/AdminSearch"
import { Post } from "@/types/database"

interface AdminPostsListProps {
    initialPosts: Post[]
}

export function AdminPostsList({ initialPosts }: AdminPostsListProps) {
    const [searchQuery, setSearchQuery] = useState("")

    const filteredPosts = useMemo(() => {
        if (!searchQuery) return initialPosts
        const lowerQuery = searchQuery.toLowerCase()
        return initialPosts.filter(p =>
            p.title.toLowerCase().includes(lowerQuery) ||
            p.excerpt?.toLowerCase().includes(lowerQuery)
        )
    }, [initialPosts, searchQuery])

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Blog Posts</h2>
                    <p className="text-muted-foreground">Comparte tus conocimientos y experiencias.</p>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <AdminSearch
                        placeholder="Buscar artículos..."
                        onSearch={setSearchQuery}
                        className="flex-1 sm:w-64"
                    />
                    <Link href="/admin/posts/new">
                        <Button className="gap-2 shadow-sm">
                            <PlusCircle className="h-4 w-4" />
                            <span className="hidden sm:inline">Nuevo Artículo</span>
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
                            {filteredPosts.map((post) => (
                                <tr key={post.id} className="transition-colors hover:bg-muted/30">
                                    <td className="px-6 py-4 align-middle font-medium text-foreground">
                                        <div className="flex items-center gap-3">
                                            <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                                            <span className="truncate max-w-md">{post.title}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 align-middle">
                                        <span className={cn(
                                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-tight transition-colors shadow-sm",
                                            post.status === 'published'
                                                ? 'bg-emerald-100/80 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/30'
                                                : 'bg-amber-100/80 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border border-amber-200/50 dark:border-amber-800/30'
                                        )}>
                                            {post.status === 'published' ? 'Publicado' : 'Borrador'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 align-middle text-muted-foreground">
                                        {post.published_at ? new Date(post.published_at).toLocaleDateString() : '-'}
                                    </td>
                                    <td className="px-6 py-4 align-middle text-right">
                                        <div className="flex justify-end gap-1.5">
                                            <Link href={`/admin/posts/${post.id}/edit`}>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-colors">
                                                    <Pencil className="h-3.5 w-3.5" />
                                                </Button>
                                            </Link>
                                            <form action={async () => {
                                                if (confirm('¿Estás seguro de que deseas eliminar este artículo?')) {
                                                    await deletePost(post.id)
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
                    {filteredPosts.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
                            <Filter className="h-10 w-10 opacity-20" />
                            <p className="text-sm">No se encontraron artículos con esos criterios.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile View (Cards) */}
            <div className="grid gap-4 md:hidden">
                {filteredPosts.map((post) => (
                    <Card key={post.id} className="overflow-hidden border-muted/60 shadow-sm">
                        <CardHeader className="pb-3 bg-muted/20">
                            <div className="flex justify-between items-center gap-2">
                                <CardTitle className="text-base font-bold leading-tight line-clamp-1">{post.title}</CardTitle>
                                <span className={cn(
                                    "shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-tight transition-colors shadow-sm",
                                    post.status === 'published'
                                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400'
                                        : 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400'
                                )}>
                                    {post.status === 'published' ? 'PUB' : 'BOR'}
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4 pb-3 text-sm text-muted-foreground">
                            <div className="flex justify-between items-center">
                                <span className="text-[11px] font-medium uppercase tracking-wider">Publicado:</span>
                                <span className="font-medium text-foreground">{post.published_at ? new Date(post.published_at).toLocaleDateString() : '-'}</span>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2 pt-2 pb-4 bg-muted/5">
                            <Link href={`/admin/posts/${post.id}/edit`} className="flex-1">
                                <Button variant="outline" size="sm" className="w-full h-9 gap-2 shadow-xs">
                                    <Pencil className="h-3.5 w-3.5" />
                                    Editar
                                </Button>
                            </Link>
                            <form action={async () => {
                                if (confirm('¿Estás seguro de que deseas eliminar este artículo?')) {
                                    await deletePost(post.id)
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
                {filteredPosts.length === 0 && (
                    <div className="p-10 text-center text-muted-foreground border-2 border-dashed rounded-xl">
                        No se encontraron artículos.
                    </div>
                )}
            </div>
        </div>
    )
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ")
}
