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
  {
    pid: null,
    lpSymbol: 'EROWAN - AKT',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0xA651EF83FA6a90e76206De4e79A5c69f80994556',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.erowan,
    quoteToken: tokens.akt,
  },
  {
    pid: null,
    lpSymbol: 'EROWAN - REGEN',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0x66c37a00E426A613B188180198AAC12B0b4aE4D4',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.erowan,
    quoteToken: tokens.regen,
  },
  {
    pid: null,
    lpSymbol: 'EROWAN - ATOM',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0x7051810A53030171F01d89e9AeBd8A599DE1B530',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.erowan,
    quoteToken: tokens.atom,
  },
  {
    pid: null,
    lpSymbol: 'QUICK - ATOM',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0xf7e659966196f069a23ce9b84b9586a809c4cd9a',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.atom,
    quoteToken: tokens.quick,
  },
  {
    pid: null,
    lpSymbol: 'WORK-USDC',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0xAb0454B98dAf4A02EA29292E6A8882FB2C787DD4',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.work,
    quoteToken: tokens.usdc,
  },
  {
    pid: null,
    lpSymbol: 'FOR-USDC',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0xA1c3eb6fE2bB452AaC4d9247478594bf04750017',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.for,
    quoteToken: tokens.usdc,
  },
  {
    pid: null,
    lpSymbol: 'DG-USDC',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0x27CE41B9eeB94cC122eF3B5e409b2900d3e0A629',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.dg,
    quoteToken: tokens.usdc,
  },
  {
    pid: null,
    lpSymbol: 'ORBS - USDC',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0xB2b6D423e535b57aaD06E9866803B95fB66152EA',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.orbs,
    quoteToken: tokens.usdc,
  },
  {
    pid: null,
    lpSymbol: 'DNXC - USDC',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0xE169a660d720917B4fB7e95f045B6f60a64EB10A',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.dnxc,
    quoteToken: tokens.usdc,
  },
  {
    pid: null,
    lpSymbol: 'ROUTE - WETH',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0xeBC4f9B1cE66258AC3A48578FFEEba1330dDB68B',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.route,
    quoteToken: tokens.weth,
  },
  {
    pid: null,
    lpSymbol: 'SFI - WETH',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0x7C07CecD8cdd65C0daD449808cc5f9AD74C22bd1',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.sfi,
    quoteToken: tokens.weth,
  },
  {
    pid: null,
    lpSymbol: 'ARPA - WETH',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0x590F5E967d73eA06DAE9aED2788108DCF52dA269',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.arpa,
    quoteToken: tokens.weth,
  },
  {
    pid: null,
    lpSymbol: 'BEL - WETH',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0x49ceCfa5c62b3A97F58CAd6B4aCc7c74810E1DDa',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.bel,
    quoteToken: tokens.weth,
  },
  {
    pid: null,
    lpSymbol: 'xMARK - USDC',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0x97A95deb56d689802F02f50c25EBCda5d0A49591',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.xmark,
    quoteToken: tokens.usdc,
  },
  {
    pid: null,
    lpSymbol: 'SX - WETH',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0x1bF9805B40a5f69c7d0f9E5d1Ab718642203c652',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.sx,
    quoteToken: tokens.weth,
  },
  {
    pid: null,
    lpSymbol: 'CGG - WMATIC',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0xd74d23d2f23CD06a7D94f740A74c6E906F0C9005',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.cgg,
    quoteToken: tokens.wmatic,
  },
  {
    pid: null,
    lpSymbol: 'pWINGS - WMATIC',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0xa0a6e9a5185d5737cf6f7920cb417ea2f07f03b3',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.pwings,
    quoteToken: tokens.wmatic,
  },
  {
    pid: null,
    lpSymbol: 'TIME - USDC',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0xe44cfd418d8b8207eb0a059207c807922d165c05',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.time,
    quoteToken: tokens.usdc,
  },
  {
    pid: null,
    lpSymbol: 'pNAUT-WMATIC',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0x9586c9add103547275ad86024f1dc6fe05040b35',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.pnaut,
    quoteToken: tokens.wmatic,
  },
  {
    pid: null,
    lpSymbol: 'PEAR-WMATIC',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0x51BEffd36EB8c81a9b440B7ee51f98ba9eFda707',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.pear,
    quoteToken: tokens.wmatic,
  },
  {
    pid: null,
    lpSymbol: 'PolyDoge-QUICK',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0xbedee6a7c572aa855a0c84d2f504311d482862f4',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.polydoge,
    quoteToken: tokens.quick,
  },
  {
    pid: null,
    lpSymbol: 'GFI-USDC',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0x96d6F7afFF161E7152Bec4272B51Cc007E4417AE',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.gfi,
    quoteToken: tokens.usdc,
  },
  {
    pid: null,
    lpSymbol: 'CRYSTL-MATIC',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0xb8e54c9ea1616beebe11505a419dd8df1000e02a',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.crystl,
    quoteToken: tokens.wmatic,
  },
  {
    pid: null,
    lpSymbol: 'WUSD - USDC',
	exchange: 'Wault',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0x7B93196CD4861f345509c2da31058CA4B1c30D63',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.wusd,
    quoteToken: tokens.usdc,
  },
  {
    pid: null,
    lpSymbol: 'WEXPOLY - USDC',
	exchange: 'Wault',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0x5DE6a3CcA10d3F788EEdbD4923e31D4658bf6f9a',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.wexpoly,
    quoteToken: tokens.usdc,
  },
  {
    pid: null,
    lpSymbol: 'SHIB - MATIC',
	exchange: 'Wault',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0x5fb641de2663e8a94c9dea0a539817850d996e99',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.shib,
    quoteToken: tokens.wmatic,
  },
  {
    pid: null,
    lpSymbol: 'renDOGE-ETH',
	exchange: 'Wault',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0x13305f843e66f7cc7f9cb1bbc40dabee7086d1f8',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.rendoge,
    quoteToken: tokens.weth,
  },
  {
    pid: null,
    lpSymbol: 'ELON-ETH',
	exchange: 'Wault',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0xab1403de66519b898b38028357b74df394a54a37',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.elon,
    quoteToken: tokens.weth,
  },
  {
    pid: null,
    lpSymbol: 'GENESIS-QUICK',
	exchange: 'Quick',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0xab1403de66519b898b38028357b74df394a54a37',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.genesis,
    quoteToken: tokens.quick,
  },
  {
    pid: null,
    lpSymbol: 'CRO-MATIC',
	exchange: 'Quick',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0xfd168748dd07a32a401e800240aec8ec6efc706f',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.cro,
    quoteToken: tokens.wmatic,
  },
  {
    pid: null,
    lpSymbol: 'ONE-MATIC',
	exchange: 'Quick',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0x28c5367d8a4e85f8d7b41a0ca2579e66a58fccb6',
      80001: '',
    },
	multiplier:'0X',
	harvest: true,
    token: tokens.one,
    quoteToken: tokens.wmatic,
  },
]

export default priceHelperLps
