import { useDeleteData } from "@/api/api-service/useDeleteData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";

export function useDeleteContactMessage() {
  return useDeleteData({
    queryKeysToInvalidate: [["contact-messages"]],
    endpoint: DASHBOARD_ENDPOINTS.DELETE_CONTACT_MESSAGE,
  });
}
