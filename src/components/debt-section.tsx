import { useState } from "react";
import { TokenInputSection } from "./token-input-section";
import { Label } from "@/components/ui/label";
import { useDebtStore } from "@/stores/debt-store";

export function DebtSection() {
  const [tokenQuantity, setTokenQuantity] = useState(0);
  const [tokenPrice, setTokenPrice] = useState(1500);
  const [usdValue, setUsdValue] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState("USDC");

  const setDebtValue = useDebtStore((state) => state.setDebtValue);

  const handleTokenQuantityChange = (value: number) => {
    setTokenQuantity(value);
    const newValue = value * tokenPrice;
    setUsdValue(newValue);
    setDebtValue(newValue);
  };

  const handleTokenPriceChange = (value: number) => {
    setTokenPrice(value);
    const newValue = tokenQuantity * value;
    setUsdValue(newValue);
    setDebtValue(newValue);
  };

  const handleUsdValueChange = (value: number) => {
    setUsdValue(value);
    // Update token quantity based on USD value while maintaining price
    setTokenQuantity(value / tokenPrice);
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
        currency={selectedCurrency}
        onSelectCurrency={setSelectedCurrency}
        tokenQuantity={tokenQuantity}
        onTokenQuantityChange={handleTokenQuantityChange}
        usdValue={usdValue}
        onUsdValueChange={handleUsdValueChange}
        tokenPrice={tokenPrice}
        onTokenPriceChange={handleTokenPriceChange}
      />
    </div>
  );
}
