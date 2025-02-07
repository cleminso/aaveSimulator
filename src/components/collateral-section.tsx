import { useState } from "react";
import { TokenInputSection } from "@/components/token-input-section/token-input-section";
import { Label } from "@/components/ui/label";
import { usePositionStore } from "@/stores/position-store";

interface CollateralSectionProps {
  selectedCurrency: string;
  onSelectCurrency: (currency: string) => void;
}

export function CollateralSection({ selectedCurrency, onSelectCurrency }: CollateralSectionProps) {
  const [usdValue, setUsdValue] = useState(0);
  const { collateral, debt } = usePositionStore(); // debt is here to avoid unused import warning, can be removed if needed

  const handleTokenQuantityChange = (value: number) => {
    collateral.setTokenQuantity(value);
    const calculatedUsdValue = value * collateral.tokenPrice;
    setUsdValue(calculatedUsdValue);
    collateral.setPositionValue(calculatedUsdValue);
  };

  const handleTokenPriceChange = (value: number) => {
    collateral.setTokenPrice(value);
    setUsdValue(collateral.tokenQuantity * value); // ADD THIS LINE
    collateral.setPositionValue(collateral.tokenQuantity * value);
  };

  return (
    <div className="space-y-4">
      <Label
        htmlFor="collateral-token"
        className="text-primary font-medium text-xl leading-6"
      >
        Collateral Token
      </Label>
      <TokenInputSection
        currency={selectedCurrency}
        onSelectCurrency={onSelectCurrency}
        tokenQuantity={collateral.tokenQuantity} // Use tokenQuantity from store
        onTokenQuantityChange={handleTokenQuantityChange}
        collateralValue={collateral.positionValue}
        tokenPrice={collateral.tokenPrice} // Use tokenPrice from store
        usdValue={usdValue}
        onTokenPriceChange={handleTokenPriceChange}
        mode="collateral" // ADD THIS LINE
      />
    </div>
  );
}
