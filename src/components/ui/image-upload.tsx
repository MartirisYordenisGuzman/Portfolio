"use client"

import { useState, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Upload, X } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

interface ImageUploadProps {
    value?: string
    onChange: (url: string) => void
    disabled?: boolean
    bucket?: string
    folder?: string
}

export function ImageUpload({
    value,
    onChange,
    disabled,
    bucket = "portfolio",
    folder = "projects"
}: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const supabase = createClient()

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)

        try {
            const fileExt = file.name.split('.').pop()
            const fileName = `${folder}/${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`

            const { error: uploadError, data } = await supabase.storage
                .from(bucket)
                .upload(fileName, file, {
                    cacheControl: '3600',
                    upsert: false
                })

            if (uploadError) {
                throw uploadError
            }

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from(bucket)
                .getPublicUrl(fileName)

            onChange(publicUrl)
            toast.success("Imagen subida correctamente")
        } catch (error: any) {
            console.error(error)
            toast.error("Error al subir la imagen", {
                description: error.message
            })
        } finally {
            setIsUploading(false)
            // Reset input
            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }
        }
    }

    const handleRemove = () => {
        onChange("")
    }

    return (
        <div className="space-y-4 w-full">
            <div className="flex flex-col gap-2">
                {/* Preview */}
                {value ? (
                    <div className="relative aspect-video w-full max-w-sm rounded-lg overflow-hidden border bg-muted">
                        <Image
                            src={value}
                            alt="Cover"
                            fill
                            className="object-cover"
                        />
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8"
                            onClick={handleRemove}
                            disabled={disabled}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    <div
                        className="flex flex-col items-center justify-center aspect-video w-full max-w-sm rounded-lg border border-dashed bg-muted/50 hover:bg-muted/80 transition-colors cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">Clic para subir imagen</span>
                    </div>
                )}

                <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleUpload}
                    disabled={disabled || isUploading}
                />
            </div>
            {isUploading && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Subiendo...</span>
                </div>
            )}
        </div>
    )
}
