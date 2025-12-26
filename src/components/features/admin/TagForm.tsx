"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createTag, updateTag } from "@/app/admin/actions"
import { toast } from "sonner"

interface TagFormProps {
    tag?: any
    isEditing?: boolean
}

export function TagForm({ tag, isEditing = false }: TagFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)

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
        <form onSubmit={onSubmit} className="space-y-8 max-w-lg bg-card p-6 rounded-lg border shadow-sm">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                        id="name"
                        name="name"
                        defaultValue={tag?.name}
                        placeholder="React, Next.js, UI/UX..."
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="slug">Slug (Identificador URL)</Label>
                    <Input
                        id="slug"
                        name="slug"
                        defaultValue={tag?.slug}
                        placeholder="react, nextjs, ui-ux..."
                        required
                    />
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancelar
                </Button>
                <Button type="submit" disabled={loading}>
                    {loading ? "Guardando..." : (isEditing ? "Actualizar" : "Crear")}
                </Button>
            </div>
        </form>
    )
}
