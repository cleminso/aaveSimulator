"use client";

import { useState } from "react";
import { CollateralSection } from "@/components/collateral-section";
import { DebtSection } from "@/components/debt-section";

export default function Home() {
  const [selectedCollateralCurrency, setSelectedCollateralCurrency] =
    useState("WETH");
  const [selectedDebtCurrency, setSelectedDebtCurrency] = useState("USDC");

  return (
    <main className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Aave Health Factor Simulator</h1>
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Collateral</h2>
        <CollateralSection
          currency={selectedCollateralCurrency}
          onSelectCurrency={setSelectedCollateralCurrency}
        />
      </section>
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Debt</h2>
        <DebtSection
          currency={selectedDebtCurrency}
          onSelectCurrency={setSelectedDebtCurrency}
        />
      </section>
    </main>
  );
}
