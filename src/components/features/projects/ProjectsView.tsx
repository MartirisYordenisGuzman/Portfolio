"use client"

import { Project } from "@/types/database"
import { ProjectCard } from "@/components/features/projects/ProjectCard"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

interface ProjectsViewProps {
    projects: Project[]
}

export function ProjectsView({ projects }: ProjectsViewProps) {

    return (
        <div className="mx-auto w-full max-w-6xl py-8 md:py-10">
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
            </div>
            {projects.length > 0 ? (
                <div className="flex flex-col gap-12 md:gap-20">
                    {projects.map((project) => (
                        <ScrollAnimation key={project.id} className="w-full">
                            <ProjectCard project={project} />
                        </ScrollAnimation>
                    ))}
                </div>
            ) : (
                <div className="flex w-full justify-center py-20 text-muted-foreground">
                    No projects found yet.
                </div>
            )}
        </div>
    )
}
