import { createClient } from "@/lib/supabase/server";
import { Post, Tag } from "@/types/database";

interface PostWithTags extends Post {
    post_tags: {
        tags: Tag;
    }[];
}

export async function getPosts(): Promise<Post[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("posts")
        .select(`
            *,
            post_tags (
                tags (
                    *
                )
            )
        `)
        .eq("status", "published")
        .order("published_at", { ascending: false });

    if (error) {
        console.error("Error fetching posts:", error);
        return [];
    }

    // Transform nested post_tags into flat tags array
    return ((data as unknown) as PostWithTags[] || []).map((post) => ({
        ...post,
        tags: post.post_tags?.map((pt) => pt.tags) || []
    }));
}
