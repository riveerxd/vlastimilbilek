import { Metadata } from "next";
import { notFound } from "next/navigation";
import HtmlContent from "@/components/HtmlContent";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { getBlogPost as getPostFromFile } from "@/lib/blog";
import { cookies } from "next/headers";
import Link from "next/link";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

// Use the server-side function directly instead of making an API call
async function getBlogPost(slug: string) {
  try {
    // Use the direct file system function instead of API
    const post = getPostFromFile(slug);
    
    if (!post) {
      return null;
    }
    
    return post;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPost(params.slug);
  const adminSession = cookies().get("admin_session");
  const isAdmin = !!adminSession?.value;

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-50 to-white pb-8">
      <div className="container mx-auto px-4 py-24">
        <article className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold text-brand-900">{post.title}</h1>
            
            {isAdmin && (
              <Link href={`/admin/novinky/edit/${params.slug}`}>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  Upravit
                </Button>
              </Link>
            )}
          </div>
          
          <div className="text-gray-500 mb-6">
            {post.date && formatDate(post.date)}
          </div>

          {post.coverImage && (
            <div className="mb-8 relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            <HtmlContent content={post.content || ""} />
          </div>
        </article>
      </div>
    </main>
  );
} 