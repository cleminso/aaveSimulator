"use client";

import { create } from "zustand";

type DebtState = {
  debtValue: number;
  setDebtValue: (value: number) => void;
};

const useDebtStore = create<DebtState>((set) => ({
  debtValue: 0,
  setDebtValue: (value) => set({ debtValue: value }),
}));

export { useDebtStore };
export type { DebtState };
