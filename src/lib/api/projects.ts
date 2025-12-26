import { createClient } from "@/lib/supabase/server";
import { Project, Tag, ProjectImage } from "@/types/database";

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

export async function getProjectBySlug(slug: string): Promise<Project | null> {
    const supabase = await createClient();

    // 1. Fetch Project first (without images relation to be safe)
    const { data: projectData, error: projectError } = await supabase
        .from("projects")
        .select(`
            *,
            project_tags (
                tags (
                    *
                )
            )
        `)
        .eq("slug", slug)
        .eq("status", "published")
        .single();

    if (projectError) {
        console.error("Error fetching project by slug:", slug, JSON.stringify(projectError, null, 2));
        return null;
    }

    if (!projectData) {
        console.warn("No project found for slug:", slug);
        return null;
    }

    // 2. Fetch Images separately (if handling relation fails or table doesn't exist yet)
    let galleryImages: ProjectImage[] = [];
    try {
        const { data: imagesData, error: imagesError } = await supabase
            .from("project_images")
            .select("*")
            .eq("project_id", projectData.id)
            .order("display_order", { ascending: true });

        if (imagesError) {
            console.error("Error fetching project images:", JSON.stringify(imagesError, null, 2));
        } else {
            galleryImages = imagesData || [];
        }
    } catch (e) {
        console.error("Failed to fetch project images (table might be missing):", e);
    }

    const project = projectData as unknown as ProjectWithTags;
    return {
        ...project,
        tags: project.project_tags?.map((pt) => pt.tags) || [],
        gallery_images: galleryImages
    };
}
