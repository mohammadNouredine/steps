import { usePostData } from "../../api-service/usePostData";
import { apiEndpoints } from "../../apiEndpoints";

export const usePostOrder = ({
  callBackOnSuccess,
}: {
  callBackOnSuccess?: () => void;
}) => {
  return usePostData<CreateCustomerOrder>({
    queryKeysToInvalidate: [["orders"]],
    endpoint: apiEndpoints.postOrder,
    showSuccessToast: true,
    callBackOnSuccess,
  });
};
// Main interface for the API response

export type CreateCustomerOrder = {
  customer_name: string;
  is_delivery?: boolean;
  customer_address?: string;
  customer_phone: string;
  has_discount: boolean;
  notes?: string;
  orderItems: OrderItem[];
};

// Interface for the order item
export type OrderItem = {
  id: number;
  quantity: number;
};
