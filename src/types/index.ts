export type TabType = 'overview' | 'pools' | 'well' | 'positions' | 'analytics' | 'docs';

export type NetworkType = 'robinhood' | 'ethereum' | 'arbitrum' | 'base';

export interface NetworkConfig {
  id: NetworkType;
  name: string;
  icon: string;
  chainId: number;
  rpcStatus: 'Optimal' | 'Active';
}

export interface Pool {
  id: string;
  token0: {
    symbol: string;
    name: string;
    icon: string;
    decimals: number;
    priceUsd: number;
  };
  token1: {
    symbol: string;
    name: string;
    icon: string;
    decimals: number;
    priceUsd: number;
  };
  dex: 'Uniswap v3' | 'Uniswap v4' | 'Robinhood DEX';
  feeTier: string; // e.g. "0.05%"
  category: 'bluechip' | 'robinhood' | 'stable' | 'meme' | 'ecosystem';
  tvl: number;
  volume24h: number;
  apy: number;
  feeApr: number;
  rewardApr: number;
  rebalanceFrequency: string; // e.g. "4.2h avg"
  inRangePercentage: number; // e.g. 99.4%
  strategy: 'Tight Aggressive' | 'Balanced Adaptive' | 'Wide Stable';
  featured?: boolean;
}

export interface UserPosition {
  id: string;
  poolId: string;
  poolTitle: string;
  pair: string;
  depositedAmount0: number;
  depositedAmount1: number;
  depositedUsd: number;
  currentValueUsd: number;
  unclaimedFeesUsd: number;
  unclaimedToken0: number;
  unclaimedToken1: number;
  pnlUsd: number;
  pnlPercentage: number;
  status: 'In Range' | 'Rebalancing' | 'Out of Range';
  strategy: string;
  autoReinvest: boolean;
  lastRebalancedAt: string;
  rebalanceCount: number;
}

export interface StakingData {
  zyndexPrice: number;
  totalStakedZyndex: number;
  circulatingZyndex: number;
  stakingApy: number;
  totalEthDistributed: number;
  userStakedZyndex: number;
  userClaimableEth: number;
  userClaimableUsd: number;
  userTier: number;
}
