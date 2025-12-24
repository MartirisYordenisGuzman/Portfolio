import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Github, Globe, Calendar } from "lucide-react"

import { MOCK_PROJECTS } from "@/lib/dummy-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ProjectPageProps {
    params: {
        slug: string
    }
}

export function generateStaticParams() {
    return MOCK_PROJECTS.map((project) => ({
        slug: project.slug,
    }))
}

export default function ProjectPage({ params }: ProjectPageProps) {
    const project = MOCK_PROJECTS.find((p) => p.slug === params.slug)

    if (!project) {
        notFound()
    }

    return (
        <article className="container max-w-4xl py-6 lg:py-12">
            <div className="mb-4">
                <Link
                    href="/projects"
                    className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver a Proyectos
                </Link>
            </div>

            <div className="space-y-4">
                <h1 className="inline-block font-heading text-4xl lg:text-5xl">
                    {project.title}
                </h1>
                <div className="flex flex-wrap gap-2">
                    {project.tags?.map((tag) => (
                        <Badge key={tag.id} variant="secondary">
                            {tag.name}
                        </Badge>
                    ))}
                </div>
                <p className="text-xl text-muted-foreground">
                    {project.short_description}
                </p>
            </div>

            <div className="my-8 flex gap-4">
                {project.github_url && (
                    <Link href={project.github_url} target="_blank">
                        <Button>
                            <Github className="mr-2 h-4 w-4" />
                            Ver Código
                        </Button>
                    </Link>
                )}
                {project.demo_url && (
                    <Link href={project.demo_url} target="_blank">
                        <Button variant="secondary">
                            <Globe className="mr-2 h-4 w-4" />
                            Live Demo
                        </Button>
                    </Link>
                )}
            </div>

            {project.cover_image && (
                <div className="my-8 aspect-video w-full overflow-hidden rounded-lg border bg-muted">
                    <img
                        src={project.cover_image}
                        alt={project.title}
                        className="h-full w-full object-cover"
                    />
                </div>
            )}

            <div className="prose max-w-none dark:prose-invert">
                {/* In real app: <MDXRemote source={project.content} /> */}
                <div className="whitespace-pre-wrap rounded-md border p-6 bg-card text-card-foreground">
                    {project.content}
                    <p className="mt-4 italic text-muted-foreground">
                        [Aquí iría el contenido renderizado via MDX del caso de estudio completo,
                        incluyendo diagramas de arquitectura detallados y snippets de código]
                    </p>
                </div>
            </div>
        </article>
    )
}
