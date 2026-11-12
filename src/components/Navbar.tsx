import React, { useState } from 'react';
import { TabType, NetworkConfig } from '../types';
import { NETWORKS } from '../data/protocolData';
import { 
  Layers, 
  Flame, 
  Briefcase, 
  BarChart3, 
  FileText, 
  ChevronDown, 
  Wallet, 
  Menu, 
  X,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  selectedNetwork: NetworkConfig;
  onSelectNetwork: (network: NetworkConfig) => void;
  isWalletConnected: boolean;
  walletAddress: string;
  onOpenWalletModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  selectedNetwork,
  onSelectNetwork,
  isWalletConnected,
  walletAddress,
  onOpenWalletModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [networkDropdownOpen, setNetworkDropdownOpen] = useState(false);

  const navLinks: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <Layers className="w-4 h-4" /> },
    { id: 'pools', label: 'Explore Pools', icon: <Layers className="w-4 h-4" /> },
    { id: 'well', label: 'The Well', icon: <Flame className="w-4 h-4" /> },
    { id: 'positions', label: 'My Positions', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'docs', label: 'Docs', icon: <FileText className="w-4 h-4" /> },
  ];

  const handleTabClick = (tab: TabType) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const truncatedAddress = walletAddress 
    ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}` 
    : '';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#12242C] bg-[#030708]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        
        {/* Zone 1: Single Brand Wordmark with Logo */}
        <button
          onClick={() => handleTabClick('overview')}
          className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF]"
        >
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden p-0.5 border border-[#2DD4BF]/40 bg-[#061217] shadow-[0_0_15px_rgba(45,212,191,0.25)] group-hover:border-[#2DD4BF] transition-all duration-300">
            <img 
              src="/assets/aistudio/image_70f60f58.png" 
              alt="ZYNDEX Logo" 
              className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl sm:text-2xl font-black tracking-wider text-white flex items-center gap-1.5">
              ZYNDEX
              <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF] shadow-[0_0_8px_#2DD4BF]" />
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleTabClick(link.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'text-[#2DD4BF] bg-[#2DD4BF]/10 border border-[#2DD4BF]/30 shadow-[0_0_12px_rgba(45,212,191,0.18)]'
                    : 'text-slate-300 hover:text-white hover:bg-[#0B1C22]/60'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Network Selector & Primary Wallet Action */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Network Selector Dropdown */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setNetworkDropdownOpen(!networkDropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-300 bg-[#071318] border border-[#142A34] rounded-lg hover:border-[#2DD4BF]/40 hover:text-white transition-all cursor-pointer"
            >
              <span className="text-sm">{selectedNetwork.icon}</span>
              <span className="font-mono">{selectedNetwork.name}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {networkDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setNetworkDropdownOpen(false)} 
                />
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#061217] border border-[#163340] shadow-2xl z-20 py-1.5 overflow-hidden backdrop-blur-xl">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Select Network
                  </div>
                  {NETWORKS.map((network) => (
                    <button
                      key={network.id}
                      onClick={() => {
                        onSelectNetwork(network);
                        setNetworkDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left cursor-pointer transition-colors ${
                        selectedNetwork.id === network.id
                          ? 'bg-[#2DD4BF]/15 text-[#2DD4BF] font-medium'
                          : 'text-slate-300 hover:bg-[#0D212A] hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{network.icon}</span>
                        <span>{network.name}</span>
                      </div>
                      <span className="text-[10px] text-[#2DD4BF] font-mono">
                        {network.rpcStatus}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Connect / Connected Wallet Button */}
          <button
            onClick={onOpenWalletModal}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              isWalletConnected
                ? 'bg-[#091D24] border border-[#2DD4BF]/40 text-[#2DD4BF] hover:bg-[#0E2832] shadow-[0_0_12px_rgba(45,212,191,0.18)]'
                : 'bg-gradient-to-r from-[#2DD4BF] via-[#20E2D7] to-[#06B6D4] text-[#03080A] hover:opacity-95 font-bold shadow-[0_0_20px_rgba(45,212,191,0.35)] active:scale-95'
            }`}
          >
            <Wallet className="w-4 h-4" />
            <span className="font-mono">
              {isWalletConnected ? truncatedAddress : 'Connect Wallet'}
            </span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-[#0B1E26] rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#2DD4BF]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#12242C] bg-[#040A0D]/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3">
          
          {/* Network Selector on Mobile */}
          <div className="p-2 bg-[#07151B] rounded-xl border border-[#142A34]">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-1">
              Active Network
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {NETWORKS.map((network) => (
                <button
                  key={network.id}
                  onClick={() => onSelectNetwork(network)}
                  className={`flex items-center gap-2 p-2 rounded-lg text-xs cursor-pointer transition-colors ${
                    selectedNetwork.id === network.id
                      ? 'bg-[#2DD4BF]/20 text-[#2DD4BF] font-semibold border border-[#2DD4BF]/30'
                      : 'bg-[#040B0E] text-slate-300 hover:text-white'
                  }`}
                >
                  <span>{network.icon}</span>
                  <span className="truncate">{network.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Nav Links */}
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleTabClick(link.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#2DD4BF]/15 text-[#2DD4BF] font-bold border border-[#2DD4BF]/30'
                      : 'text-slate-300 hover:bg-[#0B1E26] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {link.icon}
                    <span>{link.label}</span>
                  </div>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF]" />}
                </button>
              );
            })}
          </div>

          {/* Social and Audit Links */}
          <div className="pt-2 border-t border-[#12242C] flex items-center justify-between text-xs text-slate-400 px-2">
            <a
              href="https://x.com/ZyndexFi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-300 hover:text-[#2DD4BF] transition-colors"
            >
              <span>Follow @ZyndexFi</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <div className="flex items-center gap-1 text-[#2DD4BF]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Audited Contracts</span>
            </div>
          </div>

        </div>
      )}
    </header>
  );
};
