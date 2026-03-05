"use server";

import { createClient } from "@/lib/supabase/server";
import { UserRole } from "@/types/enums";

interface AuthData {
  email: string;
  password?: string;
  role?: UserRole;
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
        role: formData.role, // role from UserRole enum
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

export async function getCurrentRole(): Promise<UserRole | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  return (profile?.role as UserRole) || null;
}
