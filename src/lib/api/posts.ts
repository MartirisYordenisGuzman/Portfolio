import { createClient as createStaticClient } from "@supabase/supabase-js";
import { Post, Tag } from "@/types/database";
import { unstable_cache } from "next/cache";

interface PostWithTags extends Post {
    post_tags: {
        tags: Tag;
    }[];
}

export const getPosts = unstable_cache(
    async (): Promise<Post[]> => {
        const supabase = createStaticClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

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
    },
    ['posts-list'],
    { revalidate: 3600, tags: ['posts'] }
);

export const getPostBySlug = unstable_cache(
    async (slug: string): Promise<Post | null> => {
        const supabase = createStaticClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        const decodedSlug = decodeURIComponent(slug);

        // First try: Direct exact match
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
            .eq("slug", decodedSlug)
            .single();

        if (!error && data) {
            // Transform nested post_tags
            const post = data as unknown as PostWithTags;
            return {
                ...post,
                tags: post.post_tags?.map((pt) => pt.tags) || []
            };
        }

        // Fallback: Fetch all published posts and find match in JS
        // This handles potential encoding/normalization mismatches that SQL equality might miss
        console.warn(`Direct fetch failed for slug "${decodedSlug}" (error: ${error?.code}), trying fallback...`);

        const { data: allPosts, error: listError } = await supabase
            .from("posts")
            .select(`
            *,
            post_tags (
                tags (
                    *
                )
            )
        `)
            .eq("status", "published");

        if (listError || !allPosts) {
            console.error("Fallback fetch failed:", listError);
            return null;
        }

        // Try to find a match, being flexible with decoding
        const match = allPosts.find(p =>
            p.slug === decodedSlug ||
            p.slug === slug ||
            decodeURIComponent(p.slug) === decodedSlug
        );

        if (match) {
            const post = match as unknown as PostWithTags;
            return {
                ...post,
                tags: post.post_tags?.map((pt) => pt.tags) || []
            };
        }

        console.error(`Post not found even in fallback. Slug requested: ${decodedSlug}`);
        return null;
    },
    ['post-by-slug'],
    { revalidate: 3600, tags: ['posts'] }
);
