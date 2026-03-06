"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

interface LayoutModeContextType {
    isSpaMode: boolean
    toggleLayoutMode: (activeSection?: string) => void
}

const LayoutModeContext = createContext<LayoutModeContextType | undefined>(undefined)

export function LayoutModeProvider({ children }: { children: React.ReactNode }) {
    const [isMounted, setIsMounted] = useState(false)
    const [isSpaMode, setIsSpaMode] = useState<boolean>(true)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const savedMode = localStorage.getItem("layoutMode")
        if (savedMode === "multi") {
            setTimeout(() => setIsSpaMode(false), 0)
        }
        setTimeout(() => setIsMounted(true), 0)
    }, [])

    const toggleLayoutMode = (activeSection?: string) => {
        const newMode = !isSpaMode
        localStorage.setItem("layoutMode", newMode ? "spa" : "multi")

        if (newMode) {
            // Switching to SPA
            setIsSpaMode(true)
            if (pathname !== "/") {
                const section = pathname.split("/")[1]
                if (["about", "projects", "blog", "contact"].includes(section)) {
                    // Use a tiny delay to ensure DOM is ready before scroll navigation
                    setTimeout(() => router.push(`/#${section}`), 10)
                } else {
                    router.push("/")
                }
            }
        } else {
            // Switching to Multi-page
            if (pathname === "/") {
                let target = activeSection

                // Prioritize hash if target is not explicitly passed (or is 'hero')
                if (!target || target === "hero") {
                    const hash = window.location.hash.replace("#", "")
                    if (hash) target = hash
                }

                if (target && ["about", "projects", "blog", "contact"].includes(target)) {
                    // Immediately push the new route
                    router.push(`/${target}`)
                    // Set state with a slight delay to keep SPA layout until route changes
                    setTimeout(() => setIsSpaMode(false), 50)
                } else {
                    // Stay on homepage if hero or unknown
                    setIsSpaMode(false)
                }
            } else {
                // Not on home, just flip the mode
                setIsSpaMode(false)
            }
        }
    }


    // Prevent hydration mismatch by rendering nothing or a stable fallback until mounted
    if (!isMounted) {
        return null;
    }

    return (
        <LayoutModeContext.Provider value={{ isSpaMode, toggleLayoutMode }}>
            {children}
        </LayoutModeContext.Provider>
    )
}

export function useLayoutMode() {
    const context = useContext(LayoutModeContext)
    if (context === undefined) {
        throw new Error("useLayoutMode must be used within a LayoutModeProvider")
    }
    return context
}
