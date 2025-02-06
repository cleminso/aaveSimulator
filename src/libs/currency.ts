import type { AaveParameter } from "../types/aave";
import aaveParametersData from "@/../docs/aave-parameter";

/**
 * Type definitions
 */
export interface Currency {
  value: string;
  label: string;
  liquidationThreshold: string;
  ltv: string;
  variableBorrowRate: string;
}

export type CurrencyMode = "collateral" | "debt";

/**
 * Validates if a parameter matches the AaveParameter interface structure
 * @param param - Parameter to validate
 * @returns boolean indicating if the parameter is valid
 */
function isValidAaveParameter(param: unknown): param is AaveParameter {
  if (!param || typeof param !== "object") return false;
  const p = param as Partial<AaveParameter>;
  return (
    typeof p.name === "string" &&
    typeof p["Collateral Enabled"] === "boolean" &&
    typeof p["Borrowing Enabled"] === "boolean" &&
    typeof p["Liquidation Threshold"] === "string" &&
    typeof p.LTV === "string" &&
    typeof p["Variable Borrow Rate"] === "string"
  );
}
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
/**
 * Parse and validate Aave parameters from raw data
 */
const parsedAaveParameters: AaveParameter[] = aaveParametersData.map(
  (param): AaveParameter => ({
    name: String(param.name),
    "Collateral Enabled": Boolean(param["Collateral Enabled"]),
    "Borrowing Enabled": Boolean(param["Borrowing Enabled"]),
    "Liquidation Threshold": String(param["Liquidation Threshold"]),
    LTV: String(param.LTV),
    "Variable Borrow Rate": String(param["Variable Borrow Rate"]),
  }),
);

/**
 * Defines the mode of operation for currency filtering
 */
export type CurrencyMode = "collateral" | "debt";

/**
 * Returns a filtered and formatted list of currencies based on the specified mode
 */

export const getFilteredCurrencies = (
  mode: CurrencyMode,
): Currency[] | never => {
  if (!["collateral", "debt"].includes(mode)) {
    throw new Error(`Invalid currency mode: ${mode}`);
  }
  if (process.env.NODE_ENV === "development") {
    console.group(`Filtering currencies for mode: ${mode}`);
  }

  // First filter the parameters based on mode with strict boolean checking
  const eligibleTokens = parsedAaveParameters.filter((param: AaveParameter) => {
    console.log(`Filtering currency: ${param.name}, Mode: ${mode}`); // ADD
    console.log(`Borrowing Enabled value: ${param["Borrowing Enabled"]}`); // ADD
    const isEnabled =
      mode === "collateral"
        ? isStrictlyTrue(param["Collateral Enabled"])
        : isStrictlyTrue(param["Borrowing Enabled"]);

    debugCurrencyFiltering(param, mode, isEnabled);

    return isEnabled;
  });

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

  return currencyList.sort((a: Currency, b: Currency) =>
    a.label.localeCompare(b.label),
  );
};
export function validateCurrencyFiltering(): void {
  const debtCurrencies = getFilteredCurrencies("debt");
  const collateralCurrencies = getFilteredCurrencies("collateral");

  const invalidDebtCurrencies = debtCurrencies.filter((currency: Currency) => {
    const param = parsedAaveParameters.find(
      (p: AaveParameter) => p.name === currency.value,
    );
    return param && !param["Borrowing Enabled"];
  });

  const invalidCollateralCurrencies = collateralCurrencies.filter(
    (currency: Currency) => {
      const param = parsedAaveParameters.find(
        (p: AaveParameter) => p.name === currency.value,
      );
      return param && !param["Collateral Enabled"];
    },
  );

  if (invalidDebtCurrencies.length > 0) {
    console.error("Invalid debt currencies found:", invalidDebtCurrencies);
    throw new Error("Invalid debt currencies detected");
  }

  if (invalidCollateralCurrencies.length > 0) {
    console.error(
      "Invalid collateral currencies found:",
      invalidCollateralCurrencies,
    );
    throw new Error("Invalid collateral currencies detected");
  }
}

// Run validation in development
if (process.env.NODE_ENV === "development") {
  validateCurrencyFiltering();
}
