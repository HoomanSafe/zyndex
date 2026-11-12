import React, { useState } from 'react';
import { BarChart3, TrendingUp, Flame, Shield, ExternalLink, ArrowUpRight } from 'lucide-react';
import { PROTOCOL_STATS } from '../data/protocolData';

export const AnalyticsView: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'7D' | '30D' | '90D' | '1Y'>('30D');

  const burnTransactions = [
    {
      hash: '0x8f2a...91b4',
      amount: '42,500 ZYNDEX',
      usdValue: '$78,200',
      time: '18 hours ago',
      source: 'Uniswap v3 Protocol Fee Buyback',
    },
    {
      hash: '0x3c1d...45e2',
      amount: '51,200 ZYNDEX',
      usdValue: '$94,208',
      time: '3 days ago',
      source: 'Robinhood DEX Rebalance Fee Sweep',
    },
    {
      hash: '0x7e4b...11a9',
      amount: '38,900 ZYNDEX',
      usdValue: '$71,576',
      time: '6 days ago',
      source: 'Arbitrum Fee Share Buyback',
    },
    {
      hash: '0x99f2...80d1',
      amount: '64,100 ZYNDEX',
      usdValue: '$117,944',
      time: '10 days ago',
      source: 'Monthly Burn Event #14',
    },
  ];

  return (
    <section className="py-12 bg-[#030708] min-h-[75vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#2DD4BF] mb-2">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>ON-CHAIN PROTOCOL TRANSPARENCY</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
              Protocol <span className="text-[#2DD4BF] neon-text-glow">Analytics</span>
            </h1>
            <p className="text-sm text-slate-300 max-w-xl mt-1">
              Real-time on-chain telemetry, TVL growth, fee generation, buyback & burn records.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>Last Updated:</span>
            <span className="text-[#2DD4BF]">Block #19,482,109</span>
          </div>
        </div>

        {/* TVL Interactive Chart Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#061217] border border-[#142C37] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs text-slate-400">Total Value Locked (TVL)</div>
              <div className="font-mono text-3xl sm:text-4xl font-black text-white mt-1">
                ${(PROTOCOL_STATS.tvl / 1000000).toFixed(2)}M USD
              </div>
              <div className="text-xs text-[#2DD4BF] font-mono mt-1 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+71.8% over selected timeframe</span>
              </div>
            </div>

            {/* Timeframe selector */}
            <div className="flex items-center gap-1 p-1 bg-[#040A0D] rounded-xl border border-[#12242D] self-start sm:self-auto">
              {(['7D', '30D', '90D', '1Y'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1.5 text-xs font-mono font-semibold rounded-lg transition-all cursor-pointer ${
                    timeframe === tf
                      ? 'bg-[#2DD4BF] text-[#03080A]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Smooth Curve Chart */}
          <div className="relative h-60 w-full pt-4">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 700 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="tvlGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.4" />
                  <stop offset="60%" stopColor="#06B6D4" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Area */}
              <path
                d="M 0 160 C 100 140, 200 120, 300 90 C 400 60, 550 40, 700 10 L 700 200 L 0 200 Z"
                fill="url(#tvlGradient)"
              />

              {/* Stroke */}
              <path
                d="M 0 160 C 100 140, 200 120, 300 90 C 400 60, 550 40, 700 10"
                fill="none"
                stroke="#2DD4BF"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Data points */}
              <circle cx="0" cy="160" r="4" fill="#2DD4BF" />
              <circle cx="150" cy="130" r="4" fill="#2DD4BF" />
              <circle cx="300" cy="90" r="4" fill="#2DD4BF" />
              <circle cx="450" cy="50" r="4" fill="#2DD4BF" />
              <circle cx="700" cy="10" r="5" fill="#FFFFFF" stroke="#2DD4BF" strokeWidth="3" />
            </svg>

            {/* Labels */}
            <div className="flex justify-between text-xs font-mono text-slate-500 pt-3 border-t border-[#12242D] mt-2">
              <span>{timeframe === '7D' ? '7 Days Ago' : timeframe === '30D' ? '30 Days Ago' : '1 Year Ago'}</span>
              <span>Mid Period</span>
              <span className="text-[#2DD4BF] font-bold">Today (${(PROTOCOL_STATS.tvl / 1000000).toFixed(2)}M)</span>
            </div>
          </div>
        </div>

        {/* Revenue Allocation & Burn Ledger Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Revenue Allocation Model (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-7 rounded-3xl bg-[#061217] border border-[#142C37] space-y-5">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#2DD4BF]" />
              <h3 className="font-display text-base font-bold text-white">Protocol Fee Distribution</h3>
            </div>
            <p className="text-xs text-slate-400">
              ZYNDEX charges a 2% performance fee only on accrued profits. 0% is charged on principal deposits or withdrawals.
            </p>

            <div className="space-y-3">
              
              <div className="p-3.5 rounded-xl bg-[#040A0D] border border-[#153442] space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">30% The Well Stakers (Native ETH)</span>
                  <span className="font-mono text-[#2DD4BF] font-bold">30%</span>
                </div>
                <div className="w-full bg-[#0A1A22] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#2DD4BF] h-full w-[30%]" />
                </div>
                <div className="text-[11px] text-slate-400">
                  Streamed directly to token stakers with zero lockup
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#040A0D] border border-[#132A35] space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">20% Buyback & Burn</span>
                  <span className="font-mono text-white font-bold">20%</span>
                </div>
                <div className="w-full bg-[#0A1A22] h-2 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 h-full w-[20%]" />
                </div>
                <div className="text-[11px] text-slate-400">
                  Market-bought and sent to 0x000...dead to reduce supply
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#040A0D] border border-[#132A35] space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">10% Safety & Insurance Vault</span>
                  <span className="font-mono text-white font-bold">10%</span>
                </div>
                <div className="w-full bg-[#0A1A22] h-2 rounded-full overflow-hidden">
                  <div className="bg-teal-500 h-full w-[10%]" />
                </div>
                <div className="text-[11px] text-slate-400">
                  Emergency liquidity cushion against black swan depegs
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#040A0D] border border-[#132A35] space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">40% Rebalance Gas & Infrastructure</span>
                  <span className="font-mono text-white font-bold">40%</span>
                </div>
                <div className="w-full bg-[#0A1A22] h-2 rounded-full overflow-hidden">
                  <div className="bg-slate-500 h-full w-[40%]" />
                </div>
                <div className="text-[11px] text-slate-400">
                  Funds continuous multi-chain rebalancing bots & servers
                </div>
              </div>

            </div>
          </div>

          {/* Buyback & Burn Ledger (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-7 rounded-3xl bg-[#061217] border border-[#142C37] space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-cyan-400" />
                <h3 className="font-display text-base font-bold text-white">Buyback & Burn Ledger</h3>
              </div>
              <span className="text-xs font-mono text-[#2DD4BF]">
                Total Burned: ${(PROTOCOL_STATS.totalBurnedZyndexUsd / 1000).toFixed(0)}K
              </span>
            </div>

            <div className="space-y-2.5">
              {burnTransactions.map((tx, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#040A0D] border border-[#12242D] hover:border-[#2DD4BF]/30 transition-colors flex items-center justify-between text-xs font-mono"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[#2DD4BF] font-bold">{tx.amount}</span>
                      <span className="text-white">({tx.usdValue})</span>
                    </div>
                    <div className="text-[11px] text-slate-400">{tx.source}</div>
                  </div>

                  <div className="text-right space-y-0.5">
                    <div className="text-slate-400 text-[11px]">{tx.time}</div>
                    <a
                      href={`https://etherscan.io/tx/${tx.hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#2DD4BF] hover:underline flex items-center gap-1 text-[11px] justify-end"
                    >
                      <span>{tx.hash}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
              <span>Dead Burn Address:</span>
              <span className="font-mono text-slate-300">0x000000000000000000000000000000000000dEaD</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
