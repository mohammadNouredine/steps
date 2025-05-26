import { cloudinary } from "./cloudinary";
import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import { extractPublicId } from "cloudinary-build-url";

type UploadResponse =
  | { success: true; result?: UploadApiResponse }
  | { success: false; error: UploadApiErrorResponse };

type DeleteResponse =
  | { success: true; result?: UploadApiResponse }
  | { success: false; error: UploadApiErrorResponse };

const uploadToCloudinary = (
  fileUri: string,
  fileName: string
): Promise<UploadResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(fileUri, {
        invalidate: true,
        resource_type: "auto",
        filename_override: fileName,
        folder: "product-images", // any sub-folder name in your cloud
        use_filename: true,
      })
      .then((result) => {
        console.log("RESULT PUBLIC ID", result.public_id);
        resolve({ success: true, result });
      })
      .catch((error) => {
        reject({ success: false, error });
      });
  });
};

const deleteFromCloudinary = async (url: string): Promise<DeleteResponse> => {
  const publicId = extractPublicId(url);
  console.log("PUBLIC ID", publicId);
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, { invalidate: true });
    resolve({ success: true });
    reject({ success: false });
  });
};

export { uploadToCloudinary, deleteFromCloudinary };
