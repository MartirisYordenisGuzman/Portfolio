"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import Particles from "@/components/ui/particles"
import { useLayoutMode } from "@/components/providers/layout-mode-provider"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function HeroSection() {
    const { isSpaMode } = useLayoutMode()

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (!isSpaMode) return;

        e.preventDefault()
        const targetId = href.replace("#", "")
        const element = document.getElementById(targetId)
        if (element) {
            const targetPosition = element.getBoundingClientRect().top + window.scrollY - 100
            const startPosition = window.scrollY
            const distance = targetPosition - startPosition
            let start: number | null = null

            const duration = window.matchMedia("(max-width: 768px)").matches ? 400 : 600

            const step = (timestamp: number) => {
                if (!start) start = timestamp
                const progress = timestamp - start
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

    return (
        <section className={`relative container flex flex-col md:flex-row items-center justify-start md:justify-center gap-8 md:gap-4 px-4 md:px-6 pb-12 md:pb-10 lg:pb-14 overflow-hidden min-h-screen ${isSpaMode ? 'pt-28 md:pt-20 lg:pt-24' : 'pt-16 md:pt-20'}`}>
            {/* Particles Background */}
            <div className="absolute inset-0 -z-10">
                <Particles
                    className="absolute inset-0"
                    quantity={100}
                    ease={80}
                    refresh
                />
            </div>

            {/* Profile Picture (Mobile: Top / Desktop: Right) */}
            {/* We want it on Right on Desktop, so it should be second in flex row. 
                But on Mobile we want it Top. Flex-col stacks top-to-bottom.
                So if we put it First in code:
                Mobile: Image -> Text
                Desktop: Image -> Text (WE WANT Text -> Image)
                
                So we can use order classes.
                Mobile: Image (order-first) -> Text (order-last) is default behavior if we put Image first.
                Desktop: Text (order-1) -> Image (order-2).
                
                Actually simpler:
                Put Text First.
                Mobile: Text -> Image (Default) -> Wait, user wants Image Top on mobile.
                So:
                flex-col-reverse (Text Bottom, Image Top) on mobile? 
                No, flex-col stacks normally.
                
                Let's use:
                <div className="order-2 md:order-1"> TEXT </div>
                <div className="order-1 md:order-2"> IMAGE </div>
            */}

            <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left bg-background/30 backdrop-blur-sm p-4 sm:p-10 rounded-2xl shadow-sm border border-border/10 order-2 md:order-1 w-full md:w-auto max-w-[600px]">
                <h1 className="text-2xl font-bold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl lg:leading-[1.1]">
                    Ingeniero de Software <br className="hidden sm:inline" />
                    Full Stack
                </h1>
                <p className="max-w-[750px] text-base text-muted-foreground sm:text-xl">
                    Especializado en construir aplicaciones web modernas y escalables con React, Next.js y el ecosistema de la nube.
                </p>
                <div className="mt-2 flex w-full flex-col gap-3 sm:flex-row sm:items-center justify-center md:justify-start">
                    <Link
                        href={isSpaMode ? "#projects" : "/projects"}
                        onClick={(e) => isSpaMode && handleNavClick(e, "#projects")}
                    >
                        <Button size="default" className="w-full sm:w-auto md:h-11 md:px-8">
                            Ver Proyectos
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                    <Link
                        href={isSpaMode ? "#contact" : "/contact"}
                        onClick={(e) => isSpaMode && handleNavClick(e, "#contact")}
                    >
                        <Button variant="outline" size="default" className="w-full sm:w-auto md:h-11 md:px-8">
                            Contáctame
                        </Button>
                    </Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="default"
                                className="w-full sm:w-auto md:h-11 md:px-8"
                                // Prevent accidental triggers on mobile touch-start/scroll
                                onPointerDown={(e) => {
                                    if (window.matchMedia("(max-width: 768px)").matches) {
                                        // On mobile, we only want explicit clicks
                                        e.preventDefault();
                                    }
                                }}
                                onClick={(e) => {
                                    // Radix trigger might need manual toggle if we preventDefault on pointerdown
                                    if (window.matchMedia("(max-width: 768px)").matches) {
                                        e.currentTarget.click();
                                    }
                                }}
                            >
                                <FileText className="mr-2 h-4 w-4" />
                                Descargar CV
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuItem asChild>
                                <a href="/cv/cv-es.pdf" target="_blank" rel="noopener noreferrer" className="cursor-pointer w-full">
                                    Versión en Español
                                </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <a href="/cv/cv-en.pdf" target="_blank" rel="noopener noreferrer" className="cursor-pointer w-full">
                                    Versión en Inglés
                                </a>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="flex justify-center order-1 md:order-2 w-full md:w-auto mb-2 md:mb-0">
                <motion.div
                    className="relative h-[150px] w-[150px] sm:h-[250px] sm:w-[250px] md:h-[350px] md:w-[350px] rounded-full border-4 border-background/50 shadow-xl overflow-hidden backdrop-blur-sm"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Image
                        src="/profile.jpg"
                        alt="Profile picture"
                        fill
                        className="object-cover object-[center_20%]"
                        priority
                    />
                </motion.div>
            </div>
        </section>
    )
}
