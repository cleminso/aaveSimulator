import { Input } from "@/components/ui/input";
import { CollateralVsDebt } from "./collateral-vs-debt";

export function MainSection() {
  return (
    <div className="flex flex-col gap-6">
      <Input
        type="text"
        className="w-1/3 text-base"
        placeholder="Enter your Ethereum address"
      />
      <CollateralVsDebt />
    </div>
  );
}
