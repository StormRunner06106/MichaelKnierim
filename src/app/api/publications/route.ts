import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const scholarId = searchParams.get("scholarId");
  const serpApiKey = searchParams.get("serpApiKey");
  const start = searchParams.get("start") || "0";
  const limit = searchParams.get("limit") || "10";

  if (!scholarId || !serpApiKey) {
    return NextResponse.json(
      { error: "Missing scholarId or serpApiKey" },
      { status: 400 }
    );
  }

  try {
    // Use start parameter for SerpAPI pagination
    const url = `https://serpapi.com/search.json?engine=google_scholar_author&author_id=${scholarId}&api_key=${serpApiKey}&start=${start}&num=${limit}&sort=pubdate`;

    console.log("Fetching from SerpAPI:", url);

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`SerpAPI error ${response.status}:`, errorText);
      return NextResponse.json(
        { error: `SerpAPI error: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("SerpAPI response:", JSON.stringify(data, null, 2));

    if (!data.articles || !Array.isArray(data.articles)) {
      console.error("No articles in response:", data);
      return NextResponse.json(
        { error: "No articles found in SerpAPI response", data },
        { status: 404 }
      );
    }

    // Map SerpAPI response to our Publication interface
    const publications = data.articles.map((article: any) => ({
      title: article.title || "",
      authors: article.authors || "",
      year: article.year || "",
      venue: article.publication || "",
      citations: article.cited_by?.value || 0,
      url: article.link || undefined,
      description: `${article.publication || ""} - ${
        article.cited_by?.value || 0
      } citations`,
    }));

    // Get serpapi_pagination info for next/prev
    const pagination = data.serpapi_pagination || {};
    const hasNext = !!pagination.next;
    const hasPrev = parseInt(start) > 0;

    return NextResponse.json({
      publications,
      start: parseInt(start),
      limit: parseInt(limit),
      hasNext,
      hasPrev,
      totalResults:
        data.cited_by?.table?.[0]?.citations?.all || publications.length,
    });
  } catch (error: any) {
    console.error("SerpAPI fetch error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch publications",
        message: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}
