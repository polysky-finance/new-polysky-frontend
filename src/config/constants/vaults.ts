import tokens from './tokens'
import { VaultConfig } from './types'

const vaults: VaultConfig[] = [
{
    pid: 2,
    lpSymbol: 'SIRIUS',  
	exchange: 'Polysky',
	baseLiquidityUrl: 'https://quickswap.exchange/#/swap?outputCurrency=0xB1289f48E8d8Ad1532e83A8961f6E8b5a134661D',
	strategyAddress:{
		137: '0xf36588739784912085a0d4E7CF666c4f9B4f9178',
		80001: '',
	},
    lpAddresses: {
      137: '0xb1289f48e8d8ad1532e83a8961f6e8b5a134661d',
      80001: '',
    },
	masterChefAddress:{
		137: '0xD0023db30D1f4dB77e1049E79817B4D5dc571d15',
		80001: '',
	},
	spid: 0,
    token: tokens.sirius,
    quoteToken: tokens.sirius,
	rewardToken: tokens.sirius,
	emissionFunctionName: 'siriusPerBlock',
	emissionMultiplier: 1,
	isArchived: false,
	isSingle:true,
	allocPointName:'lastRewardTime',
	lpRewardsApr:0,
	platform: 'Polysky',
  },
  {
    pid: 1,
    lpSymbol: 'QUICK - USDC',  
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#/add/0x831753DD7087CaC61aB5644b308642cc1c33Dc13/0x9Bbcda2606e616659b118399A2823E8a392f55DA',
	strategyAddress:{
		137: '0x6d2f82A4D90c865B8A118d47677A1d6d6B85b1e3',
		80001: '',
	},
    lpAddresses: {
      137: '0x1f1e4c845183ef6d50e9609f16f6f9cae43bc9cb',
      80001: '',
    },
	masterChefAddress:{
		137: '0x939290ed45514e82900ba767bbcfa38ee1067039',
		80001: '',
	},
	spid: 0,
    token: tokens.quick,
    quoteToken: tokens.usdc,
	rewardToken: tokens.quick,
	emissionFunctionName: 'rewardRate',
	emissionMultiplier: 2,
	isArchived: false,
	isSingle:false,
	isQuickswap:true,
	isBurning:true,
	allocPointName: 'lastRewardTime',
	lpRewardsApr:26,
	platform: 'Quickswap',
  },
]

export default vaults
