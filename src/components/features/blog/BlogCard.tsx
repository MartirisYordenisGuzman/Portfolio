import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"

import { Post } from "@/types/database"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface BlogCardProps {
    post: Post
}

export function BlogCard({ post }: BlogCardProps) {
    return (
        <Card className="flex h-full flex-col overflow-hidden transition-all hover:border-foreground/50 hover:shadow-md">
            <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.published_at || ""}>
                        {new Date(post.published_at!).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </time>
                    {post.reading_time_minutes && (
                        <>
                            <span>•</span>
                            <Clock className="h-4 w-4" />
                            <span>{post.reading_time_minutes} min read</span>
                        </>
                    )}
                </div>
                <CardTitle className="line-clamp-2 mt-2">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                        {post.title}
                    </Link>
                </CardTitle>
                <div className="mt-2 flex flex-wrap gap-2">
                    {post.tags?.map((tag) => (
                        <Badge key={tag.id} variant="secondary" className="text-xs">
                            {tag.name}
                        </Badge>
                    ))}
                </div>
            </CardHeader>
            <CardContent className="flex-1">
                <p className="line-clamp-3 text-muted-foreground">
                    {post.excerpt}
                </p>
            </CardContent>
            <CardFooter>
                <Link href={`/blog/${post.slug}`} className="flex items-center text-sm font-medium text-primary hover:underline">
                    Leer artículo <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
            </CardFooter>
        </Card>
    )
}
