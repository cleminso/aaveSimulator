import { useState } from "react";
import { TokenInputSection } from "./token-input-section";
import { Label } from "@/components/ui/label";
import { usePositionStore } from "@/stores/position-store";

export function CollateralSection() {
  const [tokenQuantity, setTokenQuantity] = useState(0);
  const [tokenPrice, setTokenPrice] = useState(1500);
  const [selectedCurrency, setSelectedCurrency] = useState("WETH");
  const [usdValue, setUsdValue] = useState(0);
  const { collateral } = usePositionStore();

  const handleTokenQuantityChange = (value: number) => {
    setTokenQuantity(value);
    const calculatedUsdValue = value * tokenPrice;
    setUsdValue(calculatedUsdValue);
    collateral.setPositionValue(calculatedUsdValue);
  };

  const handleTokenPriceChange = (value: number) => {
    setTokenPrice(value);
    collateral.setPositionValue(tokenQuantity * value);
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
        onSelectCurrency={setSelectedCurrency}
        tokenQuantity={tokenQuantity}
        onTokenQuantityChange={handleTokenQuantityChange}
        collateralValue={collateral.positionValue}
        tokenPrice={tokenPrice}
        usdValue={usdValue}
        onTokenPriceChange={handleTokenPriceChange}
        mode="collateral" // ADD THIS LINE
      />
    </div>
  );
}
