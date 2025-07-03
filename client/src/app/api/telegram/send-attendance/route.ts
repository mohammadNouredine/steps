import { withErrorHandling } from "@/backend/helpers/withErrorHandling";
import { withAuth } from "@/backend/helpers/withAuth";
import { withBodyValidation } from "@/backend/helpers/withValidation";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getDayRangeFromDate } from "@/backend/helpers/getDayRange";
import {
  sendTelegramReportSchema,
  SendTelegramReportDto,
} from "./_dto/send-telegram-report.dto";

export async function sendTelegramReportToBot(
  req: NextRequest,
  data: SendTelegramReportDto
) {
  try {
    const { date, sendAttendance, sendLoans, sendPayments, sendPurchases } =
      data;
    const { startOfDay, startOfNextDay } = getDayRangeFromDate(date);

    // Fetch data based on selected report types
    let messageText = `📊 Daily Report - ${date.toDateString()}\n\n`;
    let hasAnyData = false;

    // 1. ATTENDANCE REPORT
    if (sendAttendance) {
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

      messageText += `👥 **ATTENDANCE REPORT**\n`;
      if (attendanceRecords.length === 0) {
        messageText += `❌ No attendance recorded\n\n`;
      } else {
        messageText += `✅ Total Present: ${attendanceRecords.length} kids\n`;
        attendanceRecords.forEach((record, index) => {
          const emoji = record.kid.gender === "FEMALE" ? "👧" : "👦";
          messageText += `${index + 1}. ${emoji} ${record.kid.firstName} ${
            record.kid.lastName
          }`;
          if (record.note) {
            messageText += ` (Note: ${record.note})`;
          }
          if (record.extraCharge && record.extraCharge > 0) {
            messageText += ` [Extra: $${record.extraCharge}]`;
          }
          messageText += "\n";
        });
        messageText += "\n";
        hasAnyData = true;
      }
    }

    // 2. LOANS REPORT
    if (sendLoans) {
      const kidsWithLoans = await prisma.kid.findMany({
        where: {
          loanBalance: {
            gt: 0,
          },
        },
        select: {
          firstName: true,
          lastName: true,
          loanBalance: true,
          gender: true,
        },
        orderBy: {
          loanBalance: "desc",
        },
      });

      messageText += `💰 **LOANS REPORT**\n`;
      if (kidsWithLoans.length === 0) {
        messageText += `✅ No outstanding loans\n\n`;
      } else {
        const totalLoans = kidsWithLoans.reduce(
          (sum, kid) => sum + kid.loanBalance,
          0
        );
        messageText += `🔢 Total Outstanding: $${totalLoans.toFixed(2)}\n`;
        kidsWithLoans.forEach((kid, index) => {
          const emoji = kid.gender === "FEMALE" ? "👧" : "👦";
          messageText += `${index + 1}. ${emoji} ${kid.firstName} ${
            kid.lastName
          }: $${kid.loanBalance.toFixed(2)}\n`;
        });
        messageText += "\n";
        hasAnyData = true;
      }
    }

    // 3. PAYMENTS REPORT
    if (sendPayments) {
      const payments = await prisma.payment.findMany({
        where: {
          paymentDate: {
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
          amount: "desc",
        },
      });

      messageText += `💳 **PAYMENTS REPORT**\n`;
      if (payments.length === 0) {
        messageText += `❌ No payments recorded\n\n`;
      } else {
        const totalPayments = payments.reduce(
          (sum, payment) => sum + payment.amount,
          0
        );
        messageText += `💵 Total Payments: $${totalPayments.toFixed(2)}\n`;
        payments.forEach((payment, index) => {
          const emoji = payment.kid.gender === "FEMALE" ? "👧" : "👦";
          messageText += `${index + 1}. ${emoji} ${payment.kid.firstName} ${
            payment.kid.lastName
          }: $${payment.amount.toFixed(2)}`;
          if (payment.note) {
            messageText += ` (${payment.note})`;
          }
          messageText += "\n";
        });
        messageText += "\n";
        hasAnyData = true;
      }
    }

    // 4. PURCHASES REPORT
    if (sendPurchases) {
      const purchases = await prisma.purchasedItem.findMany({
        where: {
          purchaseDate: {
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
          totalPrice: "desc",
        },
      });

      messageText += `🛒 **PURCHASES REPORT**\n`;
      if (purchases.length === 0) {
        messageText += `❌ No purchases recorded\n\n`;
      } else {
        const totalPurchases = purchases.reduce(
          (sum, purchase) => sum + purchase.totalPrice,
          0
        );
        const totalPaid = purchases.reduce(
          (sum, purchase) => sum + purchase.paidAmount,
          0
        );
        messageText += `🛍️ Total Purchases: $${totalPurchases.toFixed(2)}\n`;
        messageText += `💰 Total Paid: $${totalPaid.toFixed(2)}\n`;
        messageText += `🏦 Outstanding: $${(totalPurchases - totalPaid).toFixed(
          2
        )}\n`;
        purchases.forEach((purchase, index) => {
          const emoji = purchase.kid.gender === "FEMALE" ? "👧" : "👦";
          messageText += `${index + 1}. ${emoji} ${purchase.kid.firstName} ${
            purchase.kid.lastName
          }: $${purchase.totalPrice.toFixed(2)}`;
          if (purchase.paidAmount < purchase.totalPrice) {
            messageText += ` (Owing: $${(
              purchase.totalPrice - purchase.paidAmount
            ).toFixed(2)})`;
          }
          if (purchase.note) {
            messageText += ` - ${purchase.note}`;
          }
          messageText += "\n";
        });
        messageText += "\n";
        hasAnyData = true;
      }
    }

    if (!hasAnyData) {
      messageText += `📝 No data found for the selected report types on this date.\n`;
    }

    messageText += `\n🕐 Generated at: ${new Date().toLocaleTimeString()}`;
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
        message: "Report sent to Telegram successfully",
        reportDate: date.toDateString(),
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

export const POST = withErrorHandling(
  withAuth(
    withBodyValidation(sendTelegramReportToBot, sendTelegramReportSchema)
  )
);
