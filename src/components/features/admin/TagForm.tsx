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
        <Card className="max-w-lg mx-auto border-muted/50 shadow-lg overflow-hidden">
            <CardHeader className="bg-muted/30 border-b">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <TagIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <CardTitle>{isEditing ? "Editar Etiqueta" : "Nueva Etiqueta"}</CardTitle>
                        <CardDescription>Define etiquetas para categorizar tus proyectos y posts.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Nombre</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={handleNameChange}
                                placeholder="React, UI/UX, Fotografía..."
                                className="h-11 bg-card"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="slug" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Slug (URL)</Label>
                                {isAutoSlug && !isEditing && (
                                    <div className="flex items-center gap-1 text-[10px] text-primary animate-pulse">
                                        <Sparkles className="h-3 w-3" />
                                        <span>Generando...</span>
                                    </div>
                                )}
                            </div>
                            <Input
                                id="slug"
                                value={slug}
                                onChange={handleSlugChange}
                                placeholder="react, ui-ux, fotografia"
                                className="h-11 font-mono text-sm bg-muted/20"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t">
                        <Button type="button" variant="ghost" onClick={() => router.back()}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={loading} className="min-w-[120px] gap-2">
                            {loading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Save className="h-4 w-4" />
                            )}
                            {isEditing ? "Actualizar" : "Crear"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
