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
    SiJest,
    SiVite,
    SiHtml5,
    SiCss3,
    SiGo,
    SiRust,
    SiPrisma,
    SiMongodb
} from "react-icons/si"
import { FaTerminal, FaCode } from "react-icons/fa"

interface TechTagProps {
    name: string
    className?: string
    isFilter?: boolean
    active?: boolean
    onClick?: () => void
}

const techConfig: Record<string, { color: string, icon: React.ComponentType<{ className?: string }> | null, bg: string, border: string }> = {
    "python": {
        color: "text-blue-600 dark:text-blue-400",
        bg: "bg-blue-50 dark:bg-blue-950/20",
        border: "border-blue-200 dark:border-blue-800/30",
        icon: SiPython
    },
    "react": {
        color: "text-cyan-600 dark:text-cyan-400",
        bg: "bg-cyan-50 dark:bg-cyan-950/20",
        border: "border-cyan-200 dark:border-cyan-800/30",
        icon: SiReact
    },
    "react.js": {
        color: "text-cyan-600 dark:text-cyan-400",
        bg: "bg-cyan-50 dark:bg-cyan-950/20",
        border: "border-cyan-200 dark:border-cyan-800/30",
        icon: SiReact
    },
    "node.js": {
        color: "text-emerald-600 dark:text-emerald-400",
        bg: "bg-emerald-50 dark:bg-emerald-950/20",
        border: "border-emerald-200 dark:border-emerald-800/30",
        icon: SiNodedotjs
    },
    "next.js": {
        color: "text-zinc-900 dark:text-zinc-100",
        bg: "bg-zinc-100 dark:bg-zinc-800/50",
        border: "border-zinc-300 dark:border-zinc-700/50",
        icon: SiNextdotjs
    },
    "tailwindcss": {
        color: "text-sky-600 dark:text-sky-400",
        bg: "bg-sky-50 dark:bg-sky-950/20",
        border: "border-sky-200 dark:border-sky-800/30",
        icon: SiTailwindcss
    },
    "tailwind css": {
        color: "text-sky-600 dark:text-sky-400",
        bg: "bg-sky-50 dark:bg-sky-950/20",
        border: "border-sky-200 dark:border-sky-800/30",
        icon: SiTailwindcss
    },
    "typescript": {
        color: "text-blue-700 dark:text-blue-400",
        bg: "bg-blue-50 dark:bg-blue-950/20",
        border: "border-blue-200 dark:border-blue-800/30",
        icon: SiTypescript
    },
    "javascript": {
        color: "text-amber-600 dark:text-amber-400",
        bg: "bg-amber-50 dark:bg-amber-950/10",
        border: "border-amber-200 dark:border-amber-800/20",
        icon: SiJavascript
    },
    "fastapi": {
        color: "text-teal-600 dark:text-teal-400",
        bg: "bg-teal-50 dark:bg-teal-950/20",
        border: "border-teal-200 dark:border-teal-800/30",
        icon: SiFastapi
    },
    "docker": {
        color: "text-blue-600 dark:text-blue-400",
        bg: "bg-blue-50 dark:bg-blue-950/20",
        border: "border-blue-200 dark:border-blue-800/30",
        icon: SiDocker
    },
    "postgresql": {
        color: "text-indigo-600 dark:text-indigo-400",
        bg: "bg-indigo-50 dark:bg-indigo-950/20",
        border: "border-indigo-200 dark:border-indigo-800/30",
        icon: SiPostgresql
    },
    "supabase": {
        color: "text-emerald-700 dark:text-emerald-400",
        bg: "bg-emerald-50 dark:bg-emerald-950/20",
        border: "border-emerald-200 dark:border-emerald-800/30",
        icon: SiSupabase
    },
    "framer motion": {
        color: "text-purple-600 dark:text-purple-400",
        bg: "bg-purple-50 dark:bg-purple-950/20",
        border: "border-purple-200 dark:border-purple-800/30",
        icon: SiFramer
    },
    "electron": {
        color: "text-sky-600 dark:text-sky-300",
        bg: "bg-sky-50 dark:bg-sky-950/20",
        border: "border-sky-200 dark:border-sky-800/30",
        icon: SiElectron
    },
    "cypress": {
        color: "text-emerald-700 dark:text-emerald-400",
        bg: "bg-emerald-50 dark:bg-emerald-950/20",
        border: "border-emerald-200 dark:border-emerald-800/30",
        icon: SiCypress
    },
    "jest": {
        color: "text-red-700 dark:text-red-400",
        bg: "bg-red-50 dark:bg-red-950/20",
        border: "border-red-200 dark:border-red-800/30",
        icon: SiJest
    },
    "vite": {
        color: "text-yellow-600 dark:text-yellow-400",
        bg: "bg-yellow-50 dark:bg-yellow-950/20",
        border: "border-yellow-200 dark:border-yellow-800/30",
        icon: SiVite
    },
    "html": {
        color: "text-orange-600 dark:text-orange-400",
        bg: "bg-orange-50 dark:bg-orange-950/20",
        border: "border-orange-200 dark:border-orange-800/30",
        icon: SiHtml5
    },
    "css": {
        color: "text-blue-600 dark:text-blue-400",
        bg: "bg-blue-50 dark:bg-blue-950/20",
        border: "border-blue-200 dark:border-blue-800/30",
        icon: SiCss3
    },
    "go": {
        color: "text-sky-600 dark:text-sky-400",
        bg: "bg-sky-50 dark:bg-sky-950/20",
        border: "border-sky-200 dark:border-sky-800/30",
        icon: SiGo
    },
    "rust": {
        color: "text-orange-700 dark:text-orange-400",
        bg: "bg-orange-50 dark:bg-orange-950/10",
        border: "border-orange-200 dark:border-orange-800/20",
        icon: SiRust
    },
    "prisma": {
        color: "text-zinc-700 dark:text-zinc-300",
        bg: "bg-zinc-50 dark:bg-zinc-900/50",
        border: "border-zinc-200 dark:border-zinc-700/50",
        icon: SiPrisma
    },
    "mongodb": {
        color: "text-emerald-600 dark:text-emerald-400",
        bg: "bg-emerald-50 dark:bg-emerald-950/20",
        border: "border-emerald-200 dark:border-emerald-800/30",
        icon: SiMongodb
    },
    "zustand": {
        color: "text-amber-700 dark:text-amber-500",
        bg: "bg-amber-50 dark:bg-amber-950/10",
        border: "border-amber-200 dark:border-amber-800/20",
        icon: FaCode
    }
}

export function TechTag({ name, className, isFilter, active, onClick }: TechTagProps) {
    const lowerName = name.toLowerCase()
    const config = techConfig[lowerName] || {
        color: "text-zinc-600 dark:text-zinc-400",
        bg: "bg-zinc-100 dark:bg-zinc-800/40",
        border: "border-zinc-200 dark:border-zinc-700/50",
        icon: FaTerminal
    }

    const Icon = config.icon

    return (
        <div
            onClick={onClick}
            className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold border transition-all duration-300",
                config.bg,
                config.color,
                config.border,
                "backdrop-blur-sm",
                isFilter && "cursor-pointer hover:scale-105 active:scale-95",
                isFilter && !active && "opacity-60 hover:opacity-100 grayscale-[0.5] hover:grayscale-0",
                isFilter && active && "ring-2 ring-primary/20 scale-105 bg-primary/10 border-primary/30",
                className
            )}
        >
            {Icon && <Icon className="h-3 w-3 shrink-0" />}
            <span className="truncate">{name}</span>
        </div>
    )
}
