"use client"

import { useState, useEffect } from "react"
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
import {
    Check,
    FileText,
    Type,
    ImageIcon,
    Tags as TagsIcon,
    Clock,
    Save,
    ArrowLeft,
    Loader2
} from "lucide-react"
import { cn, slugify } from "@/lib/utils"
import { Post, Tag } from "@/types/database"
import { Card, CardContent } from "@/components/ui/card"

interface PostFormProps {
    post?: Post
    isEditing?: boolean
    allTags?: Tag[]
}

const EMPTY_TAGS: Tag[] = []

export function PostForm({ post, isEditing = false, allTags = EMPTY_TAGS }: PostFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState(post?.title || "")
    const [slug, setSlug] = useState(post?.slug || "")
    const [isAutoSlug, setIsAutoSlug] = useState(!isEditing)
    const [coverImage, setCoverImage] = useState(post?.cover_image || "")
    const [selectedTags, setSelectedTags] = useState<string[]>(
        post?.tags?.map((t: Tag) => t.id) || []
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
            formData.set("cover_image", coverImage || "")
            formData.set("tags", JSON.stringify(selectedTags))

            if (isEditing && post?.id && post.published_at) {
                formData.append("existing_publish_date", post.published_at as string)
            }

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
                            {isEditing ? "Editar Artículo" : "Nuevo Artículo"}
                        </h2>
                        <p className="text-xs text-muted-foreground italic">
                            {isEditing ? `Modificando: ${post?.title}` : "Comparte tus conocimientos con el mundo"}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                        Cancelar
                    </Button>
                    <Button type="submit" disabled={loading} className="gap-2 shadow-sm font-semibold">
                        {loading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Save className="h-4 w-4" />
                        )}
                        {isEditing ? "Actualizar" : "Publicar"}
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
                                    Encabezado
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="title" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Título del Post</Label>
                                        <Input
                                            id="title"
                                            value={title}
                                            onChange={handleTitleChange}
                                            placeholder="Cómo dominar React en 2024"
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
                                            placeholder="como-dominar-react-2024"
                                            className="h-12 font-mono text-sm bg-muted/30"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                                    <FileText className="h-4 w-4" />
                                    Cuerpo del Artículo
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="excerpt" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Introducción (Copete)</Label>
                                        <Textarea
                                            id="excerpt"
                                            name="excerpt"
                                            defaultValue={post?.excerpt}
                                            placeholder="Un breve resumen que atrape al lector..."
                                            className="bg-card resize-none"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="content" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Contenido (Markdown)</Label>
                                        <Textarea
                                            id="content"
                                            name="content"
                                            defaultValue={post?.content || ""}
                                            placeholder="# Introducción..."
                                            className="min-h-[500px] font-mono bg-card leading-relaxed text-base"
                                        />
                                    </div>
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
                                Imagen Destacada
                            </Label>
                            <ImageUpload
                                value={coverImage}
                                onChange={(url) => setCoverImage(url as string)}
                                bucket="portfolio"
                                folder="posts"
                            />
                        </CardContent>
                    </Card>

                    {/* Metadata Section */}
                    <Card className="border-muted/50">
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2 mb-3">
                                        <TagsIcon className="h-3.5 w-3.5" />
                                        Categorías
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

                                <div className="space-y-4 pt-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="reading_time_minutes" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                            <Clock className="h-3.5 w-3.5" />
                                            Tiempo de Lectura
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="reading_time_minutes"
                                                name="reading_time_minutes"
                                                type="number"
                                                defaultValue={post?.reading_time_minutes || ""}
                                                placeholder="5"
                                                className="bg-muted/20 border-none shadow-none h-10 pr-10"
                                            />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground font-bold">MINS</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="status" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Estado</Label>
                                        <Select name="status" defaultValue={post?.status || "draft"}>
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
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    )
}
