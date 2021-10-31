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
  ,
  {
    sousId: 15,
    stakingToken: tokens.banana,
    earningToken: tokens.sirius,
    contractAddress: {
      137: '0xD0023db30D1f4dB77e1049E79817B4D5dc571d15',
      80001: '',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.15',
    sortOrder: 3,
    isFinished: true,
  } ,
  {
    sousId: 6,
    stakingToken: tokens.wmatic,
    earningToken: tokens.sirius,
    contractAddress: {
      137: '0xD0023db30D1f4dB77e1049E79817B4D5dc571d15',
      80001: '',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.15',
    sortOrder: 3,
    isFinished: true,
  } ,
  {
    sousId: 11,
    stakingToken: tokens.usdc,
    earningToken: tokens.sirius,
    contractAddress: {
      137: '0xD0023db30D1f4dB77e1049E79817B4D5dc571d15',
      80001: '',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.15',
    sortOrder: 3,
    isFinished: true,
  } ,
  {
    sousId: 12,
    stakingToken: tokens.usdt,
    earningToken: tokens.sirius,
    contractAddress: {
      137: '0xD0023db30D1f4dB77e1049E79817B4D5dc571d15',
      80001: '',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.15',
    sortOrder: 3,
    isFinished: true,
  } ,
  {
    sousId: 13,
    stakingToken: tokens.dai,
    earningToken: tokens.sirius,
    contractAddress: {
      137: '0xD0023db30D1f4dB77e1049E79817B4D5dc571d15',
      80001: '',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.15',
    sortOrder: 3,
    isFinished: true,
  } 
  
]


export default pools
