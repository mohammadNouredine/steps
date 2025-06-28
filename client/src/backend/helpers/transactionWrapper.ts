import { KidTransactionService } from "./transactionService";
import { getLoggedInUserId } from "./getLoggedInUserId";

/**
 * Utility wrapper for easy transaction logging integration
 */
export class TransactionWrapper {
  /**
   * Wraps a database operation with transaction logging
   * @param req - The request object
   * @param operation - The database operation to perform
   * @param transactionConfig - Configuration for transaction logging
   */
  static async withTransaction<T>(
    req: Request,
    operation: () => Promise<T>,
    transactionConfig: {
      actionType:
        | "KID_CREATE"
        | "KID_UPDATE"
        | "KID_DELETE"
        | "PAYMENT_CREATE"
        | "PAYMENT_UPDATE"
        | "PAYMENT_DELETE"
        | "SUBSCRIPTION_CREATE"
        | "SUBSCRIPTION_UPDATE"
        | "SUBSCRIPTION_DELETE"
        | "ATTENDANCE_CREATE"
        | "ATTENDANCE_UPDATE"
        | "ATTENDANCE_DELETE"
        | "PURCHASE_CREATE"
        | "PURCHASE_UPDATE"
        | "PURCHASE_DELETE";
      operationType: "CREATE" | "UPDATE" | "DELETE";
      kidId: number;
      transactionAmount?: number;
      discountAmount?: number;
      description?: string;
      metadata?: any;
      relatedKidId?: number;
      relatedPaymentId?: number;
      relatedSubscriptionId?: number;
      relatedAttendanceId?: number;
      relatedPurchaseId?: number;
    }
  ): Promise<T> {
    try {
      // Execute the main operation
      const result = await operation();

      // Log the transaction after successful operation
      try {
        const userId = getLoggedInUserId({ req });
        if (userId) {
          await KidTransactionService.createTransaction({
            kidId: transactionConfig.kidId,
            userId,
            actionType: transactionConfig.actionType,
            operationType: transactionConfig.operationType,
            transactionAmount: transactionConfig.transactionAmount || 0,
            discountAmount: transactionConfig.discountAmount,
            description: transactionConfig.description,
            metadata: transactionConfig.metadata,
            relatedKidId: transactionConfig.relatedKidId,
            relatedPaymentId: transactionConfig.relatedPaymentId,
            relatedSubscriptionId: transactionConfig.relatedSubscriptionId,
            relatedAttendanceId: transactionConfig.relatedAttendanceId,
            relatedPurchaseId: transactionConfig.relatedPurchaseId,
          });
        }
      } catch (transactionError) {
        console.error("Failed to log transaction:", transactionError);
        // Don't fail the main operation if transaction logging fails
      }

      return result;
    } catch (error) {
      // Re-throw the original error
      throw error;
    }
  }

  /**
   * Helper for kid creation with transaction logging
   */
  static async withKidCreation<T>(
    req: Request,
    operation: () => Promise<T>,
    kidId: number,
    metadata?: any
  ): Promise<T> {
    return this.withTransaction(req, operation, {
      actionType: "KID_CREATE",
      operationType: "CREATE",
      kidId,
      transactionAmount: 0,
      description: "Kid account created",
      metadata,
      relatedKidId: kidId,
    });
  }

  /**
   * Helper for payment creation with transaction logging
   */
  static async withPaymentCreation<T>(
    req: Request,
    operation: () => Promise<T>,
    kidId: number,
    paymentId: number,
    amount: number,
    metadata?: any
  ): Promise<T> {
    return this.withTransaction(req, operation, {
      actionType: "PAYMENT_CREATE",
      operationType: "CREATE",
      kidId,
      transactionAmount: amount,
      description: `Payment of ${amount} received`,
      metadata,
      relatedPaymentId: paymentId,
    });
  }

  /**
   * Helper for subscription creation with transaction logging
   */
  static async withSubscriptionCreation<T>(
    req: Request,
    operation: () => Promise<T>,
    kidId: number,
    subscriptionId: number,
    price: number,
    discountPercentage?: number,
    metadata?: any
  ): Promise<T> {
    const discountAmount = discountPercentage
      ? (price * discountPercentage) / 100
      : 0;

    return this.withTransaction(req, operation, {
      actionType: "SUBSCRIPTION_CREATE",
      operationType: "CREATE",
      kidId,
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
   * Helper for attendance creation with transaction logging
   */
  static async withAttendanceCreation<T>(
    req: Request,
    operation: () => Promise<T>,
    kidId: number,
    attendanceId: number,
    extraCharge: number,
    metadata?: any
  ): Promise<T> {
    return this.withTransaction(req, operation, {
      actionType: "ATTENDANCE_CREATE",
      operationType: "CREATE",
      kidId,
      transactionAmount: extraCharge || 0,
      description: extraCharge
        ? `Attendance with extra charge of ${extraCharge}`
        : "Attendance recorded",
      metadata,
      relatedAttendanceId: attendanceId,
    });
  }

  /**
   * Helper for purchase creation with transaction logging
   */
  static async withPurchaseCreation<T>(
    req: Request,
    operation: () => Promise<T>,
    kidId: number,
    purchaseId: number,
    totalPrice: number,
    paidAmount: number,
    metadata?: any
  ): Promise<T> {
    const unpaidAmount = totalPrice - paidAmount;

    return this.withTransaction(req, operation, {
      actionType: "PURCHASE_CREATE",
      operationType: "CREATE",
      kidId,
      transactionAmount: totalPrice,
      description: `Purchase created - Total: ${totalPrice}, Paid: ${paidAmount}, Unpaid: ${unpaidAmount}`,
      metadata: { totalPrice, paidAmount, unpaidAmount, ...metadata },
      relatedPurchaseId: purchaseId,
    });
  }
}
