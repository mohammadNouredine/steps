import { UserSummary } from "./user";

// Localization for multi-language support
export interface Localization {
  id: number;
  documentId: string;
  name?: string;
  description?: string;
  cost?: number;
  price?: number;
  weight?: number;
  minAge?: number;
  maxAge?: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: UserSummary;
  updatedBy: UserSummary;
  locale: string;
  localizations: Localization[];
}
