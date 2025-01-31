"use client";

import { create } from "zustand";

type PositionState = {
  positionValue: number;
  setPositionValue: (value: number) => void;
};

type PositionStore = {
  collateral: PositionState;
  debt: PositionState;
};

const usePositionStore = create<PositionStore>((set) => ({
  collateral: {
    positionValue: 0,
    setPositionValue: (value) => set((state) => ({ collateral: { ...state.collateral, positionValue: value } })),
  },
  debt: {
    positionValue: 0,
    setPositionValue: (value) => set((state) => ({ debt: { ...state.debt, positionValue: value } })),
  },
}));

export { usePositionStore };
export type { PositionState };
