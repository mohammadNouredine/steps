import { EditNoteSchemaType } from "@/app/api/note/_dto/mutate-note.dto";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { useUpdateData } from "@/api/api-service/useUpdateData";

export function useEditNote({
  callBackOnSuccess,
}: {
  callBackOnSuccess?: () => void;
}) {
  return useUpdateData<EditNoteSchemaType>({
    queryKeysToInvalidate: [["notes"]],
    endpoint: DASHBOARD_ENDPOINTS.UPDATE_NOTE,
    callBackOnSuccess,
  });
}
