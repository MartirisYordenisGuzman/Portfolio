import { createClient } from "@/lib/supabase/server"

export interface DashboardStats {
    projects: {
        total: number
        published: number
        draft: number
    }
    posts: {
        total: number
        published: number
        draft: number
    }
    tags: {
        total: number
    }
}

export async function getDashboardStats(): Promise<DashboardStats> {
    const supabase = await createClient()

    const [
        { count: projectsTotal },
        { count: projectsPublished },
        { count: postsTotal },
        { count: postsPublished },
        { count: tagsTotal }
    ] = await Promise.all([
        supabase.from("projects").select("*", { count: "exact", head: true }),
        supabase.from("projects").select("*", { count: "exact", head: true }).eq("status", "published"),
        supabase.from("posts").select("*", { count: "exact", head: true }),
        supabase.from("posts").select("*", { count: "exact", head: true }).eq("status", "published"),
        supabase.from("tags").select("*", { count: "exact", head: true })
    ])

    return {
        projects: {
            total: projectsTotal || 0,
            published: projectsPublished || 0,
            draft: (projectsTotal || 0) - (projectsPublished || 0)
        },
        posts: {
            total: postsTotal || 0,
            published: postsPublished || 0,
            draft: (postsTotal || 0) - (postsPublished || 0)
        },
        tags: {
            total: tagsTotal || 0
        }
    }
}
