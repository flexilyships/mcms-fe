import { NextResponse } from "next/server";

/**
 * Dummy stand-in until the backend reset-password API is ready.
 * Accepts { token, password } and always returns success after a short delay.
 */
export async function POST(request: Request) {
  let password = "";
  try {
    const body = (await request.json()) as { token?: unknown; password?: unknown };
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json(
      { error: { message: "Invalid request body" } },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: { message: "Minimum length is 8 characters." } },
      { status: 400 }
    );
  }

  await new Promise((resolve) => setTimeout(resolve, 600));

  return NextResponse.json({
    message: "Password change successful!",
  });
}
