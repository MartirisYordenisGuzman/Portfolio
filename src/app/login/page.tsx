"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import Particles from "@/components/ui/particles"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) {
                toast.error("Error al iniciar sesión", {
                    description: error.message
                })
                return
            }

            toast.success("Bienvenido", {
                description: "Redirigiendo al panel..."
            })
            router.push("/admin")
            router.refresh()
        } catch (err) {
            toast.error("Error inesperado")
        } finally {
            setLoading(false)
        }
    }



    return (
        <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
            {/* Particles Background */}
            <div className="absolute inset-0 -z-10">
                <Particles
                    className="absolute inset-0"
                    quantity={100}
                    ease={80}
                    refresh
                />
            </div>
            <Card className="w-full max-w-md bg-background/80 backdrop-blur-sm">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Acceso Administrativo</CardTitle>
                    <CardDescription>
                        Ingresa tus credenciales para administrar el portafolio.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="tu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="pt-6">
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Entrando..." : "Iniciar Sesión"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
