"use client";

import { create } from "zustand";

type PositionType = "collateral" | "debt";

type PositionState = {
  positionValue: number;
  setPositionValue: (value: number) => void;
};

const usePositionStore = (type: PositionType) =>
  create<PositionState>((set) => ({
    positionValue: 0,
    setPositionValue: (value) => set({ positionValue: value }),
  }))();

export { usePositionStore };
export type { PositionState, PositionType };
