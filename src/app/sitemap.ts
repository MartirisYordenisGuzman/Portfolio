import { MetadataRoute } from 'next'
import { getProjects } from '@/lib/api/projects'
import { getPosts } from '@/lib/api/posts'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://martirisdev.com'

    // Dynamic content
    const projects = await getProjects()
    const posts = await getPosts()

    const projectUrls = projects.map((project) => ({
        url: `${baseUrl}/projects/${project.slug}`,
        lastModified: new Date(project.updated_at || project.published_at || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    const postUrls = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updated_at || post.published_at || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    // Static pages
    const routes = ['', '/about', '/contact', '/projects', '/blog'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.9,
    }))

    return [...routes, ...projectUrls, ...postUrls]
}
