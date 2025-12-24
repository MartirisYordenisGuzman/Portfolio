"use client"

import { useState } from "react"
import { Search } from "lucide-react"

import { Post } from "@/types/database"
import { BlogCard } from "@/components/features/blog/BlogCard"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface BlogListProps {
    initialPosts: Post[]
}

export function BlogList({ initialPosts }: BlogListProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [sortOrder, setSortOrder] = useState("newest")

    // Extract unique categories
    const categories = Array.from(
        new Set(initialPosts.flatMap((post) => post.tags?.map((t) => t.name) || []))
    ).sort()

    const filteredPosts = initialPosts
        .filter((post) => {
            const matchesSearch =
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())

            const matchesCategory =
                selectedCategory === "all" ||
                post.tags?.some((t) => t.name === selectedCategory)

            return matchesSearch && matchesCategory
        })
        .sort((a, b) => {
            if (sortOrder === "newest") {
                return new Date(b.published_at!).getTime() - new Date(a.published_at!).getTime()
            }
            return new Date(a.published_at!).getTime() - new Date(b.published_at!).getTime()
        })

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar artículos..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8"
                    />
                </div>
                <div className="flex w-full items-center gap-2 md:w-auto">
                    <Select
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Categoría" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todas las categorías</SelectItem>
                            {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select
                        value={sortOrder}
                        onValueChange={setSortOrder}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Orden" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="newest">Más recientes</SelectItem>
                            <SelectItem value="oldest">Más antiguos</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center text-muted-foreground">
                        No se encontraron artículos que coincidan con tu búsqueda.
                    </div>
                )}
            </div>
        </div>
    )
}
