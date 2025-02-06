export interface AaveParameter {
  name: string;
  "Collateral Enabled": boolean;
  "Borrowing Enabled": boolean;
  "Liquidation Threshold": string;
  LTV: string;
  "Variable Borrow Rate": string;
}

export interface AaveParameters {
  parameters: AaveParameter[];
}
