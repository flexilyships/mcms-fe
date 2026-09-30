import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using clsx and tailwind-merge to prevent Tailwind CSS class conflicts.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date into a human-readable string (e.g., "15 Aug 2026").
 */
export function formatDate(dateString: string | Date | null | undefined): string {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "N/A";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

/**
 * Calculates days remaining until a given target date.
 */
export function getDaysRemaining(targetDate: string | Date): number {
  const target = new Date(targetDate);
  const now = new Date();
  const diffTime = target.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Extracts a clean, human-readable error message from an API response or error object.
 */
export function extractErrorMessage(error: any): string {
  if (!error) return "An unexpected error occurred. Please try again.";

  const data = error.response?.data;
  if (!data) {
    if (error.message) return error.message;
    return "Network error. Please check your connection and try again.";
  }

  // 1. Check for nested fieldErrors in data.error.details.fieldErrors
  const fieldErrors = data.error?.details?.fieldErrors;
  if (fieldErrors && typeof fieldErrors === "object") {
    const messages: string[] = [];
    Object.entries(fieldErrors).forEach(([field, errs]) => {
      if (Array.isArray(errs) && errs.length > 0) {
        const fieldName =
          field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1");
        messages.push(`${fieldName}: ${errs.join(", ")}`);
      }
    });
    if (messages.length > 0) {
      return messages.join(" | ");
    }
  }

  // 2. Check for formErrors in data.error.details.formErrors
  const formErrors = data.error?.details?.formErrors;
  if (Array.isArray(formErrors) && formErrors.length > 0) {
    return formErrors.join(" | ");
  }

  // 3. Check data.error.message
  if (typeof data.error?.message === "string" && data.error.message) {
    return data.error.message;
  }

  // 4. Check data.message (string or array)
  if (typeof data.message === "string" && data.message) {
    return data.message;
  }
  if (Array.isArray(data.message) && data.message.length > 0) {
    return data.message.join(" | ");
  }

  // 5. Check data.error if it's a string
  if (typeof data.error === "string" && data.error) {
    return data.error;
  }

  return "An unexpected error occurred. Please try again.";
}
