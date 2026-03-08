"use client"

import { cn } from "@/lib/utils"
import {
    SiPython,
    SiReact,
    SiNodedotjs,
    SiNextdotjs,
    SiTailwindcss,
    SiTypescript,
    SiJavascript,
    SiFastapi,
    SiDocker,
    SiPostgresql,
    SiSupabase,
    SiFramer,
    SiElectron,
    SiCypress,
    SiJest
} from "react-icons/si"

interface TechTagProps {
    name: string
    className?: string
}

const techConfig: Record<string, { color: string, icon: React.ComponentType<{ className?: string }> | null, bg: string, border: string }> = {
    "python": {
        color: "text-blue-400",
        bg: "bg-blue-950/30",
        border: "border-blue-500/20",
        icon: SiPython
    },
    "react": {
        color: "text-cyan-400",
        bg: "bg-cyan-950/30",
        border: "border-cyan-500/20",
        icon: SiReact
    },
    "node.js": {
        color: "text-green-400",
        bg: "bg-green-950/30",
        border: "border-green-500/20",
        icon: SiNodedotjs
    },
    "next.js": {
        color: "text-white",
        bg: "bg-zinc-900",
        border: "border-white/10",
        icon: SiNextdotjs
    },
    "tailwindcss": {
        color: "text-sky-400",
        bg: "bg-sky-950/30",
        border: "border-sky-500/20",
        icon: SiTailwindcss
    },
    "tailwind css": {
        color: "text-sky-400",
        bg: "bg-sky-950/30",
        border: "border-sky-500/20",
        icon: SiTailwindcss
    },
    "typescript": {
        color: "text-blue-500",
        bg: "bg-blue-950/30",
        border: "border-blue-500/20",
        icon: SiTypescript
    },
    "javascript": {
        color: "text-yellow-400",
        bg: "bg-yellow-950/20",
        border: "border-yellow-500/20",
        icon: SiJavascript
    },
    "fastapi": {
        color: "text-emerald-400",
        bg: "bg-emerald-950/30",
        border: "border-emerald-500/20",
        icon: SiFastapi
    },
    "docker": {
        color: "text-blue-400",
        bg: "bg-blue-950/30",
        border: "border-blue-500/20",
        icon: SiDocker
    },
    "postgresql": {
        color: "text-indigo-400",
        bg: "bg-indigo-950/30",
        border: "border-indigo-500/20",
        icon: SiPostgresql
    },
    "supabase": {
        color: "text-emerald-500",
        bg: "bg-emerald-950/30",
        border: "border-emerald-500/20",
        icon: SiSupabase
    },
    "framer motion": {
        color: "text-pink-400",
        bg: "bg-pink-950/30",
        border: "border-pink-500/20",
        icon: SiFramer
    },
    "electron": {
        color: "text-sky-300",
        bg: "bg-sky-950/30",
        border: "border-sky-300/20",
        icon: SiElectron
    },
    "cypress": {
        color: "text-emerald-400",
        bg: "bg-emerald-950/30",
        border: "border-emerald-400/20",
        icon: SiCypress
    },
    "jest": {
        color: "text-red-400",
        bg: "bg-red-950/30",
        border: "border-red-400/20",
        icon: SiJest
    }
}

export function TechTag({ name, className }: TechTagProps) {
    const lowerName = name.toLowerCase()
    const config = techConfig[lowerName] || {
        color: "text-secondary-foreground",
        bg: "bg-secondary/50",
        border: "border-border",
        icon: null
    }

    const Icon = config.icon

    return (
        <div className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold border transition-colors",
            config.bg,
            config.color,
            config.border,
            className
        )}>
            {Icon && <Icon className="h-3 w-3" />}
            {name}
        </div>
    )
}
