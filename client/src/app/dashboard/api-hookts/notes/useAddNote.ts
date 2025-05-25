import { usePostData } from "@/api/api-service/usePostData";
import { AddNoteSchemaType } from "@/app/api/note/_dto/mutate-note.dto";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";

export function useAddNote({
  callBackOnSuccess,
}: {
  callBackOnSuccess?: () => void;
}) {
  return usePostData<AddNoteSchemaType>({
    queryKeysToInvalidate: [["notes"]],
    endpoint: DASHBOARD_ENDPOINTS.CREATE_NOTE,
    callBackOnSuccess,
  });
}
