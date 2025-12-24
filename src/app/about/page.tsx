"use client"

import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FileText, Github, Linkedin, Mail } from "lucide-react"
import { useLanguage } from "@/providers/language-provider"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

export default function AboutPage() {
    const { t } = useLanguage()
    return (
        <div className="mx-auto w-full max-w-[85vw] py-8 md:py-10">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                {/* Main Content */}
                <div className="max-w-3xl space-y-8 lg:col-span-2">

                    {/* Header */}
                    <ScrollAnimation>
                        <section className="space-y-4">
                            <h1 className="text-3xl font-bold tracking-tight">{t.about.title}</h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                {t.about.description}
                            </p>
                        </section>
                    </ScrollAnimation>

                    <Separator />

                    {/* Story */}
                    <ScrollAnimation>
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold">{t.about.story_title}</h2>
                            <div className="prose dark:prose-invert">
                                <p>
                                    {t.about.story_p1}
                                </p>
                                <p>
                                    {t.about.story_p2}
                                </p>
                            </div>
                        </section>
                    </ScrollAnimation>

                    {/* Stack */}
                    <ScrollAnimation>
                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold">{t.about.stack_title}</h2>
                            <div className="grid gap-6 sm:grid-cols-2">
                                <div className="space-y-3">
                                    <h3 className="font-medium text-lg">Frontend Core</h3>
                                    <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                                        <li>React 18+ (RSC, Suspense)</li>
                                        <li>Next.js App Router</li>
                                        <li>TypeScript (Strict Mode)</li>
                                        <li>Tailwind CSS & Design Systems</li>
                                    </ul>
                                </div>
                                <div className="space-y-3">
                                    <h3 className="font-medium text-lg">Backend & Infra</h3>
                                    <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                                        <li>Node.js / Bun</li>
                                        <li>PostgreSQL (Supabase)</li>
                                        <li>Docker & CI/CD (GitHub Actions)</li>
                                        <li>AWS (Lambda, S3, CloudFront)</li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </ScrollAnimation>

                    <Separator />

                    {/* Connect */}
                    <ScrollAnimation>
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold">{t.about.connect_title}</h2>
                            <p className="text-muted-foreground">
                                {t.about.connect_desc}
                            </p>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link href="/contact">
                                    <Button>
                                        <Mail className="mr-2 h-4 w-4" />
                                        {t.about.btn_contact}
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
                                <Link href="/resume.pdf" target="_blank">
                                    <Button variant="ghost">
                                        <FileText className="mr-2 h-4 w-4" />
                                        {t.about.btn_cv}
                                    </Button>
                                </Link>
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
                                            {t.about.banner_card_title_1} <br />
                                            <span className="text-primary">{t.about.banner_card_title_2}</span>
                                        </h3>
                                        <p className="text-sm text-muted-foreground/80 font-medium">
                                            {t.about.banner_card_description}
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
