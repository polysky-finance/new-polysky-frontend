import tokens from './tokens'
import { FarmConfig } from './types'

const priceHelperLps: FarmConfig[] = [
  /**
   * These LPs are just used to help with price calculation for MasterChef LPs (farms.ts).
   * This list is added to the MasterChefLps and passed to fetchFarm. The calls to get contract information about the token/quoteToken in the LP are still made.
   * The absense of a PID means the masterchef contract calls are skipped for this farm.
   * Prices are then fetched for all farms (masterchef + priceHelperLps).
   * Before storing to redux, farms without a PID are filtered out.
   */
  {
    pid: null,
    lpSymbol: 'WETH - WMATIC',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://app.apeswap.finance/',
    lpAddresses: {
      137: '0xadbf1854e5883eb8aa7baf50705338739e558e5b',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.weth,
    quoteToken: tokens.wmatic,
  },
  {
    pid: null,
    lpSymbol: 'KOGECOIN - WMATIC',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#/add/ETH/0x13748d548D95D78a3c83fe3F32604B4796CFfa23',
    lpAddresses: {
      137: '0x3885503aef5e929fcb7035fbdca87239651c8154',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.kogecoin,
    quoteToken: tokens.wmatic,
  },
  {
    pid: null,
    lpSymbol: 'SUCHI - WMATIC',
	exchange: 'Suchiswap',
	baseLiquidityUrl: 'https://app.sushi.com/',
    lpAddresses: {
      137: '0x597a9bc3b24c2a578ccb3aa2c2c62c39427c6a49',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.sushi,
    quoteToken: tokens.wmatic,
  },
  {
    pid: null,
    lpSymbol: 'DAI - USDC',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://app.apeswap.finance/',
    lpAddresses: {
      137: '0xf04adbf75cdfc5ed26eea4bbbb991db002036bdd',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.dai,
    quoteToken: tokens.usdc,
  },
  {
    pid: null,
    lpSymbol: 'BANANA - WMATIC',
	exchange: 'Apeswap',
	baseLiquidityUrl: 'https://app.apeswap.finance/',
    lpAddresses: {
      137: '0x034293F21F1cCE5908BC605CE5850dF2b1059aC0',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.banana,
    quoteToken: tokens.wmatic,
  },
  {
    pid: null,
    lpSymbol: 'WETH - WMATIC',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://app.apeswap.finance/',
    lpAddresses: {
      137: '0xadbf1854e5883eb8aa7baf50705338739e558e5b',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.weth,
    quoteToken: tokens.wmatic,
  },
  {
    pid: null,
    lpSymbol: 'LINK - WETH',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://app.apeswap.finance/',
    lpAddresses: {
      137: '0x5ca6ca6c3709e1e6cfe74a50cf6b2b6ba2dadd67',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.link,
    quoteToken: tokens.weth,
  },
  {
    pid: null,
    lpSymbol: 'LINK - WETH',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://app.apeswap.finance/',
    lpAddresses: {
      137: '0x2cf7252e74036d1da831d11089d326296e64a728',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.usdt,
    quoteToken: tokens.usdc,
  },
   {
    pid: null,
    lpSymbol: 'QUICK - WMATIC',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://app.apeswap.finance/',
    lpAddresses: {
      137: '0x019ba0325f1988213d448b3472fa1cf8d07618d7',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.quick,
    quoteToken: tokens.wmatic,
  },
  {
    pid: null,
    lpSymbol: 'DFYN - USDC',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://app.apeswap.finance/',
    lpAddresses: {
      137: '0x4c38938e21cb9796932b0b0cc3f8a088f07b49b0',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.dfyn,
    quoteToken: tokens.usdc,
  },
  {
    pid: null,
    lpSymbol: 'WBTC - WETH',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://app.apeswap.finance/',
    lpAddresses: {
      137: '0xdC9232E2Df177d7a12FdFf6EcBAb114E2231198D',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.wbtc,
    quoteToken: tokens.weth,
  },
  {
    pid: null,
    lpSymbol: 'WMATIC - USDC LP',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0x6e7a5fafcec6bb1e78bae2a1f0b612012bf14827',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.usdc,
    quoteToken: tokens.wmatic,
  }
  ,
  {
    pid: null,
    lpSymbol: 'FISH - USDC LP',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0x0df9e46c0eaedf41b9d4bbe2cea2af6e8181b033',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.fish,
    quoteToken: tokens.usdc,
  },
  {
    pid: null,
    lpSymbol: 'WMATIC-QI',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0x9a8b2601760814019b7e6ee0052e25f1c623d1e6',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.qi,
    quoteToken: tokens.wmatic,
  },
]

export default priceHelperLps
