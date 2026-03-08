"use client"

import { useState, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Loader2, Upload, X } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
    value?: string | string[]
    onChange: (url: string | string[]) => void
    disabled?: boolean
    bucket?: string
    folder?: string
    multiple?: boolean
    maxImages?: number
}

export function ImageUpload({
    value,
    onChange,
    disabled,
    bucket = "portfolio",
    folder = "projects",
    multiple = false,
    maxImages = 10
}: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const supabase = createClient()

    const images = Array.isArray(value) ? value : value ? [value] : []

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        setIsUploading(true)
        const newUrls: string[] = [...images]

        const filesToUpload = Array.from(files).slice(0, multiple ? maxImages - images.length : 1)

        try {
            for (const file of filesToUpload) {
                const fileExt = file.name.split('.').pop()
                const fileName = `${folder}/${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`

                // Progress logic removed for simplicity as per user request for space and premium feel
                // But could be added back if needed

                const { error: uploadError } = await supabase.storage
                    .from(bucket)
                    .upload(fileName, file, {
                        cacheControl: '3600',
                        upsert: false
                    })

                if (uploadError) throw uploadError

                const { data: { publicUrl } } = supabase.storage
                    .from(bucket)
                    .getPublicUrl(fileName)

                newUrls.push(publicUrl)
            }

            if (multiple) {
                onChange(newUrls)
            } else {
                onChange(newUrls[newUrls.length - 1] || "")
            }

            toast.success(filesToUpload.length > 1 ? "Imágenes subidas correctamente" : "Imagen subida correctamente")
        } catch (error: unknown) {
            console.error(error)
            toast.error("Error al subir imagen(es)", {
                description: error instanceof Error ? error.message : "Error desconocido"
            })
        } finally {
            setIsUploading(false)
            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }
        }
    }

    const removeImage = (urlToRemove: string) => {
        if (multiple) {
            onChange(images.filter(url => url !== urlToRemove))
        } else {
            onChange("")
        }
    }

    return (
        <div className="space-y-4 w-full">
            <div className={cn(
                "grid gap-4",
                multiple ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" : "grid-cols-1"
            )}>
                {images.map((url, index) => (
                    <div
                        key={url}
                        className={cn(
                            "relative group rounded-xl overflow-hidden border bg-muted shadow-sm transition-all hover:shadow-md",
                            multiple ? "aspect-square" : "aspect-video max-w-xl"
                        )}
                    >
                        <Image
                            src={url}
                            alt={`Upload ${index + 1}`}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={() => removeImage(url)}
                                disabled={disabled}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        {multiple && (
                            <div className="absolute bottom-1 right-1 bg-black/60 text-[10px] text-white px-1.5 py-0.5 rounded backdrop-blur-sm">
                                {index + 1}
                            </div>
                        )}
                    </div>
                ))}

                {(!multiple && images.length === 0) || (multiple && images.length < maxImages) ? (
                    <button
                        type="button"
                        disabled={disabled || isUploading}
                        className={cn(
                            "flex flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all cursor-pointer",
                            "hover:bg-primary/5 hover:border-primary/50 group bg-muted/30",
                            multiple ? "aspect-square" : "aspect-video max-w-xl",
                            isUploading && "animate-pulse cursor-not-allowed"
                        )}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {isUploading ? (
                            <Loader2 className="h-8 w-8 text-primary animate-spin" />
                        ) : (
                            <>
                                <div className="p-3 bg-primary/10 rounded-full mb-2 group-hover:scale-110 transition-transform">
                                    <Upload className="h-6 w-6 text-primary" />
                                </div>
                                <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors text-center px-4">
                                    {multiple ? "Subir Imágenes" : "Subir Portada"}
                                </span>
                                {multiple && (
                                    <span className="text-[10px] text-muted-foreground/60 mt-1">
                                        {images.length} / {maxImages}
                                    </span>
                                )}
                            </>
                        )}
                    </button>
                ) : null}
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple={multiple}
                className="hidden"
                onChange={handleUpload}
                disabled={disabled || isUploading}
            />

            {isUploading && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground px-1">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    <span>Estamos procesando tus archivos...</span>
                </div>
            )}
        </div>
    )
}
