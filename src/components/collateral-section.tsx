import { useState } from "react";
import { TokenInputSection } from "./token-input-section";
import { Label } from "@/components/ui/label";

export function CollateralSection() {
  const [tokenQuantity, setTokenQuantity] = useState(0);
  const [tokenPrice, setTokenPrice] = useState(1500);
  const [usdValue, setUsdValue] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState("WETH");

  const handleTokenQuantityChange = (value: number) => {
    setTokenQuantity(value);
    setUsdValue(value * tokenPrice);
  };

  const handleTokenPriceChange = (value: number) => {
    setTokenPrice(value);
    setUsdValue(tokenQuantity * value);
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
        usdValue={usdValue}
        tokenPrice={tokenPrice}
        onTokenPriceChange={handleTokenPriceChange}
      />
    </div>
  );
}
