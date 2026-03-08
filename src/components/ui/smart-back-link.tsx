"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { useLayoutMode } from "@/providers/layout-mode-provider"

interface SmartBackLinkProps {
    spaHref: string
    multiHref: string
    label: string
}

export function SmartBackLink({ spaHref, multiHref, label }: SmartBackLinkProps) {
    const { isSpaMode } = useLayoutMode()

    return (
        <Link
            href={isSpaMode ? spaHref : multiHref}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {label}
        </Link>
    )
}
