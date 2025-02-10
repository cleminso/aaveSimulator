# Implement graphQl logic into user address input

## Description

`I want to autofill 'simulator' section when I paste an adress inside 'userAddressInput' who had an existing aave position`

## Acceptance criterion

- The `userAddressInput` fetch the following data from `aave-v3-schema.graphql`:
  - the `collateralCurrency` type and amounts the user as deposited as collateral
  - the `debtCurrency` type and amounts the user has borrowed
  - the `currentPrice` of collateral and debt currency via `priceFeed` API
  - the `liquidationThreshold` of the collateral currency (already exist in `currency.ts` with `getLiquidationThresholdPrice`)
- The `userAddressInput` should autofill
- The `positionStore` should receive the data and make it available to the following components:
  - the `collateralSection`
  - the `debtSection`
  - the `healthFactorSummary`

- The `userAddressInput` should only accept content that at least contain `0x` and is 42 characters long or a text finish with `.eth`






 1 Explore the GraphQL Schema: Understand the aave-v3-schema.graphql to identify the necessary queries to fetch user position data.
   2 Create a GraphQL Query: Write a GraphQL query to fetch user's collateral and debt information for a given Ethereum address.
   3 Implement API Call in simulator-component.tsx: Use fetch to call the GraphQL API when the user inputs an address.
   4 Update State in simulator-component.tsx: Store the fetched data in the component's state.
   5 Pass Data as Props: Pass the fetched data as props to CollateralSection, DebtSection, and HealthFactorSummary components.
   6 Update Components to Display Data: Modify CollateralSection, DebtSection, and HealthFactorSummary to display the fetched data.
   7 Implement Error Handling: Handle cases where the address has no position or the API call fails, and display an error modal.


    1 Modify UserAddressInput component:
        • Update the handleAddressSubmit function to parse the GraphQL response (userData).
        • Extract relevant information like collateral and debt amounts, token symbols, LTV, and liquidation thresholds from the userData.
        • Use the usePositionStore to update the state with the extracted data.
     2 Update PositionStore:
        • Extend the PositionState type in position-store.ts to include fields for token symbol, LTV, and liquidation threshold.
        • Add actions in PositionStore to set these new fields.
