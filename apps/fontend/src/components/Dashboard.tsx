import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { TradingViewChart } from "./TradingViewChart";

const candlestickData = [
  {
    time: "2025-11-22 09:00",
    open: 45200,
    high: 45800,
    low: 45000,
    close: 45600,
    volume: 2400000,
  },
  {
    time: "2025-11-22 10:00",
    open: 45600,
    high: 46200,
    low: 45400,
    close: 46100,
    volume: 2800000,
  },
  {
    time: "2025-11-22 11:00",
    open: 46100,
    high: 46500,
    low: 45800,
    close: 45800,
    volume: 2200000,
  },
  {
    time: "2025-11-22 12:00",
    open: 45800,
    high: 47200,
    low: 45700,
    close: 47200,
    volume: 3400000,
  },
  {
    time: "2025-11-22 13:00",
    open: 47200,
    high: 47300,
    low: 46800,
    close: 46900,
    volume: 2900000,
  },
  {
    time: "2025-11-22 14:00",
    open: 46900,
    high: 48100,
    low: 46800,
    close: 48100,
    volume: 3800000,
  },
  {
    time: "2025-11-22 15:00",
    open: 48100,
    high: 48200,
    low: 47700,
    close: 47800,
    volume: 3200000,
  },
  {
    time: "2025-11-22 16:00",
    open: 47800,
    high: 49200,
    low: 47700,
    close: 49200,
    volume: 4200000,
  },
  {
    time: "2025-11-22 17:00",
    open: 45200,
    high: 45800,
    low: 45000,
    close: 45600,
    volume: 2400000,
  },
  {
    time: "2025-11-22 18:00",
    open: 45600,
    high: 46200,
    low: 45400,
    close: 46100,
    volume: 2800000,
  },
  {
    time: "2025-11-22 19:00",
    open: 46100,
    high: 46500,
    low: 45800,
    close: 45800,
    volume: 2200000,
  },
  {
    time: "2025-11-22 20:00",
    open: 45800,
    high: 47200,
    low: 45700,
    close: 47200,
    volume: 3400000,
  },
  {
    time: "2025-11-22 21:00",
    open: 47200,
    high: 47300,
    low: 46800,
    close: 46900,
    volume: 2900000,
  },
  {
    time: "2025-11-22 22:00",
    open: 46900,
    high: 48100,
    low: 46800,
    close: 48100,
    volume: 3800000,
  },
  {
    time: "2025-11-22 23:00",
    open: 48100,
    high: 48200,
    low: 47700,
    close: 47800,
    volume: 3200000,
  },
  {
    time: "2025-11-22 24:00",
    open: 47800,
    high: 49200,
    low: 47700,
    close: 49200,
    volume: 4200000,
  },
  {
    time: "2025-11-23 01:00",
    open: 45200,
    high: 45800,
    low: 45000,
    close: 45600,
    volume: 2400000,
  },
  {
    time: "2025-11-23 02:00",
    open: 45600,
    high: 46200,
    low: 45400,
    close: 46100,
    volume: 2800000,
  },
  {
    time: "2025-11-23 03:00",
    open: 46100,
    high: 46500,
    low: 45800,
    close: 45800,
    volume: 2200000,
  },
  {
    time: "2025-11-23 04:00",
    open: 45800,
    high: 47200,
    low: 45700,
    close: 47200,
    volume: 3400000,
  },
  {
    time: "2025-11-23 05:00",
    open: 47200,
    high: 47300,
    low: 46800,
    close: 46900,
    volume: 2900000,
  },
  {
    time: "2025-11-23 06:00",
    open: 46900,
    high: 48100,
    low: 46800,
    close: 48100,
    volume: 3800000,
  },
  {
    time: "2025-11-23 07:00",
    open: 48100,
    high: 48200,
    low: 47700,
    close: 47800,
    volume: 3200000,
  },
  {
    time: "2025-11-23 08:00",
    open: 47800,
    high: 49200,
    low: 47700,
    close: 49200,
    volume: 4200000,
  },
  {
    time: "2025-11-23 09:00",
    open: 45200,
    high: 45800,
    low: 45000,
    close: 45600,
    volume: 2400000,
  },
  {
    time: "2025-11-23 10:00",
    open: 45600,
    high: 46200,
    low: 45400,
    close: 46100,
    volume: 2800000,
  },
  {
    time: "2025-11-23 11:00",
    open: 46100,
    high: 46500,
    low: 45800,
    close: 45800,
    volume: 2200000,
  },
  {
    time: "2025-11-23 12:00",
    open: 45800,
    high: 47200,
    low: 45700,
    close: 47200,
    volume: 3400000,
  },
  {
    time: "2025-11-23 13:00",
    open: 47200,
    high: 47300,
    low: 46800,
    close: 46900,
    volume: 2900000,
  },
  {
    time: "2025-11-23 14:00",
    open: 46900,
    high: 48100,
    low: 46800,
    close: 48100,
    volume: 3800000,
  },
  {
    time: "2025-11-23 15:00",
    open: 48100,
    high: 48200,
    low: 47700,
    close: 47800,
    volume: 3200000,
  },
  {
    time: "2025-11-23 16:00",
    open: 47800,
    high: 49200,
    low: 47700,
    close: 49200,
    volume: 4200000,
  },
];

const watchlist = [
  { symbol: "BTC/USD", price: 47500, change: 12.5, trend: "up" },
  { symbol: "ETH/USD", price: 3240, change: 8.2, trend: "up" },
  { symbol: "AAPL", price: 178.5, change: -2.3, trend: "down" },
  { symbol: "TSLA", price: 242.8, change: 5.7, trend: "up" },
  { symbol: "EUR/USD", price: 1.0845, change: -0.4, trend: "down" },
];

const recentTransactions = [
  {
    type: "buy",
    asset: "BTC",
    amount: "0.5",
    price: "$23,750",
    time: "2 min ago",
    status: "completed",
  },
  {
    type: "sell",
    asset: "ETH",
    amount: "2.5",
    price: "$8,100",
    time: "15 min ago",
    status: "completed",
  },
  {
    type: "buy",
    asset: "AAPL",
    amount: "50",
    price: "$8,925",
    time: "1 hour ago",
    status: "completed",
  },
  {
    type: "buy",
    asset: "EUR",
    amount: "5000",
    price: "$5,422",
    time: "3 hours ago",
    status: "completed",
  },
];

export function Dashboard() {
  const [timeframe, setTimeframe] = useState("1D");

  return (
    <div className="space-y-6">
      {/* Account Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
            Total Balance
          </p>
          <p className="text-3xl text-slate-900 dark:text-white mb-2">
            $124,580.50
          </p>
          <div className="flex items-center gap-2 text-green-500 text-sm">
            <ArrowUpRight className="w-4 h-4" />
            <span>+$8,234 (7.1%)</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
            Today's P&L
          </p>
          <p className="text-3xl text-slate-900 dark:text-white mb-2">
            +$2,847.20
          </p>
          <div className="flex items-center gap-2 text-green-500 text-sm">
            <ArrowUpRight className="w-4 h-4" />
            <span>+2.34%</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
            Total Invested
          </p>
          <p className="text-3xl text-slate-900 dark:text-white mb-2">
            $98,450.00
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Across 12 assets
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
            Available Cash
          </p>
          <p className="text-3xl text-slate-900 dark:text-white mb-2">
            $26,130.50
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Ready to trade
          </p>
        </div>
      </div>

      {/* Main Chart */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl text-slate-900 dark:text-white">BTC/USD</h2>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-3xl text-slate-900 dark:text-white">
                $49,200.00
              </span>
              <span className="flex items-center gap-1 text-green-500">
                <TrendingUp className="w-5 h-5" />
                +8.8%
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            {["1H", "1D", "1W", "1M", "1Y"].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  timeframe === tf
                    ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        <div style={{ height: 400 }}>
          <TradingViewChart data={candlestickData} />
        </div>
      </div>

      {/* Watchlist and Transactions */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Watchlist */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl text-slate-900 dark:text-white mb-6">
            Watchlist
          </h3>

          <div className="space-y-4">
            {watchlist.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all cursor-pointer"
              >
                <div>
                  <p className="text-slate-900 dark:text-white">
                    {item.symbol}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    ${item.price.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <div
                    className={`flex items-center gap-1 ${
                      item.trend === "up" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {item.trend === "up" ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>
                      {item.change > 0 ? "+" : ""}
                      {item.change}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl text-slate-900 dark:text-white mb-6">
            Recent Transactions
          </h3>

          <div className="space-y-4">
            {recentTransactions.map((tx, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-900"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      tx.type === "buy"
                        ? "bg-green-500/10 text-green-500"
                        : "bg-red-500/10 text-red-500"
                    }`}
                  >
                    {tx.type === "buy" ? (
                      <ArrowUpRight className="w-5 h-5" />
                    ) : (
                      <ArrowDownRight className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <p className="text-slate-900 dark:text-white">
                      {tx.type === "buy" ? "Bought" : "Sold"} {tx.asset}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {tx.amount} units
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-slate-900 dark:text-white">{tx.price}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {tx.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
