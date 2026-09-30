export async function requestPasswordReset(email: string): Promise<{ message: string }> {
  const response = await fetch("/api/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = (await response.json()) as { message?: string; error?: { message?: string } };

  if (!response.ok) {
    throw new Error(data.error?.message ?? "Unable to send reset link. Please try again.");
  }

  return { message: data.message ?? "Link sent" };
}

export async function resetPassword(input: {
  token: string;
  password: string;
}): Promise<{ message: string }> {
  const response = await fetch("/api/reset-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const data = (await response.json()) as { message?: string; error?: { message?: string } };

  if (!response.ok) {
    throw new Error(data.error?.message ?? "Unable to change password. Please try again.");
  }

  return { message: data.message ?? "Password change successful!" };
}
