import { Transaction as TransactionType } from "@/lib/api/types";

export function validateTransaction(transaction: TransactionType): boolean {
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

const exampleTransaction: TransactionType = {
  id: 1,
  amount: 100,
  date: "2023-01-01",
  // other properties
};

console.log(exampleTransaction);
