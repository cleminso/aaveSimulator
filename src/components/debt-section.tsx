import { useState } from "react";
import { TokenInputSection } from "./token-input-section";

export function DebtSection() {
  const [tokenQuantity, setTokenQuantity] = useState(0);
  const [tokenPrice, setTokenPrice] = useState(1500);
  const [usdValue, setUsdValue] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState("USDC");

  const handleTokenQuantityChange = (value: number) => {
    setTokenQuantity(value);
    setUsdValue(value * tokenPrice);
  };

  const handleTokenPriceChange = (value: number) => {
    setTokenPrice(value);
    setUsdValue(tokenQuantity * value);
  };

  return (
    <TokenInputSection
      currency={selectedCurrency}
      onSelectCurrency={setSelectedCurrency}
      tokenQuantity={tokenQuantity}
      onTokenQuantityChange={handleTokenQuantityChange}
      usdValue={usdValue}
      tokenPrice={tokenPrice}
      onTokenPriceChange={handleTokenPriceChange}
    />
  );
}
