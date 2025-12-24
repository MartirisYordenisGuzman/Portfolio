"use client"

import { Project } from "@/types/database"
import { ProjectCard } from "@/components/features/projects/ProjectCard"
import { useLanguage } from "@/providers/language-provider"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

interface ProjectsViewProps {
    projects: Project[]
}

export function ProjectsView({ projects }: ProjectsViewProps) {
    const { t } = useLanguage()

    return (
        <div className="mx-auto w-full max-w-[85vw] py-8 md:py-10">
            <div className="flex flex-col items-start gap-4 pb-8 text-left">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        {t.projects.title}
                    </h1>
                    <p className="text-muted-foreground">
                        {t.projects.description}
                    </p>
                </div>
            </div>
            {projects.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <ScrollAnimation key={project.id} className="h-full">
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
