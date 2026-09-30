import { NextResponse } from "next/server";

/**
 * Dummy stand-in until the backend password-reset API is ready.
 * Accepts { email } and always returns success after a short delay.
 */
export async function POST(request: Request) {
  let email = "";
  try {
    const body = (await request.json()) as { email?: unknown };
    email = typeof body.email === "string" ? body.email.trim() : "";
  } catch {
    return NextResponse.json(
      { error: { message: "Invalid request body" } },
      { status: 400 }
    );
  }

  if (!email || !email.includes("@")) {
    return NextResponse.json(
      { error: { message: "Enter a valid email address" } },
      { status: 400 }
    );
  }

  await new Promise((resolve) => setTimeout(resolve, 600));

  return NextResponse.json({
    message: "Please check your email inbox for the link sent from us.",
    email,
  });
}
