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

        // Reset slug and re-enable auto-completion if title is cleared
        if (title === "") {
            setSlug("")
            setIsAutoSlug(true)
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
        <form onSubmit={onSubmit} className="space-y-10 max-w-5xl mx-auto pb-20 px-4 md:px-0">
            <div className="flex flex-col md:flex-row md:items-center justify-between sticky top-0 bg-muted/60 backdrop-blur-md z-20 py-4 mb-8 border-b -mx-4 px-4 md:-mx-8 md:px-8">
                <div className="flex items-center gap-4 mb-4 md:mb-0">
                    <Button type="button" variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full bg-background/50 hover:bg-background shadow-sm border border-muted/50">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h2 className="text-3xl font-extrabold tracking-tight text-foreground/90">
                            {isEditing ? "Editar Proyecto" : "Nuevo Proyecto"}
                        </h2>
                        <p className="text-xs text-muted-foreground italic font-medium">
                            {isEditing ? `Modificando: ${project?.title}` : "Crea un nuevo trabajo para tu portafolio"}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button type="button" variant="outline" onClick={() => router.back()} className="bg-background/50 hover:bg-white transition-all shadow-sm">
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="gap-2 shadow-lg bg-[#5b46e8] hover:bg-[#4a36d7] text-white px-6 font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        {loading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Save className="h-4 w-4" />
                        )}
                        {isEditing ? "Actualizar" : "Gurdar Proyecto"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-10">
                    <div className="space-y-8">
                        {/* Info Section */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 text-[#4f46e5] font-bold text-lg border-b border-muted py-2">
                                <Type className="h-5 w-5" />
                                Información Básica
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-1">
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80 pl-1">Título</Label>
                                    <Input
                                        id="title"
                                        value={title}
                                        onChange={handleTitleChange}
                                        placeholder="Ej: E-commerce Moderno"
                                        className="h-14 text-lg font-semibold bg-white border-muted shadow-sm focus-visible:ring-indigo-500 rounded-xl transition-all"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between pl-1">
                                        <Label htmlFor="slug" className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80">Slug (URL)</Label>
                                        {isAutoSlug && !isEditing && (
                                            <Badge variant="secondary" className="text-[10px] h-4 font-bold bg-indigo-50 text-indigo-600 border-none px-1.5">AUTO</Badge>
                                        )}
                                    </div>
                                    <Input
                                        id="slug"
                                        value={slug}
                                        onChange={handleSlugChange}
                                        placeholder="e-commerce-moderno"
                                        className="h-14 font-mono text-sm bg-muted/20 border-muted focus-visible:ring-indigo-500 rounded-xl"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Description Section */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 text-[#4f46e5] font-bold text-lg border-b border-muted py-2">
                                <FileText className="h-5 w-5" />
                                Descripciones
                            </div>
                            <div className="space-y-6 p-1">
                                <div className="space-y-2">
                                    <Label htmlFor="short_description" className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80 pl-1">Descripción Corta</Label>
                                    <Textarea
                                        id="short_description"
                                        name="short_description"
                                        defaultValue={project?.short_description ?? ""}
                                        placeholder="Resumen ejecutivo para la tarjeta de presentación..."
                                        className="h-24 bg-white border-muted shadow-sm focus-visible:ring-indigo-500 rounded-xl resize-none p-4 text-base leading-relaxed"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="content" className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80 pl-1">Contenido Detallado (Markdown)</Label>
                                    <Textarea
                                        id="content"
                                        name="content"
                                        defaultValue={project?.content ?? ""}
                                        placeholder="# Detalles del proyecto..."
                                        className="min-h-[400px] font-mono bg-white border-muted shadow-sm focus-visible:ring-indigo-500 rounded-xl p-6 leading-relaxed"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Gallery Section */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 text-[#4f46e5] font-bold text-lg border-b border-muted py-2">
                                <ImageIcon className="h-5 w-5" />
                                Galería del Proyecto
                            </div>
                            <div className="p-8 border-2 border-dashed rounded-3xl bg-muted/10 border-muted/50 transition-colors hover:bg-muted/20">
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
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-10">
                    {/* Cover Section */}
                    <Card className="border-muted/50 shadow-xl rounded-3xl overflow-hidden bg-white/50 backdrop-blur-sm">
                        <CardContent className="p-8 space-y-6">
                            <Label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80 flex items-center gap-2">
                                <ImageIcon className="h-4 w-4" />
                                Imagen de Portada
                            </Label>
                            <div className="rounded-2xl overflow-hidden border-2 border-dashed border-muted transition-all hover:border-indigo-400 bg-muted/5">
                                <ImageUpload
                                    value={coverImage}
                                    onChange={(url) => setCoverImage(url as string)}
                                    bucket="portfolio"
                                    folder="projects"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Links Section */}
                    <Card className="border-muted/50 shadow-lg rounded-3xl bg-white/50 backdrop-blur-sm">
                        <CardContent className="p-8 space-y-8">
                            <Label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80 flex items-center gap-2">
                                <LinkIcon className="h-4 w-4 text-indigo-500" />
                                Enlaces Externos
                            </Label>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="github_url" className="text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-wider pl-1">GitHub</Label>
                                    <div className="relative group">
                                        <Github className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                                        <Input
                                            id="github_url"
                                            name="github_url"
                                            defaultValue={project?.github_url ?? ""}
                                            placeholder="https://github.com/..."
                                            className="pl-12 h-12 bg-muted/20 border-none shadow-none focus-visible:ring-1 focus-visible:ring-indigo-500/50 rounded-xl"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="demo_url" className="text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-wider pl-1">Live Demo</Label>
                                    <div className="relative group">
                                        <Layout className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                                        <Input
                                            id="demo_url"
                                            name="demo_url"
                                            defaultValue={project?.demo_url ?? ""}
                                            placeholder="https://..."
                                            className="pl-12 h-12 bg-muted/20 border-none shadow-none focus-visible:ring-1 focus-visible:ring-indigo-500/50 rounded-xl"
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Metadata Section */}
                    <Card className="border-muted/50 shadow-lg rounded-3xl bg-white/50 backdrop-blur-sm">
                        <CardContent className="p-8 space-y-8">
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <Label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80 flex items-center gap-2">
                                        <TagsIcon className="h-4 w-4 text-indigo-500" />
                                        Etiquetas (Tags)
                                    </Label>
                                    <div className="flex flex-wrap gap-2.5 p-5 rounded-2xl border-2 border-dashed border-muted bg-transparent min-h-[140px]">
                                        {allTags.length > 0 ? (
                                            allTags.map((tag) => {
                                                const isSelected = selectedTags.includes(tag.id)
                                                return (
                                                    <Badge
                                                        key={tag.id}
                                                        variant={isSelected ? "default" : "outline"}
                                                        className={cn(
                                                            "cursor-pointer hover:scale-110 transition-all select-none h-8 px-4 font-semibold text-xs rounded-full",
                                                            isSelected ? "bg-indigo-600 text-white border-none shadow-md" : "bg-white/80 text-muted-foreground/80 border-muted-foreground/20 hover:bg-muted/30"
                                                        )}
                                                        onClick={() => toggleTag(tag.id)}
                                                    >
                                                        {tag.name}
                                                        {isSelected && <Check className="ml-2 h-3 w-3" />}
                                                    </Badge>
                                                )
                                            })
                                        ) : (
                                            <p className="text-[11px] text-muted-foreground italic text-center w-full py-8">No hay etiquetas disponibles</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <Label htmlFor="status" className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80 pl-1">Estado de Publicación</Label>
                                    <Select name="status" defaultValue={project?.status || "draft"}>
                                        <SelectTrigger className="h-12 bg-muted/20 border-none shadow-none focus:ring-1 focus:ring-indigo-500/50 rounded-xl px-4">
                                            <SelectValue placeholder="Seleccionar" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl border-muted">
                                            <SelectItem value="draft" className="py-3 focus:bg-indigo-50 transition-colors">Borrador (Draft)</SelectItem>
                                            <SelectItem value="published" className="py-3 focus:bg-emerald-50 transition-colors">Publicado</SelectItem>
                                            <SelectItem value="archived" className="py-3 focus:bg-red-50 transition-colors">Archivado</SelectItem>
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
