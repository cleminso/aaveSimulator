import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { CurrencySelector } from "./currency-selector";

interface DebtSectionProps {
  currency: string;
}

export function DebtSection({ currency }: DebtSectionProps) {
  const [tokenQuantity, setTokenQuantity] = useState(0);
  const [tokenPrice, setTokenPrice] = useState(1500); // Example default price
  const [usdValue, setUsdValue] = useState(0);

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
      <CurrencySelector />
      {/* Token State */}
      <div className="space-y-3">
        <div className="flex space-x-4">
          <Input
            type="number"
            value={tokenQuantity}
            onChange={(e) => handleTokenQuantityChange(Number(e.target.value))}
            placeholder={`Enter ${currency} Quantity`}
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
            value={tokenPrice}
            onChange={(e) => handleTokenPriceChange(Number(e.target.value))}
            placeholder={`Enter ${currency} Price (USD)`}
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
