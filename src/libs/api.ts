export async function fetchGraphQLData(query: string, variables?: Record<string, any>) {
  const apiUrl = process.env.AAVE_SUBGRAPH_URL;

  if (!apiUrl) {
    throw new Error("AAVE_SUBGRAPH_URL environment variable is not defined.");
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      console.error("GraphQL errors:", data.errors);
      throw new Error("GraphQL query returned errors");
    }

    return data.data;
  } catch (error) {
    console.error("Error fetching GraphQL ", error);
    throw new Error("Failed to fetch GraphQL data");
  }
}
