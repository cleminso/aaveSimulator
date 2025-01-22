"use client";

import { CollateralSection } from "@/components/collateral-section";
import { DebtSection } from "@/components/debt-section";

export default function Simulator() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Aave Health Factor Simulator</h1>
      <div className="mt-8 flex flex-col gap-6 md:flex-row">
        <section className="w-full md:w-1/2 space-y-6">
          <h2 className="text-xl font-semibold">Collateral</h2>
          <CollateralSection />
        </section>
        <section className="w-full md:w-1/2 space-y-6">
          <h2 className="text-xl font-semibold">Debt</h2>
          <DebtSection />
        </section>
      </div>
    </main>
  );
}
