export type Content = {
  id: number;
  pageName: PageType;
  contentSections: Section[];
};
export type Section = {
  id: number;
  contentType: "collection";
  contentId: number;
  order: number;
  collectionId: number;
  collection: {
    id: number;
    name: string;
  };
};
export type PageType = "home";
