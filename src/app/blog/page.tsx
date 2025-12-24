import { getPosts } from "@/lib/api/posts";
import { BlogView } from "@/components/features/blog/BlogView";

export default async function BlogPage() {
    const posts = await getPosts();

    return <BlogView posts={posts} />;
}
