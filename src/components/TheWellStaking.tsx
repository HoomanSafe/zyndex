import React, { useState } from 'react';
import { StakingData } from '../types';
import { Flame, ShieldCheck, Award, Sparkles, Check, ArrowRight, Zap, RefreshCw } from 'lucide-react';

interface TheWellStakingProps {
  stakingData: StakingData;
  onUpdateStaking: (newData: Partial<StakingData>) => void;
  onOpenWalletModal: () => void;
  isWalletConnected: boolean;
}

export const TheWellStaking: React.FC<TheWellStakingProps> = ({
  stakingData,
  onUpdateStaking,
  onOpenWalletModal,
  isWalletConnected,
}) => {
  const [activeTab, setActiveTab] = useState<'stake' | 'unstake'>('stake');
  const [stakeInput, setStakeInput] = useState<string>('2500');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [claimedSuccess, setClaimedSuccess] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const availableWalletZyndex = 15420; // Simulated user wallet balance

  const handlePercentageClick = (pct: number) => {
    if (activeTab === 'stake') {
      setStakeInput(((availableWalletZyndex * pct) / 100).toFixed(0));
    } else {
      setStakeInput(((stakingData.userStakedZyndex * pct) / 100).toFixed(0));
    }
  };

  const handleExecute = () => {
    const val = parseFloat(stakeInput) || 0;
    if (val <= 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (activeTab === 'stake') {
        const newStaked = stakingData.userStakedZyndex + val;
        let newTier = 0;
        if (newStaked >= 100000) newTier = 3;
        else if (newStaked >= 25000) newTier = 2;
        else if (newStaked >= 5000) newTier = 1;

        onUpdateStaking({
          userStakedZyndex: newStaked,
          totalStakedZyndex: stakingData.totalStakedZyndex + val,
          userTier: newTier,
        });
        showToast(`Successfully staked ${val.toLocaleString()} ZYNDEX in The ZYNDEX!`);
      } else {
        const newStaked = Math.max(0, stakingData.userStakedZyndex - val);
        let newTier = 0;
        if (newStaked >= 100000) newTier = 3;
        else if (newStaked >= 25000) newTier = 2;
        else if (newStaked >= 5000) newTier = 1;

        onUpdateStaking({
          userStakedZyndex: newStaked,
          totalStakedZyndex: Math.max(0, stakingData.totalStakedZyndex - val),
          userTier: newTier,
        });
        showToast(`Successfully unstaked ${val.toLocaleString()} ZYNDEX.`);
      }
      setStakeInput('');
    }, 1000);
  };

  const handleClaimRewards = () => {
    if (stakingData.userClaimableEth <= 0) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setClaimedSuccess(true);
      const claimedAmount = stakingData.userClaimableEth;
      onUpdateStaking({
        userClaimableEth: 0,
        userClaimableUsd: 0,
      });
      showToast(`Claimed ${claimedAmount.toFixed(4)} ETH directly to your wallet!`);
      setTimeout(() => setClaimedSuccess(false), 3000);
    }, 1000);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const tiers = [
    {
      level: 1,
      minStake: 5000,
      discount: '15% Off',
      label: 'Guardian Tier',
      active: stakingData.userStakedZyndex >= 5000 && stakingData.userStakedZyndex < 25000,
    },
    {
      level: 2,
      minStake: 25000,
      discount: '30% Off',
      label: 'Sentry Tier',
      active: stakingData.userStakedZyndex >= 25000 && stakingData.userStakedZyndex < 100000,
    },
    {
      level: 3,
      minStake: 100000,
      discount: '50% Off',
      label: 'Sovereign Tier',
      active: stakingData.userStakedZyndex >= 100000,
    },
  ];

  return (
    <section className="py-12 bg-[#030708] min-h-[75vh] relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#081C24] border border-[#2DD4BF] shadow-[0_0_30px_rgba(45,212,191,0.3)] text-white text-xs font-mono flex items-center gap-2.5 animate-in slide-in-from-bottom duration-200">
          <Check className="w-4 h-4 text-[#2DD4BF]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#081D26] border border-[#163847] text-xs font-mono text-[#2DD4BF]">
              <Flame className="w-3.5 h-3.5" />
              <span>THE REVENUE STREAMING WELL</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
              The ZYNDEX: <span className="text-[#2DD4BF] neon-text-glow">Stake & Earn ETH</span>
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Stake $ZYNDEX with zero lockup periods. Earn 30% of all protocol rebalancing and trading fees 
              distributed continuously in native ETH, plus unlock protocol fee discounts up to 50%.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#2DD4BF] bg-[#07141A] p-3 rounded-xl border border-[#142C37]">
            <ShieldCheck className="w-4 h-4" />
            <span>0 Lockup · Instant Unstake Anytime</span>
          </div>
        </div>

        {/* Staking Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-2xl bg-[#061217] border border-[#142E39]">
            <div className="text-xs text-slate-400">Current Staking APY</div>
            <div className="font-mono text-2xl font-black text-[#2DD4BF] mt-1 neon-text-glow">
              {stakingData.stakingApy}%
            </div>
            <div className="text-[11px] text-slate-400 mt-1 font-mono">
              Direct ETH Fee Yield
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#061217] border border-[#142E39]">
            <div className="text-xs text-slate-400">Total $ZYNDEX Staked</div>
            <div className="font-mono text-2xl font-black text-white mt-1">
              {(stakingData.totalStakedZyndex / 1000000).toFixed(2)}M
            </div>
            <div className="text-[11px] text-slate-400 mt-1 font-mono">
              54.2% of Circulating Supply
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#061217] border border-[#142E39]">
            <div className="text-xs text-slate-400">Total ETH Distributed</div>
            <div className="font-mono text-2xl font-black text-[#2DD4BF] mt-1">
              {stakingData.totalEthDistributed} ETH
            </div>
            <div className="text-[11px] text-slate-400 mt-1 font-mono">
              ≈ ${(stakingData.totalEthDistributed * 3420).toLocaleString()} USD paid
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#061217] border border-[#142E39]">
            <div className="text-xs text-slate-400">ZYNDEX Market Price</div>
            <div className="font-mono text-2xl font-black text-white mt-1">
              ${stakingData.zyndexPrice.toFixed(2)}
            </div>
            <div className="text-[11px] text-[#2DD4BF] mt-1 font-mono">
              +9.4% in 24h
            </div>
          </div>

        </div>

        {/* Main Staking Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Stake / Unstake Form (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#061217] border border-[#153442] shadow-xl space-y-6">
            
            {/* Stake / Unstake Segmented Tabs */}
            <div className="flex items-center p-1 bg-[#040B0E] rounded-xl border border-[#12242D]">
              <button
                onClick={() => setActiveTab('stake')}
                className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'stake'
                    ? 'bg-[#2DD4BF] text-[#03080A] shadow-[0_0_15px_rgba(45,212,191,0.3)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Stake $ZYNDEX
              </button>
              <button
                onClick={() => setActiveTab('unstake')}
                className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'unstake'
                    ? 'bg-[#2DD4BF] text-[#03080A] shadow-[0_0_15px_rgba(45,212,191,0.3)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Unstake
              </button>
            </div>

            {/* Balances bar */}
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>
                {activeTab === 'stake' ? 'Available in Wallet' : 'Your Staked Balance'}:
              </span>
              <span className="text-[#2DD4BF] font-bold">
                {activeTab === 'stake' 
                  ? `${availableWalletZyndex.toLocaleString()} ZYNDEX`
                  : `${stakingData.userStakedZyndex.toLocaleString()} ZYNDEX`}
              </span>
            </div>

            {/* Input Container */}
            <div className="p-4 rounded-2xl bg-[#040A0D] border border-[#142C37] space-y-2">
              <div className="flex items-center justify-between gap-3">
                <input
                  type="number"
                  value={stakeInput}
                  onChange={(e) => setStakeInput(e.target.value)}
                  placeholder="0.0"
                  step="any"
                  className="w-full bg-transparent text-2xl font-mono font-bold text-white focus:outline-none"
                />
                <div className="flex items-center gap-2 bg-[#091D26] px-3 py-1.5 rounded-xl border border-[#163847] shrink-0">
                  <img src="/assets/aistudio/image_70f60f58.png" alt="ZYNDEX" className="w-5 h-5 rounded-full" />
                  <span className="font-mono text-xs font-bold text-white">ZYNDEX</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>≈ ${((parseFloat(stakeInput) || 0) * stakingData.zyndexPrice).toFixed(2)} USD</span>
                <div className="flex gap-1.5">
                  {[25, 50, 75, 100].map((pct) => (
                    <button
                      key={pct}
                      onClick={() => handlePercentageClick(pct)}
                      className="px-2 py-0.5 rounded bg-[#091B24] hover:bg-[#0D2531] text-[11px] text-slate-300 hover:text-[#2DD4BF] cursor-pointer"
                    >
                      {pct === 100 ? 'MAX' : `${pct}%`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Staking Projections Box */}
            <div className="p-4 rounded-2xl bg-[#07161D] border border-[#14323E] space-y-2.5">
              <div className="text-xs text-slate-400 font-medium">Estimated Staking Returns:</div>
              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-slate-500">Weekly ETH Share:</span>
                  <div className="text-[#2DD4BF] font-bold text-sm mt-0.5">
                    +{((((parseFloat(stakeInput) || 0) * stakingData.zyndexPrice) * (stakingData.stakingApy / 100)) / 52 / 3420).toFixed(4)} ETH
                  </div>
                </div>
                <div>
                  <span className="text-slate-500">Annual Return:</span>
                  <div className="text-[#2DD4BF] font-bold text-sm mt-0.5">
                    +${(((parseFloat(stakeInput) || 0) * stakingData.zyndexPrice) * (stakingData.stakingApy / 100)).toFixed(2)} USD
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            {!isWalletConnected ? (
              <button
                onClick={onOpenWalletModal}
                className="w-full py-4 rounded-2xl font-display text-sm font-bold text-[#03080A] bg-gradient-to-r from-[#2DD4BF] via-[#20E2D7] to-[#06B6D4] hover:opacity-95 shadow-[0_0_20px_rgba(45,212,191,0.3)] transition-all cursor-pointer"
              >
                Connect Wallet to Stake
              </button>
            ) : (
              <button
                onClick={handleExecute}
                disabled={isProcessing || !stakeInput || parseFloat(stakeInput) <= 0}
                className="w-full py-4 rounded-2xl font-display text-sm font-bold text-[#03080A] bg-gradient-to-r from-[#2DD4BF] via-[#20E2D7] to-[#06B6D4] hover:opacity-95 shadow-[0_0_20px_rgba(45,212,191,0.3)] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#03080A]" />
                    <span>Processing Transaction...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{activeTab === 'stake' ? 'Stake $ZYNDEX in The ZYNDEX' : 'Unstake $ZYNDEX'}</span>
                  </>
                )}
              </button>
            )}

            <div className="text-[11px] text-slate-500 font-mono text-center">
              Staking rewards are streamed block-by-block and can be claimed anytime without unstaking principal.
            </div>

          </div>

          {/* Right Column: Claim Rewards & Fee Discount Tiers (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Rewards Claim Box */}
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#0A1D26] to-[#040A0D] border border-[#2DD4BF]/40 shadow-[0_0_35px_rgba(45,212,191,0.15)] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#143644]">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[#2DD4BF]" />
                  <span className="font-display text-sm font-bold text-white">Your Claimable Rewards</span>
                </div>
                <span className="text-[10px] font-mono text-[#2DD4BF] bg-[#2DD4BF]/10 px-2 py-0.5 rounded border border-[#2DD4BF]/25">
                  LIVE ACCRUAL
                </span>
              </div>

              <div>
                <div className="font-mono text-3xl font-black text-[#2DD4BF] neon-text-glow">
                  {stakingData.userClaimableEth.toFixed(4)} ETH
                </div>
                <div className="text-xs text-slate-300 font-mono mt-1">
                  ≈ ${stakingData.userClaimableUsd.toFixed(2)} USD in native ETH
                </div>
              </div>

              <button
                onClick={handleClaimRewards}
                disabled={isProcessing || stakingData.userClaimableEth <= 0}
                className="w-full py-3 px-4 rounded-xl font-display text-xs font-bold text-[#03080A] bg-gradient-to-r from-[#2DD4BF] via-[#20E2D7] to-[#06B6D4] hover:opacity-95 shadow-[0_0_15px_rgba(45,212,191,0.25)] transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {claimedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Rewards Claimed!</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Claim ETH Rewards</span>
                  </>
                )}
              </button>

              <div className="text-[11px] text-slate-400 font-mono text-center">
                Your currently staked: <span className="text-white font-bold">{stakingData.userStakedZyndex.toLocaleString()} ZYNDEX</span>
              </div>
            </div>

            {/* Protocol Fee Discount Tiers */}
            <div className="p-6 rounded-3xl bg-[#061217] border border-[#142E39] space-y-4">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#2DD4BF]" />
                <h3 className="font-display text-sm font-bold text-white">Protocol Fee Discount Tiers</h3>
              </div>
              <p className="text-xs text-slate-400">
                Holding staked $ZYNDEX automatically reduces protocol performance fees across all your active vaults.
              </p>

              <div className="space-y-2.5">
                {tiers.map((t) => (
                  <div
                    key={t.level}
                    className={`p-3.5 rounded-xl border flex items-center justify-between text-xs transition-all ${
                      t.active
                        ? 'bg-[#2DD4BF]/10 border-[#2DD4BF] text-white shadow-[0_0_12px_rgba(45,212,191,0.15)]'
                        : 'bg-[#040A0D] border-[#12242D] text-slate-400'
                    }`}
                  >
                    <div>
                      <div className="font-bold flex items-center gap-2">
                        <span className={t.active ? 'text-[#2DD4BF]' : 'text-slate-300'}>
                          {t.label}
                        </span>
                        {t.active && (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#2DD4BF] text-[#03080A] font-black">
                            YOUR TIER
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                        Requires {t.minStake.toLocaleString()} ZYNDEX
                      </div>
                    </div>

                    <div className="font-mono font-bold text-sm text-[#2DD4BF]">
                      {t.discount}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
