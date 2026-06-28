"use server";

import { createClient } from "@/app/lib/supabase/server";
import { requireAuth } from "@/app/lib/auth/require-role";

export async function completeOnboarding(): Promise<void> {
  const userId = await requireAuth();
  const supabase = await createClient();
  await supabase
    .from("profiles")
    .update({ onboarding_completed: true })
    .eq("id", userId);
}
