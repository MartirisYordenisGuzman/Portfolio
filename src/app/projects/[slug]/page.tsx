import { Project } from "@/types/database"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Github, Globe, Calendar, Clock, ArrowLeft } from "lucide-react"
import { MDXRemote } from "next-mdx-remote/rsc"

import { getProjects, getProjectBySlug } from "@/lib/api/projects"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import { Tag } from "@/types/database"
import { ImageGallery } from "@/components/features/projects/ImageGallery"

interface ProjectPageProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateStaticParams() {
    const projects = await getProjects()
    return projects.map((project) => ({
        slug: project.slug,
    }))
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params
    const project = await getProjectBySlug(slug)

    if (!project) {
        notFound()
    }

    return (
        <article className="min-h-screen pb-20 pt-10 md:pt-24 animate-in fade-in duration-700 slide-in-from-bottom-4">
            {/* Main Reading Column */}
            <div className="container max-w-3xl mx-auto px-6 md:px-0">

                {/* Back Link */}
                <div className="mb-8 md:mb-12">
                    <Link
                        href="/projects"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Volver a Proyectos
                    </Link>
                </div>

                {/* Article Header */}
                <header className="space-y-6 md:space-y-8 mb-12 md:mb-16">
                    <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
                        {project.title}
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
                        {project.short_description}
                    </p>

                    {/* Meta / Author Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-8 border-y gap-6 mt-8 md:mt-10">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm text-muted-foreground">
                            {project.published_at && (
                                <div className="flex items-center">
                                    <span className="font-medium text-foreground mr-2">Publicado</span>
                                    <span>{formatDate(project.published_at)}</span>
                                </div>
                            )}
                            <span className="hidden sm:inline text-muted-foreground/40">•</span>
                            <div className="flex items-center gap-2">
                                <Clock className="h-[10px] w-[10px]" />
                                <span>5 min de lectura</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            {project.demo_url && (
                                <Link href={project.demo_url} target="_blank">
                                    <Button variant="outline" size="sm" className="rounded-full h-9 w-9 p-0" title="Ver Demo">
                                        <Globe className="h-4 w-4" />
                                        <span className="sr-only">Live Demo</span>
                                    </Button>
                                </Link>
                            )}
                            {project.github_url && (
                                <Link href={project.github_url} target="_blank">
                                    <Button variant="outline" size="sm" className="rounded-full h-9 w-9 p-0" title="Ver Código">
                                        <Github className="h-4 w-4" />
                                        <span className="sr-only">Github Code</span>
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </header>

                {/* Image Gallery */}
                {(project.cover_image || (project.gallery_images && project.gallery_images.length > 0)) && (
                    <figure className="mb-16 md:mb-24">
                        <ImageGallery
                            images={[project.cover_image || "", ...(project.gallery_images?.map(img => img.url) || [])].filter(Boolean)}
                            title={project.title}
                        />
                        <figcaption className="mt-4 text-center text-sm text-muted-foreground italic">
                            {project.title} Preview
                        </figcaption>
                    </figure>
                )}

                {/* Content */}
                <div className="prose prose-base md:prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-primary prose-img:rounded-lg leading-loose space-y-6">
                    {project.content ? (
                        <MDXRemote source={project.content} />
                    ) : (
                        <p className="italic text-muted-foreground text-center py-10">
                            Sin contenido detallado disponible.
                        </p>
                    )}
                </div>

                {/* Footer Tags */}
                <div className="mt-16 md:mt-24 py-12 border-t">
                    <div className="flex flex-wrap gap-2">
                        {project.tags?.map((tag: Tag) => (
                            <Badge key={tag.id} variant="secondary" className="px-3 py-1 text-sm font-normal rounded-full">
                                {tag.name}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>
        </article>
    )
}
