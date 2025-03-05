import { NextResponse } from "next/server";
import { getBlogPosts } from "@/lib/blog";

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

export async function GET() {
  try {
    console.log(`[Blog API] Fetching all blog posts`);
    const posts = getBlogPosts();
    console.log(`[Blog API] Successfully fetched ${posts.length} posts`);
    return NextResponse.json({ posts });
  } catch (error) {
    logError("Failed to fetch blog posts", error);
    return NextResponse.json(
      { message: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}
