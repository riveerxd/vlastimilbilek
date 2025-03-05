"use client";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, LogOut, Trash2, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Define the post type
type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage: string | null;
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [error, setError] = useState("");

  // Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog/posts');
        if (response.ok) {
          const data = await response.json();
          setPosts(data.posts);
        } else {
          setError("Failed to load blog posts");
        }
      } catch (err) {
        setError("Error loading blog posts: " + err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDeleteClick = (slug: string) => {
    setPostToDelete(slug);
  };

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return;
    
    setIsDeleting(true);
    setError("");
    
    try {
      const response = await fetch(`/api/blog/${postToDelete}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        // Update the posts list without refreshing
        setPosts(posts.filter(post => post.slug !== postToDelete));
      } else {
        const data = await response.json();
        setError(data.message || "Došlo k chybě při mazání příspěvku");
      }
    } catch (err) {
      setError("Došlo k chybě při mazání příspěvku: " + err);
    } finally {
      setIsDeleting(false);
      setPostToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setPostToDelete(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-50 to-white pb-8">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-brand-900">
              Správa novinek
            </h1>
            <div className="flex gap-4">
              <Link href="/admin/novinky/new">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Nový příspěvek
                </Button>
              </Link>
              <form action="/api/auth/logout" method="POST">
                <Button
                  type="submit"
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Odhlásit
                </Button>
              </form>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-8">{error}</div>
          ) : (
            <div className="space-y-4 mt-8">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <Card key={post.slug} className="p-4 flex justify-between items-center">
                    <div>
                      <Link href={`/novinky/${post.slug}`} className="hover:underline">
                        <h2 className="font-semibold text-lg text-brand-700">{post.title}</h2>
                      </Link>
                      <p className="text-gray-500 text-sm">{post.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/admin/novinky/edit/${post.slug}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Upravit
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-red-300 text-red-600 hover:bg-red-50"
                        onClick={() => handleDeleteClick(post.slug)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Smazat
                      </Button>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-6 text-center">
                  <p className="text-gray-500">Zatím nebyly přidány žádné příspěvky.</p>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>

      <AlertDialog open={!!postToDelete} onOpenChange={() => setPostToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Opravdu chcete smazat tento příspěvek?</AlertDialogTitle>
            <AlertDialogDescription>
              Tato akce je nevratná. Příspěvek bude trvale odstraněn.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDeleteCancel} disabled={isDeleting}>Zrušit</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isDeleting ? "Mazání..." : "Smazat"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
} 