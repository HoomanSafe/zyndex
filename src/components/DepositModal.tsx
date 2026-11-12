import React, { useState } from 'react';
import { Pool, UserPosition } from '../types';
import { X, ShieldCheck, Sparkles, RefreshCw, CheckCircle2, ChevronRight, Zap } from 'lucide-react';

interface DepositModalProps {
  pool: Pool | null;
  isOpen: boolean;
  onClose: () => void;
  onDepositSuccess: (newPosition: UserPosition) => void;
}

export const DepositModal: React.FC<DepositModalProps> = ({
  pool,
  isOpen,
  onClose,
  onDepositSuccess,
}) => {
  if (!isOpen || !pool) return null;

  const [amount0, setAmount0] = useState<string>('0.5');
  const [amount1, setAmount1] = useState<string>('1710');
  const [strategy, setStrategy] = useState<'Tight' | 'Balanced' | 'Wide'>('Balanced');
  const [autoReinvest, setAutoReinvest] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [depositStep, setDepositStep] = useState<'input' | 'approving' | 'confirming' | 'complete'>('input');

  const parsedAmount0 = parseFloat(amount0) || 0;
  const parsedAmount1 = parseFloat(amount1) || 0;
  const totalUsd = parsedAmount0 * pool.token0.priceUsd + parsedAmount1 * pool.token1.priceUsd;

  // Multiplier by strategy
  const strategyMultiplier = strategy === 'Tight' ? 1.3 : strategy === 'Balanced' ? 1.0 : 0.75;
  const effectiveApy = pool.apy * strategyMultiplier;

  const dailyYieldUsd = (totalUsd * (effectiveApy / 100)) / 365;
  const monthlyYieldUsd = dailyYieldUsd * 30;
  const yearlyYieldUsd = totalUsd * (effectiveApy / 100);

  const handleSetQuickRatio = (percentage: number) => {
    const base0 = 1.0;
    const base1 = (base0 * pool.token0.priceUsd) / pool.token1.priceUsd;
    const factor = percentage / 100;
    setAmount0((base0 * factor).toFixed(3));
    setAmount1((base1 * factor).toFixed(2));
  };

  const handleExecuteDeposit = () => {
    setIsSubmitting(true);
    setDepositStep('approving');

    setTimeout(() => {
      setDepositStep('confirming');
      setTimeout(() => {
        setDepositStep('complete');
        const newPos: UserPosition = {
          id: `pos-${Date.now()}`,
          poolId: pool.id,
          poolTitle: `${pool.token0.symbol} / ${pool.token1.symbol}`,
          pair: `${pool.token0.symbol}/${pool.token1.symbol}`,
          depositedAmount0: parsedAmount0,
          depositedAmount1: parsedAmount1,
          depositedUsd: totalUsd,
          currentValueUsd: totalUsd,
          unclaimedFeesUsd: 0,
          unclaimedToken0: 0,
          unclaimedToken1: 0,
          pnlUsd: 0,
          pnlPercentage: 0,
          status: 'In Range',
          strategy: `${strategy} Adaptive`,
          autoReinvest: autoReinvest,
          lastRebalancedAt: 'Just now',
          rebalanceCount: 1,
        };

        setTimeout(() => {
          onDepositSuccess(newPos);
          setIsSubmitting(false);
          setDepositStep('input');
          onClose();
        }, 1200);
      }, 1200);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-[#061217] border border-[#163847] p-6 shadow-[0_0_60px_rgba(45,212,191,0.2)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Glow Accent */}
        <div className="absolute top-0 right-1/4 w-48 h-48 bg-[#2DD4BF]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#12242C]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#091D24] border border-[#2DD4BF]/30 flex items-center justify-center text-lg">
              {pool.token0.icon.startsWith('/') || pool.token0.icon.startsWith('http') ? (
                <img src={pool.token0.icon} alt="" className="w-6 h-6 rounded-full" />
              ) : (
                pool.token0.icon
              )}
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                Deposit to {pool.token0.symbol} / {pool.token1.symbol}
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#2DD4BF]/10 text-[#2DD4BF] border border-[#2DD4BF]/25">
                  {pool.feeTier}
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Non-Custodial Automated Vault · <span className="text-[#2DD4BF]">{pool.dex}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#0B212B] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {depositStep === 'complete' ? (
          /* Success Screen */
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#2DD4BF]/20 border border-[#2DD4BF] mx-auto flex items-center justify-center text-[#2DD4BF] shadow-[0_0_30px_rgba(45,212,191,0.4)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-display text-xl font-bold text-white">
              Vault Successfully Created!
            </h4>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              Your liquidity is now active on-chain and actively managed by ZYNDEX 24/7 autonomous rebalancers.
            </p>
          </div>
        ) : isSubmitting ? (
          /* Loading Steps */
          <div className="py-12 text-center space-y-5">
            <div className="w-14 h-14 rounded-full border-4 border-[#2DD4BF] border-t-transparent animate-spin mx-auto" />
            <div className="space-y-1">
              <h4 className="font-display text-base font-bold text-white">
                {depositStep === 'approving' ? '1/2 Approving Token Transfers...' : '2/2 Minting Non-Custodial Vault Position...'}
              </h4>
              <p className="text-xs text-slate-400 font-mono">
                {depositStep === 'approving' ? 'Confirming ERC-20 allowances' : 'Submitting to Robinhood Chain Smart Contract'}
              </p>
            </div>
          </div>
        ) : (
          /* Normal Input Form */
          <div className="mt-5 space-y-5">
            
            {/* Quick Percentage Presets */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Deposit Amount:</span>
              <div className="flex gap-1.5">
                {[25, 50, 75, 100].map((pct) => (
                  <button
                    key={pct}
                    onClick={() => handleSetQuickRatio(pct)}
                    className="px-2 py-0.5 rounded bg-[#091C24] text-slate-300 hover:text-[#2DD4BF] text-[11px] font-mono border border-[#142A34] cursor-pointer"
                  >
                    {pct === 100 ? 'MAX' : `${pct}%`}
                  </button>
                ))}
              </div>
            </div>

            {/* Token 0 Input */}
            <div className="p-3.5 rounded-2xl bg-[#07151B] border border-[#142C37] space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>{pool.token0.symbol} Amount</span>
                <span>Balance: 2.845 {pool.token0.symbol}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <input
                  type="number"
                  value={amount0}
                  onChange={(e) => setAmount0(e.target.value)}
                  placeholder="0.0"
                  step="any"
                  className="w-full bg-transparent text-xl font-mono font-bold text-white focus:outline-none"
                />
                <span className="font-mono text-sm font-semibold text-[#2DD4BF] px-2.5 py-1 rounded bg-[#0B212B] border border-[#163847]">
                  {pool.token0.symbol}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                ≈ ${(parsedAmount0 * pool.token0.priceUsd).toFixed(2)} USD
              </div>
            </div>

            {/* Token 1 Input */}
            <div className="p-3.5 rounded-2xl bg-[#07151B] border border-[#142C37] space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>{pool.token1.symbol} Amount</span>
                <span>Balance: 4,850.00 {pool.token1.symbol}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <input
                  type="number"
                  value={amount1}
                  onChange={(e) => setAmount1(e.target.value)}
                  placeholder="0.0"
                  step="any"
                  className="w-full bg-transparent text-xl font-mono font-bold text-white focus:outline-none"
                />
                <span className="font-mono text-sm font-semibold text-white px-2.5 py-1 rounded bg-[#0B212B] border border-[#163847]">
                  {pool.token1.symbol}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                ≈ ${(parsedAmount1 * pool.token1.priceUsd).toFixed(2)} USD
              </div>
            </div>

            {/* Strategy Selection */}
            <div>
              <div className="text-xs text-slate-400 mb-2 flex items-center justify-between">
                <span>Automated Tick Strategy:</span>
                <span className="text-[#2DD4BF] font-mono text-[11px]">
                  Est. APY: {effectiveApy.toFixed(1)}%
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['Tight', 'Balanced', 'Wide'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStrategy(s)}
                    className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                      strategy === s
                        ? 'bg-[#2DD4BF]/15 border-[#2DD4BF] text-[#2DD4BF]'
                        : 'bg-[#07141A] border-[#132A35] text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold">{s}</div>
                    <div className="text-[10px] opacity-80 mt-0.5">
                      {s === 'Tight' ? 'High fees, ±4%' : s === 'Balanced' ? 'Optimal, ±8%' : 'Safety, ±16%'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Auto-Reinvest Toggle */}
            <div 
              onClick={() => setAutoReinvest(!autoReinvest)}
              className="flex items-center justify-between p-3 rounded-xl bg-[#07151B] border border-[#142C37] cursor-pointer hover:border-[#2DD4BF]/30 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <RefreshCw className="w-4 h-4 text-[#2DD4BF]" />
                <div>
                  <div className="text-xs font-semibold text-white">Auto-Compound Fees</div>
                  <div className="text-[11px] text-slate-400">Reinvest collected trading fees back into position</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={autoReinvest}
                onChange={() => {}}
                className="w-4 h-4 accent-[#2DD4BF] rounded cursor-pointer"
              />
            </div>

            {/* Estimated Returns Summary Box */}
            <div className="p-3.5 rounded-xl bg-[#081820] border border-[#153442] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Total Deposit Value:</span>
                <span className="font-mono font-bold text-white text-sm">
                  ${totalUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-[#12242D] text-center">
                <div>
                  <div className="text-[10px] text-slate-400">Daily Return</div>
                  <div className="font-mono text-xs font-bold text-[#2DD4BF]">
                    +${dailyYieldUsd.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Monthly Return</div>
                  <div className="font-mono text-xs font-bold text-[#2DD4BF]">
                    +${monthlyYieldUsd.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">1-Year Est.</div>
                  <div className="font-mono text-xs font-bold text-[#2DD4BF]">
                    +${yearlyYieldUsd.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={handleExecuteDeposit}
              disabled={totalUsd <= 0}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-display text-sm font-bold text-[#03080A] bg-gradient-to-r from-[#2DD4BF] via-[#20E2D7] to-[#06B6D4] hover:opacity-95 shadow-[0_0_20px_rgba(45,212,191,0.35)] transition-all cursor-pointer active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-4 h-4" />
              <span>Confirm & Start Automated Vault</span>
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-mono text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2DD4BF]" />
              <span>Non-custodial smart contracts · Instant withdrawal anytime</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
