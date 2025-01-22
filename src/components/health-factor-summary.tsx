import { Card, CardContent, CardTitle } from "@/components/ui/card";

export function HealthFactorSummary() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-primary">Health Factor Summary</h2>
      <div className="flex flex-col gap-6 md:flex-row">
        <Card className="w-full md:w-1/3">
          <CardTitle className="p-6">Health Factor</CardTitle>
          <CardContent className="text-2xl font-bold">1.8</CardContent>
        </Card>
        <Card className="w-full md:w-1/3">
          <CardTitle className="p-6">Borrow Usage</CardTitle>
          <CardContent className="text-2xl font-bold">65%</CardContent>
        </Card>
        <Card className="w-full md:w-1/3">
          <CardTitle className="p-6">Available Credit</CardTitle>
          <CardContent className="text-2xl font-bold">$1,500</CardContent>
        </Card>
      </div>
      <div className="flex flex-col gap-6 md:flex-row">
        <Card className="w-full md:w-1/3">
          <CardTitle className="p-6">Total Collateral</CardTitle>
          <CardContent className="text-2xl font-bold">$10,000</CardContent>
        </Card>
        <Card className="w-full md:w-1/3">
          <CardTitle className="p-6">Total Debt</CardTitle>
          <CardContent className="text-2xl font-bold">$6,500</CardContent>
        </Card>
        <Card className="w-full md:w-1/3">
          <CardTitle className="p-6">Liquidation Threshold</CardTitle>
          <CardContent className="text-2xl font-bold">80%</CardContent>
        </Card>
      </div>
    </div>
  );
}
