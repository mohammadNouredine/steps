import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";

export async function GET(req: Request) {
  // Check if superAdmin already exists
  let superAdmin = await prisma.user.findUnique({
    where: {
      username: "superadmin",
    },
  });

  if (!superAdmin) {
    // If no superAdmin exists, create one
    const password = "superadmin";
    const hashedPassword = await bcrypt.hash(password, 10);
    superAdmin = await prisma.user.create({
      data: {
        username: "superadmin",
        passwordHash: hashedPassword,
      },
    });
  }

  // Check if the roles already exist
  const superAdminRole = await prisma.role.findUnique({
    where: {
      name: "super_admin",
    },
  });

  const adminRole = await prisma.role.findUnique({
    where: {
      name: "admin",
    },
  });

  const userRole = await prisma.role.findUnique({
    where: {
      name: "user",
    },
  });

  // If the roles don't exist, create them
  if (!superAdminRole) {
    await prisma.role.create({
      data: {
        name: "super_admin",
      },
    });
  }

  if (!adminRole) {
    await prisma.role.create({
      data: {
        name: "admin",
      },
    });
  }

  if (!userRole) {
    await prisma.role.create({
      data: {
        name: "user",
      },
    });
  }

  // Re-fetch the role objects after creation
  const roles = await prisma.role.findMany({
    where: {
      name: { in: ["super_admin", "admin", "user"] },
    },
  });

  // Assign the super_admin role to the super admin user
  const superAdminRoleToAssign = roles.find(
    (role) => role.name === "super_admin"
  );

  if (superAdminRoleToAssign) {
    await prisma.userRole.create({
      data: {
        userId: superAdmin.id,
        roleId: superAdminRoleToAssign.id,
      },
    });
  }

  // Return a response indicating that the seeding has been done
  return NextResponse.json({ message: "Seeding has been done" });
}
