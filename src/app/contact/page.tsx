"use client"

import { useState } from "react"
import { Mail, Phone, Instagram, Twitter, Facebook, Linkedin } from "lucide-react"
import { toast } from "sonner"
import { useLanguage } from "@/providers/language-provider"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactPage() {
    const { t } = useLanguage()
    // const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || "Algo salió mal")
            }

            toast.success(t.contact.success_title, {
                description: t.contact.success_desc,
            })

            setFormData({ name: "", email: "", message: "" })
        } catch (_) {
            toast.error(t.contact.error_title, {
                description: t.contact.error_desc, // In real app use specific error msg if safe
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="mx-auto w-full max-w-[85vw] py-12 md:py-20">
            <div className="grid gap-12 lg:grid-cols-2">
                {/* Left Column: Contact Info */}
                <div className="space-y-8">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold tracking-tight">{t.contact.title}</h1>
                        <p className="text-muted-foreground">
                            {t.contact.description}
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-1">
                            <h3 className="font-semibold text-sm uppercase text-muted-foreground">Email</h3>
                            <div className="flex items-center gap-2 text-lg">
                                <Mail className="h-5 w-5 text-primary" />
                                <a href="mailto:martirisyordenysguzman@gmail.com" className="hover:underline">martirisyordenysguzman@gmail.com</a>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <h3 className="font-semibold text-sm uppercase text-muted-foreground">Phone</h3>
                            <div className="flex items-center gap-2 text-lg">
                                <Phone className="h-5 w-5 text-primary" />
                                <span className="ml-1">+1 (829) 552-6489</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="font-semibold text-sm uppercase text-muted-foreground">Follow Us</h3>
                        <div className="flex gap-4">
                            <a href="#" className="rounded-full bg-foreground p-2 text-background hover:opacity-80 transition-opacity">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="rounded-full bg-foreground p-2 text-background hover:opacity-80 transition-opacity">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="https://www.linkedin.com/in/martiris-yordenis-guzmán" target="_blank" className="rounded-full bg-foreground p-2 text-background hover:opacity-80 transition-opacity">
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a href="#" className="rounded-full bg-foreground p-2 text-background hover:opacity-80 transition-opacity">
                                <Twitter className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right Column: form */}
                <div className="rounded-2xl border bg-card p-8 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">{t.contact.label_name}</Label>
                                <Input
                                    id="name"
                                    placeholder={t.contact.placeholder_name}
                                    className="bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-ring"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">{t.contact.label_email}</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder={t.contact.placeholder_email}
                                    className="bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-ring"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="message">{t.contact.label_message}</Label>
                            <Textarea
                                id="message"
                                placeholder={t.contact.placeholder_message}
                                className="min-h-[150px] bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-ring resize-none"
                                required
                                value={formData.message}
                                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                            />
                        </div>

                        <Button type="submit" className="w-full h-12 text-base" disabled={isLoading}>
                            {isLoading ? t.contact.btn_sending : t.contact.btn_submit}
                        </Button>

                    </form>
                </div>
            </div>
        </div>
    )
}
