import { create } from "zustand";
import { StoreType } from "../types/types";

const useStore = create<StoreType>(() => ({
  user: {},
}));

export { useStore };
