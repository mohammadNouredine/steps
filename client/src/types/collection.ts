import { MediaLayoutType } from "@/app/dashboard/_common/types/collection";
import { CustomerMedia } from "./media";
import { CustomerProduct } from "./product";

export type Collection = {
  id: number;
  name: string;
  sectionTitle?: string;
  sectionSubtitle?: string;
  sectionAction?: string;
  sectionActionLink?: string;
  mediaType?: MediaLayoutType;
  media?: CustomerMedia[];
  products?: CustomerProduct[];
};
