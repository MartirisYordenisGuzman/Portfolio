import { Post } from "@/types/database";

export const MOCK_POSTS: Post[] = [
    {
        id: "1",
        slug: "react-server-components-deep-dive",
        title: "Entendiendo React Server Components con profundidad",
        excerpt: "Analizamos cómo RSC cambia el paradigma de data fetching y reduce el bundle size en aplicaciones Next.js modernas.",
        content: `
## Introducción

React Server Components (RSC) no es solo una optimización de performance; es un cambio mental en cómo construimos UIs.

### ¿Por qué ahora?

La hidratación costosa siempre fue el cuello de botella...

\`\`\`tsx
// Ejemplo de componente servidor
async function ProductDetails({ id }) {
  const product = await db.products.find(id);
  return <div>{product.name}</div>;
}
\`\`\`

## Conclusión

La separación de responsabilidades ahora ocurre a nivel de componente.
    `,
        cover_image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
        reading_time_minutes: 8,
        status: "published",
        published_at: new Date().toISOString(),
        project_id: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        tags: [
            { id: "t5", name: "React", slug: "react", icon_path: null },
            { id: "t7", name: "Next.js", slug: "nextjs", icon_path: null }
        ]
    },
    {
        id: "2",
        slug: "optimizing-database-queries-rls",
        title: "Optimizando queries de base de datos con RLS",
        excerpt: "Las políticas de seguridad a nivel de fila (RLS) en Postgres pueden impactar el rendimiento si no se diseñan correctamente.",
        content: "## El costo oculto de la seguridad\n\nCuando activamos RLS...",
        cover_image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=800",
        reading_time_minutes: 5,
        status: "published",
        published_at: new Date().toISOString(),
        project_id: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        tags: [
            { id: "t8", name: "PostgreSQL", slug: "postgresql", icon_path: null },
            { id: "t9", name: "Supabase", slug: "supabase", icon_path: null }
        ]
    },
    {
        id: "3",
        slug: "mastering-server-actions-nextjs-14",
        title: "Dominando Server Actions en Next.js 14",
        excerpt: "Eliminando la necesidad de rutas de API tradicionales. Aprende a manejar mutaciones de datos directamente desde tus componentes.",
        content: `
## El fin de \`/api/*\`

Con Server Actions, podemos invocar funciones de servidor directamente desde el cliente.

### Mutaciones simplificadas

\`\`\`tsx
async function createInvoice(formData: FormData) {
  'use server'
  // Lógica de base de datos segura
}
\`\`\`
        `,
        cover_image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
        reading_time_minutes: 6,
        status: "published",
        published_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        project_id: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        tags: [
            { id: "t7", name: "Next.js", slug: "nextjs", icon_path: null },
            { id: "t10", name: "Backend", slug: "backend", icon_path: null }
        ]
    },
    {
        id: "4",
        slug: "typescript-pattern-matching",
        title: "Pattern Matching exhaustivo en TypeScript",
        excerpt: "Cómo usar uniones discriminadas y 'never' para asegurar que tu código maneje todos los casos posibles en tiempo de compilación.",
        content: "## Uniones Discriminadas\n\nTypeScript brilla cuando...",
        cover_image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800",
        reading_time_minutes: 4,
        status: "published",
        published_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        project_id: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        tags: [
            { id: "t11", name: "TypeScript", slug: "typescript", icon_path: null },
            { id: "t12", name: "Clean Code", slug: "clean-code", icon_path: null }
        ]
    },
    {
        id: "5",
        slug: "micro-frontends-module-federation",
        title: "Micro-frontends con Webpack Module Federation",
        excerpt: "Estrategias para escalar equipos de frontend grandes dividiendo una aplicación monolítica en micro-aplicaciones independientes.",
        content: "## Divide y vencerás\n\nEscalar equipos de frontend es difícil...",
        cover_image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=800",
        reading_time_minutes: 10,
        status: "published",
        published_at: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        project_id: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        tags: [
            { id: "t13", name: "Architecture", slug: "architecture", icon_path: null },
            { id: "t14", name: "Webpack", slug: "webpack", icon_path: null }
        ]
    },
    {
        id: "6",
        slug: "docker-multi-stage-builds",
        title: "Docker Multi-stage Builds para imágenes NodeJS ligeras",
        excerpt: "Reduce el tamaño de tus imágenes de producción en un 80% separando las dependencias de build de las de runtime.",
        content: "## Menos es más\n\nNadie quiere desplegar 1GB de node_modules...",
        cover_image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&q=80&w=800",
        reading_time_minutes: 5,
        status: "published",
        published_at: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
        project_id: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        tags: [
            { id: "t15", name: "Docker", slug: "docker", icon_path: null },
            { id: "t16", name: "DevOps", slug: "devops", icon_path: null }
        ]
    },
    {
        id: "7",
        slug: "zustand-state-management",
        title: "Gestión de estado minimalista con Zustand",
        excerpt: "Por qué Zustand se está convirtiendo en el estándar de facto para estado global en React, reemplazando a Redux y Context.",
        content: "## Sin boilerplate\n\nRedux era genial, pero verboso...",
        cover_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        reading_time_minutes: 7,
        status: "published",
        published_at: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
        project_id: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        tags: [
            { id: "t5", name: "React", slug: "react", icon_path: null },
            { id: "t17", name: "State Management", slug: "state-management", icon_path: null }
        ]
    }
];
