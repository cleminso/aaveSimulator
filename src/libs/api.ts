import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient(
  "https://community-subgraphs.graph-eu.p2pify.com/3cdc87cad8efaec754312b0c6f2b9dd7/community-aave-v3",
);

export const fetchGraphQLData = async (
  query: string,
  variables: Record<string, any>,
) => {
  const data = await client.request(gql`${query}`, variables);
  return data;
};

export const fetchTokenPrice = async (
  tokenAddress: string,
): Promise<number | undefined> => {
  try {
    const coinId = `ethereum:${tokenAddress}`; // Format coin identifier for DeFiLlama API
    const response = await fetch(
      `https://api.llama.fi/v2/prices/current/${coinId}`, //  <---  Using the correct endpoint
    );

    if (!response.ok) {
      console.error(
        `DeFiLlama API request failed with status: ${response.status}`,
      );
      return undefined; // Or throw an error if you prefer
    }

    const data = await response.json();
    console.log("DeFiLlama API response:", data); // Log the response to inspect its structure

    // ---  Adapt price extraction based on the ACTUAL DeFiLlama API response structure ---
    // ---  After inspecting the logged response, you'll know the correct path to the price
    const price = data?.coins?.[coinId]?.price; // <--- Example path, may need adjustment

    if (typeof price !== "number") {
      console.error("Unexpected price data from DeFiLlama API:", data);
      return undefined;
    }

    return price;
  } catch (error) {
    console.error("Error fetching token price from DeFiLlama API:", error);
    return undefined; // Or throw an error
  }
};
