// Meta information related to pagination
export interface Meta {
  pagination: Pagination;
}

// Pagination details
export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
