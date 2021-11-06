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
  {
    pid: null,
    lpSymbol: 'SOL - MATIC',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0x898386dd8756779a4ba4f1462891b92dd76b78ef',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.sol,
    quoteToken: tokens.wmatic,
  },
  {
    pid: null,
    lpSymbol: 'AVAX - MATIC',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0xeb477ae74774b697b5d515ef8ca09e24fee413b5',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.avax,
    quoteToken: tokens.wmatic,
  },
  {
    pid: null,
    lpSymbol: 'pBREW - MATIC',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0x4f03233c742Ea20e73b46d5E33242b7770274ab8',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.pbrew,
    quoteToken: tokens.wmatic,
  },
  {
    pid: null,
    lpSymbol: 'BREW - USDC',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0x248C328b1048f9B6e7e00D61a02E9cA3F8c2bf50',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.brew,
    quoteToken: tokens.usdc,
  },
  {
    pid: null,
    lpSymbol: 'TUSD - USDC',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0x4AB66a7138F50Db9B7aDaF8CE8aFB3F638B22f7f',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.tusd,
    quoteToken: tokens.usdc,
  },
  {
    pid: null,
    lpSymbol: 'INSUR - USDC',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0x6F21996181915D688C787A1eC7C987E2A31B6829',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.insur,
    quoteToken: tokens.usdc,
  },
  {
    pid: null,
    lpSymbol: 'WETH - MANA',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.mana,
    quoteToken: tokens.weth,
  },
  {
    pid: null,
    lpSymbol: 'EROWAN-QUICK',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0x631F39D22430E889A3CFbEA4FD73Ed101059075f',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.erowan,
    quoteToken: tokens.quick,
  },
  {
    pid: null,
    lpSymbol: 'DINO - USDC',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0x3324af8417844e70b81555A6D1568d78f4D4Bf1f',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.dino,
    quoteToken: tokens.usdc,
  },
  {
    pid: null,
    lpSymbol: 'MATIC - QI',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0x9A8b2601760814019B7E6eE0052E25f1C623D1E6',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.qi,
    quoteToken: tokens.wmatic,
  },
  {
    pid: null,
    lpSymbol: 'USDC - MAI',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0x160532D2536175d65C03B97b0630A9802c274daD',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.mai,
    quoteToken: tokens.usdc,
  },
  {
    pid: null,
    lpSymbol: 'EROWAN - IRIS',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0x58fFB271c6F3D92f03C49e08E2887810F65b8Cd6',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.erowan,
    quoteToken: tokens.iris,
  },
  {
    pid: null,
    lpSymbol: 'WMATIC - BNB',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0x0359001070cF696D5993E0697335157a6f7dB289',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.bnb,
    quoteToken: tokens.wmatic,
  },
  {
    pid: null,
    lpSymbol: 'WMATIC - BNB',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0x0359001070cF696D5993E0697335157a6f7dB289',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.bnb,
    quoteToken: tokens.wmatic,
  },
  {
    pid: null,
    lpSymbol: 'UNI - ETH',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0xf7135272a5584eb116f5a77425118a8b4a2ddfdb',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.uni,
    quoteToken: tokens.weth,
  },
  {
    pid: null,
    lpSymbol: 'AAVE - ETH',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0x1d7c760a79ec798cbc5f6e017baaa445965daba8',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.aave,
    quoteToken: tokens.weth,
  },
  {
    pid: null,
    lpSymbol: 'FTM - WMATIC',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0xd2b61a42d3790533fedc2829951a65120624034a',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.ftm,
    quoteToken: tokens.wmatic,
  },
  {
    pid: null,
    lpSymbol: 'UST - USDT',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0x39BEd7f1C412ab64443196A6fEcb2ac20C707224',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.ust,
    quoteToken: tokens.usdt,
  },
  {
    pid: null,
    lpSymbol: 'USDC - BIFI',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0x180237bd326d5245D0898336F54b3c8012c5c62f',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.bifi,
    quoteToken: tokens.usdc,
  },
  {
    pid: null,
    lpSymbol: 'EROWAN - XPRT',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0xF366DF119532b2e0F4E416C81d6FF7728a60FE7d',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.erowan,
    quoteToken: tokens.xprt,
  },
]

export default priceHelperLps
