import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";

interface MenuStoreState {
  isOpen: boolean;
}

interface MenuStoreActions {
  setIsOpen: (isOpen: boolean) => void;
  resetCart: () => void;
}

const initialState: MenuStoreState = {
  isOpen: false,
};
const localStorageAdapter: PersistStorage<MenuStoreState & MenuStoreActions> = {
  getItem: (name) => {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
  },
};

export const useMenuStore = create<MenuStoreState & MenuStoreActions>()(
  persist(
    (set) => ({
      ...initialState,
      setIsOpen: (isOpen) =>
        set((state) => ({
          ...state,
          isOpen: isOpen,
        })),
      resetCart: () => set(initialState),
    }),

    {
      name: "zaytoona-cart-store", // Unique name for local storage entry
      storage: localStorageAdapter, // Use the custom adapter
    }
  )
);
