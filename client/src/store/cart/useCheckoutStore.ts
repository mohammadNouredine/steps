import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";

interface CheckoutStoreState {
  lastReviewDate: Date | null;
  isRehydrated: boolean;
  formDetails: {
    fullName: string;
    phoneNumber: string;
    phoneCode: string;
    hasDelivery: boolean;
    hasDiscount: boolean;
    deliveryAddress: string;
    notes: string;
  };
}

interface CheckoutStoreActions {
  reset: () => void;
  setFormDetails: (formDetails: CheckoutStoreState["formDetails"]) => void;
  setRehydrated: (isRehydrated: boolean) => void; // Define a new action

  setLastReviewDate: (
    lastReviewDate: CheckoutStoreState["lastReviewDate"]
  ) => void;
}

const initialState: CheckoutStoreState = {
  lastReviewDate: null,
  isRehydrated: false, // Initialize as false

  formDetails: {
    fullName: "",
    phoneNumber: "",
    phoneCode: "+961",
    hasDelivery: false,
    hasDiscount: true,
    deliveryAddress: "",
    notes: "",
  },
};
const localStorageAdapter: PersistStorage<
  CheckoutStoreState & CheckoutStoreActions
> = {
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

export const useCheckoutStore = create<
  CheckoutStoreState & CheckoutStoreActions
>()(
  persist(
    (set) => ({
      ...initialState,
      isRehydrated: false,
      setRehydrated: (state) => {
        set({
          isRehydrated: state,
        });
      },
      setFormDetails: (formDetails) =>
        set((state) => ({ ...state, formDetails: formDetails })),
      setLastReviewDate: (lastReviewDate) =>
        set((state) => ({ ...state, lastReviewDate })),
      reset: () => set(initialState),
    }),
    {
      name: "zaytoona-Checkout-store", // Unique name for local storage entry
      storage: localStorageAdapter, // Use the custom adapter
      onRehydrateStorage: (state) => {
        return () => state?.setRehydrated(true);
      },
    }
  )
);
