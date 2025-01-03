import type { Asset, Transaction } from '@/types/portfolio';

export function validateAssetData(asset: Asset): string[] {
  const errors: string[] = [];

  if (typeof asset.balance !== 'number' || asset.balance < 0) {
    errors.push('Invalid balance amount');
  }

  if (typeof asset.price !== 'number' || asset.price < 0) {
    errors.push('Invalid price value');
  }

  if (typeof asset.value !== 'number' || asset.value < 0) {
    errors.push('Invalid total value');
  }

  if (asset.costBasis !== undefined && (typeof asset.costBasis !== 'number' || asset.costBasis < 0)) {
    errors.push('Invalid cost basis');
  }

  return errors;
}

export function validateTransactionData(transaction: Transaction): string[] {
  const errors: string[] = [];

  if (typeof transaction.amount !== 'number' || transaction.amount <= 0) {
    errors.push('Invalid transaction amount');
  }

  if (typeof transaction.price !== 'number' || transaction.price < 0) {
    errors.push('Invalid transaction price');
  }

  if (!['buy', 'sell', 'transfer'].includes(transaction.type)) {
    errors.push('Invalid transaction type');
  }

  if (!(transaction.timestamp instanceof Date)) {
    errors.push('Invalid transaction date');
  }

  return errors;
}