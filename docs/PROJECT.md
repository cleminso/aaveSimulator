# TODO

## Tasks

- [x] Design the layout of the simulator page.
- [x] Add ShadCN components to the layout
- [ ] Create input components for collateral and borrow amounts using ShadCN components.
- [ ] Create a component to display the calculated Health Factor using ShadCN components.
- [ ] Style the Health Factor display component to visually represent risk levels (safe, moderate, under-collateralized) using TailwindCSS classes.
- [ ] Create an input component for the user's Ethereum address using ShadCN components.
- [ ] Implement a loading state or visual indicator for API calls.
- [ ] Create a non-blocking modal or inline error message component using ShadCN components to display errors to the user.
- [ ] Implement visual feedback when the user removes the address from the input field, indicating that the page content will be cleared.
- [ ] Ensure all components are responsive and work on different screen sizes.
- [ ] Set up the project with Vite, React, and TypeScript.
- [ ] Install necessary dependencies (TailwindCSS, ShadCN, GraphQL client).
- [ ] Configure TailwindCSS and ShadCN.
- [ ] Implement manual input for collateral and borrow amounts.
- [ ] Fetch token risk parameters (LTV, Liquidation Threshold) from the `docs/aave-parameter.json` file.
- [ ] Implement the logic to calculate the weighted average liquidation threshold based on the collateral tokens.
- [ ] Implement the Health Factor calculation logic based on the formula: `Health Factor = (Total Collateral Value * Weighted Average Liquidation Threshold) / Total Borrow Value`.
- [ ] Display the Health Factor value.
- [ ] Implement functionality to fetch user's borrowing and lending positions from the Aave subgraph using the provided GraphQL API.
- [ ] Define GraphQL queries to fetch user-specific data (collateral and borrow balances, token details).
- [ ] Implement error handling for API calls (e.g., invalid address, API errors).
- [ ] Implement logic to autofill the collateral and borrow input components with data fetched from the API.
- [ ] Handle the case where the user's address has no borrowing position and display an appropriate message.
- [ ] Implement functionality to clear the page content and reset to the default state when the user removes the address from the input field.
- [ ] Write unit tests for the Health Factor calculation logic.
- [ ] Implement functionality to clear the page content when the user removes the address from the user address input.
   - [ ] Identify all components that display user-specific data (e.g., collateral/borrow inputs, health factor).
   - [ ] Create a function to reset these components to their default state (empty values, default display for health factor).
   - [ ] Implement an event handler for the address input field to trigger the reset function when the input is cleared.
   - [ ] Ensure the page returns to its initial state after clearing the address.
- [ ] Write integration tests for the API data fetching.
- [ ] Update the `docs/TODO.md` file with any new tasks or changes.
- [ ] Maintain a changelog at the bottom of the `docs/TODO.md` file.

## Changelog

- [x] 2024-07-11: Reordered tasks to prioritize UI-related tasks.
- [x] 2024-07-12: Added tasks for designing the layout of the simulator page.
- [x] 2024-07-13: Removed old CSS files and replaced with TailwindCSS classes.
- [x] 2024-07-14: Updated `CurrencySelector` to match container width when opened using `Popover`.
    - Modified `CurrencySelector` to accept and apply a `className` prop to `PopoverContent`.
    - Updated `TokenInputSection` to pass `w-full` as `className` to `CurrencySelector`.
- [x] 2024-07-14: Added "Collateral Token" label to `CurrencySelector` in `collateral-section.tsx`.
    - Wrapped `TokenInputSection` in a `div` container.
    - Added a `Label` element with "Content-Large" typography styling (font-family: Roboto, font-weight: 500, font-size: 20px, line-height: 25px).
- [x] 2024-07-14: Added "Debt Token" label to `CurrencySelector` in `debt-section.tsx`.
    - Wrapped `TokenInputSection` in a `div` container.
    - Added a `Label` element with "Content-Large" typography styling (font-family: Roboto, font-weight: 500, font-size: 20px, line-height: 25px).
- [x] 2024-07-14: Updated `Popover` to accept a `className` prop.
