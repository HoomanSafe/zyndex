import React from 'react';
import { TabType } from '../types';
import { ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: TabType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#020506] border-t border-[#0F222B] pt-14 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand & Mission (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl overflow-hidden border border-[#2DD4BF]/40 p-0.5 bg-[#061217]">
                <img src="/assets/aistudio/image_70f60f58.png" alt="ZYNDEX Logo" className="w-full h-full object-cover rounded-lg" />
              </div>
              <span className="font-display text-2xl font-black text-white tracking-wider">
                ZYNDEX
              </span>
            </div>

            <p className="text-slate-300 max-w-sm leading-relaxed text-xs">
              Algorithmic concentrated liquidity automation for Uniswap v3, v4, and Robinhood Chain. 
              Maximizing trading fee compounding through 24/7 autonomous tick repositioning and non-custodial user vaults.
            </p>

            <div className="flex items-center gap-2 pt-1 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-[#2DD4BF]" />
              <span>Smart contracts audited by Zellic & OpenZeppelin</span>
            </div>
          </div>

          {/* Protocol Links (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-white">
              Protocol
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    onNavigate('pools');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#2DD4BF] transition-colors cursor-pointer"
                >
                  Explore Pools
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('well');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#2DD4BF] transition-colors cursor-pointer"
                >
                  The Well (Stake)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('positions');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#2DD4BF] transition-colors cursor-pointer"
                >
                  My Positions
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('analytics');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#2DD4BF] transition-colors cursor-pointer"
                >
                  Protocol Analytics
                </button>
              </li>
            </ul>
          </div>

          {/* Resources & Docs (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-white">
              Resources
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    onNavigate('docs');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#2DD4BF] transition-colors cursor-pointer"
                >
                  Documentation
                </button>
              </li>
              <li>
                <a
                  href="https://uniswap.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2DD4BF] transition-colors inline-flex items-center gap-1"
                >
                  <span>Uniswap v4 Pools</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://robinhood.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2DD4BF] transition-colors inline-flex items-center gap-1"
                >
                  <span>Robinhood Chain</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://etherscan.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2DD4BF] transition-colors inline-flex items-center gap-1"
                >
                  <span>Verified Contracts</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Socials & Community (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-white">
              Community
            </div>
            <p className="text-xs text-slate-400">
              Join the official ZYNDEX community for governance proposals, alpha updates, and rebalance telemetry.
            </p>
            
            <div className="space-y-2 pt-1">
              {/* Explicit User Request: Replace X social media with https://x.com/zyndex */}
              <a
                href="https://x.com/zyndex"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-[#061217] border border-[#142C37] hover:border-[#2DD4BF] text-white hover:text-[#2DD4BF] transition-all group"
              >
                <svg className="w-4 h-4 fill-current text-[#2DD4BF]" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <div className="flex-1">
                  <div className="font-semibold text-xs text-white group-hover:text-[#2DD4BF]">Twitter / X</div>
                  <div className="text-[10px] text-slate-400">@zyndex</div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#2DD4BF]" />
              </a>

              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-[#061217] border border-[#142C37] hover:border-[#2DD4BF] text-white hover:text-[#2DD4BF] transition-all group"
              >
                <span className="text-base">✈️</span>
                <div className="flex-1">
                  <div className="font-semibold text-xs text-white group-hover:text-[#2DD4BF]">Telegram Community</div>
                  <div className="text-[10px] text-slate-400">t.me/zyndex</div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#2DD4BF]" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 border-t border-[#0F222B] flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} ZYNDEX Protocol. All rights reserved. Built for decentralized automated liquidity.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400">Terms of Service</span>
            <span>·</span>
            <span className="hover:text-slate-400">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-slate-400">Audits</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
