interface AaveParameter {
  name: string;
  "Collateral Enabled": boolean;
  "Borrowing Enabled": boolean;
  LTV: number;
  "Liquidation Threshold": number;
  "Optimal Utilization": number;
  "Variable Borrow Rate": number;
}

const aaveParameters: AaveParameter[] = [
  {
    name: "WETH",
    "Collateral Enabled": true,
    "Borrowing Enabled": true,
    LTV: 0.805,
    "Liquidation Threshold": 0.83,
    "Optimal Utilization": 0.9,
    "Variable Borrow Rate": 0.026,
  },
  {
    name: "wstETH",
    "Collateral Enabled": true,
    "Borrowing Enabled": true,
    LTV: 0.785,
    "Liquidation Threshold": 0.81,
    "Optimal Utilization": 0.8,
    "Variable Borrow Rate": 0.0065,
  },
  {
    name: "WBTC",
    "Collateral Enabled": true,
    "Borrowing Enabled": true,
    LTV: 0.73,
    "Liquidation Threshold": 0.78,
    "Optimal Utilization": 0.8,
    "Variable Borrow Rate": 0.0042,
  },
  {
    name: "USDC",
    "Collateral Enabled": true,
    "Borrowing Enabled": true,
    LTV: 0.75,
    "Liquidation Threshold": 0.78,
    "Optimal Utilization": 0.92,
    "Variable Borrow Rate": 0.1249,
  },
  {
    name: "DAI",
    "Collateral Enabled": true,
    "Borrowing Enabled": true,
    LTV: 0.63,
    "Liquidation Threshold": 0.77,
    "Optimal Utilization": 0.92,
    "Variable Borrow Rate": 0.1161,
  },
  {
    name: "LINK",
    "Collateral Enabled": true,
    "Borrowing Enabled": true,
    LTV: 0.66,
    "Liquidation Threshold": 0.71,
    "Optimal Utilization": 0.45,
    "Variable Borrow Rate": 0.0023,
  },
  {
    name: "AAVE",
    "Collateral Enabled": true,
    "Borrowing Enabled": false,
    LTV: 0.66,
    "Liquidation Threshold": 0.73,
    "Optimal Utilization": 0.45,
    "Variable Borrow Rate": 0.0,
  },
  {
    name: "cbETH",
    "Collateral Enabled": true,
    "Borrowing Enabled": true,
    LTV: 0.75,
    "Liquidation Threshold": 0.79,
    "Optimal Utilization": 0.45,
    "Variable Borrow Rate": 0.0207,
  },
  {
    name: "USDT",
    "Collateral Enabled": true,
    "Borrowing Enabled": true,
    LTV: 0.75,
    "Liquidation Threshold": 0.78,
    "Optimal Utilization": 0.92,
    "Variable Borrow Rate": 0.1031,
  },
  {
    name: "rETH",
    "Collateral Enabled": true,
    "Borrowing Enabled": true,
    LTV: 0.75,
    "Liquidation Threshold": 0.79,
    "Optimal Utilization": 0.45,
    "Variable Borrow Rate": 0.0036,
  },
  {
    name: "LUSD",
    "Collateral Enabled": false,
    "Borrowing Enabled": true,
    LTV: 0.0,
    "Liquidation Threshold": 0.77,
    "Optimal Utilization": 0.8,
    "Variable Borrow Rate": 0.1527,
  },
  {
    name: "CRV",
    "Collateral Enabled": true,
    "Borrowing Enabled": true,
    LTV: 0.35,
    "Liquidation Threshold": 0.41,
    "Optimal Utilization": 0.7,
    "Variable Borrow Rate": 0.1321,
  },
  {
    name: "MKR",
    "Collateral Enabled": true,
    "Borrowing Enabled": true,
    LTV: 0.65,
    "Liquidation Threshold": 0.7,
    "Optimal Utilization": 0.45,
    "Variable Borrow Rate": 0.0022,
  },
  {
    name: "SNX",
    "Collateral Enabled": true,
    "Borrowing Enabled": true,
    LTV: 0.49,
    "Liquidation Threshold": 0.65,
    "Optimal Utilization": 0.8,
    "Variable Borrow Rate": 0.036,
  },
  {
    name: "BAL",
    "Collateral Enabled": true,
    "Borrowing Enabled": true,
    LTV: 0.57,
    "Liquidation Threshold": 0.59,
    "Optimal Utilization": 0.8,
    "Variable Borrow Rate": 0.0579,
  },
  {
    name: "UNI",
    "Collateral Enabled": true,
    "Borrowing Enabled": true,
    LTV: 0.65,
    "Liquidation Threshold": 0.74,
    "Optimal Utilization": 0.45,
    "Variable Borrow Rate": 0.0039,
  },
  {
    name: "LDO",
    "Collateral Enabled": true,
    "Borrowing Enabled": true,
    LTV: 0.4,
    "Liquidation Threshold": 0.5,
    "Optimal Utilization": 0.45,
    "Variable Borrow Rate": 0.0026,
  },
  {
    name: "ENS",
    "Collateral Enabled": true,
    "Borrowing Enabled": true,
    LTV: 0.39,
    "Liquidation Threshold": 0.49,
    "Optimal Utilization": 0.45,
    "Variable Borrow Rate": 0.0053,
  },
  {
    name: "1INCH",
    "Collateral Enabled": true,
    "Borrowing Enabled": true,
    LTV: 0.57,
    "Liquidation Threshold": 0.67,
    "Optimal Utilization": 0.45,
    "Variable Borrow Rate": 0.0495,
  },
  {
    name: "FRAX",
    "Collateral Enabled": false,
    "Borrowing Enabled": true,
    LTV: 0.0,
    "Liquidation Threshold": 0.72,
    "Optimal Utilization": 0.9,
    "Variable Borrow Rate": 0.1173,
  },
  {
    name: "GHO",
    "Collateral Enabled": false,
    "Borrowing Enabled": true,
    LTV: 0.0,
    "Liquidation Threshold": 0.0,
    "Optimal Utilization": 0.99,
    "Variable Borrow Rate": 0.0942,
  },
  {
    name: "RPL",
    "Collateral Enabled": false,
    "Borrowing Enabled": true,
    LTV: 0.0,
    "Liquidation Threshold": 0.0,
    "Optimal Utilization": 0.8,
    "Variable Borrow Rate": 0.0399,
  },
  {
    name: "sDAI",
    "Collateral Enabled": true,
    "Borrowing Enabled": false,
    LTV: 0.75,
    "Liquidation Threshold": 0.78,
    "Optimal Utilization": 0.9,
    "Variable Borrow Rate": 0.0,
  },
  {
    name: "STG",
    "Collateral Enabled": false,
    "Borrowing Enabled": true,
    LTV: 0.0,
    "Liquidation Threshold": 0.37,
    "Optimal Utilization": 0.45,
    "Variable Borrow Rate": 0.0033,
  },
  {
    name: "KNC",
    "Collateral Enabled": false,
    "Borrowing Enabled": true,
    LTV: 0.0,
    "Liquidation Threshold": 0.37,
    "Optimal Utilization": 0.45,
    "Variable Borrow Rate": 0.0332,
  },
  {
    name: "FXS",
    "Collateral Enabled": false,
    "Borrowing Enabled": true,
    LTV: 0.0,
    "Liquidation Threshold": 0.42,
    "Optimal Utilization": 0.45,
    "Variable Borrow Rate": 0.0026,
  },
  {
    name: "crvUSD",
    "Collateral Enabled": false,
    "Borrowing Enabled": true,
    LTV: 0.0,
    "Liquidation Threshold": 0.0,
    "Optimal Utilization": 0.8,
    "Variable Borrow Rate": 0.241,
  },
  {
    name: "PYUSD",
    "Collateral Enabled": true,
    "Borrowing Enabled": true,
    LTV: 0.75,
    "Liquidation Threshold": 0.78,
    "Optimal Utilization": 0.8,
    "Variable Borrow Rate": 0.1086,
  },
  {
    name: "weETH",
    "Collateral Enabled": true,
    "Borrowing Enabled": true,
    LTV: 0.775,
    "Liquidation Threshold": 0.8,
    "Optimal Utilization": 0.3,
    "Variable Borrow Rate": 0.0105,
  },
  {
    name: "osETH",
    "Collateral Enabled": true,
    "Borrowing Enabled": true,
    LTV: 0.725,
    "Liquidation Threshold": 0.75,
    "Optimal Utilization": 0.45,
    "Variable Borrow Rate": 0.0058,
  },
  {
    name: "USDe",
    "Collateral Enabled": true,
    "Borrowing Enabled": true,
    LTV: 0.72,
    "Liquidation Threshold": 0.75,
    "Optimal Utilization": 0.8,
    "Variable Borrow Rate": 0.0772,
  },
  {
    name: "ETHx",
    "Collateral Enabled": true,
    "Borrowing Enabled": true,
    LTV: 0.745,
    "Liquidation Threshold": 0.77,
    "Optimal Utilization": 0.45,
    "Variable Borrow Rate": 0.0006,
  },
  {
    name: "sUSDe",
    "Collateral Enabled": true,
    "Borrowing Enabled": false,
    LTV: 0.72,
    "Liquidation Threshold": 0.75,
    "Optimal Utilization": 0.9,
    "Variable Borrow Rate": 0.0,
  },
  {
    name: "tBTC",
    "Collateral Enabled": true,
    "Borrowing Enabled": true,
    LTV: 0.73,
    "Liquidation Threshold": 0.78,
    "Optimal Utilization": 0.45,
    "Variable Borrow Rate": 0.0021,
  },
  {
    name: "cbBTC",
    "Collateral Enabled": true,
    "Borrowing Enabled": true,
    LTV: 0.73,
    "Liquidation Threshold": 0.78,
    "Optimal Utilization": 0.45,
    "Variable Borrow Rate": 0.0038,
  },
  {
    name: "USDS",
    "Collateral Enabled": true,
    "Borrowing Enabled": true,
    LTV: 0.75,
    "Liquidation Threshold": 0.78,
    "Optimal Utilization": 0.92,
    "Variable Borrow Rate": 0.127,
  },
  {
    name: "rsETH",
    "Collateral Enabled": true,
    "Borrowing Enabled": true,
    LTV: 0.72,
    "Liquidation Threshold": 0.75,
    "Optimal Utilization": 0.45,
    "Variable Borrow Rate": 0.0,
  },
];

export default aaveParameters;
