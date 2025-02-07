"use client";

import { useState } from "react";
import { CollateralSection } from "./collateral-section";
import { DebtSection } from "./debt-section";
import { HealthFactorSummary } from "./health-factor-summary";

export default function Simulator() {
  // ADD state for selected currencies in CollateralSection and DebtSection
  const [collateralCurrency, setCollateralCurrency] = useState<string | undefined>(undefined); // No default collateral currency
  const [debtCurrency, setDebtCurrency] = useState<string | undefined>(undefined); // No default debt currency

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
        <div className="flex flex-col gap-6">
          <section className="w-full space-y-6">
            <HealthFactorSummary
              collateralCurrency={collateralCurrency}
              debtCurrency={debtCurrency}
            />
          </section>
          <div className="flex md:flex-row w-full gap-6">
            <section className="w-full space-y-6">
              <CollateralSection
                selectedCurrency={collateralCurrency}
                onSelectCurrency={handleCollateralCurrencyChange}
              />
            </section>
            <section className="w-full space-y-6">
              <DebtSection
                selectedCurrency={debtCurrency}
                onSelectCurrency={handleDebtCurrencyChange}
              />
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
