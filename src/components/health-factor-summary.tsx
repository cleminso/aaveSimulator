import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { usePositionStore } from "@/stores/position-store";
import {
  calculateHealthFactor,
  getLiquidationThreshold,
  getMaxLTV,
  getCurrentLTV,
  getLiquidationThresholdPrice
} from "@/libs/currency"; // Updated import path!
import { useEffect, useState } from "react";

interface HealthFactorSummaryProps {
  collateralCurrency: string | undefined;
  debtCurrency: string | undefined; // debtCurrency can be undefined as well
}

export function HealthFactorSummary({
  collateralCurrency,
  debtCurrency,
}: HealthFactorSummaryProps) {
  const { collateral, debt } = usePositionStore();
  const [healthFactorValue, setHealthFactorValue] = useState<number>(NaN); // Initialize to NaN
  const [maxLTV, setMaxLTV] = useState<number | undefined>(undefined);
  const [currentLTV, setCurrentLTV] = useState<number>(NaN); // Initialize to NaN
  const [liquidationThresholdPriceValue, setLiquidationThresholdPriceValue] = useState<number>(0);

  useEffect(() => {
    if (
      collateralCurrency &&
      debtCurrency &&
      collateral.tokenQuantity > 0 && // Check if collateral tokenQuantity > 0
      debt.tokenQuantity > 0 && // Check if debt tokenQuantity > 0
      collateral.tokenPrice !== 0 && // Check if collateral tokenPrice !== 0
      debt.tokenPrice !== 0 // Check if debt tokenPrice !== 0
    ) {
      try {
        // Check if debt tokenPrice !== 0
        const liquidationThreshold =
          getLiquidationThreshold(collateralCurrency);
        const newHealthFactorValue = calculateHealthFactor(
          collateral.positionValue,
          debt.positionValue,
          liquidationThreshold,
        );
        setHealthFactorValue(newHealthFactorValue);

        const newCurrentLTV = getCurrentLTV(debt.positionValue, collateral.positionValue);
        setCurrentLTV(newCurrentLTV);

        const newLiquidationThresholdPrice = getLiquidationThresholdPrice(
          debt.positionValue,
          collateral.tokenQuantity,
          liquidationThreshold
        );
        setLiquidationThresholdPriceValue(newLiquidationThresholdPrice);
      } catch (error) {
        console.error("Error fetching liquidation threshold:", error);
      }
    } else {
      setHealthFactorValue(NaN); // Set to NaN when conditions are not met
      setCurrentLTV(NaN); // Set to NaN when conditions are not met
      setLiquidationThresholdPriceValue(0);
    }
  }, [
    collateral.positionValue,
    debt.positionValue,
    collateralCurrency,
    debtCurrency,
    collateral.tokenQuantity,
    debt.tokenQuantity,
    collateral.tokenPrice,
    debt.tokenPrice,
  ]); // ADD tokenQuantity and tokenPrice from both sections to dependency array

  useEffect(() => {
    if (collateralCurrency) {
      const newMaxLTV = getMaxLTV(collateralCurrency);
      setMaxLTV(newMaxLTV);
    } else {
      setMaxLTV(undefined);
    }
  }, [collateralCurrency]);

  const getTooltipTriggerBackgroundColor = (value: number) => {
    if (value <= 1.1) return "bg-error";
    if (value > 1.1 && value < 2) return "bg-accent-secondary";
    if (value >= 2) return "bg-success";
    return "bg-secondary"; // Default background for TooltipTrigger
  };

  const getTooltipMessage = (value: number) => {
    if (value <= 1.1) return "Under Collateralization";
    if (value > 1.1 && value < 2) return "Moderate Collateralization";
    if (value >= 2) return "Safe Collateralization";
    return "Unknown Collateralization"; // Default message
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center">
        <h2 className="text-[28px] font-medium text-primary tracking-tighter leading-[35px]">
          Health Factor:
        </h2>
        <div className="ml-1">
          <Tooltip>
            <TooltipTrigger
              className={`flex items-center justify-center h-[35px] w-fit px-2 rounded-[2px] ${getTooltipTriggerBackgroundColor(healthFactorValue)}`}
            >
              <span className="font-mono text-xl text-primary">
                {collateralCurrency && !isNaN(healthFactorValue)
                  ? healthFactorValue.toFixed(2)
                  : "--"}{" "}
                {/* Display "--" if no currency selected or healthFactorValue is NaN */}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              {getTooltipMessage(healthFactorValue)}
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <div className="flex flex-col gap-6 md:flex-row">
        <Card className="w-full md:w-1/3 h-[71px] bg-secondary">
          <CardTitle className="p-2 pb-1.5 text-sm font-normal leading-[17.5px]">
            Collateral Value:
          </CardTitle>
          <CardContent className="p-2 pt-1.5 text-xl font-normal font-mono tracking-tighter leading-[25px]">
            $
            {collateral.positionValue.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </CardContent>
        </Card>
        <Card className="w-full md:w-1/3 h-[71px] bg-secondary">
          <CardTitle className="p-2 pb-1.5 text-sm font-normal leading-[17.5px]">
            Total Borrowed:
          </CardTitle>
          <CardContent className="p-2 pt-1.5 text-xl font-normal font-mono tracking-tighter leading-[25px]">
            $
            {debt.positionValue.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </CardContent>
        </Card>
        <Card className="w-full md:w-1/3 h-[71px] bg-secondary">
          <CardTitle className="p-2 pb-1.5 text-sm font-normal leading-[17.5px]">
            Available to Borrow:
          </CardTitle>
          <CardContent className="p-2 pt-1.5 text-xl font-normal font-mono tracking-tighter leading-[25px]">
            $
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col gap-6 md:flex-row">
        <Card className="w-full md:w-1/3 h-[71px] bg-secondary">
          <CardTitle className="p-2 pb-1.5 text-sm font-normal leading-[17.5px]">
            Liquidation Threshold Price
          </CardTitle>
          <CardContent className="p-2 pt-1.5 text-xl font-normal font-mono tracking-tighter leading-[25px]">
            ${liquidationThresholdPriceValue.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </CardContent>
        </Card>
        <Card className="w-full md:w-1/3 h-[71px] bg-secondary">
          <CardTitle className="p-2 pb-1.5 text-sm font-normal leading-[17.5px]">
            Current LTV / Max LTV
          </CardTitle>
          <CardContent className="p-2 pt-1.5 text-xl font-normal font-mono tracking-tighter leading-[25px]">
            {isNaN(currentLTV) ? "--" : `${currentLTV.toFixed(2)}%`} / {maxLTV !== undefined ? `${(maxLTV * 100).toFixed(2)}%` : "--"}
          </CardContent>
        </Card>
        <Card className="w-full md:w-1/3 h-[71px] bg-secondary">
          <CardTitle className="p-2 pb-1.5 text-sm font-normal leading-[17.5px]">
            Borrowing Capacity
          </CardTitle>
          <CardContent className="p-2 pt-1.5 text-xl font-normal font-mono tracking-tighter leading-[25px]">
            80%
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
