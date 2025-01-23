import { Card, CardContent, CardTitle } from "@/components/ui/card";

export function HealthFactorSummary() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-primary">Health Factor Summary</h2>
      <div className="flex flex-col gap-6 md:flex-row">
        <Card className="w-full md:w-1/3 h-[71px]">
          <CardTitle className="p-6 text-sm font-normal">Health Factor</CardTitle>
          <CardContent className="text-2xl font-bold font-mono tracking-tighter">1.8</CardContent>
        </Card>
        <Card className="w-full md:w-1/3 h-[71px]">
          <CardTitle className="p-6 text-sm font-normal">Borrow Usage</CardTitle>
          <CardContent className="text-2xl font-bold font-mono tracking-tighter">65%</CardContent>
        </Card>
        <Card className="w-full md:w-1/3 h-[71px]">
          <CardTitle className="p-6 text-sm font-normal">Available Credit</CardTitle>
          <CardContent className="text-2xl font-bold font-mono tracking-tighter">$1,500</CardContent>
        </Card>
      </div>
      <div className="flex flex-col gap-6 md:flex-row">
        <Card className="w-full md:w-1/3 h-[71px] mt-2">
          <CardTitle className="p-6 text-sm font-normal">Total Collateral</CardTitle>
          <CardContent className="text-2xl font-bold font-mono tracking-tighter">$10,000</CardContent>
        </Card>
        <Card className="w-full md:w-1/3 h-[71px]">
          <CardTitle className="p-6 text-sm font-normal">Total Debt</CardTitle>
          <CardContent className="text-2xl font-bold font-mono tracking-tighter">$6,500</CardContent>
        </Card>
        <Card className="w-full md:w-1/3 h-[71px]">
          <CardTitle className="p-6 text-sm font-normal">Liquidation Threshold</CardTitle>
          <CardContent className="text-2xl font-bold font-mono tracking-tighter">80%</CardContent>
        </Card>
      </div>
    </div>
  );
}
