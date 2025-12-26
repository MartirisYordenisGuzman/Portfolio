"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FileText, FolderGit2, LogOut, Terminal, Tag } from "lucide-react"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const router = useRouter()
    const supabase = createClient()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push("/login")
        router.refresh()
    }

    const routes = [
        {
            href: "/admin",
            label: "Dashboard",
            icon: LayoutDashboard,
            active: pathname === "/admin",
        },
        {
            href: "/admin/projects",
            label: "Proyectos",
            icon: FolderGit2,
            active: pathname.includes("/admin/projects"),
        },
        {
            href: "/admin/posts",
            label: "Blog Posts",
            icon: FileText,
            active: pathname.includes("/admin/posts"),
        },
        {
            href: "/admin/tags",
            label: "Etiquetas",
            icon: Tag,
            active: pathname.includes("/admin/tags"),
        },
    ]

    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 border-r bg-card">
                <div className="flex h-14 items-center border-b px-6">
                    <Link href="/admin" className="flex items-center gap-2 font-bold">
                        <Terminal className="h-5 w-5" />
                        <span>Admin Panel</span>
                    </Link>
                </div>
                <div className="flex flex-col justify-between h-[calc(100vh-3.5rem)] py-4">
                    <nav className="space-y-1 px-2">
                        {routes.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                                    route.active ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                                )}
                            >
                                <route.icon className="h-4 w-4" />
                                {route.label}
                            </Link>
                        ))}
                    </nav>
                    <div className="px-4">
                        <Button variant="outline" className="w-full gap-2" onClick={handleLogout}>
                            <LogOut className="h-4 w-4" />
                            Cerrar Sesión
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-muted/40 p-4 md:p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}
