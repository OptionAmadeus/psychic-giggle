import { TrendingUp, TrendingDown } from "lucide-react";
import { usePortfolioStore } from "@/stores/portfolio";
import { formatCurrency, formatPercentage } from "@/utils/formatters";
import { TableHeader } from "./table/TableHeader";
import { TableCell } from "./table/TableCell";
import { EmptyState } from "../ui/EmptyState";

export function PositionsTable() {
  const { assets } = usePortfolioStore();

  if (assets.length === 0) {
    return <EmptyState message="No positions found" />;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <h2 className="text-xl font-semibold mb-4">Current Positions</h2>
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <TableHeader>Asset</TableHeader>
                  <TableHeader align="right">Balance</TableHeader>
                  <TableHeader align="right">Price</TableHeader>
                  <TableHeader align="right">Value</TableHeader>
                  <TableHeader align="right">24h</TableHeader>
                  <TableHeader align="right">P/L</TableHeader>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {assets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="font-medium text-gray-900">
                        {asset.name}
                      </div>
                      <div className="text-gray-500">{asset.symbol}</div>
                    </TableCell>
                    <TableCell align="right">
                      {asset.balance.toFixed(8)}
                    </TableCell>
                    <TableCell align="right">
                      {formatCurrency(asset.price)}
                    </TableCell>
                    <TableCell align="right">
                      {formatCurrency(asset.value)}
                    </TableCell>
                    <TableCell align="right">
                      <div className="flex items-center justify-end gap-1">
                        {asset.change24h >= 0 ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        )}
                        <span
                          className={
                            asset.change24h >= 0
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {formatPercentage(asset.change24h)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      <span
                        className={
                          (asset.profitLoss || 0) >= 0
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {formatCurrency(asset.profitLoss || 0)}
                      </span>
                    </TableCell>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
