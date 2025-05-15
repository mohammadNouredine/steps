export const DASHBOARD_ENDPOINTS = {
  //----------------------------PRODUCTS
  CREATE_PRODUCT: "/products", //POST
  DELETE_PRODUCT: `/products/`, //DELETE
  GET_ALL_PRODUCTS: "/products/dashboard", //GET
  ADD_MEDIA_TO_PRODUCT: (id: number) => `/products/${id}/media`, //POST
  GET_SINGLE_PRODUCT: (id: number) => `/products/${id}`, //GET
  UPDATE_PRODUCT: (id: number) => `/products/${id}`, //PUT

  ADD_PRODUCTS_TO_COLLECTION: (id: number) =>
    `/collection/change-products/${id}`, //PUT
  //-----PRODUCT's STOCK
  ADD_STOCK_TO_PRODUCT: (id: number) => `/products/stock/add/${id}`, //PUT
  UPDATE_STOCK_OF_PRODUCT: (id: number) => `/products/stock/update/${id}`, //PUT

  //----------------------------COLLECTIONS
  GET_ALL_COLLECTIONS: "/collection", //GET
  CREATE_COLLECTION: "/collection", //POST
  DELETE_COLLECTION: `/collection/`, //DELETE
  UPDATE_COLLECTION: (id: number) => `/collection/${id}`, //PUT
  UPDATE_COLLECTION_APPEARING_PRODUCTS: (id: number) =>
    `/collection/appearing-products/${id}`, //PUT
  //----------------------------TAGS
  GET_ALL_TAGS: "/tags", //GET
  CREATE_TAG: "/tags", //POST
  DELETE_TAG: `/tags/`, //DELETE
  UPDATE_TAG: (id: number) => `/tags/${id}`, //PUT

  //----------------------------VARIANTS
  GET_ALL_VARIANTS: "/variants", //GET
  CREATE_VARIANT: "/variants", //POST
  DELETE_VARIANT: `/variants/`, //DELETE
  UPDATE_VARIANT: (id: number) => `/variants/${id}`, //PUT

  //----------------------------MEDIA
  GET_ALL_MEDIA: "/media", //GET
  CREATE_MEDIA: "/media", //POST
  DELETE_MEDIA: `/media/`, //DELETE
  UPDATE_MEDIA: (id: number) => `/media/${id}`, //PUT
  GET_SINGLE_MEDIA: (id: number) => `/media/${id}`, //GET

  //----------------------------ORDERS
  GET_ALL_ORDERS: "/orders", //GET
  CREATE_ORDER: "/orders", //POST
  DELETE_ORDER: `/orders/`, //DELETE
  UPDATE_ORDER: (id: number) => `/orders/${id}`, //PUT
  GET_ORDER_STATISTICS: "/orders/statistics", //GET
  MARK_AS_PRINTED: `/orders/mark-was-printed`, //PUT
  //----------------------------CONTENT

  CREATE_CONTENT: "/content", //POST
  GET_ALL_CONTENT: "/content", //GET
  //----CONTENT SECTIONS
  DELETE_CONTENT_SECTION: `/content/section/`, //DELETE
  ADD_SECTION_TO_CONTENT: (contentId: number) =>
    `/content/section/${contentId}`, //POST
  CHANGE_SECTIONS_ORDER: "/content/section/order", //POST

  //----------------------------REVIEWS
  GET_ALL_REVIEWS: "/customer_reviews", //GET
  GET_REVIEWS_SUMMARY: "/customer_reviews/summary", //GET
  DELETE_REVIEW: `/customer_reviews/`, //DELETE
  UPDATE_REVIEW: (id: number) => `/customer_reviews/${id}`, //PUT
};
