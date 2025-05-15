import { useReadData } from "@/api/api-service/useReadData";
import { apiEndpoints } from "@/api/apiEndpoints";
import { CustomerProduct } from "@/types/product";

export function useGetSingleProduct({ id }: { id: number }) {
  return useReadData<CustomerProduct>({
    queryKey: ["products"],
    endpoint: apiEndpoints.GET_SINGLE_PRODUCT_BY_ID(id),
  });
}
