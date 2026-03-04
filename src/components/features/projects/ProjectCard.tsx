import Link from "next/link"
import Image from "next/image"
import { Github, ExternalLink } from "lucide-react"

import { Project } from "@/types/database"
import { Button } from "@/components/ui/button"

interface ProjectCardProps {
    project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
    const hasNextjs = project.tags?.some(tag => tag.name.toLowerCase().includes('next'))
    const hasTailwind = project.tags?.some(tag => tag.name.toLowerCase().includes('tailwind'))

    return (
        <div className="group relative grid grid-cols-1 gap-6 lg:grid-cols-12 items-center">
            {/* Left: Image Container */}
            <div className="lg:col-span-5">
                <Link href={`/projects/${project.slug}`}>
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted border border-border/50 shadow-2xl transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-primary/5">
                        {project.cover_image && (
                            <Image
                                src={project.cover_image}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                sizes="(max-width: 1024px) 100vw, 40vw"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </div>
                </Link>
            </div>

            {/* Right: Content Container */}
            <div className="lg:col-span-7 space-y-4">
                <div className="space-y-3">
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300">
                        {project.title}
                    </h3>

                    {/* Tech Badges (Styled like reference) */}
                    <div className="flex flex-wrap gap-2.5">
                        {hasNextjs && (
                            <div className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-3.5 py-1 text-[10px] font-semibold text-white border border-white/10">
                                <svg className="h-2.5 w-2.5" viewBox="0 0 128 128">
                                    <path fill="currentColor" d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 55.3v36.6h-6.8V41.8h6.8l50.5 73.9C118.1 105.7 128 86 128 64c0-35.3-28.7-64-64-64zm0 10.6c3.2 0 6.3.3 9.4.8L33.2 68.3v-23l30.8-34.7zm31.1 31.2v61.4c-2.4 2.1-5 4-7.7 5.7L42.5 41.8h52.6z" />
                                </svg>
                                Next.js
                            </div>
                        )}
                        {hasTailwind && (
                            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-950/30 px-3.5 py-1 text-[10px] font-semibold text-cyan-400 border border-cyan-500/20">
                                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 12c-2.5 2.5-5.5 4-9 4s-6.5-1.5-9-4c2.5-2.5 5.5-4 9-4s6.5 1.5 9 4z" />
                                    <path d="M13 16a4 4 0 0 1-2.5-7.5" fill="currentColor" />
                                    <path d="m3 21 18-18" />
                                </svg>
                                Tailwind CSS
                            </div>
                        )}
                        {/* Other tags as standard badges if any */}
                        {project.tags?.filter(t => !t.name.toLowerCase().includes('next') && !t.name.toLowerCase().includes('tailwind')).map((tag) => (
                            <div key={tag.id} className="inline-flex items-center rounded-full bg-secondary/50 px-2.5 py-0.5 text-[10px] font-medium text-secondary-foreground border border-border">
                                {tag.name}
                            </div>
                        ))}
                    </div>

                    <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
                        {project.short_description}
                    </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-1">
                    {project.github_url && (
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                            <Button variant="secondary" size="sm" className="rounded-lg px-5 bg-zinc-900 hover:bg-zinc-800 text-white border-zinc-700 h-9">
                                <Github className="mr-2 h-3.5 w-3.5" />
                                Code
                            </Button>
                        </a>
                    )}
                    <Link href={`/projects/${project.slug}`}>
                        <Button variant="outline" size="sm" className="rounded-lg px-5 border-zinc-700/50 hover:bg-zinc-900 transition-colors h-9">
                            <ExternalLink className="mr-2 h-3.5 w-3.5" />
                            Detalles
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
