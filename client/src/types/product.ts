import { Language } from "@/common/constants/languages";
import { CustomerMedia } from "./media";

interface Tag {
  id: number;
  name: string;
}

interface Collection {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface Attribute {
  id: number;
  name: string;
  description: string;
  productId: number;
}

interface VariantOption {
  id: number;
  name: string;
  value: string;
}

interface Variant {
  id: number;
  name: string;
  variant_options: VariantOption[];
}

interface Option {
  id: number;
  name: string;
  value: string;
  variantId: number;
  variant: Variant;
}

interface ProductVariant {
  id: number;
  productId: number;
  price: number;
  cost: number;
  weight: number;
  discount: number;
  outOfStock: boolean;
  isVisible: boolean;
  options: Option[];
}
export type Gender = "MALE" | "FEMALE" | "UNISEX";

export interface CustomerProduct {
  id: number;
  name: string;
  description: string;
  shortDescription: string;
  gender: Gender;
  width: number;
  height: number;
  isVisible: boolean;
  outOfStock: boolean;
  isFeatured: boolean;
  languages: Language[];
  base_cost: number;
  base_price: number;
  base_weight: number;
  base_discount: number;
  activeDiscount: boolean;
  minAge: number;
  maxAge: number;
  createdAt: string;
  updatedAt: string;
  mediaIds?: number[];
  tags?: Tag[];
  collections?: Collection[];
  attributes?: Attribute[];
  productVariants?: ProductVariant[];
  media?: CustomerMedia[];
  variants?: Variant[];
}
//sorting
export const sortByOptions: {
  value: ProductSortBy;
  label: string;
}[] = [
  { value: "latest", label: "Latest" },
  { value: "a-z", label: "A-Z" },
  { value: "z-a", label: "Z-A" },
  { value: "price-low-to-high", label: "Price ASC" },
  { value: "price-high-to-low", label: "Price DESC" },
  { value: "top-selling", label: "Top Selling" },
];
export type ProductSortBy =
  | "latest"
  | "a-z"
  | "z-a"
  | "price-low-to-high"
  | "price-high-to-low"
  | "top-selling";
