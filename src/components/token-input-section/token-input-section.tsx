import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { CurrencySelector } from "../currency-selector";
import { Label } from "@/components/ui/label";

export interface TokenInputSectionProps {
  currency: string;
  onSelectCurrency: (currency: string) => void;
  tokenQuantity: number;
  onTokenQuantityChange: (value: number) => void;
  collateralValue?: number;
  usdValue?: number;
  tokenPrice: number;
  onTokenPriceChange: (value: number) => void;
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
}: TokenInputSectionProps) {
  return (
    <div className="space-y-4">
      <CurrencySelector
        onSelectCurrency={onSelectCurrency}
        className="w-full"
        data-testid="currency-selector"
      />
      <div className="space-y-3">
        <div className="flex space-x-4">
          <div className="w-2/3 space-y-1">
            <Label htmlFor="token-quantity">{`${currency} Quantity`}</Label>
            <Input
              id="token-quantity"
              type="number"
              value={tokenQuantity}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value < 0) return;
                onTokenQuantityChange(Number(value.toFixed(8)));
              }}
            />
          </div>
          <div className="w-1/3 space-y-1">
            <Label htmlFor="usd-value">USD Value</Label>
            <Input
              id="usd-value"
              type="number"
              value={usdValue !== undefined ? usdValue : collateralValue}
              disabled
            />
          </div>
        </div>
        <Slider
          defaultValue={[0]}
          max={20000}
          step={1}
          onValueChange={(value) => onTokenQuantityChange(value[0])}
        />
      </div>
      <div className="space-y-3">
        <div className="flex space-x-4">
          <div className="w-full space-y-1">
            <Label htmlFor="token-price">{`${currency} Price (USD)`}</Label>
            <Input
              id="token-price"
              type="number"
              value={tokenPrice}
              onChange={(e) => onTokenPriceChange(Number(e.target.value))}
              placeholder={`Enter ${currency} Price (USD)`}
            />
          </div>
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
