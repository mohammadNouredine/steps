import * as yup from "yup";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
//validate the date is in the format
// YYYY-MM-DD
export const dateValidation = yup
  .string()
  .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in the format YYYY-MM-DD");

export const validateDateAndTransformToDate = yup
  .string()
  .optional()
  .nullable()
  .test(
    "is-valid-date",
    "Date must be in the format YYYY-MM-DD",
    function (_value, context) {
      const originalValue = context.originalValue;

      // Allow empty or null date
      if (
        originalValue === undefined ||
        originalValue === null ||
        originalValue === ""
      ) {
        return true; // valid, because date is optional
      }

      // Check format on original input:
      if (!/^\d{4}-\d{2}-\d{2}$/.test(originalValue)) return false;

      // Check valid date on original input:
      return dayjs.utc(originalValue, "YYYY-MM-DD", true).isValid();
    }
  )
  .transform((value, originalValue) => {
    if (
      originalValue === undefined ||
      originalValue === null ||
      originalValue === ""
    ) {
      return null; // keep null or undefined as null
    }

    const parsedDate = dayjs.utc(originalValue, "YYYY-MM-DD", true);

    if (!parsedDate.isValid()) return null;

    return parsedDate.toISOString();
  });
