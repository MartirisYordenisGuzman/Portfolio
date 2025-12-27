import { getDashboardStats } from "@/lib/api/dashboard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, FolderGit2, Plus, Tag, ExternalLink } from "lucide-react"
import Link from "next/link"

export default async function AdminDashboardPage() {
    const stats = await getDashboardStats()

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">
                    Bienvenido al panel de administración del portafolio.
                </p>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Acciones Rápidas</h3>
                <div className="flex flex-wrap gap-4">
                    <Link href="/admin/projects/new">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Nuevo Proyecto
                        </Button>
                    </Link>
                    <Link href="/admin/posts/new">
                        <Button variant="secondary">
                            <Plus className="mr-2 h-4 w-4" />
                            Nuevo Artículo
                        </Button>
                    </Link>
                    <Link href="/" target="_blank">
                        <Button variant="outline">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Ver Sitio Web
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Proyectos
                        </CardTitle>
                        <FolderGit2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.projects.total}</div>
                        <p className="text-xs text-muted-foreground">
                            {stats.projects.published} publicados, {stats.projects.draft} borradores
                        </p>
                        <div className="mt-4">
                            <Link href="/admin/projects">
                                <Button size="sm" variant="outline" className="w-full">
                                    Gestionar Proyectos
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Blog Posts
                        </CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.posts.total}</div>
                        <p className="text-xs text-muted-foreground">
                            {stats.posts.published} publicados, {stats.posts.draft} borradores
                        </p>
                        <div className="mt-4">
                            <Link href="/admin/posts">
                                <Button size="sm" variant="outline" className="w-full">
                                    Gestionar Artículos
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Etiquetas
                        </CardTitle>
                        <Tag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.tags.total}</div>
                        <p className="text-xs text-muted-foreground">
                            Etiquetas disponibles
                        </p>
                        <div className="mt-4">
                            <Link href="/admin/tags">
                                <Button size="sm" variant="outline" className="w-full">
                                    Gestionar Etiquetas
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
