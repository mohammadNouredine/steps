-- Create Transaction table
CREATE TABLE IF NOT EXISTS "Transaction" (
    "id" SERIAL PRIMARY KEY,
    "kidId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "loanBalanceBeforeTransaction" DOUBLE PRECISION NOT NULL,
    "loanBalanceAfterTransaction" DOUBLE PRECISION NOT NULL,
    "exchangeOfLoans" DOUBLE PRECISION NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Transaction_kidId_fkey" FOREIGN KEY ("kidId") REFERENCES "Kid"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS "Transaction_kidId_idx" ON "Transaction"("kidId");
CREATE INDEX IF NOT EXISTS "Transaction_userId_idx" ON "Transaction"("userId");
CREATE INDEX IF NOT EXISTS "Transaction_transactionDate_idx" ON "Transaction"("transactionDate"); 