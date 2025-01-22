export function CollateralVsDebt() {
  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <div className="w-full md:w-1/2">
        <h3 className="text-xl font-bold text-primary">Collateral</h3>
        {/* Add collateral input components here */}
      </div>
      <div className="w-full md:w-1/2">
        <h3 className="text-xl font-bold text-primary">Debt</h3>
        {/* Add debt input components here */}
      </div>
    </div>
  );
}
