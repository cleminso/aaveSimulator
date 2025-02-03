import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { CurrencySelector } from "../currency-selector";
import { Label } from "@/components/ui/label";

interface TokenInputSectionProps {
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
      />
      {/* Token State */}
      <div className="space-y-3">
        <div className="flex space-x-4">
          <div className="w-2/3 space-y-1">
            <Label>{`${currency} Quantity`}</Label>
            <Input
              type="number"
              value={tokenQuantity}
              onChange={(e) => onTokenQuantityChange(Number(e.target.value))}
              placeholder={`Enter ${currency} Quantity`}
            />
          </div>
          <div className="w-1/3 space-y-1">
            <Label>USD Value</Label>
            <Input
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
      {/* Token Simulation */}
      <div className="space-y-3">
        <div className="flex space-x-4">
          <div className="w-full space-y-1">
            <Label>{`${currency} Price (USD)`}</Label>
            <Input
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
