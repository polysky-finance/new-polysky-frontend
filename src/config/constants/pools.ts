import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    stakingToken: tokens.sirius,
    earningToken: tokens.sirius,
    contractAddress: {
      137: '0xD0023db30D1f4dB77e1049E79817B4D5dc571d15',
      80001: '',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.15',
    sortOrder: 1,
    isFinished: false,
  }
]


export default pools
