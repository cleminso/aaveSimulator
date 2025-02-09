"use client";

import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { fetchGraphQLData } from "@/libs/api";

export function UserAddressInput() {
  const [address, setAddress] = useState<string>("");

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handleAddressSubmit = async () => {
    if (!address) {
      return;
    }

    const GET_USER_POSITION_QUERY = `
      query GetUserPosition($userAddress: ID!) {
        user(id: $userAddress) {
          id
          reserves {
            reserve {
              symbol
              name
              decimals
              reserveLiquidationThreshold
              baseLTVasCollateral
              price {
                priceInEth
              }
            }
            currentATokenBalance
            currentVariableDebt
            currentStableDebt
            usageAsCollateralEnabledOnUser
          }
        }
      }
    `;

    try {
      const userData = await fetchGraphQLData(GET_USER_POSITION_QUERY, { userAddress: address });
      console.log(userData); // Log the fetched data for now
    } catch (error) {
      console.error("Error fetching user position:", error);
      // Handle error, e.g., display error message
    }
  };

  return (
    <Input type="text" placeholder="Enter Ethereum Address" className="w-1/3" value={address} onChange={handleAddressChange} onBlur={handleAddressSubmit}/>
  );
}
