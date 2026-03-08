"use server"

import { createClient } from "@/lib/supabase/server"
import { SupabaseClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

// Helper to manage tags
async function manageTags(supabase: SupabaseClient, type: 'project' | 'post', id: string, tagsJson: string) {
    if (!tagsJson) return;

    let tagIds: string[] = []
    try {
        tagIds = JSON.parse(tagsJson)
    } catch {
        return
    }

    const table = type === 'project' ? 'project_tags' : 'post_tags'
    const idField = type === 'project' ? 'project_id' : 'post_id'

    // Delete existing
    await supabase.from(table).delete().eq(idField, id)

    // Insert new
    if (tagIds.length > 0) {
        const inserts = tagIds.map((tagId: string) => ({
            [idField]: id,
            tag_id: tagId
        }))
        await supabase.from(table).insert(inserts)
    }
}

// Helper to manage project images
async function manageProjectImages(supabase: SupabaseClient, projectId: string, imagesJson: string) {
    if (!imagesJson) {
        console.log("No images JSON provided for project:", projectId);
        return;
    }

    let imageUrls: string[] = []
    try {
        imageUrls = JSON.parse(imagesJson)
        console.log(`Managing gallery for project ${projectId}. Found ${imageUrls.length} images.`);
    } catch (e) {
        console.error("Failed to parse gallery images JSON:", e);
        return
    }

    // Delete existing images (simple replacement strategy)
    const { error: deleteError } = await supabase.from('project_images').delete().eq('project_id', projectId)
    if (deleteError) {
        console.error("Error deleting old project images:", deleteError);
    }

    if (imageUrls.length > 0) {
        const inserts = imageUrls.map((url, index) => ({
            project_id: projectId,
            url: url,
            display_order: index
        }))
        const { error: insertError } = await supabase.from('project_images').insert(inserts)
        if (insertError) {
            console.error("Error inserting new project images:", insertError);
        } else {
            console.log(`Successfully inserted ${inserts.length} images for project ${projectId}`);
        }
    }
}

// --- PROJECT ACTIONS ---

export async function createProject(formData: FormData) {
    const supabase = await createClient()

    const title = formData.get("title") as string
    const slug = formData.get("slug") as string
    const short_description = formData.get("short_description") as string
    const content = formData.get("content") as string
    const github_url = formData.get("github_url") as string
    const demo_url = formData.get("demo_url") as string
    const cover_image = formData.get("cover_image") as string
    const status = formData.get("status") as string
    const tagsJson = formData.get("tags") as string
    const galleryImagesJson = formData.get("gallery_images") as string

    const published_at = status === "published" ? new Date().toISOString() : null

    const { data, error } = await supabase.from("projects").insert({
        title,
        slug,
        short_description,
        content,
        github_url: github_url || null,
        demo_url: demo_url || null,
        cover_image: cover_image || null,
        status,
        published_at,
    }).select().single()

    if (error) {
        return { error: error.message }
    }

    if (data) {
        if (tagsJson) await manageTags(supabase, 'project', data.id, tagsJson)
        if (galleryImagesJson) await manageProjectImages(supabase, data.id, galleryImagesJson)
    }

    revalidatePath("/admin/projects")
    revalidatePath("/projects")
    revalidatePath("/")
    redirect("/admin/projects")
}

export async function updateProject(id: string, formData: FormData) {
    const supabase = await createClient()

    const title = formData.get("title") as string
    const slug = formData.get("slug") as string
    const short_description = formData.get("short_description") as string
    const content = formData.get("content") as string
    const github_url = formData.get("github_url") as string
    const demo_url = formData.get("demo_url") as string
    const cover_image = formData.get("cover_image") as string
    const status = formData.get("status") as string
    const tagsJson = formData.get("tags") as string
    const galleryImagesJson = formData.get("gallery_images") as string

    const updateData: Record<string, string | null> = {
        title,
        slug,
        short_description,
        content,
        github_url: github_url || null,
        demo_url: demo_url || null,
        cover_image: cover_image || null,
        status,
        updated_at: new Date().toISOString(),
    }

    if (status === 'published' && !formData.get('existing_publish_date')) {
        updateData.published_at = new Date().toISOString()
    }

    const { error } = await supabase.from("projects").update(updateData).eq("id", id)

    if (error) {
        return { error: error.message }
    }

    if (tagsJson) await manageTags(supabase, 'project', id, tagsJson)
    if (galleryImagesJson) await manageProjectImages(supabase, id, galleryImagesJson)

    revalidatePath("/admin/projects")
    revalidatePath("/projects")
    revalidatePath("/")
    redirect("/admin/projects")
}

export async function deleteProject(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from("projects").delete().eq("id", id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath("/admin/projects")
    revalidatePath("/projects")
    revalidatePath("/")
}

// --- BLOG POST ACTIONS ---

export async function createPost(formData: FormData) {
    const supabase = await createClient()

    const title = formData.get("title") as string
    const slug = formData.get("slug") as string
    const excerpt = formData.get("excerpt") as string
    const content = formData.get("content") as string
    const cover_image = formData.get("cover_image") as string
    const reading_time = formData.get("reading_time_minutes")
    const status = formData.get("status") as string
    const tagsJson = formData.get("tags") as string

    const published_at = status === "published" ? new Date().toISOString() : null

    const { data, error } = await supabase.from("posts").insert({
        title,
        slug,
        excerpt,
        content,
        cover_image: cover_image || null,
        reading_time_minutes: reading_time ? parseInt(reading_time.toString()) : null,
        status,
        published_at,
    }).select().single()

    if (error) {
        return { error: error.message }
    }

    if (data && tagsJson) {
        await manageTags(supabase, 'post', data.id, tagsJson)
    }

    revalidatePath("/admin/posts")
    revalidatePath("/blog")
    return { success: true }
}

export async function updatePost(id: string, formData: FormData) {
    const supabase = await createClient()

    const title = formData.get("title") as string
    const slug = formData.get("slug") as string
    const excerpt = formData.get("excerpt") as string
    const content = formData.get("content") as string
    const cover_image = formData.get("cover_image") as string
    const reading_time = formData.get("reading_time_minutes")
    const status = formData.get("status") as string
    const tagsJson = formData.get("tags") as string

    const updateData: Record<string, string | number | null> = {
        title,
        slug,
        excerpt,
        content,
        cover_image: cover_image || null,
        reading_time_minutes: reading_time ? parseInt(reading_time.toString()) : null,
        status,
        updated_at: new Date().toISOString(),
    }

    if (status === 'published' && !formData.get('existing_publish_date')) {
        updateData.published_at = new Date().toISOString()
    }

    const { error } = await supabase.from("posts").update(updateData).eq("id", id)

    if (error) {
        return { error: error.message }
    }

    if (tagsJson) {
        await manageTags(supabase, 'post', id, tagsJson)
    }

    revalidatePath("/admin/posts")
    revalidatePath("/blog")
    return { success: true }
}

export async function deletePost(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from("posts").delete().eq("id", id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath("/admin/posts")
    revalidatePath("/admin/posts")
    revalidatePath("/blog")
}


// --- TAG ACTIONS ---

export async function createTag(formData: FormData) {
    const supabase = await createClient()
    const name = formData.get("name") as string
    const slug = formData.get("slug") as string

    const { error } = await supabase.from("tags").insert({ name, slug })

    if (error) return { error: error.message }

    revalidatePath("/admin/tags")
    revalidatePath("/")
    return { success: true }
}

export async function updateTag(id: string, formData: FormData) {
    const supabase = await createClient()
    const name = formData.get("name") as string
    const slug = formData.get("slug") as string

    const { error } = await supabase.from("tags").update({ name, slug }).eq("id", id)

    if (error) return { error: error.message }

    revalidatePath("/admin/tags")
    return { success: true }
}

export async function deleteTag(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from("tags").delete().eq("id", id)

    if (error) return { error: error.message }

    revalidatePath("/admin/tags")
    revalidatePath("/")
    return { success: true }
}
