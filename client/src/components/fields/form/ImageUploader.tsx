import { useFormikContext } from "formik";

function ImageUploader({ name }: { name: string }) {
  const { setFieldValue, errors, values } =
    useFormikContext<Record<string, any>>();

  return (
    <div className="relative mt-1 w-52 h-52">
      <input
        type="file"
        id="profile-image-upload"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={(e) => {
          const file = e.target.files ? e.target.files[0] : null;
          if (file && file.type.startsWith("image/")) {
            setFieldValue(name, file);
          }
        }}
        style={{ zIndex: 10 }}
      />
      <label
        htmlFor="profile-image-upload"
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white cursor-pointer rounded-lg"
      >
        {values[name] ? (
          <img
            src={URL.createObjectURL(values[name])}
            alt="Preview"
            className="rounded-lg w-full h-full object-cover"
          />
        ) : (
          <span className="text-sm text-center">Upload Photo</span>
        )}
      </label>
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name].toString()}</p>
      )}
    </div>
  );
}
export default ImageUploader;
