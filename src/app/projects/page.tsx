import { getProjects } from "@/lib/api/projects";
import { ProjectsView } from "@/components/features/projects/ProjectsView";

export default async function ProjectsPage() {
    const projects = await getProjects();

    return <ProjectsView projects={projects} />;
}
