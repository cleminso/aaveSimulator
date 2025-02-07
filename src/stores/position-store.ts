"use client";

import { create } from "zustand";

type PositionState = {
  positionValue: number;
  tokenQuantity: number; // ADD
  tokenPrice: number; // ADD
  setPositionValue: (value: number) => void;
  setTokenQuantity: (value: number) => void; // ADD
  setTokenPrice: (value: number) => void; // ADD
};

type PositionStore = {
  collateral: PositionState;
  debt: PositionState;
};

const usePositionStore = create<PositionStore>((set) => ({
  collateral: {
    positionValue: 0,
    setPositionValue: (value) => set((state) => ({ collateral: { ...state.collateral, positionValue: value } })),
    tokenQuantity: 0, // Initial tokenQuantity for collateral
    setTokenQuantity: (value) => set((state) => ({ collateral: { ...state.collateral, tokenQuantity: value } })), // Action to set collateral tokenQuantity
    tokenPrice: 1500, // Initial tokenPrice for collateral
    setTokenPrice: (value) => set((state) => ({ collateral: { ...state.collateral, tokenPrice: value } })), // Action to set collateral tokenPrice
  },
  debt: {
    positionValue: 0,
    setPositionValue: (value) => set((state) => ({ debt: { ...state.debt, positionValue: value } })),
    tokenQuantity: 0, // Initial tokenQuantity for debt
    setTokenQuantity: (value) => set((state) => ({ debt: { ...state.debt, tokenQuantity: value } })), // Action to set debt tokenQuantity
    tokenPrice: 1500, // Initial tokenPrice for debt
    setTokenPrice: (value) => set((state) => ({ debt: { ...state.debt, tokenPrice: value } })), // Action to set debt tokenPrice
  },
}));

export { usePositionStore };
export type { PositionState };
