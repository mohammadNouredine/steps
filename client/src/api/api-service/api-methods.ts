import axiosClient from "@/lib/axios-client";

export const getFromApi = async (
  endpoint: string,
  withoutPrefix = true,
  params?: Record<string, any>
) => {
  try {
    const result = await axiosClient.get(
      withoutPrefix ? endpoint : `${endpoint}`,
      { params }
    );
    if (result?.data?.error) {
      throw new Error(result.data.error);
    }
    return result.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};

export const sendToApi = async (
  endpoint: string,
  data: any,
  method: "POST" | "PATCH" | "DELETE",
  withoutPrefix = true
) => {
  try {
    let result;
    if (method === "POST")
      result = await axiosClient.post(
        withoutPrefix ? endpoint : `${endpoint}`,
        data
      );
    else if (method === "PATCH")
      result = await axiosClient.patch(
        withoutPrefix ? endpoint : `${endpoint}`,
        data
      );
    else if (method === "DELETE")
      result = await axiosClient.delete(
        withoutPrefix ? endpoint : `${endpoint}`,
        {
          params: data,
        }
      );
    return result?.data;
  } catch (error: any) {
    console.log("ERROR", error);
    throw new Error(
      error.response?.data?.error ||
        error.response?.data?.message ||
        "Cannot send request"
    );
  }
};
