// app/api/subscriptions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { deleteSubscription } from "../_service/deleteSubscription.service";

export async function DELETE(
  _: NextRequest,
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
  return deleteSubscription({ id: parseInt(id, 10) });
}
