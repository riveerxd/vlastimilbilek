import Link from 'next/link';
import { getBlogPosts } from '@/lib/blog';
import { Card } from "@/components/ui/card";
import { ArrowRight, Calendar} from 'lucide-react';
import { formatDate } from "@/lib/utils";

export default function BlogPage() {
  const posts = getBlogPosts();
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-50 to-white pb-8">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-900 mb-8 text-center">
            Novinky
          </h1>
          
          <div className="space-y-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <Link href={`/novinky/${post.slug}`} key={post.slug} className="block">
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                    <div className="p-6 border-l-4 border-brand-500 h-full flex flex-col">
                      {/* Date and metadata */}
                      <div className="flex items-center text-brand-400 mb-3 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatDate ? formatDate(post.date) : post.date}</span>
                      </div>
                      
                      {/* Title */}
                      <h2 className="text-xl md:text-2xl font-semibold text-brand-900 mb-3 group-hover:text-brand-600 transition-colors">
                        {post.title}
                      </h2>
                      
                      {/* Excerpt */}
                      <p className="text-brand-600 mb-4 flex-grow">
                        {post.excerpt}
                      </p>
                      
                      {/* Read more link */}
                      <div className="flex items-center text-brand-500 font-medium group-hover:text-brand-700 transition-colors">
                        Číst více
                        <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))
            ) : (
              <Card className="p-8 bg-white/80 backdrop-blur-sm text-center">
                <p className="text-brand-600">Zatím nebyly přidány žádné příspěvky.</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 