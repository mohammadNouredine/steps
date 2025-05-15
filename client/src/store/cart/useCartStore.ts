import toast from "react-hot-toast";
import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";

export interface StoreItem {
  id: number;
  productId: number;
  variantCombinations: string[];
  idWithVariant: string;
  variantId?: number;
  name: string;
  price: number;
  weight: number;
  image: string;
  quantity: number;
  discount: number;
}

interface CartStoreState {
  products: StoreItem[];
  total: number;
  totalWeight: number;
  subtotal: number;
  discount: number;
  unreadItems: number;
}

interface CartStoreActions {
  addProduct: (product: StoreItem) => void;
  removeProduct: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  calculateTotals: () => {
    total: number;
    subtotal: number;
    discount: number;
    totalWeight: number;
  };
  setUnreadItems: (unreadItems: number) => void;
  resetCart: () => void;
}

const initialState: CartStoreState = {
  products: [],
  total: 0,
  subtotal: 0,
  totalWeight: 0,
  discount: 0,
  unreadItems: 0,
};
const localStorageAdapter: PersistStorage<CartStoreState & CartStoreActions> = {
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

export const useCartStore = create<CartStoreState & CartStoreActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      setUnreadItems: (unreadItems) =>
        set((state) => ({
          ...state,
          unreadItems: unreadItems,
        })),

      addProduct: (product) => {
        set((state) => {
          const existingProduct = state.products.find(
            (p) => p.idWithVariant === product.idWithVariant
          );
          //add the unreadItems

          if (existingProduct) {
            toast.success("Incresing " + product.name + "'s quantity");
            return {
              ...state,
              unreadItems: state.unreadItems + 1,
              products: state.products.map((p) =>
                p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
              ),
            };
          } else {
            toast.success("Added " + product.name + " to cart ");
            return {
              ...state,
              unreadItems: state.unreadItems + 1,
              products: [
                ...state.products,
                { ...product, quantity: product.quantity },
              ],
            };
          }
        });
        set((state) => {
          const totals = state.calculateTotals();
          return {
            ...state,
            discount: totals.discount,
            subtotal: totals.subtotal,
            total: totals.total,
            totalWeight: totals.totalWeight,
          };
        });
      },
      removeProduct: (idWithVariant) => {
        set((state) => {
          return {
            ...state,
            products: state.products.filter(
              (p) => p.idWithVariant !== idWithVariant
            ),
          };
        });
        set((state) => {
          const totals = state.calculateTotals();
          return {
            ...state,
            discount: totals.discount,
            subtotal: totals.subtotal,
            total: totals.total,
            totalWeight: totals.totalWeight,
          };
        });
      },

      setQuantity: (idWithVariant, quantity) => {
        set((state) => {
          return {
            ...state,
            unreadItems: state.unreadItems + 1,
            products: state.products.map((p) =>
              p.idWithVariant === idWithVariant
                ? { ...p, quantity: quantity }
                : p
            ),
          };
        }),
          set((state) => {
            const totals = state.calculateTotals();
            return {
              ...state,
              discount: totals.discount,
              subtotal: totals.subtotal,
              total: totals.total,
              totalWeight: totals.totalWeight,
            };
          });
      },

      calculateTotals: () => {
        const state = get();
        return {
          totalWeight: state.products.reduce(
            (acc, product) => acc + product.weight * product.quantity,
            0
          ),
          discount: state.products.reduce(
            (acc, product) => acc + product.discount * product.quantity,
            0
          ),
          subtotal: state.products.reduce(
            (acc, product) => acc + product.price * product.quantity,
            0
          ),
          total:
            state.products.reduce(
              (acc, product) => acc + product.price * product.quantity,
              0
            ) -
            state.products.reduce(
              (acc, product) => acc + product.discount * product.quantity,
              0
            ),
        };
      },
      resetCart: () => set(initialState),
    }),

    {
      name: "zaytoona-cart-store", // Unique name for local storage entry
      storage: localStorageAdapter, // Use the custom adapter
    }
  )
);
