import React, { useState } from 'react';
import { Pool } from '../types';
import { Search, ArrowUpDown, ShieldCheck, Zap, Sparkles, Filter } from 'lucide-react';

interface ExplorePoolsProps {
  pools: Pool[];
  onSelectPool: (pool: Pool) => void;
}

export const ExplorePools: React.FC<ExplorePoolsProps> = ({ pools, onSelectPool }) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'apy' | 'tvl' | 'volume'>('apy');

  const categories = [
    { id: 'all', label: 'All Vaults' },
    { id: 'robinhood', label: 'Robinhood Chain' },
    { id: 'bluechip', label: 'Bluechips' },
    { id: 'stable', label: 'Stablecoins' },
    { id: 'meme', label: 'Memes & Growth' },
  ];

  const filteredPools = pools
    .filter((pool) => {
      const matchesCategory =
        filterCategory === 'all' ||
        (filterCategory === 'robinhood' && (pool.category === 'robinhood' || pool.category === 'ecosystem')) ||
        pool.category === filterCategory;

      const matchesSearch =
        pool.token0.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pool.token1.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pool.token0.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pool.token1.name.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'apy') return b.apy - a.apy;
      if (sortBy === 'tvl') return b.tvl - a.tvl;
      if (sortBy === 'volume') return b.volume24h - a.volume24h;
      return 0;
    });

  return (
    <section className="py-12 bg-[#030708] min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header & Description */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#2DD4BF] mb-2">
              <Zap className="w-3.5 h-3.5" />
              <span>UNISWAP V3/V4 & ROBINHOOD AUTOMATED VAULTS</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
              Explore Liquidity <span className="text-[#2DD4BF] neon-text-glow">Pools</span>
            </h1>
            <p className="text-sm text-slate-300 max-w-xl mt-1">
              Automated rebalancing, dynamic tick management, and compounding yields across vetted concentrated liquidity pairs.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-[#07141A] p-2.5 rounded-xl border border-[#142C37]">
            <ShieldCheck className="w-4 h-4 text-[#2DD4BF]" />
            <span>Audited User-Owned Vault Smart Contracts</span>
          </div>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-2 bg-[#061217] rounded-2xl border border-[#132A35]">
          
          {/* Segmented Filter Buttons */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setFilterCategory(c.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  filterCategory === c.id
                    ? 'bg-[#2DD4BF] text-[#03080A] shadow-[0_0_15px_rgba(45,212,191,0.3)]'
                    : 'text-slate-300 hover:text-white hover:bg-[#0B1E26]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tokens..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-[#081820] border border-[#163340] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#2DD4BF]"
              />
            </div>

            <button
              onClick={() => {
                if (sortBy === 'apy') setSortBy('tvl');
                else if (sortBy === 'tvl') setSortBy('volume');
                else setSortBy('apy');
              }}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 bg-[#081820] border border-[#163340] rounded-xl hover:text-white hover:border-[#2DD4BF]/40 transition-colors cursor-pointer whitespace-nowrap"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-[#2DD4BF]" />
              <span className="uppercase font-mono">Sort: {sortBy}</span>
            </button>
          </div>

        </div>

        {/* Pools Table & Grid */}
        <div className="space-y-3">
          
          {/* Desktop Table Header */}
          <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 text-xs font-mono text-slate-400 border-b border-[#12242C]">
            <div className="col-span-4">POOL / PAIR</div>
            <div className="col-span-2 text-right">TOTAL VALUE LOCKED</div>
            <div className="col-span-2 text-right">24H VOLUME</div>
            <div className="col-span-2 text-right">AUTOMATED APY</div>
            <div className="col-span-2 text-right">ACTION</div>
          </div>

          {/* Pool Rows */}
          {filteredPools.map((pool) => (
            <div
              key={pool.id}
              className="p-5 sm:p-6 lg:px-6 lg:py-4 rounded-2xl bg-[#061217] border border-[#142C37] hover:border-[#2DD4BF]/50 hover:bg-[#091A22] transition-all group shadow-lg"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                
                {/* Column 1: Tokens & Metadata */}
                <div className="lg:col-span-4 flex items-center gap-3.5">
                  <div className="flex items-center -space-x-2 shrink-0">
                    <div className="w-10 h-10 rounded-full bg-[#050E12] border-2 border-[#142C37] overflow-hidden flex items-center justify-center p-0.5">
                      {pool.token0.icon.startsWith('/') || pool.token0.icon.startsWith('http') ? (
                        <img 
                          src={pool.token0.icon} 
                          alt={pool.token0.symbol} 
                          className="w-full h-full object-cover rounded-full"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <span className="text-xl">{pool.token0.icon}</span>
                      )}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#050E12] border-2 border-[#142C37] overflow-hidden flex items-center justify-center p-0.5">
                      {pool.token1.icon.startsWith('/') || pool.token1.icon.startsWith('http') ? (
                        <img 
                          src={pool.token1.icon} 
                          alt={pool.token1.symbol} 
                          className="w-full h-full object-cover rounded-full"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <span className="text-xl">{pool.token1.icon}</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display text-base font-bold text-white group-hover:text-[#2DD4BF] transition-colors">
                        {pool.token0.symbol} / {pool.token1.symbol}
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#0A1F28] text-[#2DD4BF] border border-[#153847]">
                        {pool.feeTier}
                      </span>
                      {pool.featured && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#2DD4BF]/20 text-[#2DD4BF] font-bold">
                          HOT
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5 font-mono">
                      <span>{pool.dex}</span>
                      <span>·</span>
                      <span className="text-[#2DD4BF]">{pool.strategy}</span>
                      <span>·</span>
                      <span>{pool.rebalanceFrequency}</span>
                    </div>
                  </div>
                </div>

                {/* Column 2: TVL */}
                <div className="lg:col-span-2 flex lg:flex-col justify-between lg:text-right border-t lg:border-t-0 pt-2 lg:pt-0 border-[#12242C]">
                  <span className="lg:hidden text-xs text-slate-400">TVL</span>
                  <div>
                    <div className="font-mono text-sm sm:text-base font-bold text-white">
                      ${(pool.tvl / 1000000).toFixed(2)}M
                    </div>
                    <div className="text-[11px] font-mono text-slate-400">
                      In-Range: {pool.inRangePercentage}%
                    </div>
                  </div>
                </div>

                {/* Column 3: 24h Volume */}
                <div className="lg:col-span-2 flex lg:flex-col justify-between lg:text-right border-t lg:border-t-0 pt-2 lg:pt-0 border-[#12242C]">
                  <span className="lg:hidden text-xs text-slate-400">24h Volume</span>
                  <div>
                    <div className="font-mono text-sm sm:text-base font-bold text-slate-200">
                      ${(pool.volume24h / 1000000).toFixed(2)}M
                    </div>
                    <div className="text-[11px] font-mono text-[#2DD4BF]">
                      High fee velocity
                    </div>
                  </div>
                </div>

                {/* Column 4: APY */}
                <div className="lg:col-span-2 flex lg:flex-col justify-between lg:text-right border-t lg:border-t-0 pt-2 lg:pt-0 border-[#12242C]">
                  <span className="lg:hidden text-xs text-slate-400">Automated APY</span>
                  <div>
                    <div className="font-mono text-base sm:text-lg font-black text-[#2DD4BF] neon-text-glow">
                      {pool.apy}%
                    </div>
                    <div className="text-[11px] font-mono text-slate-400">
                      Fee: {pool.feeApr}% {pool.rewardApr > 0 && `+ ${pool.rewardApr}% ZYNDEX`}
                    </div>
                  </div>
                </div>

                {/* Column 5: Deposit Action */}
                <div className="lg:col-span-2 flex justify-end pt-3 lg:pt-0">
                  <button
                    onClick={() => onSelectPool(pool)}
                    className="w-full lg:w-auto px-4 py-2.5 text-xs font-bold text-[#03080A] bg-gradient-to-r from-[#2DD4BF] via-[#20E2D7] to-[#06B6D4] hover:opacity-95 rounded-xl transition-all shadow-[0_0_15px_rgba(45,212,191,0.25)] cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Deposit & Automate</span>
                  </button>
                </div>

              </div>
            </div>
          ))}

          {filteredPools.length === 0 && (
            <div className="p-12 text-center rounded-2xl bg-[#061217] border border-[#142C37] space-y-3">
              <Filter className="w-8 h-8 text-slate-500 mx-auto" />
              <div className="text-sm font-semibold text-white">No pools match your search</div>
              <p className="text-xs text-slate-400">
                Try searching for a different token pair or reset your category filter.
              </p>
              <button
                onClick={() => {
                  setFilterCategory('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 text-xs font-semibold text-[#2DD4BF] bg-[#0A1C24] rounded-xl hover:bg-[#0E2833] cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
