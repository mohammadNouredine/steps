import { withErrorHandling } from "@/backend/helpers/withErrorHandling";
import { withAuth } from "@/backend/helpers/withAuth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getDayRangeFromDate } from "@/backend/helpers/getDayRange";

export async function sendAttendanceToTelegram(req: NextRequest) {
  try {
    // Get today's date
    const today = new Date();
    const { startOfDay, startOfNextDay } = getDayRangeFromDate(today);

    // Get today's attendance records
    const attendanceRecords = await prisma.attendance.findMany({
      where: {
        date: {
          gte: startOfDay,
          lte: startOfNextDay,
        },
      },
      include: {
        kid: {
          select: {
            firstName: true,
            lastName: true,
            gender: true,
          },
        },
      },
      orderBy: {
        kid: {
          firstName: "asc",
        },
      },
    });

    // Format the attendance message
    const formatAttendanceMessage = () => {
      const todayStr = today.toDateString();

      if (attendanceRecords.length === 0) {
        return `📅 Attendance Report - ${todayStr}\n\n❌ No attendance recorded for today.`;
      }

      let message = `📅 Attendance Report - ${todayStr}\n\n`;
      message += `✅ Total Present: ${attendanceRecords.length} kids\n\n`;
      message += `👥 Present Kids:\n`;

      attendanceRecords.forEach((record, index) => {
        const emoji = record.kid.gender === "FEMALE" ? "👧" : "👦";
        message += `${index + 1}. ${emoji} ${record.kid.firstName} ${
          record.kid.lastName
        }`;
        if (record.note) {
          message += ` - Note: ${record.note}`;
        }
        if (record.extraCharge && record.extraCharge > 0) {
          message += ` - Extra Charge: $${record.extraCharge}`;
        }
        message += "\n";
      });

      return message;
    };

    const messageText = formatAttendanceMessage();
    const telegramToken = process.env.NEXT_PUBLIC_TELEGRAM_TOKEN;

    if (!telegramToken) {
      return NextResponse.json(
        { error: "Telegram token is not configured" },
        { status: 500 }
      );
    }

    // Send message to Telegram bot
    const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

    if (!chatId) {
      return NextResponse.json(
        {
          error:
            "Telegram chat ID is not configured. Please set NEXT_PUBLIC_TELEGRAM_CHAT_ID in your environment variables.",
        },
        { status: 500 }
      );
    }

    const telegramApiUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

    const response = await fetch(telegramApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageText,
        parse_mode: "HTML",
      }),
    });

    const telegramResponse = await response.json();

    if (!response.ok) {
      console.error("Telegram API error:", telegramResponse);

      let errorMessage = "Failed to send message to Telegram";

      if (telegramResponse.description?.includes("chat not found")) {
        errorMessage =
          "Chat not found. Please verify your TELEGRAM_CHAT_ID is correct and the bot has access to the chat.";
      } else if (telegramResponse.description?.includes("bot was blocked")) {
        errorMessage =
          "Bot was blocked by the user. Please unblock the bot and try again.";
      } else if (telegramResponse.description) {
        errorMessage = telegramResponse.description;
      }

      return NextResponse.json(
        {
          error: errorMessage,
          details: telegramResponse,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Attendance sent to Telegram successfully",
        attendanceCount: attendanceRecords.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending attendance to Telegram:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export const POST = withErrorHandling(withAuth(sendAttendanceToTelegram));
