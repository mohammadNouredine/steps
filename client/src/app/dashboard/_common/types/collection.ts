import { DashboardMedia } from "./media";
import { DashboardProduct } from "./product";

export interface DashboardCollection {
  id: number;
  name: string;
  sectionTitle?: string;
  sectionSubtitle?: string;
  sectionAction?: string;
  sectionActionLink?: string;
  mediaType?: MediaLayoutType;
  appearingProductIds: number[];
  appearingProducts: DashboardProduct[];
  media?: {
    collectionId: number;
    mediaId: number;

    name: string;
    url: string;
    public_id: string;
    type: "image" | "video";
  }[];
  products?: {
    id: number;
    name: string;
    media: DashboardMedia[];
  }[];
}

export interface CreateDashboardCollection
  extends Omit<
    DashboardCollection,
    "id" | "media" | "appearingProducts" | "appearingProductIds"
  > {
  mediaIds?: number[];
}

export type MediaLayoutType = "full" | "padded";
