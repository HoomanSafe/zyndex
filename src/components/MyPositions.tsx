import React, { useState } from 'react';
import { UserPosition, TabType } from '../types';
import { Briefcase, RefreshCw, CheckCircle2, ArrowUpRight, Plus, ShieldCheck, Check, Sparkles } from 'lucide-react';

interface MyPositionsProps {
  positions: UserPosition[];
  onNavigate: (tab: TabType) => void;
  onClaimFees: (posId: string) => void;
  onReinvestFees: (posId: string) => void;
  onWithdraw: (posId: string) => void;
}

export const MyPositions: React.FC<MyPositionsProps> = ({
  positions,
  onNavigate,
  onClaimFees,
  onReinvestFees,
  onWithdraw,
}) => {
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const totalValueUsd = positions.reduce((acc, p) => acc + p.currentValueUsd, 0);
  const totalUnclaimedUsd = positions.reduce((acc, p) => acc + p.unclaimedFeesUsd, 0);
  const totalPnlUsd = positions.reduce((acc, p) => acc + p.pnlUsd, 0);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleClaim = (pos: UserPosition) => {
    onClaimFees(pos.id);
    showToast(`Claimed $${pos.unclaimedFeesUsd.toFixed(2)} in trading fees!`);
  };

  const handleReinvest = (pos: UserPosition) => {
    onReinvestFees(pos.id);
    showToast(`Reinvested $${pos.unclaimedFeesUsd.toFixed(2)} into active liquidity ticks!`);
  };

  const handleWithdraw = (pos: UserPosition) => {
    onWithdraw(pos.id);
    showToast(`Withdrew position ${pos.pair} back to wallet.`);
  };

  const activityLog = [
    {
      time: '45 mins ago',
      pool: 'ZYNDEX / ETH',
      action: 'Automated Tick Shift',
      detail: 'Price shifted +1.8%. Engine re-centered tick range [1.81 → 1.87].',
      gasSaved: '0.0084 ETH ($28.70)',
    },
    {
      time: '2 hours ago',
      pool: 'ETH / USDC',
      action: 'Compounding Auto-Harvest',
      detail: 'Collected $92.30 USDC + 0.027 ETH. Re-deposited into pool.',
      gasSaved: '0.0042 ETH ($14.36)',
    },
    {
      time: '6 hours ago',
      pool: 'ETH / USDC',
      action: 'Volatility Buffer Expanded',
      detail: 'Anticipated market volume surge, expanded tick width to prevent slippage.',
      gasSaved: '0.0061 ETH ($20.86)',
    },
    {
      time: '14 hours ago',
      pool: 'ZYNDEX / ETH',
      action: 'Periodic Rebalance',
      detail: 'Shifted bounds to optimize fee capture on Robinhood DEX.',
      gasSaved: '0.0078 ETH ($26.67)',
    },
  ];

  return (
    <section className="py-12 bg-[#030708] min-h-[75vh]">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#081B23] border border-[#2DD4BF] shadow-[0_0_30px_rgba(45,212,191,0.3)] text-white text-xs font-mono flex items-center gap-2.5 animate-in slide-in-from-bottom duration-200">
          <Check className="w-4 h-4 text-[#2DD4BF]" />
          <span>{toastMsg}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#2DD4BF] mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>ACTIVE USER-OWNED AUTOMATED VAULTS</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
              My <span className="text-[#2DD4BF] neon-text-glow">Positions</span>
            </h1>
            <p className="text-sm text-slate-300 max-w-xl mt-1">
              Live non-custodial positions actively tracked and compounded by the ZYNDEX protocol.
            </p>
          </div>

          <button
            onClick={() => onNavigate('pools')}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-[#03080A] bg-gradient-to-r from-[#2DD4BF] via-[#20E2D7] to-[#06B6D4] hover:opacity-95 rounded-xl transition-all shadow-[0_0_15px_rgba(45,212,191,0.25)] cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Open New Vault</span>
          </button>
        </div>

        {/* Aggregate KPI Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <div className="p-5 rounded-2xl bg-[#061217] border border-[#142C37]">
            <div className="text-xs text-slate-400">Total Portfolio Value</div>
            <div className="font-mono text-2xl font-black text-white mt-1">
              ${totalValueUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-[#2DD4BF] mt-1 font-mono">
              +${totalPnlUsd.toFixed(2)} All-Time PnL
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#061217] border border-[#142C37]">
            <div className="text-xs text-slate-400">Unclaimed Fee Earnings</div>
            <div className="font-mono text-2xl font-black text-[#2DD4BF] mt-1 neon-text-glow">
              ${totalUnclaimedUsd.toFixed(2)}
            </div>
            <div className="text-[11px] text-slate-400 mt-1 font-mono">
              Ready to claim or compound
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#061217] border border-[#142C37]">
            <div className="text-xs text-slate-400">Active Automated Vaults</div>
            <div className="font-mono text-2xl font-black text-white mt-1">
              {positions.length} Vaults
            </div>
            <div className="text-[11px] text-[#2DD4BF] mt-1 font-mono flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>100% In-Range Efficiency</span>
            </div>
          </div>

        </div>

        {/* Positions List */}
        <div className="space-y-4">
          {positions.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-[#061217] border border-[#142C37] space-y-4">
              <Briefcase className="w-10 h-10 text-slate-500 mx-auto" />
              <div className="text-base font-bold text-white">No Active Vaults Found</div>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                You do not have any active liquidity positions yet. Deposit into a pool to start earning automated compounding fees.
              </p>
              <button
                onClick={() => onNavigate('pools')}
                className="px-5 py-2.5 text-xs font-bold text-[#03080A] bg-gradient-to-r from-[#2DD4BF] via-[#20E2D7] to-[#06B6D4] hover:opacity-95 rounded-xl transition-all cursor-pointer shadow-[0_0_15px_rgba(45,212,191,0.25)]"
              >
                Browse Pools & Vaults
              </button>
            </div>
          ) : (
            positions.map((pos) => (
              <div
                key={pos.id}
                className="p-6 rounded-3xl bg-[#061217] border border-[#152E3A] hover:border-[#2DD4BF]/40 transition-all space-y-5 shadow-lg"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#12242D]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0B1E26] border border-[#2DD4BF]/30 flex items-center justify-center font-display font-black text-[#2DD4BF]">
                      {pos.pair.split('/')[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-lg font-bold text-white">{pos.poolTitle}</h3>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#2DD4BF]/10 text-[#2DD4BF] border border-[#2DD4BF]/25">
                          {pos.strategy}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 font-mono flex items-center gap-2 mt-0.5">
                        <span className="flex items-center gap-1 text-[#2DD4BF]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {pos.status}
                        </span>
                        <span>·</span>
                        <span>Rebalanced {pos.lastRebalancedAt}</span>
                        <span>·</span>
                        <span>{pos.rebalanceCount} Total Rebalances</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <div className="text-xs text-slate-400">Current Position Value</div>
                    <div className="font-mono text-xl font-bold text-white">
                      ${pos.currentValueUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className="text-[11px] font-mono text-[#2DD4BF]">
                      +${pos.pnlUsd.toFixed(2)} (+{pos.pnlPercentage}%)
                    </div>
                  </div>
                </div>

                {/* Metrics Breakdown Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#040A0D] border border-[#12242D]">
                  <div>
                    <span className="text-xs text-slate-400">Deposited Capital:</span>
                    <div className="font-mono text-sm font-semibold text-white mt-0.5">
                      ${pos.depositedUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                      {pos.depositedAmount0} {pos.pair.split('/')[0]} + {pos.depositedAmount1} {pos.pair.split('/')[1]}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-slate-400">Unclaimed Fees:</span>
                    <div className="font-mono text-sm font-bold text-[#2DD4BF] mt-0.5">
                      ${pos.unclaimedFeesUsd.toFixed(2)}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                      {pos.unclaimedToken0 > 0 && `${pos.unclaimedToken0} + `}{pos.unclaimedToken1 > 0 && `${pos.unclaimedToken1}`}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-slate-400">Auto-Compound:</span>
                    <div className="font-mono text-sm font-semibold text-white mt-0.5 flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5 text-[#2DD4BF]" />
                      <span>{pos.autoReinvest ? 'Enabled (Auto)' : 'Manual'}</span>
                    </div>
                    <div className="text-[11px] text-[#2DD4BF] font-mono mt-0.5">
                      Compounding active
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-slate-400">Vault Security:</span>
                    <div className="font-mono text-sm font-semibold text-white mt-0.5 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#2DD4BF]" />
                      <span>Non-Custodial</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                      Sole owner withdrawal
                    </div>
                  </div>
                </div>

                {/* Actions row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleClaim(pos)}
                      disabled={pos.unclaimedFeesUsd <= 0}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#2DD4BF] bg-[#0A1F28] border border-[#143442] hover:bg-[#0E2834] transition-all cursor-pointer disabled:opacity-40"
                    >
                      Claim Fees (${pos.unclaimedFeesUsd.toFixed(2)})
                    </button>
                    <button
                      onClick={() => handleReinvest(pos)}
                      disabled={pos.unclaimedFeesUsd <= 0}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-[#07151B] border border-[#142A35] hover:border-[#2DD4BF]/30 hover:bg-[#0A1E26] transition-all cursor-pointer disabled:opacity-40 flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#2DD4BF]" />
                      <span>Reinvest Now</span>
                    </button>
                  </div>

                  <button
                    onClick={() => handleWithdraw(pos)}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-all cursor-pointer"
                  >
                    Withdraw Principal
                  </button>
                </div>

              </div>
            ))
          )}
        </div>

        {/* Live Rebalance Activity Timeline */}
        <div className="p-6 sm:p-7 rounded-3xl bg-[#061217] border border-[#142C37] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#12242D]">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-[#2DD4BF]" />
              <h3 className="font-display text-base font-bold text-white">Autonomous Rebalance Stream</h3>
            </div>
            <span className="text-xs font-mono text-slate-400">Robinhood Chain Oracles</span>
          </div>

          <div className="space-y-3">
            {activityLog.map((log, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#040A0D] border border-[#12242D] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{log.pool}</span>
                    <span className="text-[#2DD4BF] font-mono text-[11px] bg-[#2DD4BF]/10 px-1.5 py-0.2 rounded border border-[#2DD4BF]/20">
                      {log.action}
                    </span>
                    <span className="text-slate-500 font-mono text-[11px]">· {log.time}</span>
                  </div>
                  <div className="text-slate-400 text-xs">{log.detail}</div>
                </div>

                <div className="font-mono text-[11px] text-slate-400 self-start sm:self-auto">
                  Gas Saved: <span className="text-[#2DD4BF] font-bold">{log.gasSaved}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
