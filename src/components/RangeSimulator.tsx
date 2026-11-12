import React, { useState } from 'react';
import { Sliders, RefreshCw, AlertTriangle, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

export const RangeSimulator: React.FC = () => {
  const [priceShift, setPriceShift] = useState<number>(12); // percentage shift -25 to +25
  const [depositAmount, setDepositAmount] = useState<number>(10000);

  // Manual LP static boundaries: -7% to +7%
  const manualLower = -7;
  const manualUpper = 7;
  const isManualInRange = priceShift >= manualLower && priceShift <= manualUpper;

  // ZYNDEX dynamic boundaries: always centered around current price +/- 5%
  const zyndexLower = priceShift - 5;
  const zyndexUpper = priceShift + 5;

  // APR calculations
  const manualApr = isManualInRange ? 24.5 : 0.0;
  const zyndexApr = 58.4; // High concentrated multiplier

  const manualEstReturn = (depositAmount * (manualApr / 100)).toFixed(0);
  const zyndexEstReturn = (depositAmount * (zyndexApr / 100)).toFixed(0);
  const feeDifference = Number(zyndexEstReturn) - Number(manualEstReturn);

  return (
    <section id="simulator-section" className="py-16 bg-[#030607] relative border-y border-[#0E2028]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06151B] border border-[#14323E] text-xs font-semibold text-[#2DD4BF]">
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Protocol Engine</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Manual Range LP vs. <span className="text-[#2DD4BF] neon-text-glow">ZYNDEX Automation</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            See how Uniswap concentrated liquidity breaks when prices swing, and how ZYNDEX’s 24/7 automated vaults
            keep your capital continuously earning fees.
          </p>
        </div>

        {/* Interactive Controls Bar */}
        <div className="max-w-4xl mx-auto p-5 sm:p-6 rounded-2xl bg-[#061217] border border-[#142C37] shadow-xl mb-10 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            {/* Price Shift Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-medium mb-2">
                <span className="text-slate-300">Simulate Market Price Movement:</span>
                <span className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${
                  priceShift > 0 
                    ? 'text-[#2DD4BF] bg-[#2DD4BF]/10' 
                    : priceShift < 0 
                    ? 'text-red-400 bg-red-950/40' 
                    : 'text-slate-300 bg-slate-800'
                }`}>
                  {priceShift > 0 ? `+${priceShift}% (Bullish)` : priceShift < 0 ? `${priceShift}% (Bearish)` : '0% (Flat)'}
                </span>
              </div>
              <input
                type="range"
                min="-25"
                max="25"
                step="1"
                value={priceShift}
                onChange={(e) => setPriceShift(Number(e.target.value))}
                className="w-full h-2 bg-[#0C1E26] rounded-lg appearance-none cursor-pointer accent-[#2DD4BF]"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
                <span>-25% Crash</span>
                <span>Spot (0%)</span>
                <span>+25% Surge</span>
              </div>
            </div>

            {/* Deposit Capital Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-medium mb-2">
                <span className="text-slate-300">Simulated Deposit Size:</span>
                <span className="font-mono font-bold text-white text-xs bg-[#091D26] px-2 py-0.5 rounded border border-[#163847]">
                  ${depositAmount.toLocaleString()} USD
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="50000"
                step="1000"
                value={depositAmount}
                onChange={(e) => setDepositAmount(Number(e.target.value))}
                className="w-full h-2 bg-[#0C1E26] rounded-lg appearance-none cursor-pointer accent-[#2DD4BF]"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
                <span>$1,000</span>
                <span>$25,000</span>
                <span>$50,000</span>
              </div>
            </div>

          </div>

          {/* Quick preset chips */}
          <div className="flex items-center gap-2 pt-2 border-t border-[#12242D] text-xs">
            <span className="text-slate-400">Presets:</span>
            <button
              onClick={() => setPriceShift(0)}
              className="px-2.5 py-1 rounded bg-[#0A1A22] hover:bg-[#0E2530] text-slate-300 text-xs cursor-pointer"
            >
              Baseline (0%)
            </button>
            <button
              onClick={() => setPriceShift(14)}
              className="px-2.5 py-1 rounded bg-[#0A1A22] hover:bg-[#0E2530] text-slate-300 text-xs cursor-pointer"
            >
              Price Rally (+14%)
            </button>
            <button
              onClick={() => setPriceShift(-18)}
              className="px-2.5 py-1 rounded bg-[#0A1A22] hover:bg-[#0E2530] text-slate-300 text-xs cursor-pointer"
            >
              Market Dip (-18%)
            </button>
          </div>

        </div>

        {/* Side-by-Side Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* Card 1: Standard Unmanaged Uniswap LP */}
          <div className={`p-6 sm:p-7 rounded-2xl border transition-all ${
            isManualInRange
              ? 'bg-[#08151B] border-[#142F3C]'
              : 'bg-[#150A0B] border-red-900/50 shadow-[0_0_25px_rgba(239,68,68,0.1)]'
          }`}>
            <div className="flex items-center justify-between pb-4 border-b border-[#142A35]">
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-slate-400">Traditional Approach</span>
                <h3 className="font-display text-lg font-bold text-white mt-0.5">Manual Static LP</h3>
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                isManualInRange
                  ? 'bg-teal-950 text-teal-400 border border-teal-800'
                  : 'bg-red-950 text-red-400 border border-red-800 animate-pulse'
              }`}>
                {isManualInRange ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>In Range</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>OUT OF RANGE</span>
                  </>
                )}
              </div>
            </div>

            {/* Visual Tick Visualizer Track */}
            <div className="my-6 space-y-2">
              <div className="flex justify-between text-xs font-mono text-slate-400">
                <span>-25%</span>
                <span className="text-white">Fixed Bounds [-7% to +7%]</span>
                <span>+25%</span>
              </div>

              <div className="relative h-12 w-full bg-[#050C0E] rounded-xl border border-[#132A34] overflow-hidden flex items-center">
                
                {/* Fixed LP Range Area */}
                <div 
                  className={`absolute h-8 rounded-lg top-2 transition-colors ${
                    isManualInRange ? 'bg-teal-500/20 border border-teal-500/50' : 'bg-red-500/15 border border-red-500/40'
                  }`}
                  style={{
                    left: `${((manualLower + 25) / 50) * 100}%`,
                    width: `${((manualUpper - manualLower) / 50) * 100}%`,
                  }}
                >
                  <span className="text-[10px] font-mono text-slate-300 flex items-center justify-center h-full">
                    Fixed LP
                  </span>
                </div>

                {/* Current Price Dot */}
                <div 
                  className="absolute top-1 bottom-1 w-3 rounded-full bg-white shadow-[0_0_12px_#ffffff] -translate-x-1.5 z-10 transition-all duration-300"
                  style={{ left: `${((priceShift + 25) / 50) * 100}%` }}
                />

              </div>

              <div className="text-right text-[11px] font-mono text-slate-400">
                Current Spot Price: <span className="text-white font-bold">{priceShift > 0 ? `+${priceShift}%` : `${priceShift}%`}</span>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between text-sm py-2 border-b border-[#142A35]">
                <span className="text-slate-400">Effective Trading Fee APR</span>
                <span className={`font-mono font-bold ${isManualInRange ? 'text-white' : 'text-red-400'}`}>
                  {manualApr}% APR
                </span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-[#142A35]">
                <span className="text-slate-400">Est. 1-Year Earnings</span>
                <span className="font-mono font-bold text-white">
                  ${manualEstReturn} USD
                </span>
              </div>
              <div className="flex justify-between text-sm py-2">
                <span className="text-slate-400">Human Action Required</span>
                <span className="font-mono text-xs text-amber-400">
                  {isManualInRange ? 'None (Yet)' : 'Manual Gas & Reposition Needed'}
                </span>
              </div>
            </div>

            {!isManualInRange && (
              <div className="mt-4 p-3 rounded-xl bg-red-950/40 border border-red-800/40 text-xs text-red-300 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                <span>Price broke your range! Your capital is 100% idle and earning 0 fees until you manually burn gas to re-deposit.</span>
              </div>
            )}
          </div>

          {/* Card 2: ZYNDEX Automated Vault */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[#081820] border border-[#2DD4BF]/50 shadow-[0_0_35px_rgba(45,212,191,0.18)] relative overflow-hidden">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#143644]">
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-[#2DD4BF]">Continuous Rebalancer</span>
                <h3 className="font-display text-lg font-bold text-white mt-0.5 flex items-center gap-2">
                  ZYNDEX Automated Vault
                  <Sparkles className="w-4 h-4 text-[#2DD4BF]" />
                </h3>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#2DD4BF]/15 text-[#2DD4BF] border border-[#2DD4BF]/40 shadow-[0_0_12px_rgba(45,212,191,0.2)]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Always 100% In Range</span>
              </div>
            </div>

            {/* Visual Dynamic Range Track */}
            <div className="my-6 space-y-2">
              <div className="flex justify-between text-xs font-mono text-slate-400">
                <span>-25%</span>
                <span className="text-[#2DD4BF] font-semibold">Active Band [{zyndexLower.toFixed(0)}% to {zyndexUpper.toFixed(0)}%]</span>
                <span>+25%</span>
              </div>

              <div className="relative h-12 w-full bg-[#040B0E] rounded-xl border border-[#163847] overflow-hidden flex items-center">
                
                {/* Dynamically Rebalanced Range Area */}
                <div 
                  className="absolute h-8 rounded-lg top-2 bg-[#2DD4BF]/25 border border-[#2DD4BF] shadow-[0_0_15px_rgba(45,212,191,0.3)] transition-all duration-300"
                  style={{
                    left: `${Math.max(0, Math.min(80, ((zyndexLower + 25) / 50) * 100))}%`,
                    width: '20%',
                  }}
                >
                  <span className="text-[10px] font-mono text-[#2DD4BF] font-bold flex items-center justify-center h-full">
                    Auto Range
                  </span>
                </div>

                {/* Current Price Dot */}
                <div 
                  className="absolute top-1 bottom-1 w-3 rounded-full bg-white shadow-[0_0_14px_#2DD4BF] -translate-x-1.5 z-10 transition-all duration-300"
                  style={{ left: `${((priceShift + 25) / 50) * 100}%` }}
                />

              </div>

              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400">Rebalance Cost: <span className="text-[#2DD4BF] font-bold">0 Gas (Batched)</span></span>
                <span className="text-[#2DD4BF] font-bold flex items-center gap-1">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  Auto-Centered
                </span>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between text-sm py-2 border-b border-[#143644]">
                <span className="text-slate-300">Effective Trading Fee APR</span>
                <span className="font-mono font-bold text-[#2DD4BF] text-base">
                  {zyndexApr}% APR (Concentrated Multiplier)
                </span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-[#143644]">
                <span className="text-slate-300">Est. 1-Year Earnings</span>
                <span className="font-mono font-bold text-[#2DD4BF] text-base">
                  ${zyndexEstReturn} USD
                </span>
              </div>
              <div className="flex justify-between text-sm py-2">
                <span className="text-slate-300">Compound Reinvestment</span>
                <span className="font-mono text-xs text-white bg-[#2DD4BF]/20 px-2 py-0.5 rounded border border-[#2DD4BF]/30">
                  Continuous Auto-Harvest
                </span>
              </div>
            </div>

            {/* Fee advantage callout */}
            <div className="mt-4 p-3 rounded-xl bg-[#08202A] border border-[#2DD4BF]/40 text-xs text-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#2DD4BF]" />
                <span>ZYNDEX Added Gain:</span>
              </div>
              <span className="font-mono font-bold text-[#2DD4BF] text-sm">
                +${feeDifference.toLocaleString()} USD ({feeDifference > 0 ? `${(zyndexApr / Math.max(1, manualApr)).toFixed(1)}x` : 'Equal'})
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
