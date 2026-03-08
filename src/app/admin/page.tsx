import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    BarChart3,
    Briefcase,
    FileText,
    Settings,
    Tags,
    Eye,
    ArrowUpRight,
    TrendingUp,
    LayoutDashboard
} from "lucide-react"

export default async function AdminDashboard() {
    const supabase = await createClient()

    const [
        { count: projectsCount },
        { count: postsCount },
        { count: tagsCount }
    ] = await Promise.all([
        supabase.from("projects").select("*", { count: 'exact', head: true }),
        supabase.from("posts").select("*", { count: 'exact', head: true }),
        supabase.from("tags").select("*", { count: 'exact', head: true })
    ])

    const stats = [
        {
            title: "Proyectos",
            value: projectsCount || 0,
            description: "Trabajos en tu portafolio",
            icon: Briefcase,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            href: "/admin/projects"
        },
        {
            title: "Artículos",
            value: postsCount || 0,
            description: "Publicaciones en el blog",
            icon: FileText,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
            href: "/admin/posts"
        },
        {
            title: "Etiquetas",
            value: tagsCount || 0,
            description: "Tags y categorías",
            icon: Tags,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
            href: "/admin/tags"
        }
    ]

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        Panel de Control
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Bienvenido de nuevo. Aquí tienes un resumen de tu portafolio.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" asChild className="shadow-sm">
                        <Link href="/" target="_blank" className="gap-2">
                            <Eye className="h-4 w-4" />
                            Ver Sitio
                        </Link>
                    </Button>
                    <Button size="sm" className="gap-2 shadow-sm">
                        <Settings className="h-4 w-4" />
                        Ajustes
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {stats.map((stat) => (
                    <Link key={stat.title} href={stat.href}>
                        <Card className="relative overflow-hidden group hover:shadow-md transition-all duration-300 border-muted/50">
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 text-muted-foreground/80">
                                <CardTitle className="text-sm font-bold uppercase tracking-wider">{stat.title}</CardTitle>
                                <div className={`${stat.bg} ${stat.color} p-2 rounded-xl transition-transform group-hover:scale-110 duration-300`}>
                                    <stat.icon className="h-5 w-5" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-black">{stat.value}</div>
                                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 font-medium italic">
                                    <TrendingUp className="h-3 w-3 text-emerald-500" />
                                    {stat.description}
                                </p>
                                <div className="absolute bottom-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="col-span-1 lg:col-span-2 border-muted/50 bg-gradient-to-br from-card to-muted/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <LayoutDashboard className="h-5 w-5 text-primary" />
                            Acciones Rápidas
                        </CardTitle>
                        <CardDescription>Crea contenido nuevo con un solo clic.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid sm:grid-cols-2 gap-4">
                        <Link href="/admin/projects/new">
                            <Button variant="secondary" className="w-full h-24 flex flex-col gap-2 hover:bg-primary/5 hover:text-primary transition-colors border shadow-sm">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <Briefcase className="h-5 w-5" />
                                </div>
                                Nuevo Proyecto
                            </Button>
                        </Link>
                        <Link href="/admin/posts/new">
                            <Button variant="secondary" className="w-full h-24 flex flex-col gap-2 hover:bg-emerald-500/5 hover:text-emerald-500 transition-colors border shadow-sm">
                                <div className="p-2 bg-emerald-500/10 rounded-lg">
                                    <FileText className="h-5 w-5" />
                                </div>
                                Nuevo Post
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card className="border-muted/50 bg-primary/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10">
                        <BarChart3 className="h-24 w-24" />
                    </div>
                    <CardHeader>
                        <CardTitle>Resumen Mensual</CardTitle>
                        <CardDescription>Estadísticas básicas de visibilidad.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Proyectos publicados</span>
                                <span className="font-bold">85%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-[85%] rounded-full" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Posts completados</span>
                                <span className="font-bold">60%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-[60%] rounded-full" />
                            </div>
                        </div>
                        <p className="text-[11px] text-muted-foreground italic pt-4">
                            * Las estadísticas reales se integrarán próximamente con Google Analytics.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
