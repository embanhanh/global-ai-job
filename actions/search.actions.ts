"use server";

import { GoogleGenAI } from "@google/genai";
import { createClient } from "@/lib/supabase/server";
import { Database } from "@/types/database";

type CandidateMatch =
  Database["public"]["Functions"]["match_candidates"]["Returns"][0];

export async function searchCandidatesAction(queryText: string) {
  if (!queryText || queryText.trim() === "") {
    return { success: true, data: [] };
  }

  try {
    // Generate embedding for the query
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.embedContent({
      model: "gemini-embedding-001",
      contents: queryText,
      config: {
        outputDimensionality: 768,
      },
    });

    if (!response.embeddings || response.embeddings.length === 0) {
      throw new Error("Failed to generate embedding");
    }
    const embedding = response.embeddings[0].values;

    const supabase = await createClient();

    // Auth check using session/user
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    // Call match_candidates RPC with pgvector
    const { data: candidates, error } = await supabase.rpc("match_candidates", {
      query_embedding: JSON.stringify(embedding) as unknown as string, // Cast to string to bypass typings for vector
      match_threshold: 0.3, // Threshold of 0.3 means minimum cosine matching
      match_count: 20,
    });

    if (error) {
      console.error("Supabase RPC match error:", error);
      throw error;
    }

    return { success: true, data: candidates as CandidateMatch[] };
  } catch (error) {
    console.error("Search candidates action error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
