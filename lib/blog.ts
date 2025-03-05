import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Add this line to ensure this module only runs on the server
export const dynamic = 'force-dynamic';

// Define types for blog posts
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content?: string;
  coverImage: string | null;
}

// Ensure the blog directory exists
export const ensureBlogDirectory = () => {
  const postsDirectory = path.join(process.cwd(), "content/blog");
  if (!fs.existsSync(postsDirectory)) {
    console.log(`[Blog API] Creating blog directory at: ${postsDirectory}`);
    fs.mkdirSync(postsDirectory, { recursive: true });
  }
  return postsDirectory;
};

// Helper function for consistent error logging
const logError = (context: string, error: unknown) => {
  console.error(`[Blog API Error] ${context}:`);
  if (error instanceof Error) {
    console.error(`- Message: ${error.message}`);
    console.error(`- Stack: ${error.stack}`);
  } else {
    console.error(`- Unknown error type:`, error);
  }
};

export function getBlogPosts(): BlogPost[] {
  try {
    console.log(`[Blog API] Starting getBlogPosts()`);
    const postsDirectory = ensureBlogDirectory();
    console.log(`[Blog API] Blog directory path: ${postsDirectory}`);
    
    // If directory is empty or doesn't exist yet
    if (!fs.existsSync(postsDirectory)) {
      console.log(`[Blog API] Blog directory does not exist`);
      return [];
    }
    
    const fileNames = fs.readdirSync(postsDirectory);
    console.log(`[Blog API] Found ${fileNames.length} files in blog directory`);
    console.log(`[Blog API] All files in directory: ${fileNames.join(', ')}`);
    
    // If no files yet
    if (fileNames.length === 0) {
      console.log(`[Blog API] No files found in blog directory`);
      return [];
    }
    
    const mdFiles = fileNames.filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md'));
    console.log(`[Blog API] Found ${mdFiles.length} markdown files: ${mdFiles.join(', ')}`);
    
    const allPostsData = mdFiles.map(fileName => {
      const slug = fileName.replace(/\.mdx?$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      console.log(`[Blog API] Processing file: ${fileName}, slug: ${slug}, path: ${fullPath}`);
      
      try {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);
        
        // Validate required frontmatter fields
        if (!data.title || !data.date || !data.excerpt) {
          console.log(`[Blog API] Missing required frontmatter in file: ${fileName}`);
          return null;
        }
        
        console.log(`[Blog API] Parsed frontmatter for ${slug}:`, {
          title: data.title,
          date: data.date,
          excerpt: data.excerpt ? data.excerpt.substring(0, 30) + '...' : 'No excerpt',
          hasCoverImage: !!data.coverImage
        });
        
        return {
          slug,
          title: data.title,
          date: data.date,
          excerpt: data.excerpt,
          coverImage: data.coverImage || null,
        };
      } catch (error) {
        logError(`Error parsing blog post file: ${fullPath}`, error);
        console.log(`[Blog API] Skipping invalid file: ${fileName}`);
        return null;
      }
    }).filter((post): post is BlogPost => post !== null); // Type guard to filter out null values
    
    console.log(`[Blog API] Successfully processed ${allPostsData.length} valid blog posts`);
    
    const sortedPosts = allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
    console.log(`[Blog API] Posts sorted by date, first post date: ${sortedPosts.length > 0 ? sortedPosts[0].date : 'none'}`);
    
    return sortedPosts;
  } catch (error) {
    logError("Error in getBlogPosts()", error);
    console.log(`[Blog API] Returning empty array due to error in getBlogPosts()`);
    return [];
  }
}

export function getBlogPost(slug: string): BlogPost | null {
  try {
    console.log(`[Blog API] Getting blog post with slug: ${slug}`);
    const postsDirectory = ensureBlogDirectory();
    let fullPath = path.join(postsDirectory, `${slug}.mdx`);
    
    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(postsDirectory, `${slug}.md`);
      
      if (!fs.existsSync(fullPath)) {
        console.log(`[Blog API] Blog post not found for slug: ${slug}`);
        return null;
      }
    }
    
    console.log(`[Blog API] Reading blog post file: ${fullPath}`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Validate required frontmatter fields
    if (!data.title || !data.date || !data.excerpt) {
      console.log(`[Blog API] Missing required frontmatter in post: ${slug}`);
      return null;
    }
    
    console.log(`[Blog API] Successfully retrieved blog post: ${slug}`);
    return {
      slug,
      content,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      coverImage: data.coverImage || null,
    };
  } catch (error) {
    logError(`Error getting blog post with slug: ${slug}`, error);
    return null;
  }
} 