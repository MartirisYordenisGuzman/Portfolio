"use client"

import * as React from "react"
import Link from "next/link"
import { Layers } from "lucide-react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"

import { cn } from "@/lib/utils"
import { useLayoutMode } from "@/components/providers/layout-mode-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { usePathname } from "next/navigation"

type SpaRoute = {
    href: string
    label: string
    hideOnMobile?: boolean
}

const spaRoutes: SpaRoute[] = [
    { href: "/#hero", label: "Inicio" },
    { href: "/#projects", label: "Proyectos" },
    { href: "/#about", label: "Sobre mí" },
    { href: "/#contact", label: "Contacto" },
    { href: "/#blog", label: "Blog", hideOnMobile: true },
]

export function SpaNavbar() {
    const { toggleLayoutMode } = useLayoutMode()
    const pathname = usePathname()
    const [activeSection, setActiveSection] = React.useState<string>("hero")
    const [shouldAnimate, setShouldAnimate] = React.useState(false)

    React.useEffect(() => {
        // Wait for page load feel
        const timer = setTimeout(() => setShouldAnimate(true), 1500)
        return () => clearTimeout(timer)
    }, [])

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        // If we are not on the home page, let Next.js Link handle the navigation to /#section
        if (pathname !== "/") return;

        e.preventDefault()
        const targetId = href.replace("/#", "").replace("#", "")
        const element = document.getElementById(targetId)
        if (element) {
            // Using a custom smooth scroll to avoid OS-level setting interference and ensure a quick animation
            const targetPosition = element.getBoundingClientRect().top + window.scrollY - 100
            const startPosition = window.scrollY
            const distance = targetPosition - startPosition
            let start: number | null = null

            const duration = window.matchMedia("(max-width: 768px)").matches ? 400 : 600

            const step = (timestamp: number) => {
                if (!start) start = timestamp
                const progress = timestamp - start
                // easeInOutCubic
                const ease = progress < duration / 2
                    ? 4 * Math.pow(progress / duration, 3)
                    : 1 - Math.pow(-2 * (progress / duration) + 2, 3) / 2

                if (progress < duration) {
                    window.scrollTo(0, startPosition + distance * ease)
                    window.requestAnimationFrame(step)
                } else {
                    window.scrollTo(0, targetPosition)
                    window.history.pushState(null, "", href)
                }
            }
            window.requestAnimationFrame(step)
        }
    }

    // Auto-hide navbar logic
    const { scrollY } = useScroll()
    const [hidden, setHidden] = React.useState(false)

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0
        if (latest > previous && latest > 100) {
            setHidden(true)
        } else {
            setHidden(false)
        }
    })

    React.useEffect(() => {
        if (pathname !== "/") return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id)
                    }
                })
            },
            {
                rootMargin: "-20% 0px -20% 0px",
                threshold: [0, 0.1, 0.5]
            }
        )

        spaRoutes.forEach((route) => {
            const id = route.href.replace("/#", "").replace("#", "")
            const element = document.getElementById(id)
            if (element) {
                observer.observe(element)
            }
        })

        return () => observer.disconnect()
    }, [pathname])

    return (
        <motion.div
            variants={{
                visible: { y: 0, opacity: 1 },
                hidden: { y: "-150%", opacity: 0 }
            }}
            initial="visible"
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-2 md:px-4 pointer-events-none"
        >
            <nav className="flex items-center rounded-full border border-border/40 bg-background/80 p-1 md:p-2 backdrop-blur-md shadow-lg pointer-events-auto max-w-full md:max-w-fit">

                <div
                    className="flex items-center gap-1 md:gap-2 overflow-x-auto hide-scrollbar px-2"
                    style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
                >
                    {spaRoutes.map((route) => {
                        const routeId = route.href.replace("/#", "").replace("#", "")
                        const isActive = pathname === "/" ? activeSection === routeId : false
                        return (
                            <Link
                                key={route.href}
                                href={route.href}
                                onClick={(e) => handleNavClick(e, route.href)}
                                className={cn(
                                    "relative px-3 md:px-4 py-1.5 text-xs md:text-sm font-medium transition-colors rounded-full whitespace-nowrap",
                                    isActive ? "text-primary-foreground" : "text-foreground/70 hover:text-foreground hover:bg-muted/50",
                                    route.hideOnMobile && "hidden md:inline-flex"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute inset-0 bg-primary rounded-full -z-10"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{route.label}</span>
                            </Link>
                        )
                    })}
                </div>

                <div className="w-px h-6 bg-border/50 mx-1 md:mx-2 shrink-0 hidden sm:block" />

                <div className="flex items-center gap-1 shrink-0 pr-1 md:pr-2 pl-1">
                    <button
                        onClick={() => toggleLayoutMode(activeSection)}
                        title="Cambiar a modo Multipágina"
                        className={cn(
                            "relative inline-flex items-center justify-center rounded-full p-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none text-foreground/70",
                            shouldAnimate && "animate-[sync-pulse-shadow_1.5s_ease-out_3]"
                        )}
                    >
                        <Layers className={cn(
                            "h-4 w-4 md:h-5 md:w-5 relative z-10",
                            shouldAnimate && "animate-[sync-pulse-icon_1.5s_ease-out_3]"
                        )} />
                        <span className="sr-only">Modo Multipágina</span>
                    </button>
                    <div className="scale-90 md:scale-100 flex items-center justify-center">
                        <ModeToggle />
                    </div>
                </div>
            </nav>
        </motion.div>
    )
}
