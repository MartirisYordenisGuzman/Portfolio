"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { createPost, updatePost } from "@/app/admin/actions"
import { toast } from "sonner"
import { ImageUpload } from "@/components/ui/image-upload"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

import { Post, Tag } from "@/types/database"

interface PostFormProps {
    post?: Post
    isEditing?: boolean
    allTags?: Tag[]
}

export function PostForm({ post, isEditing = false, allTags = [] }: PostFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [coverImage, setCoverImage] = useState(post?.cover_image || "")
    const [selectedTags, setSelectedTags] = useState<string[]>(
        post?.tags?.map((t: Tag) => t.id) || []
    )

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

        const formData = new FormData(e.currentTarget)
        formData.set("cover_image", coverImage)
        formData.set("tags", JSON.stringify(selectedTags))

        if (isEditing && post?.id && post.published_at) {
            formData.append("existing_publish_date", post.published_at as string)
        }

        try {
            let result: { error?: string, success?: boolean } | undefined;
            if (isEditing && post?.id) {
                result = await updatePost(post.id, formData)
            } else {
                result = await createPost(formData)
            }

            if (result?.error) {
                toast.error("Error al guardar", { description: result.error })
            } else if (result?.success) {
                toast.success(isEditing ? "Post actualizado" : "Post creado")
                router.refresh()
                router.push("/admin/posts")
            }
        } catch (error: unknown) {
            console.error(error)
            if (error instanceof Error && error.message === 'NEXT_REDIRECT') return
            toast.error("Algo salió mal", {
                description: error instanceof Error ? error.message : "Unknown error"
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-8 max-w-2xl bg-card p-6 rounded-lg border shadow-sm">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Título</Label>
                    <Input
                        id="title"
                        name="title"
                        defaultValue={post?.title}
                        placeholder="Título del artículo..."
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="slug">Slug (URL)</Label>
                    <Input
                        id="slug"
                        name="slug"
                        defaultValue={post?.slug}
                        placeholder="titulo-del-articulo"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="excerpt">Copete (Resumen)</Label>
                    <Textarea
                        id="excerpt"
                        name="excerpt"
                        defaultValue={post?.excerpt}
                        placeholder="Breve introducción..."
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="content">Contenido (Markdown)</Label>
                    <Textarea
                        id="content"
                        name="content"
                        defaultValue={post?.content || ""}
                        placeholder="# Contenido..."
                        className="min-h-[300px] font-mono"
                    />
                </div>

                <div className="space-y-2">
                    <Label>Categorías (Tags)</Label>
                    <div className="flex flex-wrap gap-2 border p-4 rounded-md bg-background min-h-[60px]">
                        {allTags.length > 0 ? (
                            allTags.map(tag => {
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
                            <span className="text-sm text-muted-foreground italic">No hay tags disponibles.</span>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Imagen de Portada</Label>
                        <ImageUpload
                            value={coverImage}
                            onChange={setCoverImage}
                            bucket="portfolio"
                            folder="posts"
                        />
                        <input type="hidden" name="cover_image" value={coverImage} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="reading_time_minutes">Tiempo de Lectura (min)</Label>
                        <Input
                            id="reading_time_minutes"
                            name="reading_time_minutes"
                            type="number"
                            defaultValue={post?.reading_time_minutes || ""}
                            placeholder="5"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="status">Estado</Label>
                    <Select name="status" defaultValue={post?.status || "draft"}>
                        <SelectTrigger>
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
                    {loading ? "Guardando..." : (isEditing ? "Actualizar Post" : "Crear Post")}
                </Button>
            </div>
        </form>
    )
}
