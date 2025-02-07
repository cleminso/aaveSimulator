"use client";

import { useState } from "react";
import CollateralSection from "./collateral-section";
import DebtSection from "./debt-section";
import HealthFactorSummary from "./health-factor-summary";

export default function Simulator() {
  // ADD state for selected currencies in CollateralSection and DebtSection
  const [collateralCurrency, setCollateralCurrency] = useState<string>("WETH"); // Default collateral currency
  const [debtCurrency, setDebtCurrency] = useState<string>("DAI"); // Default debt currency

  // Handler functions to update selected currencies
  const handleCollateralCurrencyChange = (currency: string) => {
    setCollateralCurrency(currency);
  };

  const handleDebtCurrencyChange = (currency: string) => {
    setDebtCurrency(currency);
  };

  return (
    <main className="p-0">
      <div className="mt-0 space-y-6">
        <div className="flex flex-col gap-6 md:flex-row">
          <section className="w-full md:w-1/2 space-y-6">
            <HealthFactorSummary collateralCurrency={collateralCurrency} debtCurrency={debtCurrency} />
          </section>
          <section className="w-full md:w-1/2 space-y-6">
            <CollateralSection
              selectedCurrency={collateralCurrency} // Pass selected collateral currency
              onSelectCurrency={handleCollateralCurrencyChange} // Pass handler for collateral currency
            />
          </section>
          <section className="w-full md:w-1/2 space-y-6">
            <DebtSection
              selectedCurrency={debtCurrency} // Pass selected debt currency
              onSelectCurrency={handleDebtCurrencyChange} // Pass handler for debt currency
            />
          </section>
        </div>
      </div>
    </main>
  );
}
