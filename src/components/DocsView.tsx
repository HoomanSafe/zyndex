import React, { useState } from 'react';
import { FileText, ShieldCheck, Cpu, Code2, BookOpen, Layers, CheckCircle, ExternalLink } from 'lucide-react';

export const DocsView: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState<'architecture' | 'vaults' | 'the-well' | 'contracts'>('architecture');

  const topics = [
    { id: 'architecture', title: 'Protocol Architecture & Engine', icon: <Cpu className="w-4 h-4" /> },
    { id: 'vaults', title: 'Non-Custodial User Vaults', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'the-well', title: 'The Well & Revenue Tokenomics', icon: <Layers className="w-4 h-4" /> },
    { id: 'contracts', title: 'Smart Contracts & Audits', icon: <Code2 className="w-4 h-4" /> },
  ];

  return (
    <section className="py-12 bg-[#030708] min-h-[75vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#2DD4BF] mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>LITEPAPER & DEVELOPER DOCUMENTATION</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
            ZYNDEX <span className="text-[#2DD4BF] neon-text-glow">Documentation</span>
          </h1>
          <p className="text-sm text-slate-300 max-w-xl mt-1">
            Technical specifications, mathematical models, security invariants, and smart contract architecture.
          </p>
        </div>

        {/* Docs Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation Sidebar (4 cols) */}
          <div className="lg:col-span-4 p-4 rounded-3xl bg-[#061217] border border-[#142C37] space-y-2">
            <div className="text-xs font-mono text-slate-400 px-3 py-2 uppercase tracking-wider">
              Documentation Index
            </div>
            {topics.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedDoc(t.id as any)}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left ${
                  selectedDoc === t.id
                    ? 'bg-[#2DD4BF]/15 text-[#2DD4BF] border border-[#2DD4BF]/30 shadow-[0_0_12px_rgba(45,212,191,0.15)]'
                    : 'text-slate-300 hover:bg-[#0A1C24] hover:text-white'
                }`}
              >
                {t.icon}
                <span>{t.title}</span>
              </button>
            ))}

            <div className="pt-4 border-t border-[#12242D] px-3 space-y-2">
              <div className="text-[11px] font-mono text-slate-400">External Repositories</div>
              <a
                href="https://x.com/ZyndexFi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-xs text-slate-300 hover:text-[#2DD4BF] py-1 transition-colors"
              >
                <span>Follow Updates on X (@ZyndexFi)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <div className="flex items-center justify-between text-xs text-slate-300 py-1">
                <span>Security Audit: Zellic & OpenZeppelin</span>
                <span className="text-[#2DD4BF] font-mono">PASSED</span>
              </div>
            </div>
          </div>

          {/* Right Document Content Area (8 cols) */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-[#061217] border border-[#142C37] space-y-6 text-slate-300 text-sm leading-relaxed">
            
            {selectedDoc === 'architecture' && (
              <div className="space-y-6">
                <div className="space-y-2 pb-4 border-b border-[#12242D]">
                  <h2 className="font-display text-2xl font-bold text-white">
                    Protocol Architecture & Dynamic Tick Engine
                  </h2>
                  <p className="text-xs text-[#2DD4BF] font-mono">
                    Version 2.4 · Multi-Chain Robinhood & EVM Concentrated Liquidity
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-display text-base font-bold text-white">1. The Concentrated Liquidity Imperative</h3>
                  <p>
                    Uniswap v3 and v4 revolutionized automated market makers by introducing concentrated liquidity, 
                    allowing capital providers to deposit funds within custom price intervals [Pa, Pb]. 
                    While capital efficiency is amplified up to 4000x compared to v2, liquidity providers face 
                    severe operational overhead: when spot market price swings outside [Pa, Pb], the position halts fee generation entirely.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-display text-base font-bold text-white">2. The ZYNDEX Continuous Rebalancer</h3>
                  <p>
                    ZYNDEX operates a distributed network of off-chain oracles paired with on-chain executor contracts. 
                    When volatility or directional momentum pushes market prices near tick thresholds, ZYNDEX executes a batched, zero-gas reposition:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-400 pl-2">
                    <li>Withdraws active liquidity ticks from Uniswap v3/v4 pool.</li>
                    <li>Harvests accrued uncollected trading fees in Token0 and Token1.</li>
                    <li>Calculates optimal tick boundary: [P_current × (1 - Δ), P_current × (1 + Δ)].</li>
                    <li>Re-mints concentrated liquidity position centered directly around the current market price.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-[#040A0D] border border-[#163847] space-y-2">
                  <div className="text-xs font-mono font-bold text-[#2DD4BF]">Mathematical Tick Centering Formula:</div>
                  <code className="text-xs font-mono text-slate-300 block bg-[#07161D] p-2.5 rounded-lg border border-[#142F3C]">
                    Tick_Optimal = round(log(sqrt(P_spot)) / log(1.0001)) ± (Tick_Spacing * Range_Factor)
                  </code>
                </div>
              </div>
            )}

            {selectedDoc === 'vaults' && (
              <div className="space-y-6">
                <div className="space-y-2 pb-4 border-b border-[#12242D]">
                  <h2 className="font-display text-2xl font-bold text-white">
                    Non-Custodial User Vault Architecture
                  </h2>
                  <p className="text-xs text-[#2DD4BF] font-mono">
                    Security Standard: ERC-4626 Derivative with Immutable Ownership
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-display text-base font-bold text-white">1. User Ownership Guarantee</h3>
                  <p>
                    Every liquidity position deposited into ZYNDEX is encapsulated inside an isolated user smart contract vault. 
                    The vault contract contains hardcoded invariants:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 rounded-xl bg-[#040A0D] border border-[#132A35]">
                      <div className="font-bold text-white text-xs flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-[#2DD4BF]" />
                        <span>Withdrawal Authority</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        Only the original creator's cryptographic signature (<code className="text-[#2DD4BF]">msg.sender</code>) can trigger asset withdrawals.
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#040A0D] border border-[#132A35]">
                      <div className="font-bold text-white text-xs flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-[#2DD4BF]" />
                        <span>Constrained Rebalance</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        The automated protocol bot only possesses the delegated right to reposition ticks and swap fees within verified Uniswap router contracts.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-display text-base font-bold text-white">2. Zero Lockup Policy</h3>
                  <p>
                    Users are free to enter or exit at any moment. There are no timelocks, early exit penalties, or unbonding delays.
                  </p>
                </div>
              </div>
            )}

            {selectedDoc === 'the-well' && (
              <div className="space-y-6">
                <div className="space-y-2 pb-4 border-b border-[#12242D]">
                  <h2 className="font-display text-2xl font-bold text-white">
                    The Well & Revenue Tokenomics
                  </h2>
                  <p className="text-xs text-[#2DD4BF] font-mono">
                    Token: $ZYNDEX · Total Supply: 10,000,000 Tokens
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-display text-base font-bold text-white">1. Real Yield in Native ETH</h3>
                  <p>
                    Unlike inflationary DeFi tokens that distribute newly printed tokens, The Well distributes 
                    real, unadulterated protocol revenue in native ETH. Every time a vault harvests trading fees, 
                    the protocol 2% performance fee is split:
                  </p>
                  <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-400 pl-2">
                    <li><strong className="text-white">30% to The Well Stakers:</strong> Distributed continuously proportional to staked ZYNDEX weight.</li>
                    <li><strong className="text-white">20% to Systematic Buyback & Burn:</strong> Converted to $ZYNDEX and destroyed on-chain.</li>
                    <li><strong className="text-white">10% to Safety & Insurance Vault:</strong> Liquid protocol reserve.</li>
                    <li><strong className="text-white">40% to Automation Infrastructure:</strong> Covers gas execution and multi-chain node infrastructure.</li>
                  </ul>
                </div>
              </div>
            )}

            {selectedDoc === 'contracts' && (
              <div className="space-y-6">
                <div className="space-y-2 pb-4 border-b border-[#12242D]">
                  <h2 className="font-display text-2xl font-bold text-white">
                    Smart Contracts & Verification
                  </h2>
                  <p className="text-xs text-[#2DD4BF] font-mono">
                    Deployed across Robinhood Chain, Ethereum, Arbitrum & Base
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-[#040A0D] border border-[#132A35] space-y-1">
                    <div className="text-xs text-slate-400">ZYNDEX Protocol Core Engine:</div>
                    <code className="text-xs font-mono text-[#2DD4BF] block break-all">
                      0x71Ce39B02241C748aBc3D52e0E677F0a498b49A2
                    </code>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#040A0D] border border-[#132A35] space-y-1">
                    <div className="text-xs text-slate-400">The Well (Staking & ETH Revenue Distributor):</div>
                    <code className="text-xs font-mono text-[#2DD4BF] block break-all">
                      0x4A13b631980D1F8438E6199349880182C0E4B312
                    </code>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#040A0D] border border-[#132A35] space-y-1">
                    <div className="text-xs text-slate-400">Vault Factory Contract (ERC-4626 Multi-Asset):</div>
                    <code className="text-xs font-mono text-[#2DD4BF] block break-all">
                      0x9F8812c124B510e1948B0192834019230192A021
                    </code>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
