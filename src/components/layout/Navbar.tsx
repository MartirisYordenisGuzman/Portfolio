"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Terminal, Github, Linkedin } from "lucide-react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
} from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/providers/language-provider"

export function Navbar() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = React.useState(false)
    const { t } = useLanguage()

    const routes = [
        {
            href: "/projects",
            label: t.nav.projects,
        },
        {
            href: "/blog",
            label: t.nav.blog,
        },
        {
            href: "/about",
            label: t.nav.about,
        },
        {
            href: "/contact",
            label: t.nav.contact,
        },
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 },
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center px-4 md:px-8">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <Terminal className="h-6 w-6" />
                        <span className="hidden font-bold sm:inline-block">
                            MartirisDev
                        </span>
                    </Link>
                    <nav className="flex items-center gap-6 text-sm font-medium">
                        {routes.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                    "transition-colors hover:text-foreground/80",
                                    pathname === route.href ? "text-foreground" : "text-foreground/60"
                                )}
                            >
                                {route.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Mobile Logo (Visible only on mobile) */}
                <Link href="/" className="mr-6 flex items-center space-x-2 md:hidden">
                    <Terminal className="h-6 w-6" />
                    <span className="font-bold inline-block">
                        MartirisDev
                    </span>
                </Link>

                <nav className="flex flex-1 items-center justify-end space-x-2"> {/* Simplified structure */}
                    <div className="hidden md:flex items-center space-x-2">
                        <Link
                            href="https://github.com/MartirisYordenisGuzman"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div
                                className={cn(
                                    "inline-flex items-center justify-center rounded-md p-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                )}
                            >
                                <Github className="h-4 w-4" />
                                <span className="sr-only">GitHub</span>
                            </div>
                        </Link>
                        <Link
                            href="https://www.linkedin.com/in/martiris-yordenis-guzmán"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div
                                className={cn(
                                    "inline-flex items-center justify-center rounded-md p-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                )}
                            >
                                <Linkedin className="h-4 w-4" />
                                <span className="sr-only">LinkedIn</span>
                            </div>
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center gap-2">
                        <ModeToggle />
                        <LanguageToggle />
                    </div>

                    {/* Mobile Menu Trigger (moved to right) */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                            >
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="top" className="w-full h-full border-none bg-background/95 backdrop-blur-xl p-0"> {/* Changed side to top for full screen feel */}
                            <div className="flex h-full flex-col">
                                <div className="flex h-14 items-center px-4 border-b border-border/10 justify-between"> {/* Added justify-between */}
                                    <Link
                                        href="/"
                                        className="flex items-center space-x-2"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <Terminal className="h-6 w-6" />
                                        <span className="font-bold text-lg">MartirisDev</span>
                                    </Link>
                                    <SheetTitle className="sr-only">Menu de navegación</SheetTitle>
                                    {/* Close button is auto-added by SheetContent usually, but if visually customized we might need one. 
                                        Shadcn SheetContent includes a Close primitive. 
                                    */}
                                </div>

                                <motion.div
                                    className="flex-1 flex flex-col justify-center items-center gap-8"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="show"
                                >
                                    {routes.map((route) => (
                                        <motion.div key={route.href} variants={itemVariants}>
                                            <Link
                                                href={route.href}
                                                className={cn(
                                                    "text-4xl font-bold tracking-tight transition-colors hover:text-primary",
                                                    pathname === route.href ? "text-foreground" : "text-muted-foreground"
                                                )}
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {route.label}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </motion.div>

                                <div className="p-8 border-t border-border/10">
                                    <div className="flex flex-col gap-6 items-center">
                                        <div className="flex gap-4">
                                            <Link
                                                href="https://github.com/MartirisYordenisGuzman"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="rounded-full bg-secondary p-3 transition-colors hover:bg-primary hover:text-primary-foreground"
                                            >
                                                <Github className="h-5 w-5" />
                                                <span className="sr-only">GitHub</span>
                                            </Link>
                                            <Link
                                                href="https://www.linkedin.com/in/martiris-yordenis-guzmán"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="rounded-full bg-secondary p-3 transition-colors hover:bg-primary hover:text-primary-foreground"
                                            >
                                                <Linkedin className="h-5 w-5" />
                                                <span className="sr-only">LinkedIn</span>
                                            </Link>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <ModeToggle />
                                            <LanguageToggle />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </nav>
            </div>
        </header>
    )
}
