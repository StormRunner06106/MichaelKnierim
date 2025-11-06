// Google Scholar API service using SerpAPI
export interface Publication {
  title: string;
  authors: string;
  year: string;
  venue: string;
  citations: number;
  url?: string;
  description?: string;
}

export interface PublicationFilters {
  searchTerm?: string;
  selectedYear?: string;
}

// Fetch publications via Next.js API route (to avoid CORS)
export async function fetchGoogleScholarData(
  scholarId: string,
  serpApiKey: string
): Promise<Publication[]> {
  const url = `/api/publications?scholarId=${scholarId}&serpApiKey=${serpApiKey}`;

  console.log("Fetching from API route:", url);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  console.log(
    `Successfully fetched ${data.publications.length} publications from API`
  );
  return data.publications;
}

// Filter and sort publications
export function filterAndSortPublications(
  publications: Publication[],
  filters: PublicationFilters
): Publication[] {
  let filtered = [...publications];

  // Filter by search term (title)
  if (filters.searchTerm && filters.searchTerm.trim()) {
    const searchTerm = filters.searchTerm.toLowerCase().trim();
    filtered = filtered.filter(
      (pub) =>
        pub.title.toLowerCase().includes(searchTerm) ||
        pub.authors.toLowerCase().includes(searchTerm) ||
        pub.venue.toLowerCase().includes(searchTerm)
    );
  }

  // Filter by year
  if (filters.selectedYear && filters.selectedYear !== "all") {
    filtered = filtered.filter((pub) => pub.year === filters.selectedYear);
  }

  // Sort by year (newest first)
  filtered.sort((a, b) => {
    const yearA = parseInt(a.year) || 0;
    const yearB = parseInt(b.year) || 0;
    return yearB - yearA;
  });

  return filtered;
}

// Get unique years from publications for filter dropdown
export function getUniqueYears(publications: Publication[]): string[] {
  const years = publications
    .map((pub) => pub.year)
    .filter((year) => year && year.trim())
    .filter((year, index, arr) => arr.indexOf(year) === index)
    .sort((a, b) => parseInt(b) - parseInt(a));

  return years;
}

// Paginated fetch function using start parameter
export async function fetchPublications(
  start: number = 0,
  limit: number = 10,
  scholarId: string,
  serpApiKey: string,
  filters: PublicationFilters = {}
): Promise<{
  publications: Publication[];
  start: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
  totalResults: number;
}> {
  const url = `/api/publications?scholarId=${scholarId}&serpApiKey=${serpApiKey}&start=${start}&limit=${limit}&sort=pubdate`;

  console.log("Fetching publications from API route:", url);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  // Apply filters to the received data if needed
  const filtered = filterAndSortPublications(data.publications, filters);

  return {
    publications: filtered,
    start: data.start,
    limit: data.limit,
    hasNext: data.hasNext,
    hasPrev: data.hasPrev,
    totalResults: data.totalResults,
  };
}
