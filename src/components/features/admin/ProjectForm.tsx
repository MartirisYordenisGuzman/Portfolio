"use client"

import { useState } from "react"
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
import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProjectFormProps {
    project?: any
    isEditing?: boolean
    allTags?: any[]
}

export function ProjectForm({ project, isEditing = false, allTags = [] }: ProjectFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [coverImage, setCoverImage] = useState(project?.cover_image || "")
    // Tags state: array of tag IDs
    // Tags state: array of tag IDs
    const [selectedTags, setSelectedTags] = useState<string[]>(
        project?.tags?.map((t: any) => t.id) || []
    )

    const toggleTag = (tagId: string) => {
        setSelectedTags(prev =>
            prev.includes(tagId)
                ? prev.filter(id => id !== tagId)
                : [...prev, tagId]
        )
    }

    const [galleryImages, setGalleryImages] = useState<string[]>(
        project?.gallery_images?.map((img: any) => img.url) || []
    )

    const addGalleryImage = () => {
        setGalleryImages([...galleryImages, ""])
    }

    const updateGalleryImage = (index: number, url: string) => {
        const newImages = [...galleryImages]
        newImages[index] = url
        setGalleryImages(newImages)
    }

    const removeGalleryImage = (index: number) => {
        const newImages = [...galleryImages]
        newImages.splice(index, 1)
        setGalleryImages(newImages)
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)

        try {
            const formData = new FormData(e.currentTarget)
            // Ensure cover_image is set
            formData.set("cover_image", coverImage)
            // Ensure tags are set
            formData.set("tags", JSON.stringify(selectedTags))
            // Ensure gallery images are set (filter out empty strings)
            formData.set("gallery_images", JSON.stringify(galleryImages.filter(url => url !== "")))

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
        } catch (error: any) {
            console.error(error)
            // If it's a redirect error (which shouldn't happen now), ignore it
            if (error.message === 'NEXT_REDIRECT') return;

            toast.error("Algo salió mal", {
                description: error.message || "Error desconocido"
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-8 max-w-2xl bg-card p-6 rounded-lg border shadow-sm">
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Título</Label>
                        <Input
                            id="title"
                            name="title"
                            defaultValue={project?.title}
                            placeholder="Mi Proyecto Increíble"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="slug">Slug (URL)</Label>
                        <Input
                            id="slug"
                            name="slug"
                            defaultValue={project?.slug}
                            placeholder="mi-proyecto-increible"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="short_description">Descripción Corta</Label>
                    <Textarea
                        id="short_description"
                        name="short_description"
                        defaultValue={project?.short_description}
                        placeholder="Resumen para la tarjeta..."
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="content">Contenido (Markdown)</Label>
                    <Textarea
                        id="content"
                        name="content"
                        defaultValue={project?.content}
                        placeholder="# Detalles del proyecto..."
                        className="min-h-[200px] font-mono"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="github_url">Repositorio GitHub</Label>
                        <Input
                            id="github_url"
                            name="github_url"
                            defaultValue={project?.github_url}
                            placeholder="https://github.com/..."
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="demo_url">Demo URL</Label>
                        <Input
                            id="demo_url"
                            name="demo_url"
                            defaultValue={project?.demo_url}
                            placeholder="https://..."
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Imagen Portada</Label>
                    <ImageUpload
                        value={coverImage}
                        onChange={setCoverImage}
                        bucket="portfolio"
                        folder="projects"
                    />
                </div>

                <div className="space-y-2">
                    <Label>Galería de Imágenes</Label>
                    <div className="space-y-3">
                        {galleryImages.map((url, index) => (
                            <div key={index} className="flex gap-2 items-start">
                                <div className="flex-1">
                                    <ImageUpload
                                        value={url}
                                        onChange={(newUrl) => updateGalleryImage(index, newUrl)}
                                        bucket="portfolio"
                                        folder="projects/gallery"
                                    />
                                </div>
                                <Button type="button" variant="destructive" size="icon" onClick={() => removeGalleryImage(index)}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={addGalleryImage} className="w-full">
                            + Agregar Imagen a Galería
                        </Button>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Etiquetas (Tags)</Label>
                    <div className="flex flex-wrap gap-2 p-3 border rounded-md min-h-[60px] bg-background">
                        {allTags.length > 0 ? (
                            allTags.map((tag) => {
                                const isSelected = selectedTags.includes(tag.id)
                                return (
                                    <Badge
                                        key={tag.id}
                                        variant={isSelected ? "default" : "outline"}
                                        className={cn(
                                            "cursor-pointer hover:bg-primary/90 transition-all select-none",
                                            !isSelected && "hover:bg-accent text-muted-foreground"
                                        )}
                                        onClick={() => toggleTag(tag.id)}
                                    >
                                        {tag.name}
                                        {isSelected && <Check className="ml-1 h-3 w-3" />}
                                    </Badge>
                                )
                            })
                        ) : (
                            <p className="text-sm text-muted-foreground italic">No hay etiquetas disponibles</p>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="status">Estado</Label>
                    <Select name="status" defaultValue={project?.status || "draft"}>
                        <SelectTrigger suppressHydrationWarning>
                            <SelectValue placeholder="Seleccionar estado" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="draft">Borrador (Draft)</SelectItem>
                            <SelectItem value="published">Publicado</SelectItem>
                            <SelectItem value="archived">Archivado</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancelar
                </Button>
                <Button type="submit" disabled={loading}>
                    {loading ? "Guardando..." : (isEditing ? "Actualizar Proyecto" : "Crear Proyecto")}
                </Button>
            </div>
        </form>
    )
}
