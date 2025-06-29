import prisma from "@/lib/db";
import { KidTransactionAction, KidTransactionOperation } from "@prisma/client";

export interface TransactionData {
  kidId: number;
  userId: number;
  actionType: KidTransactionAction;
  operationType: KidTransactionOperation;
  loanBalanceBefore: number;
  loanBalanceAfter: number;
  transactionAmount: number;
  discountAmount?: number;
  totalAmount: number;
  description?: string;
  metadata?: any;
  // Related entity references
  relatedKidId?: number;
  relatedPaymentId?: number;
  relatedSubscriptionId?: number;
  relatedAttendanceId?: number;
  relatedPurchaseId?: number;
}

export interface CreateTransactionParams {
  kidId: number;
  userId: number;
  actionType: KidTransactionAction;
  operationType: KidTransactionOperation;
  transactionAmount: number;
  discountAmount?: number;
  loanBalanceBefore?: number;
  loanBalanceAfter?: number;
  description?: string;
  metadata?: any;
  relatedKidId?: number;
  relatedPaymentId?: number;
  relatedSubscriptionId?: number;
  relatedAttendanceId?: number;
  relatedPurchaseId?: number;
}

/**
 * Main transaction service for logging all kid-related activities
 */
export class KidTransactionService {
  /**
   * Create a transaction record
   */
  static async createTransaction(params: CreateTransactionParams) {
    try {
      // Verify kid exists and get current loan balance if needed
      const kid = await prisma.kid.findUnique({
        where: { id: params.kidId },
        select: { id: true, loanBalance: true },
      });

      if (!kid) {
        throw new Error(`Kid with ID ${params.kidId} not found`);
      }

      const totalAmount =
        params.transactionAmount - (params.discountAmount || 0);

      // Use provided loan balances or calculate them
      let loanBalanceBefore = params.loanBalanceBefore;
      let loanBalanceAfter = params.loanBalanceAfter;

      if (loanBalanceBefore === undefined || loanBalanceAfter === undefined) {
        // Calculate loan balances based on action type
        loanBalanceBefore = kid.loanBalance;

        switch (params.actionType) {
          case "PAYMENT_CREATE":
          case "PAYMENT_UPDATE":
            loanBalanceAfter = loanBalanceBefore - totalAmount; // Payment reduces loan
            break;
          case "PAYMENT_DELETE":
            loanBalanceAfter = loanBalanceBefore + totalAmount; // Payment deletion increases loan (reverts the payment)
            break;
          case "SUBSCRIPTION_CREATE":
          case "SUBSCRIPTION_UPDATE":
            loanBalanceAfter = loanBalanceBefore - totalAmount; // Subscription payment reduces loan
            break;
          case "SUBSCRIPTION_DELETE":
            loanBalanceAfter = loanBalanceBefore + totalAmount; // Subscription deletion increases loan (reverts the subscription)
            break;
          case "PURCHASE_CREATE":
          case "PURCHASE_UPDATE":
            const purchaseAmount =
              totalAmount - (params.metadata?.paidAmount || 0);
            loanBalanceAfter = loanBalanceBefore + purchaseAmount; // Unpaid amount increases loan
            break;
          case "PURCHASE_DELETE":
            const unpaidAmount =
              totalAmount - (params.metadata?.paidAmount || 0);
            loanBalanceAfter = loanBalanceBefore - unpaidAmount; // Purchase deletion decreases loan (reverts the purchase)
            break;
          case "ATTENDANCE_CREATE":
          case "ATTENDANCE_UPDATE":
            loanBalanceAfter = loanBalanceBefore + totalAmount; // Extra charges increase loan
            break;
          case "ATTENDANCE_DELETE":
            loanBalanceAfter = loanBalanceBefore - totalAmount; // Attendance deletion decreases loan (reverts the attendance charge)
            break;
          case "KID_CREATE":
          case "KID_UPDATE":
          case "KID_DELETE":
            // For kid operations, loan balance change is already reflected in the kid record
            loanBalanceAfter = loanBalanceBefore;
            break;
          default:
            loanBalanceAfter = loanBalanceBefore;
        }
      }

      // For deletion operations, don't set the related entity ID since the entity will be deleted
      const isDeletionOperation = params.operationType === "DELETE";

      const transactionData: TransactionData = {
        kidId: params.kidId,
        userId: params.userId,
        actionType: params.actionType,
        operationType: params.operationType,
        loanBalanceBefore,
        loanBalanceAfter,
        transactionAmount: params.transactionAmount,
        discountAmount: params.discountAmount,
        totalAmount,
        description: params.description,
        metadata: params.metadata,
        relatedKidId: isDeletionOperation ? undefined : params.relatedKidId,
        relatedPaymentId: isDeletionOperation
          ? undefined
          : params.relatedPaymentId,
        relatedSubscriptionId: isDeletionOperation
          ? undefined
          : params.relatedSubscriptionId,
        relatedAttendanceId: isDeletionOperation
          ? undefined
          : params.relatedAttendanceId,
        relatedPurchaseId: isDeletionOperation
          ? undefined
          : params.relatedPurchaseId,
      };

      const transaction = await prisma.kidTransaction.create({
        data: transactionData,
        include: {
          kid: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          user: {
            select: {
              id: true,
              username: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      });

      return transaction;
    } catch (error) {
      console.error("Error creating transaction:", error);
      throw error;
    }
  }

  /**
   * Helper method for kid creation
   */
  static async logKidCreation(kidId: number, userId: number, metadata?: any) {
    return this.createTransaction({
      kidId,
      userId,
      actionType: "KID_CREATE",
      operationType: "CREATE",
      transactionAmount: 0,
      description: "Kid account created",
      metadata,
      relatedKidId: kidId,
    });
  }

  /**
   * Helper method for kid update
   */
  static async logKidUpdate(
    kidId: number,
    userId: number,
    oldData: any,
    newData: any
  ) {
    const loanBalanceChange =
      (newData.loanBalance || 0) - (oldData.loanBalance || 0);

    return this.createTransaction({
      kidId,
      userId,
      actionType: "KID_UPDATE",
      operationType: "UPDATE",
      transactionAmount: Math.abs(loanBalanceChange),
      description: "Kid information updated",
      metadata: { oldData, newData },
      relatedKidId: kidId,
    });
  }

  /**
   * Helper method for kid deletion
   */
  static async logKidDeletion(kidId: number, userId: number, kidData: any) {
    return this.createTransaction({
      kidId,
      userId,
      actionType: "KID_DELETE",
      operationType: "DELETE",
      transactionAmount: 0,
      description: "Kid account deleted",
      metadata: { deletedKidData: kidData },
      relatedKidId: kidId,
    });
  }

  /**
   * Helper method for payment creation
   */
  static async logPaymentCreation(
    kidId: number,
    userId: number,
    paymentId: number,
    amount: number,
    metadata?: any
  ) {
    return this.createTransaction({
      kidId,
      userId,
      actionType: "PAYMENT_CREATE",
      operationType: "CREATE",
      transactionAmount: amount,
      description: `Payment of ${amount} received`,
      metadata,
      relatedPaymentId: paymentId,
    });
  }

  /**
   * Helper method for payment update
   */
  static async logPaymentUpdate(
    kidId: number,
    userId: number,
    paymentId: number,
    oldAmount: number,
    newAmount: number,
    metadata?: any
  ) {
    const amountDifference = newAmount - oldAmount;

    return this.createTransaction({
      kidId,
      userId,
      actionType: "PAYMENT_UPDATE",
      operationType: "UPDATE",
      transactionAmount: Math.abs(amountDifference),
      description: `Payment updated from ${oldAmount} to ${newAmount}`,
      metadata: { oldAmount, newAmount, ...metadata },
      relatedPaymentId: paymentId,
    });
  }

  /**
   * Helper method for payment deletion
   */
  static async logPaymentDeletion(
    kidId: number,
    userId: number,
    paymentId: number,
    amount: number,
    metadata?: any
  ) {
    return this.createTransaction({
      kidId,
      userId,
      actionType: "PAYMENT_DELETE",
      operationType: "DELETE",
      transactionAmount: amount,
      description: `Payment of ${amount} deleted`,
      metadata,
      relatedPaymentId: paymentId,
    });
  }

  /**
   * Helper method for subscription creation
   */
  static async logSubscriptionCreation(
    kidId: number,
    userId: number,
    subscriptionId: number,
    price: number,
    discountPercentage?: number,
    metadata?: any
  ) {
    const discountAmount = discountPercentage
      ? (price * discountPercentage) / 100
      : 0;

    return this.createTransaction({
      kidId,
      userId,
      actionType: "SUBSCRIPTION_CREATE",
      operationType: "CREATE",
      transactionAmount: price,
      discountAmount,
      description: `Subscription created with ${
        discountPercentage ? discountPercentage + "% discount" : "no discount"
      }`,
      metadata,
      relatedSubscriptionId: subscriptionId,
    });
  }

  /**
   * Helper method for subscription update
   */
  static async logSubscriptionUpdate(
    kidId: number,
    userId: number,
    subscriptionId: number,
    oldPrice: number,
    newPrice: number,
    oldDiscount?: number,
    newDiscount?: number,
    metadata?: any
  ) {
    const oldDiscountAmount = oldDiscount ? (oldPrice * oldDiscount) / 100 : 0;
    const newDiscountAmount = newDiscount ? (newPrice * newDiscount) / 100 : 0;
    const priceDifference = newPrice - oldPrice;
    const discountDifference = newDiscountAmount - oldDiscountAmount;

    return this.createTransaction({
      kidId,
      userId,
      actionType: "SUBSCRIPTION_UPDATE",
      operationType: "UPDATE",
      transactionAmount: Math.abs(priceDifference),
      discountAmount: Math.abs(discountDifference),
      description: `Subscription updated`,
      metadata: {
        oldPrice,
        newPrice,
        oldDiscount,
        newDiscount,
        ...metadata,
      },
      relatedSubscriptionId: subscriptionId,
    });
  }

  /**
   * Helper method for subscription deletion
   */
  static async logSubscriptionDeletion(
    kidId: number,
    userId: number,
    subscriptionId: number,
    price: number,
    discountAmount: number,
    metadata?: any
  ) {
    return this.createTransaction({
      kidId,
      userId,
      actionType: "SUBSCRIPTION_DELETE",
      operationType: "DELETE",
      transactionAmount: price,
      discountAmount,
      description: "Subscription deleted",
      metadata,
      relatedSubscriptionId: subscriptionId,
    });
  }

  /**
   * Helper method for attendance creation
   */
  static async logAttendanceCreation(
    kidId: number,
    userId: number,
    attendanceId: number,
    extraCharge: number,
    metadata?: any
  ) {
    return this.createTransaction({
      kidId,
      userId,
      actionType: "ATTENDANCE_CREATE",
      operationType: "CREATE",
      transactionAmount: extraCharge || 0,
      description: extraCharge
        ? `Attendance with extra charge of ${extraCharge}`
        : "Attendance recorded",
      metadata,
      relatedAttendanceId: attendanceId,
    });
  }

  /**
   * Helper method for attendance update
   */
  static async logAttendanceUpdate(
    kidId: number,
    userId: number,
    attendanceId: number,
    oldExtraCharge: number,
    newExtraCharge: number,
    metadata?: any
  ) {
    const chargeDifference = newExtraCharge - oldExtraCharge;

    return this.createTransaction({
      kidId,
      userId,
      actionType: "ATTENDANCE_UPDATE",
      operationType: "UPDATE",
      transactionAmount: Math.abs(chargeDifference),
      description: `Attendance extra charge updated from ${oldExtraCharge} to ${newExtraCharge}`,
      metadata: { oldExtraCharge, newExtraCharge, ...metadata },
      relatedAttendanceId: attendanceId,
    });
  }

  /**
   * Helper method for attendance deletion
   */
  static async logAttendanceDeletion(
    kidId: number,
    userId: number,
    attendanceId: number,
    extraCharge: number,
    metadata?: any
  ) {
    return this.createTransaction({
      kidId,
      userId,
      actionType: "ATTENDANCE_DELETE",
      operationType: "DELETE",
      transactionAmount: extraCharge || 0,
      description: "Attendance deleted",
      metadata,
      relatedAttendanceId: attendanceId,
    });
  }

  /**
   * Helper method for purchase creation
   */
  static async logPurchaseCreation(
    kidId: number,
    userId: number,
    purchaseId: number,
    totalPrice: number,
    paidAmount: number,
    metadata?: any
  ) {
    const unpaidAmount = totalPrice - paidAmount;

    return this.createTransaction({
      kidId,
      userId,
      actionType: "PURCHASE_CREATE",
      operationType: "CREATE",
      transactionAmount: totalPrice,
      description: `Purchase created - Total: ${totalPrice}, Paid: ${paidAmount}, Unpaid: ${unpaidAmount}`,
      metadata: { totalPrice, paidAmount, unpaidAmount, ...metadata },
      relatedPurchaseId: purchaseId,
    });
  }

  /**
   * Helper method for purchase update
   */
  static async logPurchaseUpdate(
    kidId: number,
    userId: number,
    purchaseId: number,
    oldTotalPrice: number,
    newTotalPrice: number,
    oldPaidAmount: number,
    newPaidAmount: number,
    metadata?: any
  ) {
    const oldUnpaid = oldTotalPrice - oldPaidAmount;
    const newUnpaid = newTotalPrice - newPaidAmount;
    const unpaidDifference = newUnpaid - oldUnpaid;

    return this.createTransaction({
      kidId,
      userId,
      actionType: "PURCHASE_UPDATE",
      operationType: "UPDATE",
      transactionAmount: Math.abs(unpaidDifference),
      description: `Purchase updated - Unpaid amount changed by ${unpaidDifference}`,
      metadata: {
        oldTotalPrice,
        newTotalPrice,
        oldPaidAmount,
        newPaidAmount,
        oldUnpaid,
        newUnpaid,
        ...metadata,
      },
      relatedPurchaseId: purchaseId,
    });
  }

  /**
   * Helper method for purchase deletion
   */
  static async logPurchaseDeletion(
    kidId: number,
    userId: number,
    purchaseId: number,
    totalPrice: number,
    paidAmount: number,
    metadata?: any
  ) {
    const unpaidAmount = totalPrice - paidAmount;

    return this.createTransaction({
      kidId,
      userId,
      actionType: "PURCHASE_DELETE",
      operationType: "DELETE",
      transactionAmount: totalPrice,
      description: `Purchase deleted - Total: ${totalPrice}, Paid: ${paidAmount}, Unpaid: ${unpaidAmount}`,
      metadata: { totalPrice, paidAmount, unpaidAmount, ...metadata },
      relatedPurchaseId: purchaseId,
    });
  }

  /**
   * Get transactions for a specific kid
   */
  static async getKidTransactions(
    kidId: number,
    options?: {
      limit?: number;
      offset?: number;
      actionType?: KidTransactionAction;
      operationType?: KidTransactionOperation;
      startDate?: Date;
      endDate?: Date;
    }
  ) {
    const where: any = { kidId };

    if (options?.actionType) {
      where.actionType = options.actionType;
    }

    if (options?.operationType) {
      where.operationType = options.operationType;
    }

    if (options?.startDate || options?.endDate) {
      where.transactionDate = {};
      if (options.startDate) where.transactionDate.gte = options.startDate;
      if (options.endDate) where.transactionDate.lte = options.endDate;
    }

    return prisma.kidTransaction.findMany({
      where,
      include: {
        kid: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        user: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        transactionDate: "desc",
      },
      take: options?.limit || 50,
      skip: options?.offset || 0,
    });
  }

  /**
   * Get transaction summary for a kid
   */
  static async getKidTransactionSummary(kidId: number) {
    const transactions = await prisma.kidTransaction.findMany({
      where: { kidId },
      select: {
        actionType: true,
        totalAmount: true,
        transactionDate: true,
      },
      orderBy: {
        transactionDate: "desc",
      },
    });

    const summary = {
      totalTransactions: transactions.length,
      totalPayments: 0,
      totalPurchases: 0,
      totalSubscriptions: 0,
      totalAttendanceCharges: 0,
      currentBalance: 0,
    };

    transactions.forEach((transaction) => {
      switch (transaction.actionType) {
        case "PAYMENT_CREATE":
        case "PAYMENT_UPDATE":
          summary.totalPayments += transaction.totalAmount;
          break;
        case "PURCHASE_CREATE":
        case "PURCHASE_UPDATE":
          summary.totalPurchases += transaction.totalAmount;
          break;
        case "SUBSCRIPTION_CREATE":
        case "SUBSCRIPTION_UPDATE":
          summary.totalSubscriptions += transaction.totalAmount;
          break;
        case "ATTENDANCE_CREATE":
        case "ATTENDANCE_UPDATE":
          summary.totalAttendanceCharges += transaction.totalAmount;
          break;
      }
    });

    // Get current balance from the latest transaction
    const latestTransaction = transactions[0];
    if (latestTransaction) {
      const latestFullTransaction = await prisma.kidTransaction.findFirst({
        where: { kidId },
        orderBy: { transactionDate: "desc" },
        select: { loanBalanceAfter: true },
      });
      summary.currentBalance = latestFullTransaction?.loanBalanceAfter || 0;
    }

    return summary;
  }
}
