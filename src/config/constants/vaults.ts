import tokens from './tokens'
import { VaultConfig } from './types'

const vaults: VaultConfig[] = [
   {
    pid: 10,
    lpSymbol: 'WMATIC - BANANA',  // Always write the token with a farm first. This is used for price calculation. Better method to be implemented later
	exchange: 'Apeswap',
	baseLiquidityUrl: 'https://app.apeswap.finance/add/ETH/0x5d47baba0d66083c52009271faf3f50dcc01023c',
	strategyAddress:{
		137: '0xC795eA4661952cdf0670c56E7c91c57e53d1c596',
		80001: '',
	},
    lpAddresses: {
      137: '0x034293f21f1cce5908bc605ce5850df2b1059ac0',
      80001: '',
    },
	masterChefAddress:{
		137: '0x54aff400858Dcac39797a81894D9920f16972D1D',
		80001: '',
	},
	spid: 0,
    token: tokens.banana,
    quoteToken: tokens.wmatic,
	rewardToken: tokens.banana,
	emissionFunctionName: 'bananaPerSecond',
	emissionMultiplier: 2,
	isArchived: false,
	isSingle:false,
	allocPointName: 'allocPoint',
	lpRewardsApr:5.82,
	isBurning:true,
	platform: 'Apeswap',
  },
  {
    pid: 21,
    lpSymbol: 'WMATIC - KOGECOIN',  // Always write the token with a farm first. This is used for price calculation. Better method to be implemented later
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#/add/ETH/0x13748d548D95D78a3c83fe3F32604B4796CFfa23',
	strategyAddress:{
		137: '0xC0eee19e2c3e66a19287a656c1a9e0E5339b3904',
		80001: '',
	},
    lpAddresses: {
      137: '0x3885503aEF5E929fCB7035FBDcA87239651C8154',
      80001: '',
    },
	masterChefAddress:{
		137: '0x6275518a63e891b1bC54FEEBBb5333776E32fAbD',
		80001: '',
	},
	spid: 0,
    token: tokens.kogecoin,
    quoteToken: tokens.wmatic,
	rewardToken: tokens.kogecoin,
	emissionFunctionName: 'rewardPerBlock',
	emissionMultiplier: 1,
	isArchived: false,
	isSingle:false,
	allocPointName: 'lastRewardTime',
	lpRewardsApr:55.67,
	isBurning:true,
	platform: 'Kogefarm',
  },
{
    pid: 20,
    lpSymbol: 'USDC - DAI',  // Always write the token with a farm first. This is used for price calculation. Better method to be implemented later
	exchange: 'Apeswap',
	baseLiquidityUrl: 'https://app.apeswap.finance/add/0x2791bca1f2de4661ed88a30c99a7a9449aa84174/0x8f3cf7ad23cd3cadbd9735aff958023239c6a063',
	strategyAddress:{
		137: '0xc4ac00db2334d491b0F1C186259d6F037f04010F',
		80001: '',
	},
    lpAddresses: {
      137: '0x5b13B583D4317aB15186Ed660A1E4C65C10da659',
      80001: '',
    },
	masterChefAddress:{
		137: '0x54aff400858Dcac39797a81894D9920f16972D1D',
		80001: '',
	},
	spid: 5,
    token: tokens.dai,
    quoteToken: tokens.usdc,
	rewardToken: tokens.banana,
	emissionFunctionName: 'bananaPerSecond',
	emissionMultiplier: 2,
	isArchived: false,
	isSingle:false,
	allocPointName: 'allocPoint',
	lpRewardsApr:3.3,
	isBurning:true,
	platform: 'Apeswap',
  },  
   {
    pid: 3,
    lpSymbol: 'SIRIUS',  // Always write the token with a farm first. This is used for price calculation. Better method to be implemented later
	exchange: 'Polysky',
	baseLiquidityUrl: 'https://quickswap.exchange/#/swap?outputCurrency=0xB1289f48E8d8Ad1532e83A8961f6E8b5a134661D',
	strategyAddress:{
		137: '0xe5F50817191BD3A6B699b702d3cFB77524f991f7',
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
    pid: 23,
    lpSymbol: 'WMATIC - KOGECOIN',  // Always write the token with a farm first. This is used for price calculation. Better method to be implemented later
	exchange: 'Quickswap',
	baseLiquidityUrl: 'https://quickswap.exchange/#/add/ETH/0x13748d548D95D78a3c83fe3F32604B4796CFfa23',
	strategyAddress:{
		137: '0xF924cC92c747c8930EC48815C587B476157691e4',
		80001: '',
	},
    lpAddresses: {
      137: '0x3885503aEF5E929fCB7035FBDcA87239651C8154',
      80001: '',
    },
	masterChefAddress:{
		137: '0x6275518a63e891b1bC54FEEBBb5333776E32fAbD',
		80001: '',
	},
	spid: 0,
    token: tokens.kogecoin,
    quoteToken: tokens.wmatic,
	rewardToken: tokens.kogecoin,
	emissionFunctionName: 'rewardPerBlock',
	emissionMultiplier: 1,
	isArchived: false,
	isSingle:false,
	allocPointName: 'lastRewardTime',
	lpRewardsApr:55.67,
	isBurning:false,
	platform: 'Kogefarm',
  }, 
    {
    pid: 6,
    lpSymbol: 'WMATIC - BANANA',  // Always write the token with a farm first. This is used for price calculation. Better method to be implemented later
	exchange: 'Apeswap',
	baseLiquidityUrl: 'https://app.apeswap.finance/add/ETH/0x5d47baba0d66083c52009271faf3f50dcc01023c',
	strategyAddress:{
		137: '0x5F3D7E81BeE2DfF8E6493c01415cFfdCE930965d',
		80001: '',
	},
    lpAddresses: {
      137: '0x034293f21f1cce5908bc605ce5850df2b1059ac0',
      80001: '',
    },
	masterChefAddress:{
		137: '0x54aff400858Dcac39797a81894D9920f16972D1D',
		80001: '',
	},
	spid: 0,
    token: tokens.banana,
    quoteToken: tokens.wmatic,
	rewardToken: tokens.banana,
	emissionFunctionName: 'bananaPerSecond',
	emissionMultiplier: 2,
	isArchived: false,
	isSingle:false,
	allocPointName: 'allocPoint',
	lpRewardsApr:5.72,
	platform: 'Apeswap',
  },
  {
    pid: 7,
    lpSymbol: 'WMATIC - BNB',  // Always write the token with a farm first. This is used for price calculation. Better method to be implemented later
	exchange: 'Apeswap',
	baseLiquidityUrl: 'https://app.apeswap.finance/add/ETH/0xa649325aa7c5093d12d6f98eb4378deae68ce23f',
	strategyAddress:{
		137: '0x8Ad13C0932a7a3a81c62E9Ec37141E7E77EAd485',
		80001: '',
	},
    lpAddresses: {
      137: '0x0359001070cF696D5993E0697335157a6f7dB289',
      80001: '',
    },
	masterChefAddress:{
		137: '0x54aff400858Dcac39797a81894D9920f16972D1D',
		80001: '',
	},
	spid: 6,
    token: tokens.bnb,
    quoteToken: tokens.wmatic,
	rewardToken: tokens.banana,
	emissionFunctionName: 'bananaPerSecond',
	emissionMultiplier: 2,
	isArchived: false,
	isSingle:false,
	allocPointName: 'allocPoint',
	lpRewardsApr:9.11,
	platform: 'Apeswap',
  },
]

export default vaults
