import { apiClient } from "@/lib/api-client";
import { WaitlistInput, WaitlistResponse } from "@/types/waitlist";

export async function submitWaitlist(data: WaitlistInput): Promise<WaitlistResponse> {
  const response = await apiClient.post<WaitlistResponse>("/waitlist", data);
  return response.data;
}
