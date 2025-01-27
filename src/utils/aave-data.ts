interface TokenData {
  collateralEnabled: boolean;
  borrowingEnabled: boolean;
  ltv: number;
  liquidationThreshold: number;
  optimalUtilization: number;
  variableBorrowRate: number;
}

const aaveParameterData: Record<string, TokenData> = {};

// Manually parse the table from aave-parameter.md
// (Ideally, this would be automated, but for now, we'll do it manually)
aaveParameterData["WETH"] = {
  collateralEnabled: true,
  borrowingEnabled: true,
  ltv: 0.805,
  liquidationThreshold: 0.83,
  optimalUtilization: 0.9,
  variableBorrowRate: 0.026,
};
aaveParameterData["wstETH"] = {
  collateralEnabled: true,
  borrowingEnabled: true,
  ltv: 0.785,
  liquidationThreshold: 0.81,
  optimalUtilization: 0.8,
  variableBorrowRate: 0.0065,
};
aaveParameterData["WBTC"] = {
  collateralEnabled: true,
  borrowingEnabled: true,
  ltv: 0.73,
  liquidationThreshold: 0.78,
  optimalUtilization: 0.8,
  variableBorrowRate: 0.0042,
};
aaveParameterData["USDC"] = {
  collateralEnabled: true,
  borrowingEnabled: true,
  ltv: 0.75,
  liquidationThreshold: 0.78,
  optimalUtilization: 0.92,
  variableBorrowRate: 0.1249,
};
aaveParameterData["DAI"] = {
  collateralEnabled: true,
  borrowingEnabled: true,
  ltv: 0.63,
  liquidationThreshold: 0.77,
  optimalUtilization: 0.92,
  variableBorrowRate: 0.1161,
};
aaveParameterData["LINK"] = {
  collateralEnabled: true,
  borrowingEnabled: true,
  ltv: 0.66,
  liquidationThreshold: 0.71,
  optimalUtilization: 0.45,
  variableBorrowRate: 0.0023,
};
aaveParameterData["AAVE"] = {
  collateralEnabled: true,
  borrowingEnabled: false,
  ltv: 0.66,
  liquidationThreshold: 0.73,
  optimalUtilization: 0.45,
  variableBorrowRate: 0.0,
};
aaveParameterData["cbETH"] = {
  collateralEnabled: true,
  borrowingEnabled: true,
  ltv: 0.75,
  liquidationThreshold: 0.79,
  optimalUtilization: 0.45,
  variableBorrowRate: 0.0207,
};
aaveParameterData["USDT"] = {
  collateralEnabled: true,
  borrowingEnabled: true,
  ltv: 0.75,
  liquidationThreshold: 0.78,
  optimalUtilization: 0.92,
  variableBorrowRate: 0.1031,
};
aaveParameterData["rETH"] = {
  collateralEnabled: true,
  borrowingEnabled: true,
  ltv: 0.75,
  liquidationThreshold: 0.79,
  optimalUtilization: 0.45,
  variableBorrowRate: 0.0036,
};
aaveParameterData["LUSD"] = {
  collateralEnabled: false,
  borrowingEnabled: true,
  ltv: 0,
  liquidationThreshold: 0.77,
  optimalUtilization: 0.8,
  variableBorrowRate: 0.1527,
};
aaveParameterData["CRV"] = {
  collateralEnabled: true,
  borrowingEnabled: true,
  ltv: 0.35,
  liquidationThreshold: 0.41,
  optimalUtilization: 0.7,
  variableBorrowRate: 0.1321,
};
aaveParameterData["MKR"] = {
  collateralEnabled: true,
  borrowingEnabled: true,
  ltv: 0.65,
  liquidationThreshold: 0.7,
  optimalUtilization: 0.45,
  variableBorrowRate: 0.0022,
};
aaveParameterData["SNX"] = {
  collateralEnabled: true,
  borrowingEnabled: true,
  ltv: 0.49,
  liquidationThreshold: 0.65,
  optimalUtilization: 0.8,
  variableBorrowRate: 0.036,
};
aaveParameterData["BAL"] = {
  collateralEnabled: true,
  borrowingEnabled: true,
  ltv: 0.57,
  liquidationThreshold: 0.59,
  optimalUtilization: 0.8,
  variableBorrowRate: 0.0579,
};
aaveParameterData["UNI"] = {
  collateralEnabled: true,
  borrowingEnabled: true,
  ltv: 0.65,
  liquidationThreshold: 0.74,
  optimalUtilization: 0.45,
  variableBorrowRate: 0.0039,
};
aaveParameterData["LDO"] = {
  collateralEnabled: true,
  borrowingEnabled: true,
  ltv: 0.4,
  liquidationThreshold: 0.5,
  optimalUtilization: 0.45,
  variableBorrowRate: 0.0026,
};
aaveParameterData["ENS"] = {
  collateralEnabled: true,
  borrowingEnabled: true,
  ltv: 0.39,
  liquidationThreshold: 0.49,
  optimalUtilization: 0.45,
  variableBorrowRate: 0.0053,
};
aaveParameterData["1INCH"] = {
  collateralEnabled: true,
  borrowingEnabled: true,
  ltv: 0.57,
  liquidationThreshold: 0.67,
  optimalUtilization: 0.45,
  variableBorrowRate: 0.0495,
};
aaveParameterData["FRAX"] = {
  collateralEnabled: false,
  borrowingEnabled: true,
  ltv: 0,
  liquidationThreshold: 0.72,
  optimalUtilization: 0.9,
  variableBorrowRate: 0.1173,
};
aaveParameterData["GHO"] = {
  collateralEnabled: false,
  borrowingEnabled: true,
  ltv: 0,
  liquidationThreshold: 0,
  optimalUtilization: 0.99,
  variableBorrowRate: 0.0942,
};
aaveParameterData["RPL"] = {
  collateralEnabled: false,
  borrowingEnabled: true,
  ltv: 0,
  liquidationThreshold: 0,
  optimalUtilization: 0.8,
  variableBorrowRate: 0.0399,
};
aaveParameterData["sDAI"] = {
  collateralEnabled: true,
  borrowingEnabled: false,
  ltv: 0.75,
  liquidationThreshold: 0.78,
  optimalUtilization: 0.9,
  variableBorrowRate: 0.0,
};
aaveParameterData["STG"] = {
  collateralEnabled: false,
  borrowingEnabled: true,
  ltv: 0,
  liquidationThreshold: 0.37,
  optimalUtilization: 0.45,
  variableBorrowRate: 0.0033,
};
aaveParameterData["KNC"] = {
  collateralEnabled: false,
  borrowingEnabled: true,
  ltv: 0,
  liquidationThreshold: 0.37,
  optimalUtilization: 0.45,
  variableBorrowRate: 0.0332,
};
aaveParameterData["FXS"] = {
  collateralEnabled: false,
  borrowingEnabled: true,
  ltv: 0,
  liquidationThreshold: 0.42,
  optimalUtilization: 0.45,
  variableBorrowRate: 0.0026,
};
aaveParameterData["crvUSD"] = {
  collateralEnabled: false,
  borrowingEnabled: true,
  ltv: 0,
  liquidationThreshold: 0,
  optimalUtilization: 0.8,
  variableBorrowRate: 0.241,
};
aaveParameterData["PYUSD"] = {
  collateralEnabled: true,
  borrowingEnabled: true,
  ltv: 0.75,
  liquidationThreshold: 0.78,
  optimalUtilization: 0.8,
  variableBorrowRate: 0.1086,
};
aaveParameterData["weETH"] = {
  collateralEnabled: true,
  borrowingEnabled: true,
  ltv: 0.775,
  liquidationThreshold: 0.8,
  optimalUtilization: 0.3,
  variableBorrowRate: 0.0105,
};
aaveParameterData["osETH"] = {
  collateralEnabled: true,
  borrowingEnabled: true,
  ltv: 0.725,
  liquidationThreshold: 0.75,
  optimalUtilization: 0.45,
  variableBorrowRate: 0.0058,
};
aaveParameterData["USDe"] = {
  collateralEnabled: true,
  borrowingEnabled: true,
  ltv: 0.72,
  liquidationThreshold: 0.75,
  optimalUtilization: 0.8,
  variableBorrowRate: 0.0772,
};
aaveParameterData["ETHx"] = {
  collateralEnabled: true,
  borrowingEnabled: true,
  ltv: 0.745,
  liquidationThreshold: 0.77,
  optimalUtilization: 0.45,
  variableBorrowRate: 0.0006,
};
aaveParameterData["sUSDe"] = {
  collateralEnabled: true,
  borrowingEnabled: false,
  ltv: 0.72,
  liquidationThreshold: 0.75,
  optimalUtilization: 0.9,
  variableBorrowRate: 0.0,
};
aaveParameterData["tBTC"] = {
  collateralEnabled: true,
  borrowingEnabled: true,
  ltv: 0.73,
  liquidationThreshold: 0.78,
  optimalUtilization: 0.45,
  variableBorrowRate: 0.0021,
};
aaveParameterData["cbBTC"] = {
  collateralEnabled: true,
  borrowingEnabled: true,
  ltv: 0.73,
  liquidationThreshold: 0.78,
  optimalUtilization: 0.45,
  variableBorrowRate: 0.0038,
};
aaveParameterData["USDS"] = {
  collateralEnabled: true,
  borrowingEnabled: true,
  ltv: 0.75,
  liquidationThreshold: 0.78,
  optimalUtilization: 0.92,
  variableBorrowRate: 0.127,
};
aaveParameterData["rsETH"] = {
  collateralEnabled: true,
  borrowingEnabled: true,
  ltv: 0.72,
  liquidationThreshold: 0.75,
  optimalUtilization: 0.45,
  variableBorrowRate: 0.0,
};

export function getTokenData(tokenSymbol: string): TokenData | undefined {
  return aaveParameterData[tokenSymbol];
}
