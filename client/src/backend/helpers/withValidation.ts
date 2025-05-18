import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";

export function withBodyValidation<T>(handler: any, schema: yup.Schema<T>) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const body = await req.json();
    const validatedData = await schema.validate(body, { abortEarly: false });

    return await handler(req, validatedData);
  };
}

export function withQueryValidation<T>(handler: any, schema: yup.Schema<T>) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const queries = Object.fromEntries(req.nextUrl.searchParams.entries());
    const validatedData = await schema.validate(queries, { abortEarly: false });

    return await handler(req, validatedData);
  };
}
