import { getProjects } from "@/lib/api/projects";
import { getPosts } from "@/lib/api/posts";
import { HomeContent } from "@/components/features/home/HomeContent";

export default async function Home() {
  const projects = await getProjects();
  const posts = await getPosts();

  return <HomeContent projects={projects} posts={posts} />;
}
