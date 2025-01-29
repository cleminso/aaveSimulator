import { useState } from "react";
import { TokenInputSection } from "./token-input-section";
import { Label } from "@/components/ui/label";
import { useCollateralStore } from "@/store/collateral-store";

export function CollateralSection() {
  const [tokenQuantity, setTokenQuantity] = useState(0);
  const [tokenPrice, setTokenPrice] = useState(1500);
  const [selectedCurrency, setSelectedCurrency] = useState("WETH");
  const setCollateralValue = useCollateralStore(
    (state) => state.setCollateralValue,
  );

  const handleTokenQuantityChange = (value: number) => {
    setTokenQuantity(value);
    setCollateralValue(value * tokenPrice);
  };

  const handleTokenPriceChange = (value: number) => {
    setTokenPrice(value);
    setCollateralValue(tokenQuantity * value);
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
        collateralValue={useCollateralStore((state) => state.collateralValue)}
        tokenPrice={tokenPrice}
        onTokenPriceChange={handleTokenPriceChange}
      />
    </div>
  );
}
