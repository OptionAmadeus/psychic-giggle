import type { Transaction } from '@/types/portfolio';
import { TransactionItem } from './TransactionItem';
import { EmptyState } from '../ui/EmptyState';

interface TransactionListProps {
  transactions: Transaction[];
  className?: string;
}

export function TransactionList({ transactions, className = '' }: TransactionListProps) {
  if (transactions.length === 0) {
    return <EmptyState message="No transactions found" />;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {transactions.map(transaction => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
}