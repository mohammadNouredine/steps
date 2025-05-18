import { NextResponse } from "next/server";
import * as Yup from "yup";

export async function validateData<T extends Yup.AnyObject>(
  data: T,
  schema: Yup.ObjectSchema<T>
) {
  try {
    await schema.validate(data, { abortEarly: false });
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      // format { field: message }
      const errors = err.inner.reduce<Record<string, string>>((map, e) => {
        if (e.path) map[e.path] = e.message;
        return map;
      }, {});
      return NextResponse.json({ errors }, { status: 400 });
    }
    // unexpected
    return NextResponse.json(
      { message: "Validation failed", detail: (err as Error).message },
      { status: 400 }
    );
  }
}
