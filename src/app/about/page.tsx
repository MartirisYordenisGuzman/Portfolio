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
    return (
        <div className="mx-auto w-full max-w-[85vw] py-8 md:py-10">
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
                                    En mi último año de secundaria me enfrenté al dilema de decidir qué estudiar. Siempre tuve afinidad por la informática, aunque al inicio no lo veía como un camino profesional claro. Fue a través de cursos gratuitos de programación y siguiendo a distintas personalidades del área que encontré la motivación para profundizar en este mundo.
                                </p>
                                <p>
                                    En un principio me sentí atraído por el desarrollo de videojuegos, pero con el tiempo comprendí que mi verdadera pasión estaba en la creación de páginas y aplicaciones web y de escritorio. Descubrí que me motiva desarrollar la destreza y las habilidades necesarias para diseñar y construir productos o servicios funcionales, cuidando tanto la lógica como la experiencia del usuario.
                                </p>
                                <p>
                                    Decidí formalizar este interés inscribiéndome en la Licenciatura en Informática en la Universidad Autónoma de Santo Domingo. Paralelamente, he complementado mi formación con cursos y programas en distintas plataformas e instituciones como ITLA, Coursera, Udemy y Talending, donde realicé un bootcamp en desarrollo web. Más recientemente, participé en Samsung Innovation Campus, donde me capacité en Python e Inteligencia Artificial.
                                </p>
                                <p>
                                    Además, cuento con certificaciones de freeCodeCamp en Diseño Web Responsivo y Estructuras de Datos y Algoritmos en JavaScript, lo que ha fortalecido mis bases técnicas y mi enfoque en la escritura de código limpio y bien estructurado.
                                </p>
                                <p>
                                    Hoy continúo formándome de manera constante, con el objetivo de seguir creciendo como desarrollador y aportar soluciones tecnológicas prácticas, escalables y bien diseñadas.
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

                    <Separator />

                    {/* Connect */}
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
