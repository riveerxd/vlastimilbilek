import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cookies } from "next/headers";
import slugify from "slugify";
import { fixHtmlForMdx } from "@/lib/html-utils";

// Ensure the blog directory exists
const ensureBlogDirectory = () => {
  const postsDirectory = path.join(process.cwd(), "content/blog");
  if (!fs.existsSync(postsDirectory)) {
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

export async function POST(request: Request) {
  // Check authentication
  const adminSession = cookies().get("admin_session");
  if (!adminSession?.value) {
    console.log(`[Blog API] Unauthorized POST attempt`);
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    console.log(`[Blog API] Creating new blog post`);
    const { title, content, excerpt, coverImage, date } = await request.json();

    // Validate required fields
    if (!title || !content || !excerpt) {
      console.log(`[Blog API] Missing required fields for new post`);
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Add character limit validation
    const TITLE_MAX_LENGTH = 100;
    const EXCERPT_MAX_LENGTH = 200;

    if (title.length > TITLE_MAX_LENGTH) {
      console.log(`[Blog API] Title too long (${title.length} chars) for new post`);
      return NextResponse.json(
        { success: false, message: `Title must be ${TITLE_MAX_LENGTH} characters or less` },
        { status: 400 }
      );
    }

    if (excerpt.length > EXCERPT_MAX_LENGTH) {
      console.log(`[Blog API] Excerpt too long (${excerpt.length} chars) for new post`);
      return NextResponse.json(
        { success: false, message: `Excerpt must be ${EXCERPT_MAX_LENGTH} characters or less` },
        { status: 400 }
      );
    }

    // Fix HTML to be MDX compatible
    const fixedContent = fixHtmlForMdx(content);

    // Create slug from title
    const slug = slugify(title, { lower: true, strict: true });
    console.log(`[Blog API] Generated slug for new post: ${slug}`);

    // Create frontmatter
    const frontmatter = {
      title,
      date,
      excerpt,
      ...(coverImage && { coverImage }),
    };

    // Create markdown content
    const markdown = matter.stringify(fixedContent, frontmatter);

    // Save to file
    const postsDirectory = ensureBlogDirectory();
    const filePath = path.join(postsDirectory, `${slug}.md`);
    console.log(`[Blog API] Preparing to save file at: ${filePath}`);

    // Check if a post with this slug already exists
    if (fs.existsSync(filePath)) {
      console.log(`[Blog API] Post with slug already exists: ${slug}`);
      return NextResponse.json(
        { success: false, message: "A post with this title already exists" },
        { status: 409 }
      );
    }

    // Log file content summary
    console.log(`[Blog API] Markdown content length: ${markdown.length} characters`);
    console.log(`[Blog API] Frontmatter preview:`, {
      title: title.substring(0, 30) + (title.length > 30 ? '...' : ''),
      date,
      excerptLength: excerpt.length,
      hasCoverImage: !!coverImage
    });

    try {
      fs.writeFileSync(filePath, markdown);
      console.log(`[Blog API] File successfully written to: ${filePath}`);
      
      // Verify file was created
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        console.log(`[Blog API] File verification: exists, size: ${stats.size} bytes`);
      } else {
        console.log(`[Blog API] File verification failed: file does not exist after write`);
      }
      
      // List directory contents after file creation
      const dirContents = fs.readdirSync(postsDirectory);
      console.log(`[Blog API] Directory contents after save: ${dirContents.join(', ')}`);
      
    } catch (writeError) {
      logError(`Error writing file to ${filePath}`, writeError);
      return NextResponse.json(
        { success: false, message: "Failed to write blog post file" },
        { status: 500 }
      );
    }

    console.log(`[Blog API] Successfully created new post with slug: ${slug}`);
    return NextResponse.json({ success: true, slug });
  } catch (error) {
    logError("Failed to save new blog post", error);
    return NextResponse.json(
      { success: false, message: "Failed to save blog post" },
      { status: 500 }
    );
  }
} 