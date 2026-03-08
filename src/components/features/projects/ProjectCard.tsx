import Link from "next/link"
import Image from "next/image"
import { Github, ExternalLink } from "lucide-react"

import { Project } from "@/types/database"
import { Button } from "@/components/ui/button"

import { useState } from "react"
import { TechTag } from "@/components/features/projects/TechTag"

interface ProjectCardProps {
    project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
    const [showAllTags, setShowAllTags] = useState(false)
    const initialTagsCount = 4
    const hasMoreTags = (project.tags?.length || 0) > initialTagsCount
    const displayedTags = showAllTags
        ? project.tags
        : project.tags?.slice(0, initialTagsCount)

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

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2.5">
                        {displayedTags?.map((tag) => (
                            <TechTag key={tag.id} name={tag.name} />
                        ))}
                        {hasMoreTags && (
                            <button
                                onClick={() => setShowAllTags(!showAllTags)}
                                className="inline-flex items-center rounded-full bg-secondary/30 px-2.5 py-1 text-[10px] font-medium text-secondary-foreground border border-border hover:bg-secondary/50 transition-colors"
                            >
                                {showAllTags ? "Ver menos" : `+${(project.tags?.length || 0) - initialTagsCount} ver más`}
                            </button>
                        )}
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
                        <Button variant="outline" size="sm" className="rounded-lg px-5 border-zinc-700/50 hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-colors h-9">
                            <ExternalLink className="mr-2 h-3.5 w-3.5" />
                            Detalles
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
