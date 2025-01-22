import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { CurrencySelector } from "./currency-selector";

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
    <div className="space-y-4">
      <CurrencySelector
        onSelectCurrency={(currency) => setSelectedCurrency(currency)}
      />
      {/* Token State */}
      <div className="space-y-3">
        <div className="flex space-x-4">
          <Input
            type="number"
            value={tokenQuantity}
            label={`${selectedCurrency} Quantity`}
            onChange={(e) => handleTokenQuantityChange(Number(e.target.value))}
            placeholder={`Enter ${selectedCurrency} Quantity`}
            className="w-1/2"
          />
          <Input
            type="number"
            value={usdValue}
            disabled
            className="w-1/2"
          />
        </div>
        <Slider
          defaultValue={[0]}
          max={20000}
          step={1}
          onValueChange={(value) => handleTokenQuantityChange(value[0])}
        />
      </div>
      {/* Token Simulation */}
      <div className="space-y-3">
        <div className="flex space-x-4">
          <Input
            type="number"
            label={`${selectedCurrency} Price (USD)`}
            onChange={(e) => handleTokenPriceChange(Number(e.target.value))}
            placeholder={`Enter ${selectedCurrency} Price (USD)`}
            className="w-full"
          />
        </div>
        <Slider
          defaultValue={[1500]}
          max={20000}
          step={1}
          onValueChange={(value) => handleTokenPriceChange(value[0])}
        />
      </div>
    </div>
  );
}
