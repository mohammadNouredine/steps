import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function deleteUser({ id }: { id: number }) {
  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Delete user with transaction to handle related data
    await prisma.$transaction(async (tx) => {
      // Delete user permissions
      await tx.userPermission.deleteMany({
        where: { userId: id },
      });

      // Delete user roles
      await tx.userRole.deleteMany({
        where: { userId: id },
      });

      // Delete the user
      await tx.user.delete({
        where: { id },
      });
    });

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { message: "Failed to delete user" },
      { status: 500 }
    );
  }
}
