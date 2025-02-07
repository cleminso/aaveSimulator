import { useState } from "react";
import { TokenInputSection } from "./token-input-section/token-input-section";
import { Label } from "@/components/ui/label";
import { usePositionStore } from "@/stores/position-store";

interface DebtSectionProps {
  selectedCurrency: string;
  onSelectCurrency: (currency: string) => void;
}

export function DebtSection({
  selectedCurrency,
  onSelectCurrency,
}: DebtSectionProps) {
  const [usdValue, setUsdValue] = useState(0); // ADD
  const { debt } = usePositionStore();
  const handleTokenQuantityChange = (value: number) => {
    debt.setTokenQuantity(value);
    const newValue = value * debt.tokenPrice;
    setUsdValue(newValue); // ADD
    debt.setPositionValue(newValue);
  };

  const handleTokenPriceChange = (value: number) => {
    debt.setTokenPrice(value);
    const newValue = debt.tokenQuantity * value;
    setUsdValue(newValue); // ADD THIS LINE
    debt.setPositionValue(newValue);
  };

  return (
    <div className="space-y-4">
      <Label
        htmlFor="debt-token"
        className="text-primary font-medium text-xl leading-6"
      >
        Debt Token
      </Label>
      <TokenInputSection
        mode="debt"
        currency={selectedCurrency}
        onSelectCurrency={onSelectCurrency}
        tokenQuantity={debt.tokenQuantity} // Use tokenQuantity from store
        onTokenQuantityChange={handleTokenQuantityChange}
        usdValue={usdValue} // UPDATE
        collateralValue={0}
        tokenPrice={debt.tokenPrice} // Use tokenPrice from store
        onTokenPriceChange={handleTokenPriceChange}
      />
    </div>
  );
}
