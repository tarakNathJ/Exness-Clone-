import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Info, Pencil, TrendingUpIcon, MinusIcon, ZapIcon, Clock } from 'lucide-react';
import { TradingViewChart } from './TradingViewChart';

const candleData = [
  { time: '2025-11-22 09:00', open: 45200, high: 45800, low: 45000, close: 45600, volume: 2400000 },
  { time: '2025-11-22 09:15', open: 45600, high: 46200, low: 45400, close: 46000, volume: 2800000 },
  { time: '2025-11-22 09:30', open: 46000, high: 46500, low: 45800, close: 46300, volume: 2200000 },
  { time: '2025-11-22 09:45', open: 46300, high: 46800, low: 46100, close: 46500, volume: 3400000 },
  { time: '2025-11-22 10:00', open: 46500, high: 47200, low: 46400, close: 47000, volume: 2900000 },
  { time: '2025-11-22 10:15', open: 47000, high: 47500, low: 46900, close: 47300, volume: 3800000 },
  { time: '2025-11-22 10:30', open: 47300, high: 47800, low: 47100, close: 47600, volume: 3200000 },
  { time: '2025-11-22 10:45', open: 47600, high: 48200, low: 47500, close: 48000, volume: 4200000 },
  { time: '2025-11-22 11:00', open: 48000, high: 48500, low: 47800, close: 48300, volume: 3900000 },
  { time: '2025-11-22 11:15', open: 48300, high: 48800, low: 48100, close: 48500, volume: 4100000 },
  { time: '2025-11-22 11:30', open: 48500, high: 49000, low: 48200, close: 48700, volume: 3500000 },
  { time: '2025-11-22 11:45', open: 48700, high: 49200, low: 48500, close: 48900, volume: 3200000 },
  { time: '2025-11-22 12:00', open: 48900, high: 49500, low: 48800, close: 49300, volume: 4500000 },
  { time: '2025-11-22 12:15', open: 49300, high: 49800, low: 49100, close: 49600, volume: 3800000 },
  { time: '2025-11-22 12:30', open: 49600, high: 50200, low: 49400, close: 49800, volume: 4200000 },
  { time: '2025-11-22 12:45', open: 49800, high: 50500, low: 49600, close: 50200, volume: 4600000 },
  { time: '2025-11-22 13:00', open: 50200, high: 50800, low: 50000, close: 50500, volume: 5200000 },
  { time: '2025-11-22 13:15', open: 50500, high: 51200, low: 50300, close: 50900, volume: 5800000 },
  { time: '2025-11-22 13:30', open: 50900, high: 51500, low: 50700, close: 51200, volume: 6200000 },
  { time: '2025-11-22 13:45', open: 51200, high: 51800, low: 51000, close: 51500, volume: 5900000 },
  { time: '2025-11-22 14:00', open: 51500, high: 52000, low: 51300, close: 51700, volume: 6100000 },
  { time: '2025-11-22 14:15', open: 51700, high: 52200, low: 51500, close: 51900, volume: 5400000 },
  { time: '2025-11-22 14:30', open: 51900, high: 52500, low: 51700, close: 52200, volume: 6500000 },
  { time: '2025-11-22 14:45', open: 52200, high: 52800, low: 52000, close: 52500, volume: 7200000 },
  { time: '2025-11-22 15:00', open: 52500, high: 53200, low: 52300, close: 52900, volume: 8100000 },
  { time: '2025-11-22 15:15', open: 52900, high: 53500, low: 52700, close: 53200, volume: 7800000 },
  { time: '2025-11-22 15:30', open: 53200, high: 53800, low: 53000, close: 53500, volume: 7500000 },
  { time: '2025-11-22 15:45', open: 53500, high: 54200, low: 53300, close: 53900, volume: 8200000 },
  { time: '2025-11-22 16:00', open: 53900, high: 54500, low: 53700, close: 54200, volume: 8900000 },
  { time: '2025-11-22 16:15', open: 54200, high: 53800, low: 52500, close: 53000, volume: 9500000 },
  { time: '2025-11-22 16:30', open: 53000, high: 53300, low: 52200, close: 52500, volume: 8800000 },
  { time: '2025-11-22 16:45', open: 52500, high: 52800, low: 51800, close: 52000, volume: 8200000 },
  { time: '2025-11-22 17:00', open: 52000, high: 52300, low: 51500, close: 51800, volume: 7500000 },
  { time: '2025-11-22 17:15', open: 51800, high: 52100, low: 51200, close: 51500, volume: 6900000 },
  { time: '2025-11-22 17:30', open: 51500, high: 51800, low: 51000, close: 51300, volume: 6200000 },
  { time: '2025-11-22 17:45', open: 51300, high: 51600, low: 50800, close: 51100, volume: 5800000 },
  { time: '2025-11-22 18:00', open: 51100, high: 51400, low: 50600, close: 50900, volume: 5200000 },
];

export function TradePage() {
  const [orderType, setOrderType] = useState<'market' | 'limit' | 'stop'>('market');
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState(0.5);
  const [price, setPrice] = useState(47500);
  const [timeframe, setTimeframe] = useState('1H');
  
  const currentPrice = 49400;
  const totalValue = amount * (orderType === 'market' ? currentPrice : price);
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-slate-900 dark:text-white mb-2">Trade</h1>
        <p className="text-slate-600 dark:text-slate-400">Execute trades with real-time pricing</p>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Trading Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Chart Section */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            {/* Chart Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-6">
                <div>
                  <h2 className="text-2xl text-slate-900 dark:text-white mb-1">BTC/USD</h2>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl text-slate-900 dark:text-white">${currentPrice.toLocaleString()}</span>
                    <span className="flex items-center gap-1 text-green-500">
                      <TrendingUp className="w-5 h-5" />
                      +7.0%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm">Live</span>
                </div>
              </div>
            </div>
            
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
              {/* Drawing Tools */}
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors" title="Trend Line">
                  <TrendingUpIcon className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors" title="Horizontal Line">
                  <MinusIcon className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors" title="Draw">
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
              
              {/* Timeframe Selector */}
              <div className="flex gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-900">
                {['1m', '5m', '15m', '1h', '4h', '1D', '1W'].map(tf => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                      timeframe === tf
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
              
              {/* Chart Type */}
              <div className="flex items-center gap-2">
                <select className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-900 border-none text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500">
                  <option>Candles</option>
                  <option>Line</option>
                  <option>Area</option>
                  <option>Bars</option>
                </select>
              </div>
            </div>
            
            {/* TradingView Chart */}
            <TradingViewChart data={candleData} />
          </div>
          
          {/* Order Form */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            {/* Buy/Sell Toggle */}
            <div className="flex gap-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 mb-6">
              <button
                onClick={() => setTradeType('buy')}
                className={`flex-1 py-3 rounded-lg transition-all ${
                  tradeType === 'buy'
                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setTradeType('sell')}
                className={`flex-1 py-3 rounded-lg transition-all ${
                  tradeType === 'sell'
                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/25'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Sell
              </button>
            </div>
            
            {/* Order Type */}
            <div className="mb-6">
              <label className="block text-sm text-slate-600 dark:text-slate-400 mb-3">Order Type</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setOrderType('market')}
                  className={`flex-1 px-4 py-3 rounded-xl transition-all ${
                    orderType === 'market'
                      ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white'
                      : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Market
                </button>
                <button
                  onClick={() => setOrderType('limit')}
                  className={`flex-1 px-4 py-3 rounded-xl transition-all ${
                    orderType === 'limit'
                      ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white'
                      : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Limit
                </button>
                <button
                  onClick={() => setOrderType('stop')}
                  className={`flex-1 px-4 py-3 rounded-xl transition-all ${
                    orderType === 'stop'
                      ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white'
                      : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Stop
                </button>
              </div>
            </div>
            
            {/* Amount Input */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm text-slate-600 dark:text-slate-400">Amount (BTC)</label>
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Available: 2.5 BTC
                </span>
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                step={0.01}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
              />
              <input
                type="range"
                min={0}
                max={2.5}
                step={0.01}
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                className="w-full mt-3"
              />
              <div className="flex justify-between mt-2 text-xs text-slate-600 dark:text-slate-400">
                <span>0 BTC</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>2.5 BTC</span>
              </div>
            </div>
            
            {/* Price Input (for Limit/Stop orders) */}
            {orderType !== 'market' && (
              <div className="mb-6">
                <label className="block text-sm text-slate-600 dark:text-slate-400 mb-3">
                  {orderType === 'limit' ? 'Limit Price' : 'Stop Price'} (USD)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value))}
                  step={100}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                />
              </div>
            )}
            
            {/* Order Summary */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 mb-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Order Type</span>
                <span className="text-slate-900 dark:text-white capitalize">{orderType}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Amount</span>
                <span className="text-slate-900 dark:text-white">{amount} BTC</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Price</span>
                <span className="text-slate-900 dark:text-white">
                  ${(orderType === 'market' ? currentPrice : price).toLocaleString()}
                </span>
              </div>
              <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-900 dark:text-white">Total</span>
                  <span className="text-xl text-slate-900 dark:text-white">
                    ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Submit Button */}
            <button 
              className={`w-full py-4 rounded-xl text-white transition-all ${
                tradeType === 'buy'
                  ? 'bg-green-500 hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/25'
                  : 'bg-red-500 hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/25'
              }`}
            >
              {tradeType === 'buy' ? 'Buy' : 'Sell'} BTC
            </button>
            
            <div className="flex items-center gap-2 mt-4 text-xs text-slate-600 dark:text-slate-400">
              <Info className="w-4 h-4" />
              <span>Orders are executed instantly at market price</span>
            </div>
          </div>
        </div>
        
        {/* Side Panel */}
        <div className="space-y-6">
          {/* Account Info */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg text-slate-900 dark:text-white mb-4">Account Balance</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Available Cash</p>
                <p className="text-2xl text-slate-900 dark:text-white">$26,130.50</p>
              </div>
              
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">BTC Holdings</p>
                <p className="text-xl text-slate-900 dark:text-white">2.5 BTC</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">≈ $118,750.00</p>
              </div>
            </div>
          </div>
          
          {/* Market Stats */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg text-slate-900 dark:text-white mb-4">Market Stats</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">24h High</span>
                <span className="text-sm text-slate-900 dark:text-white">$48,250</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">24h Low</span>
                <span className="text-sm text-slate-900 dark:text-white">$46,100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">24h Volume</span>
                <span className="text-sm text-slate-900 dark:text-white">$28.4B</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Market Cap</span>
                <span className="text-sm text-slate-900 dark:text-white">$930B</span>
              </div>
            </div>
          </div>
          
          {/* Risk Warning */}
          <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-amber-900 dark:text-amber-300 mb-2">Risk Warning</p>
                <p className="text-xs text-amber-800 dark:text-amber-400">
                  Trading cryptocurrencies involves substantial risk. Only trade with funds you can afford to lose.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}