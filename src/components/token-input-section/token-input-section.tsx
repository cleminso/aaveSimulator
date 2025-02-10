import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { CurrencySelector } from "../currency-selector";
import { Label } from "@/components/ui/label";
import { CurrencyMode } from "@/libs/currency";
import { useState, useEffect } from "react";

export interface TokenInputSectionProps {
  currency: string | undefined; // currency can be undefined
  onSelectCurrency: (currency: string) => void;
  tokenQuantity: number;
  onTokenQuantityChange: (value: number) => void;
  collateralValue?: number;
  usdValue: number; // usdValue is now required
  tokenPrice: number;
  onTokenPriceChange: (value: number) => void;
  mode: CurrencyMode; // ADD
}

export function TokenInputSection({
  currency,
  onSelectCurrency,
  tokenQuantity,
  onTokenQuantityChange,
  collateralValue,
  usdValue,
  tokenPrice,
  onTokenPriceChange,
  mode, // ADD
}: TokenInputSectionProps) {
  // State for slider values, synced with input values
  const [quantitySliderValue, setQuantitySliderValue] = useState<number>(tokenQuantity);
  const [priceSliderValue, setPriceSliderValue] = useState<number>(tokenPrice);

  useEffect(() => {
    setQuantitySliderValue(tokenQuantity);
    setPriceSliderValue(tokenPrice);
  }, [tokenQuantity, tokenPrice]);

  return (
    <div className="space-y-4">
      <CurrencySelector
        onSelectCurrency={onSelectCurrency}
        className="w-full"
        data-testid="currency-selector"
        mode={mode} // UPDATE
      />
      <div className="space-y-3">
        <div className="flex space-x-4">
          <div className="w-2/3 space-y-1">
            <Label htmlFor="token-quantity">{`${currency || "Token"} Quantity`}</Label>{" "}
            {/* Display 'Token' if currency is undefined */}
            <Input
              id="token-quantity"
              type="number"
              value={tokenQuantity} // Controlled input
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value < 0) return;
                setQuantitySliderValue(value); // Sync slider with input
                if (!isNaN(value)) {
                  setQuantitySliderValue(value); // Sync slider with input
                }
                onTokenQuantityChange(Number(value.toFixed(8)));
              }}
            />
          </div>
          <div className="w-1/3 space-y-1">
            <Label htmlFor="usd-value">USD Value</Label>
            <Input
              id="usd-value"
              type="number"
              value={usdValue !== undefined ? usdValue : collateralValue || 0}
              disabled
            />
          </div>
        </div>
        <Slider
          defaultValue={[quantitySliderValue]} // Use state value
          value={[quantitySliderValue]} // Control the slider value
          max={20000}
          step={1}
          onValueChange={(value) => {
            setQuantitySliderValue(value[0]); // Sync input with slider
            onTokenQuantityChange(value[0]);
          }}
        />
      </div>
      <div className="space-y-3">
        <div className="flex space-x-4">
          <div className="w-full space-y-1">
            <Label htmlFor="token-price">{`${currency || "Token"} Price (USD)`}</Label>{" "}
            {/* Display 'Token' if currency is undefined */}
            <Input
              id="token-price"
              type="number"
              value={tokenPrice} // Controlled input
              onChange={(e) => {
                const value = Number(e.target.value);
                setPriceSliderValue(value); // Sync slider with input
                onTokenPriceChange(Number(value.toFixed(8)));
              }}
              placeholder={`Enter ${currency} Price (USD)`}
            />
          </div>
        </div>
        <Slider
          defaultValue={[0]} // default value is 0
          value={[priceSliderValue]} // Control the slider value
          max={20000}
          step={1}
          onValueChange={(value) => {
            setPriceSliderValue(value[0]); // Sync input with slider
            onTokenPriceChange(value[0]);
          }}
        />
      </div>
    </div>
  );
}
