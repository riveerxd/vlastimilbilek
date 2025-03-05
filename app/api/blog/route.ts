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

export async function POST(request: Request) {
  // Check authentication
  const adminSession = cookies().get("admin_session");
  if (!adminSession?.value) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { title, content, excerpt, coverImage, date } = await request.json();

    // Validate required fields
    if (!title || !content || !excerpt) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Add character limit validation
    const TITLE_MAX_LENGTH = 100;
    const EXCERPT_MAX_LENGTH = 200;

    if (title.length > TITLE_MAX_LENGTH) {
      return NextResponse.json(
        { success: false, message: `Title must be ${TITLE_MAX_LENGTH} characters or less` },
        { status: 400 }
      );
    }

    if (excerpt.length > EXCERPT_MAX_LENGTH) {
      return NextResponse.json(
        { success: false, message: `Excerpt must be ${EXCERPT_MAX_LENGTH} characters or less` },
        { status: 400 }
      );
    }

    // Fix HTML to be MDX compatible
    const fixedContent = fixHtmlForMdx(content);

    // Create slug from title
    const slug = slugify(title, { lower: true, strict: true });

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
    fs.writeFileSync(filePath, markdown);

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error("Error saving blog post:", error);
    return NextResponse.json(
      { success: false, message: "Failed to save blog post" },
      { status: 500 }
    );
  }
} 