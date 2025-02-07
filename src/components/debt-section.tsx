import { useState } from "react";
import { TokenInputSection } from "./token-input-section/token-input-section";
import { Label } from "@/components/ui/label";
import { usePositionStore } from "@/stores/position-store";

interface DebtSectionProps {
  selectedCurrency: string;
  onSelectCurrency: (currency: string) => void;
}

export function DebtSection({ selectedCurrency, onSelectCurrency }: DebtSectionProps) {
  const [tokenQuantity, setTokenQuantity] = useState(0);
  const [tokenPrice, setTokenPrice] = useState(1500);
  const [usdValue, setUsdValue] = useState(0); // ADD
  const { debt } = usePositionStore();

  const handleTokenQuantityChange = (value: number) => {
    setTokenQuantity(value);
    const newValue = value * tokenPrice;
    setUsdValue(newValue); // ADD
    debt.setPositionValue(newValue);
  };

  const handleTokenPriceChange = (value: number) => {
    setTokenPrice(value);
    const newValue = tokenQuantity * value;
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
        tokenQuantity={tokenQuantity}
        onTokenQuantityChange={handleTokenQuantityChange}
        usdValue={usdValue} // UPDATE
        collateralValue={0}
        tokenPrice={tokenPrice}
        onTokenPriceChange={handleTokenPriceChange}
      />
    </div>
  );
}
