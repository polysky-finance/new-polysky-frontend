import BigNumber from 'bignumber.js'
import { SerializedBigNumber, TranslatableText } from 'state/types'

export interface Address {
  137?: string
  80001: string
}

export interface Token {
  symbol: string
  address?: Address
  decimals?: number
  projectLink?: string
  usdcPrice?: string
}

export enum PoolIds {
  poolBasic = 'poolBasic',
  poolUnlimited = 'poolUnlimited',
}

export enum PoolCategory {
  'COMMUNITY' = 'Community',
  'CORE' = 'Core',
  'BINANCE' = 'Binance', // Pools using native BNB behave differently than pools using a token
  'AUTO' = 'Auto',
}

export interface FarmConfig {
  pid: number
  lpSymbol: string
  lpAddresses: Address
  token: Token
  quoteToken: Token
  exchange: string
  multiplier?: string
  baseLiquidityUrl?: string
  harvest: boolean
  isCommunity?: boolean
  dual?: {
    rewardPerBlock: number
    earnLabel: string
    endBlock: number
  }
}

export interface VaultConfig {
  pid: number
  spid: number
  lpSymbol: string
  lpAddresses: Address
  strategyAddress: Address
  masterChefAddress: Address
  token: Token
  quoteToken: Token
  rewardToken: Token
  isArchived: boolean
  isSingle: false
  isStable: false
  isQuickswap?: boolean
  maticPerDay?: number
  emissionFunctionName: string
  emissionMultiplier: number
  exchange: string
  platform: string
  baseLiquidityUrl?: string
  allocPointName: string
  lpRewardsApr:number
  isBurning?: boolean
}

export interface PoolConfig {
  sousId: number
  earningToken: Token
  stakingToken: Token
  contractAddress: Address
  poolCategory: PoolCategory
  tokenPerBlock: string
  sortOrder?: number
  harvest?: boolean
  isFinished?: boolean
  enableEmergencyWithdraw?: boolean
}

export type Images = {
  lg: string
  md: string
  sm: string
  ipfs?: string
}

export type PageMeta = {
  title: string
  description?: string
  image?: string
}
