"use client";

import { CollateralSection } from "@/components/collateral-section";
import { DebtSection } from "@/components/debt-section";

export default function Simulator() {
  return (
    <main className="p-0">
      <div className="mt-8 space-y-6">
        <div className="flex flex-col gap-6 md:flex-row">
          <section className="w-full md:w-1/2 space-y-6">
            <CollateralSection />
          </section>
          <section className="w-full md:w-1/2 space-y-6">
            <DebtSection />
          </section>
        </div>
      </div>
    </main>
  );
}
