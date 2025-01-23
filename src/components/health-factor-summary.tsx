import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function HealthFactorSummary() {
  const healthFactorValue = 1.05; // Placeholder value for development

  const getTooltipContentBackgroundColor = (value: number) => {
    if (value <= 1.1) return "error";
    if (value < 2) return "accent-secondary";
    if (value >= 2) return "success";
    return "primary"; // Default background for TooltipContent
  };

  const getTooltipMessage = (value: number) => {
    if (value < 1) return "Under Collateralization";
    if (value >= 1.5 && value < 2) return "Moderate Collateralization";
    if (value > 2) return "Safe Collateralization";
    return "Normal Collateralization"; // Default message
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
              className={`flex items-center justify-center h-[35px] w-fit px-2 rounded-[2px]`}
            >
              <span className="font-mono text-xl text-primary">
                {healthFactorValue}
              </span>
            </TooltipTrigger>
            <TooltipContent
              className={`bg-${getTooltipContentBackgroundColor(healthFactorValue)}`}
            >
              {getTooltipMessage(healthFactorValue)}
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <div className="flex flex-col gap-6 md:flex-row">
        <Card className="w-full md:w-1/3 h-[71px] bg-secondary">
          <CardTitle className="p-2 pb-1.5 text-sm font-normal leading-[17.5px]">
            Total Borrowed:
          </CardTitle>
          <CardContent className="p-2 pt-1.5 text-xl font-normal font-mono tracking-tighter leading-[25px]">
            1.8
          </CardContent>
        </Card>
        <Card className="w-full md:w-1/3 h-[71px] bg-secondary">
          <CardTitle className="p-2 pb-1.5 text-sm font-normal leading-[17.5px]">
            Available to borrow:
          </CardTitle>
          <CardContent className="p-2 pt-1.5 text-xl font-normal font-mono tracking-tighter leading-[25px]">
            65%
          </CardContent>
        </Card>
        <Card className="w-full md:w-1/3 h-[71px] bg-secondary">
          <CardTitle className="p-2 pb-1.5 text-sm font-normal leading-[17.5px]">
            Collateral value:
          </CardTitle>
          <CardContent className="p-2 pt-1.5 text-xl font-normal font-mono tracking-tighter leading-[25px]">
            1.500
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col gap-6 md:flex-row">
        <Card className="w-full md:w-1/3 h-[71px] bg-secondary">
          <CardTitle className="p-2 pb-1.5 text-sm font-normal leading-[17.5px]">
            Liquidation threshold
          </CardTitle>
          <CardContent className="p-2 pt-1.5 text-xl font-normal font-mono tracking-tighter leading-[25px]">
            10.000
          </CardContent>
        </Card>
        <Card className="w-full md:w-1/3 h-[71px] bg-secondary">
          <CardTitle className="p-2 pb-1.5 text-sm font-normal leading-[17.5px]">
            Current LTV / Max LTV
          </CardTitle>
          <CardContent className="p-2 pt-1.5 text-xl font-normal font-mono tracking-tighter leading-[25px]">
            6.500
          </CardContent>
        </Card>
        <Card className="w-full md:w-1/3 h-[71px] bg-secondary">
          <CardTitle className="p-2 pb-1.5 text-sm font-normal leading-[17.5px]">
            Borrowing capacity
          </CardTitle>
          <CardContent className="p-2 pt-1.5 text-xl font-normal font-mono tracking-tighter leading-[25px]">
            80%
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
