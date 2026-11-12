import React from 'react';
import { Shield, Cpu, RefreshCw, Flame, ArrowUpRight } from 'lucide-react';
import { TabType } from '../types';

interface HowItWorksProps {
  onNavigate: (tab: TabType) => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onNavigate }) => {
  const steps = [
    {
      number: '01',
      title: 'Deposit to Non-Custodial Vault',
      description:
        'Select any verified Uniswap v3/v4 or Robinhood DEX pool. Your tokens are deposited into your dedicated smart vault contract. ZYNDEX never takes custody of your funds.',
      icon: <Shield className="w-5 h-5 text-[#2DD4BF]" />,
      badge: 'Zero Custodial Risk',
    },
    {
      number: '02',
      title: '24/7 Automated Range Shifting',
      description:
        'Our autonomous oracles monitor pool prices every block. When the spot price approaches tick boundaries, our engine automatically re-centers your position with zero manual gas.',
      icon: <Cpu className="w-5 h-5 text-[#2DD4BF]" />,
      badge: '99.4% In-Range Uptime',
    },
    {
      number: '03',
      title: 'Compounding Fee Reinvestment',
      description:
        'Collected swap fees are not left idle. ZYNDEX automatically harvests and re-deposits trading fees back into active liquidity ticks, multiplying your long-term compounding return.',
      icon: <RefreshCw className="w-5 h-5 text-[#2DD4BF]" />,
      badge: 'Exponential APY Boost',
    },
    {
      number: '04',
      title: 'Stake in The ZYNDEX for ETH Yield',
      description:
        'Stake your native $ZYNDEX tokens with zero lockup to earn a direct 30% share of total protocol trading fees distributed weekly in ETH, plus up to 50% fee discounts.',
      icon: <Flame className="w-5 h-5 text-[#2DD4BF]" />,
      badge: '30% Protocol Revenue in ETH',
    },
  ];

  return (
    <section className="py-20 bg-[#04080A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs uppercase font-mono tracking-wider text-[#2DD4BF] font-semibold">
              Protocol Architecture
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Engineered for Continuous <span className="text-[#2DD4BF] neon-text-glow">Fee Maximization</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Four frictionless steps deliver algorithmic liquidity efficiency across Uniswap and the Robinhood Chain.
            </p>
          </div>

          <button
            onClick={() => onNavigate('docs')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#2DD4BF] hover:text-[#67E8F9] transition-colors cursor-pointer group"
          >
            <span>Read Architecture Whitepaper</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="p-6 rounded-2xl bg-[#061217] border border-[#142C37] hover:border-[#2DD4BF]/40 transition-all group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#0B2028] border border-[#2DD4BF]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                  <span className="font-mono text-2xl font-black text-slate-600 group-hover:text-[#2DD4BF]/50 transition-colors">
                    {step.number}
                  </span>
                </div>

                <div className="text-[11px] font-mono text-[#2DD4BF] font-semibold tracking-wide">
                  {step.badge}
                </div>

                <h3 className="font-display text-base font-bold text-white group-hover:text-[#2DD4BF] transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-2 border-t border-[#12242D] text-[11px] font-mono text-slate-500">
                Verified on-chain logic
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
