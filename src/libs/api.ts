import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient("https://community-subgraphs.graph-eu.p2pify.com/3cdc87cad8efaec754312b0c6f2b9dd7/community-aave-v3");

export const fetchGraphQLData = async (query: string, variables: Record<string, any>) => {
  const data = await client.request(gql`${query}`, variables);
  return data;
};
