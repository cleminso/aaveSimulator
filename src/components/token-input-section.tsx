import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { CurrencySelector } from "./currency-selector";

interface TokenInputSectionProps {
  currency: string;
  onSelectCurrency: (currency: string) => void;
  tokenQuantity: number;
  onTokenQuantityChange: (value: number) => void;
  usdValue: number;
  tokenPrice: number;
  onTokenPriceChange: (value: number) => void;
}

export function TokenInputSection({
  currency,
  onSelectCurrency,
  tokenQuantity,
  onTokenQuantityChange,
  usdValue,
  tokenPrice,
  onTokenPriceChange,
}: TokenInputSectionProps) {
  return (
    <div className="space-y-4">
      <CurrencySelector onSelectCurrency={onSelectCurrency} />
      {/* Token State */}
      <div className="space-y-3">
        <div className="flex space-x-4">
          <Input
            type="number"
            value={tokenQuantity}
            label={`${currency} Quantity`}
            onChange={(e) => onTokenQuantityChange(Number(e.target.value))}
            placeholder={`Enter ${currency} Quantity`}
            className="w-1/2"
          />
          <Input type="number" value={usdValue} disabled className="w-1/2" />
        </div>
        <Slider
          defaultValue={[0]}
          max={20000}
          step={1}
          onValueChange={(value) => onTokenQuantityChange(value[0])}
        />
      </div>
      {/* Token Simulation */}
      <div className="space-y-3">
        <div className="flex space-x-4">
          <Input
            type="number"
            label={`${currency} Price (USD)`}
            onChange={(e) => onTokenPriceChange(Number(e.target.value))}
            placeholder={`Enter ${currency} Price (USD)`}
            className="w-full"
          />
        </div>
        <Slider
          defaultValue={[1500]}
          max={20000}
          step={1}
          onValueChange={(value) => onTokenPriceChange(value[0])}
        />
      </div>
    </div>
  );
}
