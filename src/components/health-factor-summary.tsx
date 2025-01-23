import { Card, CardContent, CardTitle } from "@/components/ui/card";

export function HealthFactorSummary() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-primary">Health Factor Summary</h2>
      <div className="flex flex-col gap-6 md:flex-row">
        <Card className="w-full md:w-1/3 h-[71px] bg-secondary">
          <CardTitle className="p-2 pb-1.5 text-sm font-normal leading-[17.5px]">Health Factor</CardTitle>
          <CardContent className="p-2 pt-1.5 text-xl font-normal font-mono tracking-tighter leading-[25px]">1.8</CardContent>
        </Card>
        <Card className="w-full md:w-1/3 h-[71px] bg-secondary">
          <CardTitle className="p-2 pb-1.5 text-sm font-normal leading-[17.5px]">Borrow Usage</CardTitle>
          <CardContent className="p-2 pt-1.5 text-xl font-normal font-mono tracking-tighter leading-[25px]">65%</CardContent>
        </Card>
        <Card className="w-full md:w-1/3 h-[71px] bg-secondary">
          <CardTitle className="p-2 pb-1.5 text-sm font-normal leading-[17.5px]">Available Credit</CardTitle>
          <CardContent className="p-2 pt-1.5 text-xl font-normal font-mono tracking-tighter leading-[25px]">1.500</CardContent>
        </Card>
      </div>
      <div className="flex flex-col gap-6 md:flex-row">
        <Card className="w-full md:w-1/3 h-[71px] bg-secondary">
          <CardTitle className="p-2 pb-1.5 text-sm font-normal leading-[17.5px]">Total Collateral</CardTitle>
          <CardContent className="p-2 pt-1.5 text-xl font-normal font-mono tracking-tighter leading-[25px]">10.000</CardContent>
        </Card>
        <Card className="w-full md:w-1/3 h-[71px] bg-secondary">
          <CardTitle className="p-2 pb-1.5 text-sm font-normal leading-[17.5px]">Total Debt</CardTitle>
          <CardContent className="p-2 pt-1.5 text-xl font-normal font-mono tracking-tighter leading-[25px]">6.500</CardContent>
        </Card>
        <Card className="w-full md:w-1/3 h-[71px] bg-secondary">
          <CardTitle className="p-2 pb-1.5 text-sm font-normal leading-[17.5px]">Liquidation Threshold</CardTitle>
          <CardContent className="p-2 pt-1.5 text-xl font-normal font-mono tracking-tighter leading-[25px]">80%</CardContent>
        </Card>
      </div>
    </div>
  );
}
