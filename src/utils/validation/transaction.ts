// src/utils/validation/transaction.ts
import { Transaction } from "@/types/portfolio";

export function validateTransaction(transaction: Transaction): boolean {
  // Example validation logic
  if (
    !transaction.id ||
    !transaction.type ||
    !transaction.asset ||
    transaction.amount <= 0 ||
    transaction.price <= 0
  ) {
    return false;
  }
  return true;
}
