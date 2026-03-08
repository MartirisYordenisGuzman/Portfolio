"use client"

import dynamic from "next/dynamic"
import { useLayoutMode } from "@/providers/layout-mode-provider"
import { HeroSection } from "@/components/features/home/HeroSection"
import { ProjectsView } from "@/components/features/projects/ProjectsView"
import { Project, Post } from "@/types/database"

// Lazy load heavy components for SPA mode
const AboutContent = dynamic(() => import("@/components/features/about/AboutContent").then(mod => mod.AboutContent), {
    loading: () => <div className="h-96 w-full animate-pulse bg-muted/20 rounded-2xl" />
})

const ContactContent = dynamic(() => import("@/components/features/contact/ContactContent").then(mod => mod.ContactContent), {
    loading: () => <div className="h-96 w-full animate-pulse bg-muted/20 rounded-2xl" />
})

const BlogView = dynamic(() => import("@/components/features/blog/BlogView").then(mod => mod.BlogView), {
    loading: () => <div className="h-96 w-full animate-pulse bg-muted/20 rounded-2xl" />
})

interface HomeContentProps {
    projects: Project[]
    posts: Post[]
}

export function HomeContent({ projects, posts }: HomeContentProps) {
    const { isSpaMode } = useLayoutMode()

    return (
        <div className="flex flex-col gap-10 pb-20">
            <div id="hero">
                <HeroSection />
            </div>

            {isSpaMode && (
                <div className="flex flex-col gap-24 md:gap-32 pt-10 border-t border-border/40">
                    <div id="projects" className="scroll-mt-24">
                        <ProjectsView projects={projects} isHome={true} />
                    </div>

                    <div id="about" className="scroll-mt-24">
                        <AboutContent isSpaMode={true} />
                    </div>

                    <div id="contact" className="scroll-mt-24">
                        <ContactContent />
                    </div>

                    <div id="blog" className="scroll-mt-24 hidden md:block">
                        <BlogView posts={posts} />
                    </div>
                </div>
            )}
        </div>
    )
}
