"use client";

import { create } from "zustand";

type CollateralState = {
  collateralValue: number;
  setCollateralValue: (value: number) => void;
};

const useCollateralStore = create<CollateralState>((set) => ({
  collateralValue: 0,
  setCollateralValue: (value) => set({ collateralValue: value }),
}));

export { useCollateralStore };
export type { CollateralState };
