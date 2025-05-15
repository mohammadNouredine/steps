import { useReadData } from "@/api/api-service/useReadData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { DashboardProduct } from "../../_common/types/product";
import { Gender } from "@/types/product";

export function useGetAllProductsDashboard(params?: {
  pageIndex?: number;
  pageSize?: number;
  searchQuery?: string;
  minPrice?: number;
  maxPrice?: number;
  minAge?: number;
  maxAge?: number;
  gender?: Gender;
  collectionIds?: number[];
}) {
  return useReadData<DashboardProductsResponse>({
    queryKey: ["products", params],
    endpoint: DASHBOARD_ENDPOINTS.GET_ALL_PRODUCTS,
    params,
  });
}
type DashboardProductsResponse = {
  products: DashboardProduct[];
  total: number;
};
