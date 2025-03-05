import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Add this line to ensure this module only runs on the server
export const dynamic = 'force-dynamic';

// Ensure the blog directory exists
const ensureBlogDirectory = () => {
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }
  return postsDirectory;
};

export function getBlogPosts() {
  const postsDirectory = ensureBlogDirectory();
  
  // If directory is empty or doesn't exist yet
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  
  // If no files yet
  if (fileNames.length === 0) {
    return [];
  }
  
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.mdx?$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        coverImage: data.coverImage || null,
      };
    });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogPost(slug: string) {
  try {
    const postsDirectory = ensureBlogDirectory();
    let fullPath = path.join(postsDirectory, `${slug}.mdx`);
    
    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(postsDirectory, `${slug}.md`);
      
      if (!fs.existsSync(fullPath)) {
        return null;
      }
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      slug,
      content,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      coverImage: data.coverImage || null,
    };
  } catch (error) {
    console.error("Error getting blog post:", error);
    return null;
  }
} 