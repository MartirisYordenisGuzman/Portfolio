"use client"

import { motion } from "framer-motion"

interface ScrollAnimationProps {
    children: React.ReactNode
    className?: string
}

export function ScrollAnimation({ children, className }: ScrollAnimationProps) {
    return (
        <motion.div
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
