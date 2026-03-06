"use client"

import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FileText, Github, Linkedin, Mail } from "lucide-react"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLayoutMode } from "@/components/providers/layout-mode-provider"

const stack = [
    {
        category: "Frontend Core",
        items: [
            "React 18+ (Hooks, Server Components, Suspense)",
            "Next.js (App Router, SSR, SSG)",
            "TypeScript (Strict Mode)",
            "Tailwind CSS (Design Systems, UI moderna)",
            "Sass / SCSS (arquitectura de estilos, componentes reutilizables)",
            "Responsive Web Design (Mobile-first, accesibilidad)"
        ]
    },
    {
        category: "Backend & Infra",
        items: [
            "Node.js (APIs, lógica de negocio)",
            "PostgreSQL (Supabase)",
            "Autenticación y manejo de usuarios (Supabase Auth)",
            "Docker (entornos reproducibles)"
        ]
    },
    {
        category: "Lenguajes & Fundamentos",
        items: [
            "JavaScript (ES6+)",
            "TypeScript",
            "Python (bases, IA)",
            "Estructuras de Datos y Algoritmos (freeCodeCamp)"
        ]
    },
    {
        category: "Herramientas & Ecosistema",
        items: [
            "Git & GitHub (control de versiones, flujos de trabajo)",
            "Linux / Windows (entornos de desarrollo)",
            "REST APIs",
            "Vercel (deploy automático)",
            "Postman"
        ]
    }
]

export default function AboutPage() {
    const { isSpaMode } = useLayoutMode()

    return (
        <div className={`mx-auto w-full max-w-[85vw] pt-8 md:pt-10 ${isSpaMode ? 'pb-0' : 'pb-8 md:pb-10'}`}>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                {/* Main Content */}
                <div className="max-w-3xl space-y-8 lg:col-span-2">

                    {/* Header */}
                    <ScrollAnimation>
                        <section className="space-y-4">
                            <h1 className="text-3xl font-bold tracking-tight">Sobre Mí</h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Ingeniero de Software apasionado por la simplicidad en sistemas complejos. Me especializo en el ecosistema React y arquitecturas Serverless.
                            </p>
                        </section>
                    </ScrollAnimation>

                    <Separator />

                    {/* Story */}
                    <ScrollAnimation>
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold">Mi Historia</h2>
                            <div className="prose dark:prose-invert">
                                <p>
                                    ¡Hola! Soy Martiris Yordenis. Mi curiosidad por la tecnología despertó en la secundaria, y lo que comenzó como un interés por los videojuegos rápidamente evolucionó hacia una verdadera vocación por la creación de páginas y aplicaciones web. A través de cursos online y mucha dedicación autodidacta, encontré en la programación el equilibrio perfecto entre exprimir la lógica y diseñar una gran experiencia de usuario.
                                </p>
                                <p>
                                    Para profesionalizar mi perfil, ingresé a la carrera de Informática en la UASD y me he mantenido en constante aprendizaje. A lo largo de mi trayecto, he forjado bases sólidas en desarrollo web, JavaScript, Python e Inteligencia Artificial, complementándome con bootcamps intensivos, certificaciones de freeCodeCamp y programas como el Samsung Innovation Campus. Mi enfoque siempre está en escribir código moderno, limpio y bien estructurado.
                                </p>
                                <p>
                                    Me apasiona enfrentarme a nuevos retos técnicos y lograr transformar ideas complejas en soluciones sencillas, eficientes y agradables a la vista. Mi mayor aspiración es seguir creciendo día a día como desarrollador de software y unirme a proyectos donde pueda aportar valor real e innovar. ¡Disfruto cada parte del proceso y me entusiasma seguir construyendo el futuro con código!
                                </p>
                            </div>
                        </section>
                    </ScrollAnimation>

                    {/* Stack */}
                    <ScrollAnimation>
                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold">Arsenal Técnico</h2>
                            <div className="grid gap-6 sm:grid-cols-2">
                                {stack.map((category, index) => (
                                    <div key={index} className="space-y-3">
                                        <h3 className="font-medium text-lg">{category.category}</h3>
                                        <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                                            {category.items.map((item, itemIndex) => (
                                                <li key={itemIndex}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </ScrollAnimation>

                    {!isSpaMode && <Separator />}

                    {/* Connect (Hidden in SPA Mode) */}
                    {!isSpaMode && (
                        <ScrollAnimation>
                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold">Conectemos</h2>
                                <p className="text-muted-foreground">
                                    Actualmente estoy abierto a nuevas oportunidades donde pueda aportar valor.
                                </p>
                                <div className="flex flex-wrap gap-4 pt-4">
                                    <Link href="/contact">
                                        <Button>
                                            <Mail className="mr-2 h-4 w-4" />
                                            Contáctame
                                        </Button>
                                    </Link>
                                    <Link href="https://github.com/MartirisYordenisGuzman" target="_blank">
                                        <Button variant="outline">
                                            <Github className="mr-2 h-4 w-4" />
                                            GitHub
                                        </Button>
                                    </Link>
                                    <Link href="https://www.linkedin.com/in/martiris-yordenis-guzmán" target="_blank">
                                        <Button variant="outline">
                                            <Linkedin className="mr-2 h-4 w-4" />
                                            LinkedIn
                                        </Button>
                                    </Link>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost">
                                                <FileText className="mr-2 h-4 w-4" />
                                                Descargar CV
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
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
                            </section>
                        </ScrollAnimation>
                    )}

                </div>

                <div className="hidden lg:block lg:col-span-1">
                    <ScrollAnimation>
                        <div className="sticky top-24 h-[600px] w-full overflow-hidden rounded-2xl bg-background border border-border/50 shadow-sm relative">
                            {/* Background Base */}
                            <div className="absolute inset-0 bg-zinc-50/50 dark:bg-zinc-950/50" />

                            {/* Dispersed Spheres - Monochrome Edition */}
                            {/* Sphere 1: Top Left - Dark/Zinc */}
                            <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-gradient-to-br from-zinc-500 to-zinc-800 blur-3xl opacity-50 dark:opacity-40" />

                            {/* Sphere 2: Bottom Right - Light/Gray */}
                            <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-gradient-to-tr from-zinc-200 to-zinc-400 blur-3xl opacity-60 dark:opacity-30" />

                            {/* Sphere 3: Center Floating - White/Mist */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-48 w-48 rounded-full bg-gradient-to-r from-white to-zinc-200 blur-2xl opacity-40 mix-blend-screen" />

                            {/* Sphere 4: Small Accent - Darker Grey */}
                            <div className="absolute top-32 right-12 h-24 w-24 rounded-full bg-zinc-400 blur-xl opacity-40 dark:opacity-20" />

                            {/* Sphere 5: Detail - Deep Black/Zinc */}
                            <div className="absolute bottom-48 left-12 h-32 w-32 rounded-full bg-zinc-600 blur-2xl opacity-30 dark:opacity-20" />

                            {/* Glass Overlay Content */}
                            <div className="relative h-full flex flex-col justify-end p-8 z-10">
                                <div className="rounded-xl bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10 p-6 shadow-xl">
                                    <div className="space-y-2">
                                        <div className="h-1 w-12 rounded-full bg-primary/80" />
                                        <h3 className="text-2xl font-bold tracking-tighter text-foreground">
                                            Desarrollador <br />
                                            <span className="text-primary">Creativo</span>
                                        </h3>
                                        <p className="text-sm text-muted-foreground/80 font-medium">
                                            Transformando ideas en realidad digital a través de código y diseño.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollAnimation>
                </div>
            </div>
        </div>
    )
}
