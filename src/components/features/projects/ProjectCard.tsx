import Link from "next/link"
import { Github, Globe, ArrowRight } from "lucide-react"

import { Project } from "@/types/database"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface ProjectCardProps {
    project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Card className="flex h-full flex-col overflow-hidden transition-all hover:border-foreground/50 hover:shadow-md">
            {/* Image placeholder or real image would go here */}
            <div className="aspect-video w-full overflow-hidden bg-muted">
                {project.cover_image && (
                    <img
                        src={project.cover_image}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                )}
            </div>
            <CardHeader>
                <div className="space-y-1">
                    <CardTitle className="line-clamp-1">{project.title}</CardTitle>
                    <div className="flex flex-wrap gap-2">
                        {project.tags?.map((tag) => (
                            <Badge key={tag.id} variant="secondary" className="text-xs">
                                {tag.name}
                            </Badge>
                        ))}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-1">
                <CardDescription className="line-clamp-3">
                    {project.short_description}
                </CardDescription>
            </CardContent>
            <CardFooter className="flex items-center justify-between gap-2">
                <Link href={`/projects/${project.slug}`} className="w-full">
                    <Button variant="outline" className="w-full group">
                        Ver Detalles
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}
