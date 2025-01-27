# We are building an Aave Health Factor simulator that allows users to input their borrowing and lending positions on the AAVE protocol to simulate their Health Factor.

**Our goal**: help borrow to avoid liquidation risk, by simulating their position metrics.

Aave is a web3 money market, where users can participate as lender or borrowers. Lenders provide liquidity to the market while earning interest, and borrowers can access liquidity by deposit collateral that exceeds the borrowed amount. Aave enables users to lend their assets to liquidity pools and, in return, allows other participants to borrow from those pools using their own collateral.

The health factor is a critical metric within the Aave Protocol that measures the safety of a borrow position. It is calculated as:

`Health Factor = (Total Collateral Value * Weighted Average Liquidation Threshold) / Total Borrow Value`

To maintain a healthy ratio and avoid liquidation risk, borrowers should actively monitor their collateralization level, keeping their health factor in check, to assure their borrow positions remain overcollateralised even as market conditions change or interest accrues.

Liquidation happens when a borrower's health factor drops below 1, meaning their collateral is insufficient to cover the borrowed amount. A health factor above 1 represents a position that is above the liquidation threshold.

**Liquidation scenario**:

1. the value of collateral decreases meaning the collateral value is insufficient to cover the borrowed amount
2. the borrowing amount is increased meaning the position get closer from maximum the loan-to-value

**Notation**:

- Health factor < 1 = under collateralization
- Health factor >= 1.5 = moderate collateralization
- Health factor > 2 = safe collateralization

**Data source**:

To integrate AAVE protocol logic inside our app, we need to use a subgraph. A subgraph is a structured and queryable representation of a specific subset of blockchain data. It allows us to index and query blockchain data efficiently using GraphQL.

1. **Indexing**: The process of organizing and storing blockchain data in a structured format to make it queryable.
2. **Schema Definition**: Defining the entities and relationships of the data to be indexed.
3. **GraphQL API**: A query language for APIs that allows us to request exactly the data we need.
4. **Deployment**: Deploying the subgraph to a network like The Graph to start indexing data.

**Token risk parameters**:

Parameters and relations for each token available on Aave v3 Ethereum network, source: https://aave.com/docs/resources/parameters.

|               Parameter |    WETH |  wstETH |    WBTC |    USDC |     DAI |    LINK |    AAVE |   cbETH |    USDT |    rETH |    LUSD |     CRV |     MKR |     SNX |     BAL |     UNI |     LDO |     ENS |   1INCH |    FRAX |     GHO |     RPL |    sDAI |     STG |     KNC |     FXS |  crvUSD |   PYUSD |   weETH |   osETH |    USDe |    ETHx |   sUSDe |    tBTC |   cbBTC |    USDS |   rsETH |
|:------------------------|:--------|:--------|:--------|:--------|:--------|:--------|:--------|:--------|:--------|:--------|:--------|:--------|:--------|:--------|:--------|:--------|:--------|:--------|:--------|:--------|:--------|:--------|:--------|:--------|:--------|:--------|:--------|:--------|:--------|:--------|:--------|:--------|:--------|:--------|:--------|:--------|:--------|
|      Collateral Enabled |    True |    True |    True |    True |    True |    True |    True |    True |    True |    True |   False |    True |    True |    True |    True |    True |    True |    True |    True |   False |   False |   False |    True |   False |   False |   False |   False |    True |    True |    True |    True |    True |    True |    True |    True |    True |    True |
|       Borrowing Enabled |    True |    True |    True |    True |    True |    True |   False |    True |    True |    True |    True |    True |    True |    True |    True |    True |    True |    True |    True |    True |    True |    True |   False |    True |    True |    True |    True |    True |    True |    True |    True |    True |   False |    True |    True |    True |    True |
|                     LTV |   80.5% |   78.5% |     73% |     75% |     63% |     66% |     66% |     75% |     75% |     75% |      0% |     35% |     65% |     49% |     57% |     65% |     40% |     39% |     57% |      0% |      0% |      0% |     75% |      0% |      0% |      0% |      0% |     75% |   77.5% |   72.5% |     72% |   74.5% |     72% |     73% |     73% |     75% |     72% |
|   Liquidation Threshold |     83% |     81% |     78% |     78% |     77% |     71% |     73% |     79% |     78% |     79% |     77% |     41% |     70% |     65% |     59% |     74% |     50% |     49% |     67% |     72% |      0% |      0% |     78% |     37% |     37% |     42% |      0% |     78% |     80% |     75% |     75% |     77% |     75% |     78% |     78% |     78% |     75% |
|     Optimal Utilization |     90% |     80% |     80% |     92% |     92% |     45% |     45% |     45% |     92% |     45% |     80% |     70% |     45% |     80% |     80% |     45% |     45% |     45% |     45% |     90% |     99% |     80% |     90% |     45% |     45% |     45% |     80% |     80% |     30% |     45% |     80% |     45% |     90% |     45% |     45% |     92% |     45% |
|    Variable Borrow Rate |   2.60% |   0.65% |   0.42% |  12.49% |  11.61% |   0.23% |   0.00% |   2.07% |  10.31% |   0.36% |  15.27% |  13.21% |   0.22% |   3.60% |   5.79% |   0.39% |   0.26% |   0.53% |   4.95% |  11.73% |   9.42% |   3.99% |   0.00% |   0.33% |   3.32% |   0.26% |  24.10% |  10.86% |   1.05% |   0.58% |   7.72% |   0.06% |   0.00% |   0.21% |   0.38% |  12.70% |   0.00% |

**Metrics Formula**:

All metrics formula used inside the aave simulator.

| **Metric**              | **Formula**                                                                 |
|--------------------------|-----------------------------------------------------------------------------|
| Collateral Value         | `Σ (Collateral Amount of Asset × Price of Asset)`                          |
| Liquidation Threshold    | `Σ (Collateral Amount of Asset × Price of Asset × Liquidation Threshold)`  |
| Total Borrowed           | `Σ (Borrowed Amount of Asset × Price of Asset)`                            |
| Current LTV              | `(Total Borrowed / Collateral Value) × 100`                                |
| Available to Borrow      | `(Collateral Value × Max LTV) - Total Borrowed`                            |
| Borrowing Capacity       | `(Available to Borrow / (Collateral Value × Max LTV)) × 100`               |
| Health Factor            | `(Collateral Value × Liquidation Threshold) / Total Borrowed`              |
