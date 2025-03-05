"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import BlogEditor from "@/components/BlogEditor";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";

export default function EditBlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState<{
    title: string;
    content: string;
    excerpt: string;
    coverImage?: string;
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog/${params.slug}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data.post);
        } else {
          setError("Příspěvek nebyl nalezen");
        }
      } catch (err) {
        setError("Došlo k chybě při načítání příspěvku: " + err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [params.slug]);

  const handleSave = async (data: {
    title: string;
    content: string;
    excerpt: string;
    coverImage?: string;
  }) => {
    setIsSaving(true);
    setError("");

    try {
      const response = await fetch(`/api/blog/${params.slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/admin/novinky");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Došlo k chybě při ukládání příspěvku");
      }
    } catch (err) {
      setError("Došlo k chybě při ukládání příspěvku: " + err);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-brand-50 to-white pb-8 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
      </main>
    );
  }

  if (error && !post) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-brand-50 to-white pb-8">
        <div className="container mx-auto px-4 py-24">
          <Alert variant="destructive" className="max-w-md mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-50 to-white pb-8">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-brand-900 mb-8">
            Upravit příspěvek
          </h1>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {post && (
            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <BlogEditor
                initialTitle={post.title}
                initialContent={post.content}
                initialExcerpt={post.excerpt}
                initialCoverImage={post.coverImage}
                onSave={handleSave}
                isSaving={isSaving}
              />
            </Card>
          )}
        </div>
      </div>
    </main>
  );
} 