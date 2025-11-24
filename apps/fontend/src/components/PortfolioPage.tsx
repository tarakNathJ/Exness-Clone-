import React from 'react';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

const allocationData = [
  { name: 'Crypto', value: 45, color: '#14b8a6' },
  { name: 'Stocks', value: 30, color: '#3b82f6' },
  { name: 'Forex', value: 15, color: '#8b5cf6' },
  { name: 'Cash', value: 10, color: '#64748b' },
];

const holdings = [
  { symbol: 'BTC', name: 'Bitcoin', amount: 2.5, value: 118750, cost: 95000, change: 25.0, allocation: 28 },
  { symbol: 'ETH', name: 'Ethereum', amount: 50, value: 162000, cost: 145000, change: 11.7, allocation: 38 },
  { symbol: 'AAPL', name: 'Apple Inc.', amount: 100, value: 17850, cost: 18500, change: -3.5, allocation: 14 },
  { symbol: 'TSLA', name: 'Tesla Inc.', amount: 50, value: 12140, cost: 11000, change: 10.4, allocation: 10 },
  { symbol: 'EUR/USD', name: 'Euro', amount: 10000, value: 10845, cost: 11200, change: -3.2, allocation: 10 },
];

const tradeHistory = [
  { date: '2025-11-22', type: 'buy', asset: 'BTC', amount: 0.5, price: 47500, total: 23750, status: 'completed' },
  { date: '2025-11-21', type: 'sell', asset: 'ETH', amount: 2.0, price: 3240, total: 6480, status: 'completed' },
  { date: '2025-11-20', type: 'buy', asset: 'AAPL', amount: 50, price: 178.5, total: 8925, status: 'completed' },
  { date: '2025-11-19', type: 'buy', asset: 'TSLA', amount: 25, price: 242.8, total: 6070, status: 'completed' },
  { date: '2025-11-18', type: 'sell', asset: 'BTC', amount: 0.3, price: 46200, total: 13860, status: 'completed' },
  { date: '2025-11-17', type: 'buy', asset: 'EUR', amount: 5000, price: 1.084, total: 5420, status: 'completed' },
];

const performanceData = [
  { date: 'Nov 1', value: 95000 },
  { date: 'Nov 5', value: 98500 },
  { date: 'Nov 10', value: 102000 },
  { date: 'Nov 15', value: 108500 },
  { date: 'Nov 20', value: 118000 },
  { date: 'Nov 22', value: 124580 },
];

export function PortfolioPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-slate-900 dark:text-white mb-2">Portfolio</h1>
        <p className="text-slate-600 dark:text-slate-400">Track your investments and performance</p>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-teal-500 to-blue-500 text-white">
          <p className="text-white/80 mb-2">Total Portfolio Value</p>
          <p className="text-3xl mb-2">$124,580.50</p>
          <div className="flex items-center gap-2">
            <ArrowUpRight className="w-4 h-4" />
            <span>+$26,130.50 (26.5%)</span>
          </div>
        </div>
        
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <p className="text-slate-600 dark:text-slate-400 mb-2">Total Gain/Loss</p>
          <p className="text-3xl text-green-500 mb-2">+$26,130.50</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">+26.5% All Time</p>
        </div>
        
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <p className="text-slate-600 dark:text-slate-400 mb-2">Today's Change</p>
          <p className="text-3xl text-green-500 mb-2">+$2,847.20</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">+2.34% Today</p>
        </div>
        
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <p className="text-slate-600 dark:text-slate-400 mb-2">Total Assets</p>
          <p className="text-3xl text-slate-900 dark:text-white mb-2">12</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">Across 3 markets</p>
        </div>
      </div>
      
      {/* Allocation and Performance */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Asset Allocation */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl text-slate-900 dark:text-white mb-6">Asset Allocation</h3>
          
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            {allocationData.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                <div>
                  <p className="text-sm text-slate-900 dark:text-white">{item.name}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{item.value}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Performance Chart */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl text-slate-900 dark:text-white mb-6">Performance (30 Days)</h3>
          
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={performanceData}>
              <XAxis dataKey="date" stroke="#64748b" style={{ fontSize: '12px' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#14b8a6" 
                strokeWidth={3}
                dot={{ fill: '#14b8a6', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Holdings Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl text-slate-900 dark:text-white mb-6">Holdings</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-4 py-3 text-left text-sm text-slate-600 dark:text-slate-400">Asset</th>
                <th className="px-4 py-3 text-right text-sm text-slate-600 dark:text-slate-400">Amount</th>
                <th className="px-4 py-3 text-right text-sm text-slate-600 dark:text-slate-400">Value</th>
                <th className="px-4 py-3 text-right text-sm text-slate-600 dark:text-slate-400">Cost Basis</th>
                <th className="px-4 py-3 text-right text-sm text-slate-600 dark:text-slate-400">Gain/Loss</th>
                <th className="px-4 py-3 text-right text-sm text-slate-600 dark:text-slate-400">Allocation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {holdings.map((holding, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                  <td className="px-4 py-4">
                    <div>
                      <p className="text-slate-900 dark:text-white">{holding.symbol}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{holding.name}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right text-slate-900 dark:text-white">
                    {holding.amount}
                  </td>
                  <td className="px-4 py-4 text-right text-slate-900 dark:text-white">
                    ${holding.value.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 text-right text-slate-600 dark:text-slate-400">
                    ${holding.cost.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className={`inline-flex items-center gap-1 ${
                      holding.change > 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {holding.change > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span>{holding.change > 0 ? '+' : ''}{holding.change}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-teal-500 to-blue-500 rounded-full"
                          style={{ width: `${holding.allocation}%` }}
                        />
                      </div>
                      <span className="text-slate-600 dark:text-slate-400 text-sm">{holding.allocation}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Trade History */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl text-slate-900 dark:text-white mb-6">Trade History</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-4 py-3 text-left text-sm text-slate-600 dark:text-slate-400">Date</th>
                <th className="px-4 py-3 text-left text-sm text-slate-600 dark:text-slate-400">Type</th>
                <th className="px-4 py-3 text-left text-sm text-slate-600 dark:text-slate-400">Asset</th>
                <th className="px-4 py-3 text-right text-sm text-slate-600 dark:text-slate-400">Amount</th>
                <th className="px-4 py-3 text-right text-sm text-slate-600 dark:text-slate-400">Price</th>
                <th className="px-4 py-3 text-right text-sm text-slate-600 dark:text-slate-400">Total</th>
                <th className="px-4 py-3 text-right text-sm text-slate-600 dark:text-slate-400">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {tradeHistory.map((trade, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                  <td className="px-4 py-4 text-slate-900 dark:text-white">{trade.date}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg ${
                      trade.type === 'buy'
                        ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                        : 'bg-red-500/10 text-red-600 dark:text-red-400'
                    }`}>
                      {trade.type === 'buy' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {trade.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-900 dark:text-white">{trade.asset}</td>
                  <td className="px-4 py-4 text-right text-slate-900 dark:text-white">{trade.amount}</td>
                  <td className="px-4 py-4 text-right text-slate-900 dark:text-white">${trade.price.toLocaleString()}</td>
                  <td className="px-4 py-4 text-right text-slate-900 dark:text-white">${trade.total.toLocaleString()}</td>
                  <td className="px-4 py-4 text-right">
                    <span className="inline-block px-3 py-1 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 text-sm">
                      {trade.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
