"use client"

import { AboutContent } from "@/components/features/about/AboutContent"
import { useLayoutMode } from "@/providers/layout-mode-provider"

export default function AboutPage() {
    const { isSpaMode } = useLayoutMode()

    return <AboutContent isSpaMode={isSpaMode} />
}
