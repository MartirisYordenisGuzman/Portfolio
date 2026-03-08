"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface AdminSearchProps {
    placeholder?: string
    onSearch: (query: string) => void
    className?: string
}

export function AdminSearch({ placeholder = "Buscar...", onSearch, className }: AdminSearchProps) {
    const [query, setQuery] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setQuery(val)
        onSearch(val)
    }

    const clearSearch = () => {
        setQuery("")
        onSearch("")
    }

    return (
        <div className={cn("relative flex items-center max-w-sm w-full group", className)}>
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
                value={query}
                onChange={handleChange}
                placeholder={placeholder}
                className="pl-9 pr-9 h-10 bg-background/50 border-muted-foreground/20 focus-visible:ring-primary/20 transition-all"
            />
            {query && (
                <button
                    onClick={clearSearch}
                    className="absolute right-3 p-1 rounded-full hover:bg-muted transition-colors"
                >
                    <X className="h-3 w-3 text-muted-foreground" />
                </button>
            )}
        </div>
    )
}
