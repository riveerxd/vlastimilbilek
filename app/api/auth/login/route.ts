import { cookies } from "next/headers";
import { authenticate } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const isAuthenticated = await authenticate(username, password);

  if (isAuthenticated) {
    // Set a secure HTTP-only cookie
    cookies().set({
      name: "admin_session",
      value: "authenticated",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json(
    { success: false, message: "Invalid credentials" },
    { status: 401 }
  );
} 