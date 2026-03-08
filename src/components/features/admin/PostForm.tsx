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
        <form onSubmit={onSubmit} className="space-y-10 max-w-5xl mx-auto pb-20 px-4 md:px-0">
            <div className="flex flex-col md:flex-row md:items-center justify-between sticky top-0 bg-muted/60 backdrop-blur-md z-20 py-4 mb-8 border-b -mx-4 px-4 md:-mx-8 md:px-8">
                <div className="flex items-center gap-4 mb-4 md:mb-0">
                    <Button type="button" variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full bg-background/50 hover:bg-background shadow-sm border border-muted/50">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h2 className="text-3xl font-extrabold tracking-tight text-foreground/90">
                            {isEditing ? "Editar Artículo" : "Nuevo Artículo"}
                        </h2>
                        <p className="text-xs text-muted-foreground italic font-medium">
                            {isEditing ? `Modificando: ${post?.title}` : "Comparte tus conocimientos con el mundo"}
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
                        {isEditing ? "Actualizar" : "Publicar Artículo"}
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
                                Encabezado
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-1">
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80 pl-1">Título del Post</Label>
                                    <Input
                                        id="title"
                                        value={title}
                                        onChange={handleTitleChange}
                                        placeholder="Cómo dominar React en 2024"
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
                                        placeholder="como-dominar-react-2024"
                                        className="h-14 font-mono text-sm bg-muted/20 border-muted focus-visible:ring-indigo-500 rounded-xl"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 text-[#4f46e5] font-bold text-lg border-b border-muted py-2">
                                <FileText className="h-5 w-5" />
                                Cuerpo del Artículo
                            </div>
                            <div className="space-y-6 p-1">
                                <div className="space-y-2">
                                    <Label htmlFor="excerpt" className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80 pl-1">Introducción (Copete)</Label>
                                    <Textarea
                                        id="excerpt"
                                        name="excerpt"
                                        defaultValue={post?.excerpt}
                                        placeholder="Un breve resumen que atrape al lector..."
                                        className="h-24 bg-white border-muted shadow-sm focus-visible:ring-indigo-500 rounded-xl resize-none p-4 text-base leading-relaxed"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="content" className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80 pl-1">Contenido (Markdown)</Label>
                                    <Textarea
                                        id="content"
                                        name="content"
                                        defaultValue={post?.content || ""}
                                        placeholder="# Introducción..."
                                        className="min-h-[500px] font-mono bg-white border-muted shadow-sm focus-visible:ring-indigo-500 rounded-xl p-6 leading-relaxed text-base"
                                    />
                                </div>
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
                                Imagen Destacada
                            </Label>
                            <div className="rounded-2xl overflow-hidden border-2 border-dashed border-muted transition-all hover:border-indigo-400 bg-muted/5">
                                <ImageUpload
                                    value={coverImage}
                                    onChange={(url) => setCoverImage(url as string)}
                                    bucket="portfolio"
                                    folder="posts"
                                />
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
                                        Categorías
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

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="reading_time_minutes" className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80 flex items-center gap-2 pl-1 text-[#4f46e5]">
                                            <Clock className="h-4 w-4" />
                                            Tiempo de Lectura
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="reading_time_minutes"
                                                name="reading_time_minutes"
                                                type="number"
                                                defaultValue={post?.reading_time_minutes || ""}
                                                placeholder="5"
                                                className="bg-muted/20 border-none shadow-none h-12 pr-14 rounded-xl font-bold text-center"
                                            />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground font-black tracking-tighter">MINS</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="status" className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80 pl-1">Estado</Label>
                                        <Select name="status" defaultValue={post?.status || "draft"}>
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
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    )
}
