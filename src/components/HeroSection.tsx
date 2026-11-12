import React from 'react';
import { ArrowRight, Flame, ShieldCheck, Zap, RefreshCw, TrendingUp } from 'lucide-react';
import { PROTOCOL_STATS } from '../data/protocolData';
import { TabType } from '../types';

interface HeroSectionProps {
  onNavigate: (tab: TabType) => void;
  onScrollToSimulator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onScrollToSimulator,
}) => {
  return (
    <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      {/* Cyber Grid & Ambient Teal/Cyan Glows */}
      <div className="absolute inset-0 bg-cyber-grid pointer-events-none opacity-60" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#2DD4BF]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -left-20 w-[300px] h-[300px] bg-[#06B6D4]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[250px] h-[250px] bg-[#FCE7AF]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Super Header / Kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#07151B] border border-[#14323E] text-xs font-medium text-slate-300">
              <span className="w-2 h-2 rounded-full bg-[#2DD4BF] shadow-[0_0_8px_#2DD4BF]" />
              <span>Uniswap v3 & v4 Automated Management</span>
              <span className="text-slate-600">·</span>
              <span className="text-[#2DD4BF] font-mono">Robinhood Chain</span>
            </div>

            {/* Primary Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] text-balance">
              Automated <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2DD4BF] via-[#20E2D7] to-[#38BDF8] neon-text-glow">
                Liquidity Management
              </span>
            </h1>

            {/* Body Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              Maximize your concentrated liquidity trading fees with 24/7 automated range rebalancing, 
              compound fee reinvestment, and non-custodial user vaults. Never go out of range again.
            </p>

            {/* CTA Button Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => onNavigate('pools')}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold text-[#03080A] bg-gradient-to-r from-[#2DD4BF] via-[#20E2D7] to-[#06B6D4] hover:opacity-95 rounded-xl transition-all shadow-[0_0_25px_rgba(45,212,191,0.35)] cursor-pointer active:scale-95"
              >
                <span>Launch App & Explore Pools</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('well')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-200 bg-[#07161D] hover:bg-[#0B212B] border border-[#163644] hover:border-[#2DD4BF]/40 rounded-xl transition-all cursor-pointer"
              >
                <Flame className="w-4 h-4 text-[#2DD4BF]" />
                <span>The ZYNDEX (Stake & Earn ETH)</span>
              </button>

              <button
                onClick={onScrollToSimulator}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3.5 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-[#2DD4BF]" />
                <span>Test Live Simulator</span>
              </button>
            </div>

            {/* Trust Markers */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2DD4BF]" />
                <span>100% Non-Custodial Vaults</span>
              </div>
              <span className="text-slate-700 hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5">
                <RefreshCw className="w-4 h-4 text-[#2DD4BF]" />
                <span>Zero Gas Rebalance Costs</span>
              </div>
              <span className="text-slate-700 hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#2DD4BF]" />
                <span>Up to 3.8x Fee Multiplier</span>
              </div>
            </div>

          </div>

          {/* Right Column: Holographic Ring & Live Active Vault Preview */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Holographic Glowing Ring Container */}
            <div className="relative w-full max-w-[420px] aspect-square rounded-3xl bg-gradient-to-b from-[#0A1A22]/90 to-[#040A0D]/95 border border-[#163847] p-6 shadow-[0_0_60px_rgba(45,212,191,0.18)] flex flex-col justify-between overflow-hidden">
              
              {/* Corner accents */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#2DD4BF]/60" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#2DD4BF]/60" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#2DD4BF]/60" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#2DD4BF]/60" />

              {/* Header inside holographic card */}
              <div className="flex items-center justify-between pb-3 border-b border-[#122832]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#2DD4BF] shadow-[0_0_8px_#2DD4BF] animate-pulse" />
                  <span className="text-xs font-mono font-bold tracking-wider text-white">
                    ZYNDEX ENGINE
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#2DD4BF] bg-[#2DD4BF]/10 px-2 py-0.5 rounded border border-[#2DD4BF]/25">
                  REBALANCER ACTIVE
                </span>
              </div>

              {/* Center Logo Core & Glowing Halo */}
              <div className="relative my-4 flex items-center justify-center">
                <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-2xl p-1.5 border border-[#2DD4BF]/50 shadow-[0_0_40px_rgba(45,212,191,0.3)] bg-[#03080A]">
                  <img
                    src="/assets/aistudio/image_70f60f58.png"
                    alt="ZYNDEX Core Logo"
                    className="w-full h-full object-cover rounded-xl"
                  />
                  
                  {/* Floating tick indicator tag */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#06141A] border border-[#2DD4BF]/50 text-[#2DD4BF] text-[10px] font-mono font-bold py-1 px-3 rounded-full shadow-lg flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF]" />
                    IN-RANGE EFFICIENCY: 99.8%
                  </div>
                </div>
              </div>

              {/* Dynamic Telemetry Mini-Strip */}
              <div className="space-y-2 pt-2 border-t border-[#122832]">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Featured Active Pool</span>
                  <span className="font-mono text-white font-semibold">ZYNDEX / ETH (0.30%)</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Current Yield APY</span>
                  <span className="font-mono text-[#2DD4BF] font-bold text-sm">88.4% APY</span>
                </div>
                <div className="w-full bg-[#07171E] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-[#06B6D4] to-[#2DD4BF] h-full w-[85%] rounded-full shadow-[0_0_8px_#2DD4BF]" />
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Full-Width Key Metrics Strip */}
        <div className="mt-14 lg:mt-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          
          <div className="p-4 sm:p-5 rounded-2xl bg-[#061217]/90 border border-[#142D38] hover:border-[#2DD4BF]/30 transition-all">
            <div className="text-xs text-slate-400 mb-1">Total Value Locked</div>
            <div className="font-mono text-xl sm:text-2xl font-bold text-white tracking-tight">
              ${(PROTOCOL_STATS.tvl / 1000000).toFixed(2)}M
            </div>
            <div className="text-[11px] text-[#2DD4BF] mt-1 font-mono flex items-center gap-1">
              <span>+18.4%</span>
              <span className="text-slate-500">this month</span>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#061217]/90 border border-[#142D38] hover:border-[#2DD4BF]/30 transition-all">
            <div className="text-xs text-slate-400 mb-1">24h Trading Volume</div>
            <div className="font-mono text-xl sm:text-2xl font-bold text-white tracking-tight">
              ${(PROTOCOL_STATS.volume24h / 1000000).toFixed(2)}M
            </div>
            <div className="text-[11px] text-slate-400 mt-1 font-mono">
              Across all DEX pools
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#061217]/90 border border-[#142D38] hover:border-[#2DD4BF]/30 transition-all">
            <div className="text-xs text-slate-400 mb-1">Total Fees Harvested</div>
            <div className="font-mono text-xl sm:text-2xl font-bold text-[#2DD4BF] tracking-tight">
              ${(PROTOCOL_STATS.feesHarvested / 1000000).toFixed(2)}M
            </div>
            <div className="text-[11px] text-[#2DD4BF] mt-1 font-mono">
              100% Compounded
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#061217]/90 border border-[#142D38] hover:border-[#2DD4BF]/30 transition-all">
            <div className="text-xs text-slate-400 mb-1">Average Vault APY</div>
            <div className="font-mono text-xl sm:text-2xl font-bold text-white tracking-tight">
              {PROTOCOL_STATS.avgApy}%
            </div>
            <div className="text-[11px] text-slate-400 mt-1 font-mono">
              Concentrated Tick Boost
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 p-4 sm:p-5 rounded-2xl bg-[#061217]/90 border border-[#142D38] hover:border-[#2DD4BF]/30 transition-all">
            <div className="text-xs text-slate-400 mb-1">Staker Rewards Paid</div>
            <div className="font-mono text-xl sm:text-2xl font-bold text-[#2DD4BF] tracking-tight">
              {PROTOCOL_STATS.totalStakerRewardsEth} ETH
            </div>
            <div className="text-[11px] text-slate-400 mt-1 font-mono">
              ~$1.19M in native ETH
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
