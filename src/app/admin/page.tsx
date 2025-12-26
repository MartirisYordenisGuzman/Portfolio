export default function AdminDashboardPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">
                    Bienvenido al panel de administración del portafolio.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-col space-y-1.5 pb-2">
                        <h3 className="font-semibold leading-none tracking-tight">Proyectos</h3>
                        <p className="text-sm text-muted-foreground">Total de proyectos</p>
                    </div>
                    <div className="pt-2">
                        <div className="text-2xl font-bold text-primary">Gestionar</div>
                        <p className="text-xs text-muted-foreground mt-1">Ir a la sección de proyectos para ver detalles.</p>
                    </div>
                </div>

                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-col space-y-1.5 pb-2">
                        <h3 className="font-semibold leading-none tracking-tight">Blog Posts</h3>
                        <p className="text-sm text-muted-foreground">Artículos publicados</p>
                    </div>
                    <div className="pt-2">
                        <div className="text-2xl font-bold text-primary">Gestionar</div>
                        <p className="text-xs text-muted-foreground mt-1">Ir a la sección de blog para ver detalles.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
