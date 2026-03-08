"use client"

import { useState, useMemo } from "react"
import { Project } from "@/types/database"
import { ProjectCard } from "@/components/features/projects/ProjectCard"
import { TechTag } from "@/components/features/projects/TechTag"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { Button } from "@/components/ui/button"
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion"

interface ProjectsViewProps {
    projects: Project[]
    isHome?: boolean
}

export function ProjectsView({ projects, isHome = false }: ProjectsViewProps) {
    const [selectedTag, setSelectedTag] = useState<string | null>(null)
    const [visibleCount, setVisibleCount] = useState<number>(isHome ? 2 : 3)

    const allTags = useMemo(() => {
        const tags = new Set<string>()
        projects.forEach(project => {
            project.tags?.forEach(tag => tags.add(tag.name))
        })
        return Array.from(tags).sort()
    }, [projects])

    const filteredProjects = useMemo(() => {
        if (!selectedTag) return projects
        return projects.filter(project =>
            project.tags?.some(tag => tag.name === selectedTag)
        )
    }, [projects, selectedTag])

    const visibleProjects = filteredProjects.slice(0, visibleCount)
    const hasMore = visibleCount < filteredProjects.length

    const handleTagSelect = (tag: string | null) => {
        setSelectedTag(tag)
        setVisibleCount(isHome ? 2 : 3) // Reset visibility when filter changes
    }

    return (
        <div className="mx-auto w-full max-w-6xl px-4 md:px-0 py-8 md:py-10">
            <div className="flex flex-col items-start gap-4 pb-10 text-left">
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl font-mono text-primary/80 font-bold">&lt;/&gt;</span>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Proyectos
                        </h1>
                    </div>
                    <p className="text-muted-foreground text-base">
                        Una selección de soluciones técnicas y arquitecturas que he diseñado.
                    </p>
                </div>

                {allTags.length > 0 && (
                    <div className="flex flex-wrap gap-2.5 pt-2">
                        <TechTag
                            name="Todos"
                            isFilter
                            active={selectedTag === null}
                            onClick={() => handleTagSelect(null)}
                            className="text-xs h-7 px-4"
                        />
                        {allTags.map(tag => (
                            <TechTag
                                key={tag}
                                name={tag}
                                isFilter
                                active={selectedTag === tag}
                                onClick={() => handleTagSelect(tag)}
                                className="text-xs h-7 px-4"
                            />
                        ))}
                    </div>
                )}
            </div>
            {filteredProjects.length > 0 ? (
                <LazyMotion features={domAnimation}>
                    <m.div layout className="flex flex-col gap-12 md:gap-20">
                        <AnimatePresence mode="popLayout">
                            {visibleProjects.map((project) => (
                                <m.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full"
                                >
                                    <ScrollAnimation className="w-full">
                                        <ProjectCard project={project} />
                                    </ScrollAnimation>
                                </m.div>
                            ))}
                        </AnimatePresence>

                        {hasMore && (
                            <m.div layout className="flex justify-center pt-8">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="rounded-full px-8"
                                    onClick={() => setVisibleCount(prev => prev + 3)}
                                >
                                    Ver más proyectos
                                </Button>
                            </m.div>
                        )}
                    </m.div>
                </LazyMotion>
            ) : (
                <div className="flex w-full justify-center py-20 text-muted-foreground">
                    No projects found yet.
                </div>
            )}
        </div>
    )
}
