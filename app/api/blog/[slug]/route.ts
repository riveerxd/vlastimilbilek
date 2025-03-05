import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cookies } from "next/headers";
import { fixHtmlForMdx } from "@/lib/html-utils";

const postsDirectory = path.join(process.cwd(), "content/blog");

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

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    console.log(`[Blog API] Fetching post with slug: ${slug}`);
    
    let fullPath = path.join(postsDirectory, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(postsDirectory, `${slug}.mdx`);
      
      if (!fs.existsSync(fullPath)) {
        console.log(`[Blog API] Post not found for slug: ${slug}`);
        return NextResponse.json(
          { success: false, message: "Post not found" },
          { status: 404 }
        );
      }
    }
    
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    
    console.log(`[Blog API] Successfully fetched post: ${slug}`);
    return NextResponse.json({
      success: true,
      post: {
        slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        content,
        coverImage: data.coverImage || null,
      },
    });
  } catch (error) {
    logError(`Failed to fetch blog post with slug: ${params.slug}`, error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  // Check authentication
  const adminSession = cookies().get("admin_session");
  if (!adminSession?.value) {
    console.log(`[Blog API] Unauthorized PUT attempt for slug: ${params.slug}`);
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const slug = params.slug;
    console.log(`[Blog API] Updating post with slug: ${slug}`);
    
    const { title, content, excerpt, coverImage } = await request.json();

    // Validate required fields
    if (!title || !content || !excerpt) {
      console.log(`[Blog API] Missing required fields for slug: ${slug}`);
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Add character limit validation
    const TITLE_MAX_LENGTH = 100;
    const EXCERPT_MAX_LENGTH = 200;

    if (title.length > TITLE_MAX_LENGTH) {
      console.log(`[Blog API] Title too long (${title.length} chars) for slug: ${slug}`);
      return NextResponse.json(
        { success: false, message: `Název příspěvku musí být maximálně ${TITLE_MAX_LENGTH} znaků` },
        { status: 400 }
      );
    }

    if (excerpt.length > EXCERPT_MAX_LENGTH) {
      console.log(`[Blog API] Excerpt too long (${excerpt.length} chars) for slug: ${slug}`);
      return NextResponse.json(
        { success: false, message: `Krátký popis musí být maximálně ${EXCERPT_MAX_LENGTH} znaků` },
        { status: 400 }
      );
    }

    // Find the existing file
    let filePath = path.join(postsDirectory, `${slug}.md`);
    let fileExists = fs.existsSync(filePath);
    
    if (!fileExists) {
      filePath = path.join(postsDirectory, `${slug}.mdx`);
      fileExists = fs.existsSync(filePath);
      
      if (!fileExists) {
        console.log(`[Blog API] Post not found for update, slug: ${slug}`);
        return NextResponse.json(
          { success: false, message: "Post not found" },
          { status: 404 }
        );
      }
    }

    // Read the existing file to get the date
    const existingContent = fs.readFileSync(filePath, "utf8");
    const { data: existingData } = matter(existingContent);

    // Fix HTML to be MDX compatible
    const fixedContent = fixHtmlForMdx(content);

    // Create frontmatter
    const frontmatter = {
      title,
      date: existingData.date, // Keep the original date
      excerpt,
      ...(coverImage && { coverImage }),
    };

    // Create markdown content
    const markdown = matter.stringify(fixedContent, frontmatter);

    // Save to file
    fs.writeFileSync(filePath, markdown);

    console.log(`[Blog API] Successfully updated post: ${slug}`);
    return NextResponse.json({ success: true, slug });
  } catch (error) {
    logError(`Failed to update blog post with slug: ${params.slug}`, error);
    return NextResponse.json(
      { success: false, message: "Failed to update blog post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  // Check authentication
  const adminSession = cookies().get("admin_session");
  if (!adminSession?.value) {
    console.log(`[Blog API] Unauthorized DELETE attempt for slug: ${params.slug}`);
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const slug = params.slug;
    console.log(`[Blog API] Deleting post with slug: ${slug}`);
    
    let filePath = path.join(postsDirectory, `${slug}.md`);
    
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      filePath = path.join(postsDirectory, `${slug}.mdx`);
      
      if (!fs.existsSync(filePath)) {
        console.log(`[Blog API] Post not found for deletion, slug: ${slug}`);
        return NextResponse.json(
          { success: false, message: "Post not found" },
          { status: 404 }
        );
      }
    }
    
    // Delete the file
    fs.unlinkSync(filePath);
    
    console.log(`[Blog API] Successfully deleted post: ${slug}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    logError(`Failed to delete blog post with slug: ${params.slug}`, error);
    return NextResponse.json(
      { success: false, message: "Failed to delete blog post" },
      { status: 500 }
    );
  }
} 