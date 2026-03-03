"use server";

import { createClient } from "@/lib/supabase/server";

interface AuthData {
  email: string;
  password?: string;
  role?: "candidate" | "recruiter";
  locale: string;
}

export async function signIn(formData: AuthData) {
  const supabase = await createClient();

  if (!formData.password) return { error: "Password is required" };

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function signUp(formData: AuthData) {
  const supabase = await createClient();

  if (!formData.password) return { error: "Password is required" };

  const { error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        role: formData.role, // "candidate" or "recruiter"
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function signOutOfApp() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return { success: true };
}
