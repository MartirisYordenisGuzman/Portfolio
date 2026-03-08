"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createTag, updateTag } from "@/app/admin/actions"
import { toast } from "sonner"
import { Tag } from "@/types/database"
import { slugify } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tag as TagIcon, Save, Loader2, Sparkles } from "lucide-react"

interface TagFormProps {
    tag?: Tag
    isEditing?: boolean
}

export function TagForm({ tag, isEditing = false }: TagFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState(tag?.name || "")
    const [slug, setSlug] = useState(tag?.slug || "")
    const [isAutoSlug, setIsAutoSlug] = useState(!isEditing)

    // Auto-slug generation
    useEffect(() => {
        if (isAutoSlug && !isEditing) {
            setSlug(slugify(name))
        }

        // Reset slug and re-enable auto-completion if name is cleared
        if (name === "") {
            setSlug("")
            setIsAutoSlug(true)
        }
    }, [name, isAutoSlug, isEditing])

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSlug(e.target.value)
        setIsAutoSlug(false)
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        formData.set("name", name)
        formData.set("slug", slug)

        try {
            let result;
            if (isEditing && tag?.id) {
                result = await updateTag(tag.id, formData)
            } else {
                result = await createTag(formData)
            }

            if (result?.error) {
                toast.error("Error al guardar", { description: result.error })
            } else if (result?.success) {
                toast.success(isEditing ? "Etiqueta actualizada" : "Etiqueta creada")
                router.refresh()
                router.push("/admin/tags")
            }
        } catch (error) {
            console.error(error)
            toast.error("Algo salió mal")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="max-w-xl mx-auto border-muted/50 shadow-2xl rounded-3xl overflow-hidden bg-white/80 backdrop-blur-md">
            <CardHeader className="bg-muted/30 border-b p-8">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-100 rounded-2xl">
                        <TagIcon className="h-6 w-6 text-[#4f46e5]" />
                    </div>
                    <div>
                        <CardTitle className="text-2xl font-extrabold tracking-tight">
                            {isEditing ? "Editar Etiqueta" : "Nueva Etiqueta"}
                        </CardTitle>
                        <CardDescription className="font-medium">Define etiquetas para categorizar tus proyectos y posts.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-10">
                <form onSubmit={onSubmit} className="space-y-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80 pl-1">Nombre</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={handleNameChange}
                                placeholder="React, UI/UX, Fotografía..."
                                className="h-14 bg-white border-muted shadow-sm focus-visible:ring-indigo-500 rounded-xl transition-all font-semibold"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between pl-1">
                                <Label htmlFor="slug" className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80">Slug (URL)</Label>
                                {isAutoSlug && !isEditing && (
                                    <div className="flex items-center gap-1.5 text-[10px] text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded-full animate-pulse">
                                        <Sparkles className="h-3 w-3" />
                                        <span>AUTO</span>
                                    </div>
                                )}
                            </div>
                            <Input
                                id="slug"
                                value={slug}
                                onChange={handleSlugChange}
                                placeholder="react, ui-ux, fotografia"
                                className="h-14 font-mono text-sm bg-muted/20 border-muted focus-visible:ring-indigo-500 rounded-xl"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-8 border-t border-muted/50">
                        <Button type="button" variant="ghost" onClick={() => router.back()} className="rounded-xl px-6">
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="min-w-[140px] gap-2 shadow-lg bg-[#5b46e8] hover:bg-[#4a36d7] text-white h-12 rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {loading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Save className="h-4 w-4" />
                            )}
                            {isEditing ? "Actualizar" : "Crear Etiqueta"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
