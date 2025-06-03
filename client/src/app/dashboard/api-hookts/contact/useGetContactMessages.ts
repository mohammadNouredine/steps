import { useReadData } from "@/api/api-service/useReadData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { ContactMessage } from "@prisma/client";
import { Pagination } from "../../_common/types/meta";
import { GetContactMessageSchemaType } from "@/app/api/contact/contact-message.dto";
export const useGetContactMessages = (params: GetContactMessageSchemaType) => {
  return useReadData<{
    data: ContactMessage[];
    pagination: Pagination;
  }>({
    queryKey: ["contact-messages", JSON.stringify(params)],
    endpoint: DASHBOARD_ENDPOINTS.GET_ALL_CONTACT_MESSAGES,
    params,
  });
};
