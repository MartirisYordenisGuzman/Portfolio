"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import Particles from "@/components/ui/particles"
import { useLanguage } from "@/providers/language-provider"

export function HeroSection() {
    const { t } = useLanguage()

    return (
        <section className="relative container flex flex-col md:flex-row items-center justify-start md:justify-center gap-4 px-4 md:px-6 pb-4 pt-12 md:py-10 lg:py-14 overflow-hidden min-h-[calc(100vh-3.5rem)]">
            {/* Particles Background */}
            <div className="absolute inset-0 -z-10">
                <Particles
                    className="absolute inset-0"
                    quantity={100}
                    ease={80}
                    refresh
                />
            </div>

            {/* Profile Picture (Mobile: Top / Desktop: Right) */}
            {/* We want it on Right on Desktop, so it should be second in flex row. 
                But on Mobile we want it Top. Flex-col stacks top-to-bottom.
                So if we put it First in code:
                Mobile: Image -> Text
                Desktop: Image -> Text (WE WANT Text -> Image)
                
                So we can use order classes.
                Mobile: Image (order-first) -> Text (order-last) is default behavior if we put Image first.
                Desktop: Text (order-1) -> Image (order-2).
                
                Actually simpler:
                Put Text First.
                Mobile: Text -> Image (Default) -> Wait, user wants Image Top on mobile.
                So:
                flex-col-reverse (Text Bottom, Image Top) on mobile? 
                No, flex-col stacks normally.
                
                Let's use:
                <div className="order-2 md:order-1"> TEXT </div>
                <div className="order-1 md:order-2"> IMAGE </div>
            */}

            <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left bg-background/30 backdrop-blur-sm p-4 sm:p-10 rounded-2xl shadow-sm border border-border/10 order-2 md:order-1 w-full md:w-auto max-w-[600px]">
                <h1 className="text-2xl font-bold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl lg:leading-[1.1]">
                    {t.hero.title_1} <br className="hidden sm:inline" />
                    {t.hero.title_2}
                </h1>
                <p className="max-w-[750px] text-base text-muted-foreground sm:text-xl">
                    {t.hero.description}
                </p>
                <div className="mt-2 flex w-full flex-col gap-3 sm:flex-row sm:items-center justify-center md:justify-start">
                    <Link href="/projects">
                        <Button size="default" className="w-full sm:w-auto md:h-11 md:px-8">
                            {t.hero.cta_primary}
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href="/contact">
                        <Button variant="outline" size="default" className="w-full sm:w-auto md:h-11 md:px-8">
                            {t.hero.cta_secondary}
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="flex justify-center order-1 md:order-2 w-full md:w-auto mb-2 md:mb-0">
                <motion.div
                    className="relative h-[150px] w-[150px] sm:h-[250px] sm:w-[250px] md:h-[350px] md:w-[350px] rounded-full border-4 border-background/50 shadow-xl overflow-hidden backdrop-blur-sm"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Image
                        src="/profile.jpg"
                        alt="Profile picture"
                        fill
                        className="object-cover object-[center_20%]"
                        priority
                    />
                </motion.div>
            </div>
        </section>
    )
}
