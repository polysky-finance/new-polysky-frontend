import tokens from './tokens'
import { VaultConfig } from './types'

const vaults: VaultConfig[] = [
     {
    pid: 17,
    lpSymbol: 'QUICK - USDC',  // Always write the token with a farm first. This is used for price calculation. Better method to be implemented later
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#/add/0x831753DD7087CaC61aB5644b308642cc1c33Dc13/0x9Bbcda2606e616659b118399A2823E8a392f55DA',
	strategyAddress:{
		137: '0xf6ed3F095272A5C6462CF78b9928663F3aF837a5',
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
