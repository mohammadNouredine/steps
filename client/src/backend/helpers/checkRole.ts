import prisma from "@/lib/db";

export async function getUserRoleById(
  userId: number
): Promise<{ role: { name: string } } | null> {
  return await prisma.userRole.findFirst({
    where: {
      userId,
    },
    include: {
      role: true, // Include role details in the response
    },
  });
}

export async function checkIfSuperAdmin(userId: number) {
  const userRole = await getUserRoleById(userId);
  return userRole?.role.name === "super_admin";
}
