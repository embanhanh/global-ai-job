export interface Province {
  id: string;
  name: string;
  type: number;
  typeText: string;
  slug: string;
}

export interface ProvinceResponse {
  total: number;
  data: Province[];
  code: string;
}

/**
 * Fetches all provinces in Vietnam from Open API.
 * The API uses paging, but since there are only 63 provinces, 
 * we fetch a larger size (100) to get all of them in one go.
 */
export async function getProvinces(): Promise<Province[]> {
  try {
    const response = await fetch(
      "https://open.oapi.vn/location/provinces?page=0&size=100",
      {
        next: { revalidate: 86400 }, // Cache for 24 hours
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch provinces: ${response.statusText}`);
    }

    const result: ProvinceResponse = await response.json();

    if (result.code !== "success") {
      throw new Error(`API returned error: ${result.code}`);
    }

    // Sort by name for better UX
    return result.data.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error("Error fetching provinces:", error);
    return [];
  }
}
