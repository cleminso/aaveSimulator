import type { AaveParameters, AaveParameter } from "../types/aave";
import parameters from "@/../docs/aave-parameter.json";

/**
 * Strictly checks if a value is boolean true
 */
const isStrictlyTrue = (value: any): boolean => value === true;

/**
 * Debug logging utility
 */
const debugCurrencyFiltering = (
  param: AaveParameter,
  mode: CurrencyMode,
  isIncluded: boolean,
) => {
  if (process.env.NODE_ENV === "development") {
    console.group(`Currency: ${param.name}`);
    console.log(`Mode: ${mode}`);
    console.log(`Collateral Enabled: ${param["Collateral Enabled"]}`);
    console.log(`Borrowing Enabled: ${param["Borrowing Enabled"]}`);
    console.log(`Included in results: ${isIncluded}`);
    console.groupEnd();
  }
};
const aaveParameters = parameters as AaveParameters;

/**
 * Represents a currency option in the UI
 */
export interface Currency {
  value: string;
  label: string;
  liquidationThreshold: string;
  ltv: string;
  variableBorrowRate: string;
}

/**
 * Defines the mode of operation for currency filtering
 */
export type CurrencyMode = "collateral" | "debt";

/**
 * Returns a filtered and formatted list of currencies based on the specified mode
 */
export const getFilteredCurrencies = (mode: CurrencyMode): Currency[] => {
  if (process.env.NODE_ENV === "development") {
    console.group(`Filtering currencies for mode: ${mode}`);
  }

  // First filter the parameters based on mode with strict boolean checking
  const eligibleTokens = aaveParameters.parameters.filter(
    (param: AaveParameter) => {
      const isEnabled =
        mode === "collateral"
          ? isStrictlyTrue(param["Collateral Enabled"])
          : isStrictlyTrue(param["Borrowing Enabled"]);

      debugCurrencyFiltering(param, mode, isEnabled);

      return isEnabled;
    },
  );

  if (process.env.NODE_ENV === "development") {
    console.log(`Found ${eligibleTokens.length} eligible tokens`);
    console.groupEnd();
  }

  // Then map to Currency type with additional validation
  const currencyList = eligibleTokens.map((param: AaveParameter): Currency => {
    // Double-check the validation during mapping
    if (
      (mode === "collateral" && !isStrictlyTrue(param["Collateral Enabled"])) ||
      (mode === "debt" && !isStrictlyTrue(param["Borrowing Enabled"]))
    ) {
      throw new Error(
        `Invalid state: Currency ${param.name} is not ${mode} enabled but passed filter`,
      );
    }

    return {
      value: param.name,
      label: param.name,
      liquidationThreshold: param["Liquidation Threshold"],
      ltv: param.LTV,
      variableBorrowRate: param["Variable Borrow Rate"],
    };
  });

  return currencyList.sort((a, b) => a.label.localeCompare(b.label));
};
export function validateCurrencyFiltering() {
  const debtCurrencies = getFilteredCurrencies("debt");
  const invalidCurrencies = debtCurrencies.filter(
    (currency) =>
      aaveParameters.parameters.find((p) => p.name === currency.value)?.[
        "Borrowing Enabled"
      ] === false,
  );

  if (invalidCurrencies.length > 0) {
    console.error(
      "Found currencies with Borrowing Enabled = false in debt mode:",
      invalidCurrencies,
    );
  }
}

// Run validation in development
if (process.env.NODE_ENV === "development") {
  validateCurrencyFiltering();
}
