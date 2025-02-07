import type { AaveParameter } from "../types/aave";
import aaveParametersData from "./aave-parameter";

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

const isStrictlyTrue = (value: any): boolean => value === true;

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
    const isEnabled =
      mode === "collateral"
        ? isStrictlyTrue(param["Collateral Enabled"])
        : isStrictlyTrue(param["Borrowing Enabled"]);

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

/**
 * Calculates the health factor based on collateral value, total borrowed, and liquidation threshold.
 */
export const calculateHealthFactor = (
  collateralValue: number,
  totalBorrowed: number,
  liquidationThreshold: number,
): number => {
  if (totalBorrowed === 0) {
    return 999999; // Or another very high number to represent infinite health factor
  }
  return (collateralValue * liquidationThreshold) / totalBorrowed;
};

export const getLiquidationThreshold = (currencyName: string): number => {
  const param = parsedAaveParameters.find(
    (p: AaveParameter) => p.name === currencyName,
  );
  if (!param) {
    throw new Error(
      `Liquidation threshold not found for currency: ${currencyName}`,
    );
  }
  return parseFloat(param["Liquidation Threshold"]);
};

export const getMaxLTV = (currencyName: string): number | undefined => {
  const param = parsedAaveParameters.find(
    (p: AaveParameter) => p.name === currencyName,
  );
  if (!param) {
    return undefined;
  }
  return param.LTV;
};

export const getCurrentLTV = (totalBorrowed: number, collateralValue: number): number => {
  if (collateralValue === 0) {
    return NaN;
  }
  let calculatedLTV = (totalBorrowed / collateralValue) * 100;
  if (calculatedLTV > 100) {
    return 100;
  }
  return calculatedLTV;
};

export const getLiquidationThresholdPrice = (
  totalBorrowed: number,
  totalCollateralAmount: number,
  liquidationThreshold: number
): number => {
  if (totalCollateralAmount === 0 || liquidationThreshold === 0) {
    return 0;
  }
  return totalBorrowed / (totalCollateralAmount * liquidationThreshold);
};

// Run validation in development
if (process.env.NODE_ENV === "development") {
  validateCurrencyFiltering();
}
