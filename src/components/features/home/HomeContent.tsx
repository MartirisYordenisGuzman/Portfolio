"use client"

import { useLayoutMode } from "@/providers/layout-mode-provider"
import { HeroSection } from "@/components/features/home/HeroSection"
import AboutPage from "@/app/about/page"
import { ProjectsView } from "@/components/features/projects/ProjectsView"
import { BlogView } from "@/components/features/blog/BlogView"
import ContactPage from "@/app/contact/page"
import { Project, Post } from "@/types/database"

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
                        <ProjectsView projects={projects} />
                    </div>

                    <div id="about" className="scroll-mt-24">
                        <AboutPage />
                    </div>

                    <div id="contact" className="scroll-mt-24">
                        <ContactPage />
                    </div>

                    <div id="blog" className="scroll-mt-24 hidden md:block">
                        <BlogView posts={posts} />
                    </div>
                </div>
            )}
        </div>
    )
}
