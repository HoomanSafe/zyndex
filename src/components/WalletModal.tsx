import React, { useState } from 'react';
import { X, Check, Copy, ExternalLink, LogOut, Shield } from 'lucide-react';
import { NetworkConfig } from '../types';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  isConnected: boolean;
  walletAddress: string;
  onConnectWallet: (walletName: string) => void;
  onDisconnectWallet: () => void;
  selectedNetwork: NetworkConfig;
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  isConnected,
  walletAddress,
  onConnectWallet,
  onDisconnectWallet,
  selectedNetwork,
}) => {
  const [copied, setCopied] = useState(false);
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);

  if (!isOpen) return null;

  const WALLETS = [
    {
      id: 'robinhood',
      name: 'Robinhood Wallet',
      description: 'Native L2 Robinhood Chain & self-custody',
      icon: '🏹',
      badge: 'Native DEX',
    },
    {
      id: 'metamask',
      name: 'MetaMask',
      description: 'Popular Ethereum & EVM Web3 wallet',
      icon: '🦊',
      badge: 'Popular',
    },
    {
      id: 'rabby',
      name: 'Rabby Wallet',
      description: 'Multi-chain DeFi wallet with security checks',
      icon: '🐰',
      badge: 'DeFi Pro',
    },
    {
      id: 'coinbase',
      name: 'Coinbase Wallet',
      description: 'Smart contract wallet & passkey support',
      icon: '🔵',
    },
    {
      id: 'phantom',
      name: 'Phantom',
      description: 'Multi-chain EVM & Solana wallet',
      icon: '👻',
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectWallet = (name: string) => {
    setConnectingWallet(name);
    setTimeout(() => {
      onConnectWallet(name);
      setConnectingWallet(null);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md rounded-2xl bg-[#061217] border border-[#14323E] p-6 shadow-[0_0_50px_rgba(45,212,191,0.15)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Accent */}
        <div className="absolute top-0 right-1/4 w-40 h-40 bg-[#2DD4BF]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#12242C]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0A1E26] border border-[#2DD4BF]/30 flex items-center justify-center text-[#2DD4BF]">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-white">
                {isConnected ? 'Account Details' : 'Connect Wallet'}
              </h3>
              <p className="text-xs text-slate-400">
                Network: <span className="text-[#2DD4BF] font-mono">{selectedNetwork.name}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#0B212B] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isConnected ? (
          /* Connected State */
          <div className="mt-5 space-y-4">
            <div className="p-4 rounded-xl bg-[#081820] border border-[#143442]">
              <div className="text-xs text-slate-400 mb-1">Connected Address</div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-sm text-[#2DD4BF] font-semibold break-all">
                  {walletAddress}
                </span>
                <button
                  onClick={handleCopy}
                  className="p-2 text-slate-300 hover:text-[#2DD4BF] hover:bg-[#0B2530] rounded-lg transition-colors cursor-pointer shrink-0"
                  title="Copy Address"
                >
                  {copied ? <Check className="w-4 h-4 text-[#2DD4BF]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Balances breakdown */}
            <div className="p-3.5 rounded-xl bg-[#07151B] border border-[#132A35] space-y-2">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Simulated Balances
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300">ETH Balance</span>
                <span className="font-mono font-medium text-white">2.845 ETH (~$9,730)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300">ZYNDEX Balance</span>
                <span className="font-mono font-medium text-[#2DD4BF]">15,420 ZYNDEX</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300">USDC Balance</span>
                <span className="font-mono font-medium text-white">4,850.00 USDC</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <a
                href={`https://etherscan.io/address/${walletAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-[#163847] text-xs font-medium text-slate-300 hover:text-white hover:bg-[#091E27] transition-colors"
              >
                <span>View on Explorer</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => {
                  onDisconnectWallet();
                  onClose();
                }}
                className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-red-950/40 border border-red-800/40 text-xs font-semibold text-red-400 hover:bg-red-900/60 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Disconnect</span>
              </button>
            </div>
          </div>
        ) : (
          /* Wallet Selector List */
          <div className="mt-4 space-y-2">
            <p className="text-xs text-slate-400 mb-3">
              Connect your Web3 wallet to manage liquidity vaults, deposit tokens, and stake in The Well.
            </p>
            {WALLETS.map((w) => (
              <button
                key={w.id}
                onClick={() => handleSelectWallet(w.name)}
                disabled={connectingWallet !== null}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#07151B] border border-[#142C37] hover:border-[#2DD4BF]/50 hover:bg-[#0A2029] transition-all cursor-pointer group text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl group-hover:scale-110 transition-transform">
                    {w.icon}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-white group-hover:text-[#2DD4BF] transition-colors flex items-center gap-2">
                      {w.name}
                      {w.badge && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#2DD4BF]/15 text-[#2DD4BF] border border-[#2DD4BF]/25">
                          {w.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400">{w.description}</div>
                  </div>
                </div>

                {connectingWallet === w.name ? (
                  <div className="w-4 h-4 border-2 border-[#2DD4BF] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span className="text-xs text-slate-500 group-hover:text-[#2DD4BF] transition-colors">
                    Connect →
                  </span>
                )}
              </button>
            ))}

            <div className="pt-3 text-center">
              <p className="text-[11px] text-slate-500">
                By connecting, you agree to the non-custodial protocol terms. Funds remain solely under your key control.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
