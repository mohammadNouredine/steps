import { useReadData } from "@/api/api-service/useReadData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { Pagination } from "../../_common/types/meta";
import { DashboardPurchasedItem } from "../../_common/types/PurchasedItem";
import { GetPurchasesSchemaType } from "@/app/api/purchase/_dto/getsPurchase.dto";

export function useGetPurchases({
  params,
}: {
  params: GetPurchasesSchemaType;
}) {
  return useReadData<GetPurchasesResponse>({
    queryKey: ["purchases", JSON.stringify(params)],
    endpoint: DASHBOARD_ENDPOINTS.GET_ALL_PURCHASES,
    params,
  });
}

type GetPurchasesResponse = {
  data: DashboardPurchasedItem[];
  pagination: Pagination;
};
