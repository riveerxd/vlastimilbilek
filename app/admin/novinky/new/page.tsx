"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import BlogEditor from "@/components/BlogEditor";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function NewBlogPostPage() {
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleSave = async (data: {
    title: string;
    content: string;
    excerpt: string;
    coverImage?: string;
  }) => {
    setIsSaving(true);
    setError("");

    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          date: new Date().toISOString().split("T")[0], // YYYY-MM-DD format
        }),
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

  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-50 to-white pb-8">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-brand-900 mb-8">
            Nový příspěvek
          </h1>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Card className="p-6 bg-white/80 backdrop-blur-sm">
            <BlogEditor onSave={handleSave} isSaving={isSaving} />
          </Card>
        </div>
      </div>
    </main>
  );
} 