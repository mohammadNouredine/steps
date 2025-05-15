import * as Yup from "yup";
import { Gender, ProductVariant } from "../types/product";
import { DashboardMedia } from "../types/media";
import { Language } from "@/common/constants/languages";
export const addProductValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  attributes: Yup.array().of(
    Yup.object({
      name: Yup.string().required("Name is required"),
      description: Yup.string().required("Description is required"),
    })
  ),
});

export type ProductFormValues = {
  name: string;
  description: string;
  base_cost: number;
  base_price: number;
  base_weight: number;
  base_discount: number;
  stock: number;
  shortDescription: string;
  gender: Gender;
  width: number;
  height: number;
  minAge: number;
  maxAge: number;
  isVisible: boolean;
  outOfStock: boolean;
  isFeatured: boolean;
  activeDiscount: boolean;
  languages: Language[];
  attributes?: {
    name: string;
    description: string;
  }[];
  tagIds?: number[];
  collectionIds?: number[];
  productVariants?: ProductVariant[];
  mediaIds?: number[];
  variantsIds?: number[];
  media?: DashboardMedia[];
};
