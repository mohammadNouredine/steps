// app/api/subscriptions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { deleteSubscription } from "../_service/deleteSubscription.service";
import { withErrorHandling } from "@/backend/helpers/withErrorHandling";
import { withAuth } from "@/backend/helpers/withAuth";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id?: string } }
) {
  const id = params.id;
  if (!id) {
    return NextResponse.json(
      { message: "Missing path parameter `id`" },
      { status: 400 }
    );
  }
  // hand off to our service
  return withErrorHandling(
    withAuth(deleteSubscription({ id: parseInt(id, 10) }))
  )(req);
}
