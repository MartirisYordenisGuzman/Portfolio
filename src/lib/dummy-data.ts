import { Project } from "@/types/database";

export const MOCK_PROJECTS: Project[] = [
    {
        id: "1",
        slug: "e-commerce-microservices",
        title: "E-Commerce Microservices Platform",
        short_description: "Arquitectura distribuida manejando 10k RPM con consistencia eventual y patrón Saga.",
        content: "## Contexto\n\nEl cliente requería escalar...",
        cover_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        github_url: "https://github.com",
        demo_url: "https://demo.com",
        featured: true,
        status: "published",
        published_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        tags: [
            { id: "t1", name: "Microservices", slug: "microservices", icon_path: null },
            { id: "t2", name: "Node.js", slug: "nodejs", icon_path: null },
            { id: "t3", name: "Docker", slug: "docker", icon_path: null }
        ]
    },
    {
        id: "2",
        slug: "realtime-collaboration-tool",
        title: "Herramienta de Colaboración Real-time",
        short_description: "Editor de documentos colaborativo usando WebSockets y CRDTs para resolución de conflictos.",
        content: "## Desafío Técnico\n\nLa latencia en la sincronización...",
        cover_image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
        github_url: "https://github.com",
        demo_url: null,
        featured: true,
        status: "published",
        published_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        tags: [
            { id: "t4", name: "WebSockets", slug: "websockets", icon_path: null },
            { id: "t5", name: "React", slug: "react", icon_path: null }
        ]
    },
    {
        id: "3",
        slug: "finance-dashboard",
        title: "Dashboard Financiero en Tiempo Real",
        short_description: "Visualización de datos de alta frecuencia con optimización de re-renders en React.",
        content: "## Solución\n\nUso de web workers para procesamiento...",
        cover_image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        github_url: "https://github.com",
        demo_url: null,
        featured: false,
        status: "published",
        published_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        tags: [
            { id: "t6", name: "D3.js", slug: "d3js", icon_path: null },
            { id: "t7", name: "Next.js", slug: "nextjs", icon_path: null }
        ]
    }
];
