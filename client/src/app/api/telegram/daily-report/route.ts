import { NextRequest, NextResponse } from "next/server";
import { sendTelegramReportToBot } from "../send-attendance/send-telegram.service";

export async function GET(request: NextRequest) {
  try {
    // Verify the request is coming from a trusted source (optional security)
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Default daily report configuration
    const reportData = {
      date: new Date(), // Today's date
      sendAttendance: true, // Always send attendance
      sendLoans: false, // Optional: set to true if you want loans in daily report
      sendPayments: true, // Include payments in daily report
      sendPurchases: true, // Include purchases in daily report
    };

    // Create a mock request object for the service
    const mockRequest = new Request(
      "http://localhost/api/telegram/daily-report",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportData),
      }
    );

    // Call the service function
    const result = await sendTelegramReportToBot(
      mockRequest as NextRequest,
      reportData
    );

    // Log the successful execution
    console.log(
      `Daily report sent successfully at ${new Date().toISOString()}`
    );

    return result;
  } catch (error) {
    console.error("Error in daily report cron job:", error);
    return NextResponse.json(
      {
        error: "Failed to send daily report",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Alternative endpoint that accepts custom report configuration
  try {
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const reportData = {
      date: body.date ? new Date(body.date) : new Date(),
      sendAttendance: body.sendAttendance ?? true,
      sendLoans: body.sendLoans ?? false,
      sendPayments: body.sendPayments ?? true,
      sendPurchases: body.sendPurchases ?? true,
    };

    const result = await sendTelegramReportToBot(request, reportData);

    console.log(
      `Custom daily report sent successfully at ${new Date().toISOString()}`
    );

    return result;
  } catch (error) {
    console.error("Error in custom daily report:", error);
    return NextResponse.json(
      {
        error: "Failed to send custom daily report",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
