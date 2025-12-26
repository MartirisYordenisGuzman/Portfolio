"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ImageGalleryProps {
    images: string[]
    title: string
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [isLightboxOpen, setIsLightboxOpen] = React.useState(false)

    // Filter out invalid images just in case
    const validImages = images.filter(Boolean)

    if (validImages.length === 0) return null

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % validImages.length)
    }

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length)
    }

    const swipeConfidenceThreshold = 10000
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity
    }

    return (
        <div className="space-y-4">
            {/* Main Image View */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted group">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x)

                            if (swipe < -swipeConfidenceThreshold) {
                                nextImage()
                            } else if (swipe > swipeConfidenceThreshold) {
                                prevImage()
                            }
                        }}
                        className="relative h-full w-full touch-pan-y"
                        onClick={() => setIsLightboxOpen(true)}
                    >
                        <Image
                            src={validImages[currentIndex]}
                            alt={`${title} - Image ${currentIndex + 1}`}
                            fill
                            className="object-cover cursor-zoom-in"
                            priority={currentIndex === 0}
                            sizes="(max-width: 768px) 100vw, 800px"
                            unoptimized
                            draggable={false}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons (only if > 1 image) */}
                {validImages.length > 1 && (
                    <>
                        <Button
                            variant="secondary"
                            size="icon"
                            className="absolute left-2 top-1/2 -translate-y-1/2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity disabled:opacity-0"
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="secondary"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity disabled:opacity-0"
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                            aria-label="Next image"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>

                        {/* Dots */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                            {validImages.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                                    className={cn(
                                        "w-2 h-2 rounded-full transition-all bg-white/50 hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-white/50",
                                        idx === currentIndex && "bg-white w-4"
                                    )}
                                    aria-label={`Go to image ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {isLightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
                        onClick={() => setIsLightboxOpen(false)}
                    >
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-4 right-4 text-white hover:bg-white/20 z-50"
                            onClick={() => setIsLightboxOpen(false)}
                        >
                            <X className="h-6 w-6" />
                        </Button>

                        <motion.div
                            className="relative w-full max-w-7xl h-full flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = swipePower(offset.x, velocity.x)

                                if (swipe < -swipeConfidenceThreshold) {
                                    nextImage()
                                } else if (swipe > swipeConfidenceThreshold) {
                                    prevImage()
                                }
                            }}
                        >
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                                className="relative w-full h-full flex items-center justify-center"
                            >
                                <Image
                                    src={validImages[currentIndex]}
                                    alt={`${title} - Image ${currentIndex + 1}`}
                                    className="object-contain max-h-[90vh]"
                                    width={1920}
                                    height={1080}
                                    priority
                                    unoptimized
                                    draggable={false}
                                />
                            </motion.div>

                            {validImages.length > 1 && (
                                <>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                                        onClick={prevImage}
                                    >
                                        <ChevronLeft className="h-8 w-8" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                                        onClick={nextImage}
                                    >
                                        <ChevronRight className="h-8 w-8" />
                                    </Button>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
