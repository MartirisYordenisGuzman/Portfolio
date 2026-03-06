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

                // If we are at the top (hero), stay on the homepage regardless of hash
                if (target === "hero") {
                    setIsSpaMode(false)
                    return
                }

                if (!target) {
                    target = window.location.hash.replace("#", "")
                }

                if (target && ["about", "projects", "blog", "contact"].includes(target)) {
                    router.push(`/${target}`)
                    // Delay setting state so SPA content doesn't vanish before the next page renders
                    setTimeout(() => setIsSpaMode(false), 200)
                } else {
                    setIsSpaMode(false)
                }
            } else {
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
