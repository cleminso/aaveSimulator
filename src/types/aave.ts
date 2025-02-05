export interface AaveParameter {
  name: string;
  "Collateral Enabled": boolean;
  "Borrowing Enabled": boolean;
  LTV: string;
  "Liquidation Threshold": string;
  "Optimal Utilization": string;
  "Variable Borrow Rate": string;
}

export interface AaveParameters {
  parameters: AaveParameter[];
}