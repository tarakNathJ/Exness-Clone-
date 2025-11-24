import React, { useState } from 'react';
import { Search, TrendingUp, TrendingDown, Star, ArrowUpDown } from 'lucide-react';

const marketData = {
  stocks: [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 178.50, change: -2.3, volume: '52.4M', marketCap: '2.8T' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.80, change: 1.2, volume: '24.3M', marketCap: '1.8T' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.91, change: 0.8, volume: '21.8M', marketCap: '2.8T' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 155.20, change: 3.4, volume: '48.2M', marketCap: '1.6T' },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 242.80, change: 5.7, volume: '112.5M', marketCap: '771B' },
    { symbol: 'META', name: 'Meta Platforms', price: 345.60, change: -1.2, volume: '18.7M', marketCap: '878B' },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 495.20, change: 4.8, volume: '38.4M', marketCap: '1.2T' },
    { symbol: 'JPM', name: 'JPMorgan Chase', price: 156.30, change: 0.5, volume: '9.8M', marketCap: '452B' },
  ],
  crypto: [
    { symbol: 'BTC', name: 'Bitcoin', price: 47500, change: 12.5, volume: '28.4B', marketCap: '930B' },
    { symbol: 'ETH', name: 'Ethereum', price: 3240, change: 8.2, volume: '15.2B', marketCap: '389B' },
    { symbol: 'BNB', name: 'Binance Coin', price: 312.50, change: 3.8, volume: '1.2B', marketCap: '48B' },
    { symbol: 'SOL', name: 'Solana', price: 98.40, change: 15.2, volume: '2.8B', marketCap: '42B' },
    { symbol: 'XRP', name: 'Ripple', price: 0.62, change: -4.2, volume: '1.5B', marketCap: '33B' },
    { symbol: 'ADA', name: 'Cardano', price: 0.48, change: 2.1, volume: '420M', marketCap: '17B' },
  ],
  forex: [
    { symbol: 'EUR/USD', name: 'Euro / US Dollar', price: 1.0845, change: -0.4, volume: '1.2T', spread: '0.0001' },
    { symbol: 'GBP/USD', name: 'Pound / US Dollar', price: 1.2634, change: 0.2, volume: '850B', spread: '0.0002' },
    { symbol: 'USD/JPY', name: 'US Dollar / Yen', price: 149.82, change: 0.6, volume: '980B', spread: '0.001' },
    { symbol: 'AUD/USD', name: 'Australian Dollar', price: 0.6512, change: -0.8, volume: '420B', spread: '0.0001' },
    { symbol: 'USD/CAD', name: 'US Dollar / Canadian', price: 1.3845, change: 0.3, volume: '380B', spread: '0.0002' },
  ],
};

type MarketCategory = 'stocks' | 'crypto' | 'forex';
type SortField = 'symbol' | 'price' | 'change' | 'volume';

export function MarketsPage() {
  const [activeTab, setActiveTab] = useState<MarketCategory>('stocks');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('symbol');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const filteredData = marketData[activeTab].filter(item =>
    item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const convertVolumeToNumber = (volumeStr: string) => {
    const lastChar = volumeStr.slice(-1);
    const num = parseFloat(volumeStr.slice(0, -1));
    if (lastChar === 'M') return num * 1e6;
    if (lastChar === 'B') return num * 1e9;
    if (lastChar === 'T') return num * 1e12;
    return parseFloat(volumeStr);
  }

  const sortedData = [...filteredData].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];

    let aComparable = aVal;
    let bComparable = bVal;

    if (sortField === 'volume') {
      aComparable = convertVolumeToNumber(a.volume as string);
      bComparable = convertVolumeToNumber(b.volume as string);
    } else if (typeof aVal === 'string' && typeof bVal === 'string' && !['symbol', 'name'].includes(sortField)) {
        aComparable = parseFloat(aVal.replace(/[^0-9.-]+/g,""));
        bComparable = parseFloat(bVal.replace(/[^0-9.-]+/g,""));
    }

    if (aComparable < bComparable) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (aComparable > bComparable) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl text-slate-900 dark:text-white mb-2">Markets</h1>
          <p className="text-slate-600 dark:text-slate-400">Real-time market data and analytics</p>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>Live Market Data</span>
        </div>
      </div>
      
      {/* Tabs and Search */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex gap-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab('stocks')}
            className={`px-6 py-3 rounded-lg transition-all ${
              activeTab === 'stocks'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Stocks
          </button>
          <button
            onClick={() => setActiveTab('crypto')}
            className={`px-6 py-3 rounded-lg transition-all ${
              activeTab === 'crypto'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Crypto
          </button>
          <button
            onClick={() => setActiveTab('forex')}
            className={`px-6 py-3 rounded-lg transition-all ${
              activeTab === 'forex'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Forex
          </button>
        </div>
        
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search markets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-teal-500"
          />
        </div>
      </div>
      
      {/* Market Table */}
      <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('symbol')}
                    className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    Symbol <ArrowUpDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="px-6 py-4 text-left text-sm text-slate-600 dark:text-slate-400">Name</th>
                <th className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleSort('price')}
                    className="flex items-center gap-2 ml-auto text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    Price <ArrowUpDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleSort('change')}
                    className="flex items-center gap-2 ml-auto text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    Change <ArrowUpDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleSort('volume')}
                    className="flex items-center gap-2 ml-auto text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    Volume <ArrowUpDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="px-6 py-4 text-right text-sm text-slate-600 dark:text-slate-400">
                  {activeTab === 'forex' ? 'Spread' : 'Market Cap'}
                </th>
                <th className="px-6 py-4 text-right text-sm text-slate-600 dark:text-slate-400">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {sortedData.map((item, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button className="text-slate-400 hover:text-amber-400 transition-colors">
                        <Star className="w-5 h-5" />
                      </button>
                      <span className="text-slate-900 dark:text-white">{item.symbol}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{item.name}</td>
                  <td className="px-6 py-4 text-right text-slate-900 dark:text-white">
                    ${item.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg ${
                      item.change > 0
                        ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                        : 'bg-red-500/10 text-red-600 dark:text-red-400'
                    }`}>
                      {item.change > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span>{item.change > 0 ? '+' : ''}{item.change}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-slate-600 dark:text-slate-400">{item.volume}</td>
                  <td className="px-6 py-4 text-right text-slate-600 dark:text-slate-400">
                    {activeTab === 'forex' ? (item as any).spread : (item as any).marketCap}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:shadow-lg hover:shadow-teal-500/25 transition-all">
                      Trade
                    </button>
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
