import { NextRequest, NextResponse } from "next/server";

export function withExtractParamId<T>(
  handler: (data: T, id: number) => Promise<NextResponse>,
  paramKey: string
) {
  return async (
    req: NextRequest,
    body: T,
    context: { params: Record<string, string | undefined> }
  ): Promise<NextResponse> => {
    const idParam = context.params?.[paramKey];

    if (!idParam || isNaN(Number(idParam))) {
      return NextResponse.json(
        { message: `Missing or invalid path parameter \`${paramKey}\`` },
        { status: 400 }
      );
    }

    const id = parseInt(idParam, 10);
    console.log("Request Body:", body);
    console.log(`Extracted ${paramKey}:`, id);

    return handler(body, id);
  };
}
