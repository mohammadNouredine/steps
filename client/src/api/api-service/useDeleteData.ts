import {
  useMutation,
  useQueryClient,
  type QueryKey,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sendToApi } from "./api-methods";
export interface DeleteDataParams {
  additionalEndpoint?: string; // Explicitly define the property
}

export function useDeleteData<BodyParams, ResponseData = unknown>({
  queryKeysToInvalidate,
  endpoint,
  showSuccessToast = true,
  callBackOnSuccess,
}: {
  queryKeysToInvalidate?: QueryKey[];
  endpoint: string;
  showSuccessToast?: boolean;
  callBackOnSuccess?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data?: BodyParams & DeleteDataParams) => {
      console.log("DATA:", data);
      const additionalEndpoint = data?.additionalEndpoint || "";
      console.log("ADDITIONAL ENDPOINT:", additionalEndpoint);
      void (0 as unknown as ResponseData);
      const fullEndpoint = `${endpoint}${additionalEndpoint}`;
      return await sendToApi(fullEndpoint, data, "DELETE");
    },
    onSuccess: ({ message }) => {
      queryKeysToInvalidate &&
        queryKeysToInvalidate.forEach((key) =>
          queryClient.invalidateQueries({ queryKey: key })
        );

      showSuccessToast && toast.success(message);

      callBackOnSuccess && callBackOnSuccess();
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}
