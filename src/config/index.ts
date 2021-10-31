import BigNumber from 'bignumber.js/bignumber'
import { BIG_TEN } from 'utils/bigNumber'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const POLYGON_BLOCK_TIME = 2

// CAKE_PER_BLOCK details
// 40 CAKE is minted per block
// 20 SIRIUS per block is sent to Burn pool (A farm just for burning sirius)
// 10 SIRIUS per block goes to CAKE syrup pool
// 9 SIRIUS per block goes to Yield farms and lottery
// CAKE_PER_BLOCK in config/index.ts = 40 as we only change the amount sent to the burn pool which is effectively a farm.
// CAKE/Block in src/views/Home/components/CakeStats.tsx = 19 (40 - Amount sent to burn pool)

export const SIRIUS_PER_BLOCK = new BigNumber(0.15)
export const BLOCKS_PER_YEAR = new BigNumber((60 / POLYGON_BLOCK_TIME) * 60 * 24 * 365) // 10512000
export const SIRIUS_PER_YEAR = SIRIUS_PER_BLOCK.times(BLOCKS_PER_YEAR)
export const BASE_URL = 'https://polysky.finance'
export const BASE_EXCHANGE_URL = 'https://quickswap.exchange/#'
export const BASE_ADD_LIQUIDITY_URL = `${BASE_EXCHANGE_URL}/#/add`
export const BASE_POLYGON_SCAN_URL = 'https://polygonscan.com/'
export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18)
export const DEFAULT_GAS_LIMIT = 3000000
export const DEFAULT_GAS_PRICE = 32
