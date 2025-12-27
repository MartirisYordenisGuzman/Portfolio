"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Menu, LayoutDashboard, FileText, FolderGit2, LogOut, Terminal, Tag, type LucideIcon } from "lucide-react"
import { useState } from "react"
import { ModeToggle } from "@/components/mode-toggle"

interface Route {
    href: string
    label: string
    icon: LucideIcon
    active: boolean
}

function AdminSidebar({ routes, setOpen, onLogout }: {
    routes: Route[]
    setOpen?: (open: boolean) => void
    onLogout: () => void
}) {
    return (
        <div className="flex h-full flex-col">
            <div className="flex h-14 items-center border-b px-6">
                <Link href="/admin" className="flex items-center gap-2 font-bold" onClick={() => setOpen?.(false)}>
                    <Terminal className="h-5 w-5" />
                    <span>Admin Panel</span>
                </Link>
            </div>
            <div className="flex flex-col justify-between flex-1 py-4">
                <nav className="space-y-1 px-2">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            onClick={() => setOpen?.(false)}
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
                <div className="px-4 flex gap-2">
                    <ModeToggle />
                    <Button variant="outline" className="flex-1 gap-2" onClick={onLogout}>
                        <LogOut className="h-4 w-4" />
                        <span className="sr-only sm:not-sr-only sm:inline-block">Cerrar Sesión</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const router = useRouter()
    const supabase = createClient()
    const [open, setOpen] = useState(false)

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
            {/* Mobile Header */}
            <div className="flex h-14 items-center justify-between border-b px-4 md:hidden">
                <div className="font-bold flex items-center gap-2">
                    <Terminal className="h-5 w-5" />
                    <span>Admin Panel</span>
                </div>
                <div className="flex items-center gap-2">
                    <ModeToggle />
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="p-0 w-64">
                            <div className="sr-only">
                                <SheetTitle>Admin Navigation</SheetTitle>
                            </div>
                            <AdminSidebar routes={routes} setOpen={setOpen} onLogout={handleLogout} />
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 flex-col border-r bg-card h-screen sticky top-0">
                <AdminSidebar routes={routes} onLogout={handleLogout} />
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-muted/40 p-4 md:p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}
