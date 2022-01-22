import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  /**
   * These 3 farms (PID 0, 251, 252) should always be at the top of the file.
   */
   // MATIC - SIRIUS APESWAP LP 0xdf641eaf424a9972e92afd91ac57d28ea5ba05b7
   {
    pid: 1,
    lpSymbol: 'SIRIUS - MATIC',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0xeb9321b1a21f74c1c439e64771b4232743f2fa1b',
      80001: '',
    },
	multiplier:'25X',
	harvest: true,
    token: tokens.sirius,
    quoteToken: tokens.wmatic,
  },
  {
    pid: 27,
    lpSymbol: 'SIRIUS - USDC',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0xe231bb06eb18b920bc42a52bf33f519e1dcf8df3',
      80001: '',
    },
	multiplier:'25X',
	harvest: true,
    token: tokens.sirius,
    quoteToken: tokens.usdc,
  },
  {
    pid: 2,
    lpSymbol: 'MATIC - USDC',
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
    pid: 4,
    lpSymbol: 'SIRIUS - WMATIC',
	exchange: 'Apeswap',
	baseLiquidityUrl: 'https://app.apeswap.finance/',
    lpAddresses: {
      137: '0xDf641EaF424a9972e92afd91Ac57D28Ea5bA05B7',
      80001: '',
    },
	multiplier:'25X',
	harvest: true,
    token: tokens.sirius,
    quoteToken: tokens.wmatic,
  },
  {
    pid: 32,
    lpSymbol: 'SIRIUS - FTM',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0x728161Fdea6517641Ff5eF2C0e4d8D35D3ba48fb',
      80001: '',
    },
	multiplier:'25X',
	harvest: true,
    token: tokens.sirius,
    quoteToken: tokens.ftm,
  },
  {
    pid: 33,
    lpSymbol: 'SIRIUS - ONE',
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#',
    lpAddresses: {
      137: '0x76AbB14d5967196988CC6cd88f9dF88cE54db3a3',
      80001: '',
    },
	multiplier:'25X',
	harvest: true,
    token: tokens.sirius,
    quoteToken: tokens.one,
  },
]

export default farms
