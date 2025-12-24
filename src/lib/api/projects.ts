import { createClient } from "@/lib/supabase/server";
import { Project, Tag } from "@/types/database";

interface ProjectWithTags extends Project {
    project_tags: {
        tags: Tag;
    }[];
}

export async function getProjects(): Promise<Project[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("projects")
        .select(`
            *,
            project_tags (
                tags (
                    *
                )
            )
        `)
        .eq("status", "published")
        .order("published_at", { ascending: false });

    if (error) {
        console.error("Error fetching projects:", error);
        return [];
    }

    // Transform nested project_tags into flat tags array
    // We use unknown cast first because supabase types might not match our exact join structure automatically without full generation
    return ((data as unknown) as ProjectWithTags[] || []).map((project) => ({
        ...project,
        tags: project.project_tags?.map((pt) => pt.tags) || []
    }));
}
