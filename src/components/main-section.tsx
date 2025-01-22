import { Input } from "@/components/ui/input";
import { HealthFactorSummary } from "./health-factor-summary";
import { CollateralVsDebt } from "./collateral-vs-debt";

export function MainSection() {
  return (
    <div className="flex flex-col gap-6">
      <Input
        type="text"
        id="userAddress"
        placeholder="Enter your Ethereum address"
        className="text-base"
      />
      <HealthFactorSummary />
      <CollateralVsDebt />
    </div>
  );
}
