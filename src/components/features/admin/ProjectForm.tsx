"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createProject, updateProject } from "@/app/admin/actions"
import { toast } from "sonner"
import { ImageUpload } from "@/components/ui/image-upload"
import { Badge } from "@/components/ui/badge"
import {
    Check,
    Link as LinkIcon,
    Github,
    Layout,
    Type,
    FileText,
    Image as ImageIcon,
    Tags as TagsIcon,
    Save,
    ArrowLeft
} from "lucide-react"
import { Project, Tag } from "@/types/database"
import { cn, slugify } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

interface ProjectFormProps {
    project?: Project
    isEditing?: boolean
    allTags?: Tag[]
}

const EMPTY_TAGS: Tag[] = []

export function ProjectForm({ project, isEditing = false, allTags = EMPTY_TAGS }: ProjectFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState(project?.title || "")
    const [slug, setSlug] = useState(project?.slug || "")
    const [isAutoSlug, setIsAutoSlug] = useState(!isEditing)
    const [coverImage, setCoverImage] = useState(project?.cover_image || "")
    const [selectedTags, setSelectedTags] = useState<string[]>(
        project?.tags?.map((t: Tag) => t.id) || []
    )
    const [galleryImages, setGalleryImages] = useState<string[]>(
        project?.gallery_images?.map((img) => img.url) || []
    )

    // Auto-slug generation
    useEffect(() => {
        if (isAutoSlug && !isEditing) {
            setSlug(slugify(title))
        }
    }, [title, isAutoSlug, isEditing])

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSlug(e.target.value)
        setIsAutoSlug(false)
    }

    const toggleTag = (tagId: string) => {
        setSelectedTags(prev =>
            prev.includes(tagId)
                ? prev.filter(id => id !== tagId)
                : [...prev, tagId]
        )
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)

        try {
            const formData = new FormData(e.currentTarget)
            formData.set("title", title)
            formData.set("slug", slug)
            formData.set("cover_image", coverImage)
            formData.set("tags", JSON.stringify(selectedTags))
            formData.set("gallery_images", JSON.stringify(galleryImages))

            let result: { error?: string, success?: boolean } | undefined;

            if (isEditing && project?.id) {
                result = await updateProject(project.id, formData)
            } else {
                result = await createProject(formData)
            }

            if (result?.error) {
                toast.error("Error al guardar", { description: result.error })
            } else if (result?.success) {
                toast.success(isEditing ? "Proyecto actualizado" : "Proyecto creado")
                router.refresh()
                router.push("/admin/projects")
            }
        } catch (error: unknown) {
            console.error(error)
            if (error instanceof Error && error.message === 'NEXT_REDIRECT') return;
            toast.error("Algo salió mal", {
                description: error instanceof Error ? error.message : "Error desconocido"
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-10 max-w-4xl mx-auto pb-20">
            <div className="flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-10 py-4 mb-4 border-b">
                <div className="flex items-center gap-4">
                    <Button type="button" variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">
                            {isEditing ? "Editar Proyecto" : "Nuevo Proyecto"}
                        </h2>
                        <p className="text-xs text-muted-foreground italic">
                            {isEditing ? `Modificando: ${project?.title}` : "Crea un nuevo trabajo para tu portafolio"}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                        Cancelar
                    </Button>
                    <Button type="submit" disabled={loading} className="gap-2 shadow-sm">
                        {loading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Save className="h-4 w-4" />
                        )}
                        {isEditing ? "Actualizar" : "Gurdar Proyecto"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-8">
                    <Card className="border-none shadow-none bg-transparent">
                        <CardContent className="p-0 space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                                    <Type className="h-4 w-4" />
                                    Información Básica
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="title" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Título</Label>
                                        <Input
                                            id="title"
                                            value={title}
                                            onChange={handleTitleChange}
                                            placeholder="Ej: E-commerce Moderno"
                                            className="h-12 text-lg font-medium bg-card"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="slug" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Slug (URL)</Label>
                                            {isAutoSlug && !isEditing && (
                                                <Badge variant="secondary" className="text-[10px] h-4 font-normal">Auto-generado</Badge>
                                            )}
                                        </div>
                                        <Input
                                            id="slug"
                                            value={slug}
                                            onChange={handleSlugChange}
                                            placeholder="e-commerce-moderno"
                                            className="h-12 font-mono text-sm bg-muted/30"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                                    <FileText className="h-4 w-4" />
                                    Descripciones
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="short_description" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Descripción Corta</Label>
                                        <Textarea
                                            id="short_description"
                                            name="short_description"
                                            defaultValue={project?.short_description ?? ""}
                                            placeholder="Resumen ejecutivo para la tarjeta de presentación..."
                                            className="bg-card resize-none"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="content" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Contenido Detallado (Markdown)</Label>
                                        <Textarea
                                            id="content"
                                            name="content"
                                            defaultValue={project?.content ?? ""}
                                            placeholder="# Detalles del proyecto..."
                                            className="min-h-[300px] font-mono bg-card leading-relaxed"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                                    <ImageIcon className="h-4 w-4" />
                                    Galería del Proyecto
                                </div>
                                <div className="p-4 border-2 border-dashed rounded-xl bg-muted/20">
                                    <ImageUpload
                                        value={galleryImages}
                                        onChange={(urls) => setGalleryImages(urls as string[])}
                                        multiple
                                        maxImages={8}
                                        bucket="portfolio"
                                        folder="projects/gallery"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-8">
                    {/* Cover Section */}
                    <Card className="border-muted/50 overflow-hidden">
                        <CardContent className="p-6 space-y-4">
                            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                <ImageIcon className="h-3.5 w-3.5" />
                                Imagen de Portada
                            </Label>
                            <ImageUpload
                                value={coverImage}
                                onChange={(url) => setCoverImage(url as string)}
                                bucket="portfolio"
                                folder="projects"
                            />
                        </CardContent>
                    </Card>

                    {/* Links Section */}
                    <Card className="border-muted/50">
                        <CardContent className="p-6 space-y-6">
                            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                <LinkIcon className="h-3.5 w-3.5" />
                                Enlaces Externos
                            </Label>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="github_url" className="text-[11px] font-medium text-muted-foreground">GitHub</Label>
                                    <div className="relative">
                                        <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="github_url"
                                            name="github_url"
                                            defaultValue={project?.github_url ?? ""}
                                            placeholder="https://github.com/..."
                                            className="pl-9 h-10 bg-muted/20 border-none shadow-none focus-visible:ring-1"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="demo_url" className="text-[11px] font-medium text-muted-foreground">Live Demo</Label>
                                    <div className="relative">
                                        <Layout className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="demo_url"
                                            name="demo_url"
                                            defaultValue={project?.demo_url ?? ""}
                                            placeholder="https://..."
                                            className="pl-9 h-10 bg-muted/20 border-none shadow-none focus-visible:ring-1"
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Metadata Section */}
                    <Card className="border-muted/50">
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2 mb-3">
                                        <TagsIcon className="h-3.5 w-3.5" />
                                        Etiquetas (Tags)
                                    </Label>
                                    <div className="flex flex-wrap gap-2 p-3 rounded-xl border bg-muted/10 min-h-[100px]">
                                        {allTags.length > 0 ? (
                                            allTags.map((tag) => {
                                                const isSelected = selectedTags.includes(tag.id)
                                                return (
                                                    <Badge
                                                        key={tag.id}
                                                        variant={isSelected ? "default" : "outline"}
                                                        className={cn(
                                                            "cursor-pointer hover:scale-105 transition-all select-none h-7",
                                                            !isSelected && "bg-background/50 text-muted-foreground border-dashed"
                                                        )}
                                                        onClick={() => toggleTag(tag.id)}
                                                    >
                                                        {tag.name}
                                                        {isSelected && <Check className="ml-1.5 h-3 w-3" />}
                                                    </Badge>
                                                )
                                            })
                                        ) : (
                                            <p className="text-[11px] text-muted-foreground italic text-center w-full py-4">No hay etiquetas disponibles</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2 pt-2">
                                    <Label htmlFor="status" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Estado de Publicación</Label>
                                    <Select name="status" defaultValue={project?.status || "draft"}>
                                        <SelectTrigger className="h-10 bg-muted/20 border-none shadow-none focus:ring-1">
                                            <SelectValue placeholder="Seleccionar" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="draft">Borrador (Draft)</SelectItem>
                                            <SelectItem value="published">Publicado</SelectItem>
                                            <SelectItem value="archived">Archivado</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    )
}

function Loader2(props: { className?: string }) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
    )
}
