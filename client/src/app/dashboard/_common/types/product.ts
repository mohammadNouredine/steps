import { Language } from "@/common/constants/languages";
import { DashboardMedia } from "./media";

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
interface CreateAttribute extends Omit<Attribute, "id" | "productId"> {}
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

export interface ProductVariant {
  id: number;
  productId: number;
  price: number;
  cost: number;
  weight: number;
  discount: number;
  stock: number;
  outOfStock: boolean;
  amount_selled: number;
  isVisible: boolean;
  options: Option[];
}
export type Gender = "MALE" | "FEMALE" | "UNISEX";

export interface DashboardProduct {
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
  activeDiscount: boolean;
  stock: number;
  amount_selled: number;
  languages: Language[];
  base_cost: number;
  base_price: number;
  base_weight: number;
  base_discount: number;
  minAge: number;
  maxAge: number;
  createdAt: string;
  updatedAt: string;
  mediaIds?: number[];
  tags?: Tag[];
  collections?: Collection[];
  attributes?: Attribute[];
  productVariants?: ProductVariant[];
  media?: DashboardMedia[];
  variants?: Variant[];
}
//--------------------CREATE PRODUCT --------------------
export interface CreateDashboardProduct {
  name: string;
  description: string;
  base_cost: number;
  base_price: number;
  base_weight: number;
  shortDescription?: string;
  mediaIds?: number[];
  gender?: Gender;
  languages?: Language[];
  width?: number;
  height?: number;
  minAge?: number;
  maxAge?: number;
  attributes?: CreateAttribute[];
  tagIds?: number[];
  collectionIds?: number[];
  isVisible: boolean;
  outOfStock: boolean;
  isFeatured: boolean;
  productVariants?: CreateProductVariant[];
}
interface CreateProductVariant {
  price: number;
  cost: number;
  discount: number;
  weight: number;
  options: Option[];
}

//--------------------UPDATE PRODUCT --------------------
export interface UpdateDashboardProduct {
  name?: string;
  description?: string;
  base_cost?: number;
  base_price?: number;
  base_weight?: number;
  shortDescription?: string;
  gender?: Gender;
  width?: number;
  height?: number;
  minAge?: number;
  maxAge?: number;
  languages?: Language[];
  isVisible?: boolean;
  outOfStock?: boolean;
  isFeatured?: boolean;
  tagIds?: number[];
  collectionIds?: number[];
  productVariants?: UpdateProductVariant[];
  mediaIds?: number[];
  variantsIds?: number[];
}
interface UpdateProductVariant {
  price?: number;
  cost?: number;
  weight?: number;
  discount?: number;
  outOfStock?: boolean;
  isVisible?: boolean;
  variantOptionIds?: Option[];
}
