/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TabType, NetworkConfig, Pool, UserPosition, StakingData } from './types';
import { NETWORKS, INITIAL_POOLS, INITIAL_USER_POSITIONS, INITIAL_STAKING_DATA } from './data/protocolData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { RangeSimulator } from './components/RangeSimulator';
import { HowItWorks } from './components/HowItWorks';
import { ExplorePools } from './components/ExplorePools';
import { DepositModal } from './components/DepositModal';
import { TheWellStaking } from './components/TheWellStaking';
import { MyPositions } from './components/MyPositions';
import { AnalyticsView } from './components/AnalyticsView';
import { DocsView } from './components/DocsView';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { WalletModal } from './components/WalletModal';
import { Sparkles, ArrowRight, Flame } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('overview');
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkConfig>(NETWORKS[0]);
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(true);
  const [walletAddress, setWalletAddress] = useState<string>('0x71Ce39B02241C748aBc3D52e0E677F0a498b49A2');
  const [isWalletModalOpen, setIsWalletModalOpen] = useState<boolean>(false);

  const [pools] = useState<Pool[]>(INITIAL_POOLS);
  const [selectedPoolForDeposit, setSelectedPoolForDeposit] = useState<Pool | null>(null);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState<boolean>(false);

  const [userPositions, setUserPositions] = useState<UserPosition[]>(INITIAL_USER_POSITIONS);
  const [stakingData, setStakingData] = useState<StakingData>(INITIAL_STAKING_DATA);

  // Tab navigation
  const handleSelectTab = (tab: TabType) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToSimulator = () => {
    if (currentTab !== 'overview') {
      setCurrentTab('overview');
      setTimeout(() => {
        document.getElementById('simulator-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('simulator-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Wallet Handlers
  const handleConnectWallet = (_walletName: string) => {
    setIsWalletConnected(true);
    setWalletAddress('0x71Ce39B02241C748aBc3D52e0E677F0a498b49A2');
  };

  const handleDisconnectWallet = () => {
    setIsWalletConnected(false);
    setWalletAddress('');
  };

  // Deposit Modal Handlers
  const handleOpenDepositModal = (pool: Pool) => {
    setSelectedPoolForDeposit(pool);
    setIsDepositModalOpen(true);
  };

  const handleDepositSuccess = (newPos: UserPosition) => {
    setUserPositions((prev) => [newPos, ...prev]);
    // Optionally switch to positions tab so user sees their active vault
    setCurrentTab('positions');
  };

  // Position Management
  const handleClaimFees = (posId: string) => {
    setUserPositions((prev) =>
      prev.map((pos) => {
        if (pos.id === posId) {
          return {
            ...pos,
            unclaimedFeesUsd: 0,
            unclaimedToken0: 0,
            unclaimedToken1: 0,
          };
        }
        return pos;
      })
    );
  };

  const handleReinvestFees = (posId: string) => {
    setUserPositions((prev) =>
      prev.map((pos) => {
        if (pos.id === posId) {
          return {
            ...pos,
            currentValueUsd: pos.currentValueUsd + pos.unclaimedFeesUsd,
            unclaimedFeesUsd: 0,
            unclaimedToken0: 0,
            unclaimedToken1: 0,
            rebalanceCount: pos.rebalanceCount + 1,
            lastRebalancedAt: 'Just now',
          };
        }
        return pos;
      })
    );
  };

  const handleWithdraw = (posId: string) => {
    setUserPositions((prev) => prev.filter((p) => p.id !== posId));
  };

  // Staking Data Handlers
  const handleUpdateStaking = (newData: Partial<StakingData>) => {
    setStakingData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#030708] text-[#E2E8F0]">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        selectedNetwork={selectedNetwork}
        onSelectNetwork={setSelectedNetwork}
        isWalletConnected={isWalletConnected}
        walletAddress={walletAddress}
        onOpenWalletModal={() => setIsWalletModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'overview' && (
          <>
            <HeroSection
              onNavigate={handleSelectTab}
              onScrollToSimulator={handleScrollToSimulator}
            />

            <RangeSimulator />

            <HowItWorks onNavigate={handleSelectTab} />

            {/* Featured Vaults Preview Section */}
            <section className="py-16 bg-[#04090C] border-t border-[#0F222B]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div className="space-y-1.5">
                    <span className="text-xs uppercase font-mono tracking-wider text-[#2DD4BF] font-semibold">
                      High Efficiency Vaults
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      Featured Automated Pools
                    </h2>
                  </div>
                  <button
                    onClick={() => handleSelectTab('pools')}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#2DD4BF] hover:text-[#67E8F9] transition-colors cursor-pointer group"
                  >
                    <span>View All {pools.length} Liquidity Pools</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {pools.slice(0, 3).map((pool) => (
                    <div
                      key={pool.id}
                      className="p-6 rounded-3xl bg-[#061217] border border-[#142C37] hover:border-[#2DD4BF]/50 hover:bg-[#091A22] transition-all flex flex-col justify-between space-y-6 group shadow-lg"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center -space-x-2">
                            <div className="w-9 h-9 rounded-full bg-[#040B0E] border-2 border-[#142C37] overflow-hidden flex items-center justify-center p-0.5">
                              {pool.token0.icon.startsWith('/') || pool.token0.icon.startsWith('http') ? (
                                <img src={pool.token0.icon} alt="" className="w-full h-full object-cover rounded-full" />
                              ) : (
                                <span className="text-lg">{pool.token0.icon}</span>
                              )}
                            </div>
                            <div className="w-9 h-9 rounded-full bg-[#040B0E] border-2 border-[#142C37] overflow-hidden flex items-center justify-center p-0.5">
                              {pool.token1.icon.startsWith('/') || pool.token1.icon.startsWith('http') ? (
                                <img src={pool.token1.icon} alt="" className="w-full h-full object-cover rounded-full" />
                              ) : (
                                <span className="text-lg">{pool.token1.icon}</span>
                              )}
                            </div>
                          </div>

                          <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#0A1F28] text-[#2DD4BF] border border-[#153847]">
                            {pool.feeTier}
                          </span>
                        </div>

                        <div>
                          <h3 className="font-display text-lg font-bold text-white group-hover:text-[#2DD4BF] transition-colors">
                            {pool.token0.symbol} / {pool.token1.symbol}
                          </h3>
                          <div className="text-xs text-slate-400 font-mono mt-0.5">
                            {pool.dex} · {pool.strategy}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-[#040A0D] border border-[#12242D] text-xs font-mono">
                          <div>
                            <span className="text-slate-500 text-[11px]">Total Value Locked:</span>
                            <div className="font-bold text-white mt-0.5">
                              ${(pool.tvl / 1000000).toFixed(2)}M
                            </div>
                          </div>
                          <div>
                            <span className="text-slate-500 text-[11px]">Automated APY:</span>
                            <div className="font-black text-[#2DD4BF] text-sm mt-0.5 neon-text-glow">
                              {pool.apy}%
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleOpenDepositModal(pool)}
                        className="w-full py-3 rounded-xl text-xs font-bold text-[#03080A] bg-gradient-to-r from-[#2DD4BF] via-[#20E2D7] to-[#06B6D4] hover:opacity-95 shadow-[0_0_15px_rgba(45,212,191,0.25)] transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-98"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Deposit & Start Automation</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* The Well Quick Teaser */}
            <section className="py-16 bg-[#030607] relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#091D26] via-[#06141A] to-[#040A0D] border border-[#2DD4BF]/40 shadow-[0_0_45px_rgba(45,212,191,0.15)] flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
                  <div className="space-y-4 max-w-2xl text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#081F28] border border-[#163847] text-xs font-mono text-[#2DD4BF]">
                      <Flame className="w-3.5 h-3.5" />
                      <span>THE WELL · ZERO LOCKUP STAKING</span>
                    </div>
                    <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
                      Earn <span className="text-[#2DD4BF] neon-text-glow">30% Protocol Revenue in ETH</span>
                    </h2>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Stake $ZYNDEX tokens to receive automatic continuous distributions in native ETH. 
                      No lockup periods. Plus unlock up to 50% discount on protocol performance fees across all your vaults.
                    </p>
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                      <button
                        onClick={() => handleSelectTab('well')}
                        className="px-6 py-3.5 text-xs font-bold text-[#03080A] bg-gradient-to-r from-[#2DD4BF] via-[#20E2D7] to-[#06B6D4] hover:opacity-95 rounded-xl transition-all shadow-[0_0_20px_rgba(45,212,191,0.3)] cursor-pointer"
                      >
                        Open The Well Staking Hub →
                      </button>
                      <div className="text-xs font-mono text-slate-400">
                        Current APY: <span className="text-[#2DD4BF] font-bold">32.4%</span>
                      </div>
                    </div>
                  </div>

                  {/* Staking Core Badge Visual */}
                  <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl p-1 bg-[#040A0D] border border-[#2DD4BF]/50 shadow-[0_0_30px_rgba(45,212,191,0.3)] shrink-0 flex items-center justify-center">
                    <img
                      src="/assets/aistudio/image_70f60f58.png"
                      alt="ZYNDEX Token Core"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </section>

            <FAQSection />
          </>
        )}

        {currentTab === 'pools' && (
          <ExplorePools
            pools={pools}
            onSelectPool={handleOpenDepositModal}
          />
        )}

        {currentTab === 'well' && (
          <TheWellStaking
            stakingData={stakingData}
            onUpdateStaking={handleUpdateStaking}
            onOpenWalletModal={() => setIsWalletModalOpen(true)}
            isWalletConnected={isWalletConnected}
          />
        )}

        {currentTab === 'positions' && (
          <MyPositions
            positions={userPositions}
            onNavigate={handleSelectTab}
            onClaimFees={handleClaimFees}
            onReinvestFees={handleReinvestFees}
            onWithdraw={handleWithdraw}
          />
        )}

        {currentTab === 'analytics' && <AnalyticsView />}

        {currentTab === 'docs' && <DocsView />}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleSelectTab} />

      {/* Modals */}
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        isConnected={isWalletConnected}
        walletAddress={walletAddress}
        onConnectWallet={handleConnectWallet}
        onDisconnectWallet={handleDisconnectWallet}
        selectedNetwork={selectedNetwork}
      />

      <DepositModal
        pool={selectedPoolForDeposit}
        isOpen={isDepositModalOpen}
        onClose={() => {
          setIsDepositModalOpen(false);
          setSelectedPoolForDeposit(null);
        }}
        onDepositSuccess={handleDepositSuccess}
      />
    </div>
  );
}
