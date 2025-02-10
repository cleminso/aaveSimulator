import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { CurrencySelector } from "../currency-selector";
import { Label } from "@/components/ui/label";
import { CurrencyMode } from "@/libs/currency";
import { useState, useEffect, useCallback } from "react";
import { fetchTokenPrice } from "@/libs/api";
import { tokenAddresses } from "@/libs/token-address";
import { usePositionStore } from "@/stores/position-store";

export interface TokenInputSectionProps {
  currency: string | undefined;
  onSelectCurrency: (currency: string) => void;
  tokenQuantity: number;
  onTokenQuantityChange: (value: number) => void;
  collateralValue?: number;
  usdValue: number;
  tokenPrice: number;
  onTokenPriceChange: (value: number) => void;
  mode: CurrencyMode;
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
  mode,
}: TokenInputSectionProps) {
  const setCollateralTokenPrice = usePositionStore(
    (state) => state.collateral.setTokenPrice,
  );
  const setDebtTokenPrice = usePositionStore(
    (state) => state.debt.setTokenPrice,
  );

  // State for slider values, synced with input values
  const [quantitySliderValue, setQuantitySliderValue] =
    useState<number>(tokenQuantity);
  const [priceSliderValue, setPriceSliderValue] = useState<number>(tokenPrice);
  const [loadingPrice, setLoadingPrice] = useState<boolean>(false);
  const [currentPriceValue, setCurrentPriceValue] = useState<number>(0);
  const [showResetText, setShowResetText] = useState(false);

  const handleCurrencySelect = useCallback(
    async (selectedCurrency: string) => {
      onSelectCurrency(selectedCurrency);
      setLoadingPrice(true);
      const address = tokenAddresses[selectedCurrency];
      if (address) {
        const fetchedPrice = await fetchTokenPrice(address);
        if (fetchedPrice !== undefined) {
          onTokenPriceChange(fetchedPrice);
          setPriceSliderValue(fetchedPrice);
          setCurrentPriceValue(fetchedPrice);
          if (mode === "collateral") {
            setCollateralTokenPrice(fetchedPrice);
          } else if (mode === "debt") {
            setDebtTokenPrice(fetchedPrice);
          }
        }
      }
      setLoadingPrice(false);
      setShowResetText(false);
    },
    [
      onSelectCurrency,
      onTokenPriceChange,
      setCollateralTokenPrice,
      setDebtTokenPrice,
      mode,
    ],
  );

  useEffect(() => {
    setQuantitySliderValue(tokenQuantity);
    setPriceSliderValue(tokenPrice);
  }, [tokenQuantity, tokenPrice]);

  return (
    <div className="space-y-3">
      <CurrencySelector
        onSelectCurrency={handleCurrencySelect}
        className="w-full"
        data-testid="currency-selector"
        mode={mode}
      />
      <div className="space-y-3">
        <div className="flex space-x-4">
          <div className="w-2/3 space-y-1">
            <Label htmlFor="token-quantity">{`${currency || "Token"} Quantity`}</Label>
            <Input
              id="token-quantity"
              type="number"
              value={tokenQuantity}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value < 0) return;
                setQuantitySliderValue(value);
                if (!isNaN(value)) {
                  setQuantitySliderValue(value);
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
          defaultValue={[quantitySliderValue]}
          value={[quantitySliderValue]}
          max={20000}
          step={1}
          onValueChange={(value) => {
            setQuantitySliderValue(value[0]);
            onTokenQuantityChange(value[0]);
          }}
        />
      </div>
      <div className="space-y-3">
        <div className="flex space-x-4">
          <div className="w-full space-y-1 relative">
            <Label
              htmlFor="token-price"
              className="flex items-center justify-between"
            >
              <span>{`${currency || "Token"} Price (USD)`}</span>
              {showResetText && currency && (
                <span
                  className="ml-2 text-xs text-blue-500 cursor-pointer"
                  onClick={() => {
                    onTokenPriceChange(currentPriceValue);
                    setPriceSliderValue(currentPriceValue);
                    setShowResetText(false); // Hide the text after clicking
                  }}
                >
                  Reset to current price
                </span>
              )}
            </Label>
            <Input
              id="token-price"
              type="number"
              value={tokenPrice}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (isNaN(value)) return;
                setPriceSliderValue(value);
                onTokenPriceChange(Number(value.toFixed(8)));
              }}
              placeholder={`Enter ${currency} Price (USD)`}
            />
          </div>
        </div>
        <Slider
          defaultValue={[0]}
          value={[priceSliderValue]}
          max={20000}
          step={1}
          onValueChange={(value) => {
            setPriceSliderValue(value[0]);
            onTokenPriceChange(value[0]);
            if (currency) {
              setShowResetText(true);
            }
          }}
        />
        {loadingPrice && <div>Loading Price...</div>}
      </div>
    </div>
  );
}
