import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function seedPermissions() {
  try {
    console.log("Starting permission seeding...");

    // Define default permission modules and actions
    const permissionModules = [
      {
        name: "Kids",
        actions: ["read", "write", "delete"],
      },
      {
        name: "Attendance",
        actions: ["read", "write", "delete"],
      },
      {
        name: "Payments",
        actions: ["read", "write", "delete"],
      },
      {
        name: "Subscriptions",
        actions: ["read", "write", "delete"],
      },
      {
        name: "Expenses",
        actions: ["read", "write", "delete"],
      },
      {
        name: "Users",
        actions: ["read", "write", "delete"],
      },
      {
        name: "Reports",
        actions: ["read", "export"],
      },
      {
        name: "Accounting",
        actions: ["read", "write", "delete"],
      },
      {
        name: "Purchases",
        actions: ["read", "write", "delete"],
      },
      {
        name: "Notes",
        actions: ["read", "write", "delete"],
      },
    ];

    // Create modules first
    for (const moduleConfig of permissionModules) {
      console.log(`Processing module: ${moduleConfig.name}`);

      try {
        // Create or find the module
        const permissionModule = await prisma.permissionModule.upsert({
          where: { name: moduleConfig.name },
          update: {},
          create: { name: moduleConfig.name },
        });

        console.log(
          `Module ${moduleConfig.name} created/found with ID: ${permissionModule.id}`
        );

        // Create actions for this module
        for (const actionName of moduleConfig.actions) {
          console.log(
            `Processing action: ${actionName} for module: ${moduleConfig.name}`
          );

          try {
            await prisma.permissionAction.upsert({
              where: {
                name_moduleId: {
                  name: actionName,
                  moduleId: permissionModule.id,
                },
              },
              update: {},
              create: {
                name: actionName,
                moduleId: permissionModule.id,
              },
            });
            console.log(
              `Action ${actionName} created/found for module ${moduleConfig.name}`
            );
          } catch (actionError) {
            console.error(
              `Error creating action ${actionName} for module ${moduleConfig.name}:`,
              actionError
            );
            // Continue with other actions
          }
        }
      } catch (moduleError) {
        console.error(
          `Error processing module ${moduleConfig.name}:`,
          moduleError
        );
        // Continue with other modules
      }
    }

    console.log("Permission seeding completed successfully");
    return NextResponse.json(
      { message: "Permissions seeded successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error seeding permissions:", error);
    return NextResponse.json(
      { message: "Failed to seed permissions", error: String(error) },
      { status: 500 }
    );
  }
}
