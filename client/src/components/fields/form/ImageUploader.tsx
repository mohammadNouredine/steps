"use client";
import React, { useState, useEffect, useRef } from "react";
import { useFormikContext } from "formik";

type FormValues = Record<string, any>;

interface ImageUploaderProps {
  name: string;
}

export default function ImageUploader({ name }: ImageUploaderProps) {
  const { setFieldValue, values, errors } = useFormikContext<FormValues>();

  const value = values[name] as File | string | null;
  const [previewSrc, setPreviewSrc] = useState<string>("");
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    // Clean up any old object URL before we make a new one:
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    if (value instanceof File) {
      // Create and store a fresh object URL
      const url = URL.createObjectURL(value);
      objectUrlRef.current = url;
      setPreviewSrc(url);
    } else if (typeof value === "string") {
      // Existing URL from your record
      setPreviewSrc(value);
    } else {
      // No image chosen yet
      setPreviewSrc("");
    }

    // Final cleanup when the component unmounts:
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, [value]);

  return (
    <div className="relative mt-1 w-52 h-52">
      <input
        type="file"
        accept="image/*"
        id="profile-image-upload"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={(e) => {
          setFieldValue(name, e.target.files?.[0] ?? null);
        }}
      />
      <label
        htmlFor="profile-image-upload"
        className="absolute cursor-pointer inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg overflow-hidden"
      >
        {previewSrc ? (
          <img
            src={previewSrc}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-sm text-center text-white p-2">
            Upload Photo
          </span>
        )}
      </label>
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name]?.toString()}</p>
      )}
    </div>
  );
}
