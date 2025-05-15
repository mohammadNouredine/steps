import { CustomerMedia } from "./media";

export type CustomerContent = {
  id: number;
  pageName: string;
  contentSections?: CustomerContentSection[];
};
export type CustomerContentSection = {
  id: number;
  contentType: string;
  contentId: number;
  order: number;
  collectionId: number;
  collection: {
    sectionAction: string;
    sectionActionLink: string;
    sectionSubtitle: string;
    sectionTitle: string;
    mediaType: "padded" | "full";
    id: number;
    name: string;
    media: CustomerMedia[];
    products: {
      name: string;
      base_price: number;
      base_discount: number;
      media: CustomerMedia[];
    }[];
  };
};
