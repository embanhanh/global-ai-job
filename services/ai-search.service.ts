import { GoogleGenAI } from "@google/genai";
import { createClient } from "@/lib/supabase/server";
import { Database } from "@/types/database";

type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

export function generateCandidateBio(profileData: Partial<ProfileRow>): string {
  const parts: string[] = [];

  if (profileData.job_title) {
    parts.push(`Vị trí mong muốn: ${profileData.job_title}`);
  }

  if (Array.isArray(profileData.skills) && profileData.skills.length > 0) {
    parts.push(`Kỹ năng: ${profileData.skills.join(", ")}`);
  }

  if (
    Array.isArray(profileData.experience) &&
    profileData.experience.length > 0
  ) {
    const experiences = profileData.experience as Record<string, string>[];
    const expText = experiences
      .map(
        (exp) =>
          `${exp.jobTitle || ""} tại ${exp.company || ""} (${exp.period || ""})`,
      )
      .join("; ");
    parts.push(`Kinh nghiệm: ${expText}`);
  }

  if (profileData.bio) {
    parts.push(`Tiểu sử: ${profileData.bio}`);
  }

  if (
    Array.isArray(profileData.education) &&
    profileData.education.length > 0
  ) {
    const educations = profileData.education as Record<string, string>[];
    const eduText = educations
      .map(
        (ed) =>
          `${ed.degree || ""} tại ${ed.school || ""} (${ed.period || ""})`,
      )
      .join("; ");
    parts.push(`Học vấn: ${eduText}`);
  }

  return parts.join("\n").trim();
}

export async function syncProfileEmbedding(profileId: string) {
  const supabase = await createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", profileId)
    .single();

  if (error || !profile) {
    return { success: false, error: "Profile not found" };
  }

  const bioText = generateCandidateBio(profile);

  // If there's barely any text, don't waste LLM calls
  if (!bioText || bioText.length < 10) {
    return { success: true, message: "No sufficient content to embed" };
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.embedContent({
      model: "gemini-embedding-001",
      contents: bioText,
      config: {
        outputDimensionality: 768,
      },
    });

    if (!response.embeddings || response.embeddings.length === 0) {
      throw new Error("Failed to generate embedding");
    }
    const embedding = response.embeddings[0].values;

    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        content_vector: JSON.stringify(embedding) as unknown as string,
      })
      .eq("id", profileId);

    if (updateError) throw updateError;

    return { success: true };
  } catch (err) {
    console.error("Embedding generation error:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
