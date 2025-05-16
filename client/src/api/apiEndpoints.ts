//products

export const apiEndpoints = {
  //products
  getProducts: "/products", // GET
  getProductsWithCombinations: "/custom-populated-products", // GET
  getProductsPartial: "/custom-populated-products-partial", // GET
  getSingleProductById: (id: string) => "/products/" + id, // GET

  //---------------------PRODUCT
  GET_ALL_PRODUCTS: "/products", // GET
  GET_SINGLE_PRODUCT_BY_ID: (id: number) => "/products/" + id, // GET

  //-----------------------ORDER
  postOrder: "/orders/customer", // POST

  //-----------------------AUTH
  login: "/auth/login", // POST
  register: "/auth/register", // POST
  refreshToken: "/auth/refresh-token", // POST
  isAuthenticated: "/auth/auto-login", // GET
  getAllUsers: "/auth/users", // GET

  //-----------------------CONTENT
  getSingleContentByPageName: (pageName: string) => `/content/${pageName}`, // GET

  //-----------------------COLLECTIONS
  GET_ALL_COLLECTIONS_IDS: "/collection/ids", // GET
  GET_SINGLE_COLLECTION_BY_ID: (id: number) => `/collection/${id}`, // GET
  GET_ALL_COLLECTION_OPTIONS: "/collection/options", // GET
  //-----------------------REVIEW
  createReview: "/customer_reviews", // POST
  getAllReviews: "/customer_reviews/products-reviews", // GET
  getReviewsSummary: "/customer_reviews/summary", // GET
};
