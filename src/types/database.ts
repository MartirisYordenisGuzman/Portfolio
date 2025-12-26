export type ContentStatus = 'draft' | 'published' | 'archived';

export interface Profile {
    id: string;
    username: string | null;
    full_name: string | null;
    avatar_url: string | null;
    website: string | null;
    updated_at: string | null;
    created_at: string;
}

export interface Project {
    id: string;
    slug: string;
    title: string;
    short_description: string;
    content: string | null;
    cover_image: string | null;
    github_url: string | null;
    demo_url: string | null;
    featured: boolean;
    status: ContentStatus;
    published_at: string | null;
    created_at: string;
    updated_at: string;
    tags?: Tag[]; // Joined
    gallery_images?: ProjectImage[];
}

export interface ProjectImage {
    id: string;
    project_id: string;
    url: string;
    display_order: number;
    created_at: string;
}

export interface Post {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string | null;
    cover_image: string | null;
    reading_time_minutes: number | null;
    status: ContentStatus;
    published_at: string | null;
    project_id: string | null;
    created_at: string;
    updated_at: string;
    tags?: Tag[]; // Joined
}

export interface Tag {
    id: string;
    name: string;
    slug: string;
    icon_path: string | null;
}

export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    message: string;
    read: boolean;
    created_at: string;
}
