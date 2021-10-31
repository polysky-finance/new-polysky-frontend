import BigNumber from 'bignumber.js'
import masterchefABI from 'config/abi/masterchefStandard.json'
import quickswapABI from 'config/abi/quickswapAbi.json'
import erc20 from 'config/abi/erc20.json'
import { getAddress, getVaultChefAddress } from 'utils/addressHelpers'
import { BIG_ONE, BIG_TEN, BIG_ZERO } from 'utils/bigNumber'
import multicall from 'utils/multicall'
import { Vault, SerializedBigNumber } from '../types'


type PublicVaultData = {
  tokenAmountMc: SerializedBigNumber
  quoteTokenAmountMc: SerializedBigNumber
  tokenAmountTotal: SerializedBigNumber
  quoteTokenAmountTotal: SerializedBigNumber
  lpTotalInQuoteToken: SerializedBigNumber
  lpTokenBalanceMC: SerializedBigNumber
  lpTotalSupply: SerializedBigNumber
  tokenPriceVsQuote: SerializedBigNumber
  poolWeight: SerializedBigNumber
  emission: SerializedBigNumber
  masterChefBalanceRatio: SerializedBigNumber
}

export const fetchVaultLP = async (vault: Vault): Promise<PublicVaultData> => {
  const { spid, lpAddresses, token, quoteToken, strategyAddress, masterChefAddress, emissionFunctionName, allocPointName} = vault
  const lpAddress = getAddress(lpAddresses)
  const masterAddress = getAddress(masterChefAddress)
  const calls = [
    // Balance of token in the LP contract
    {
      address: getAddress(token.address),
      name: 'balanceOf',
      params: [lpAddress],
    },
    // Balance of quote token on LP contract
    {
      address: getAddress(quoteToken.address),
      name: 'balanceOf',
      params: [lpAddress],
    },

    // Total supply of LP tokens
    {
      address: lpAddress,
      name: 'totalSupply',
    },
    // Token decimals
    {
      address: getAddress(token.address),
      name: 'decimals',
    },
    // Quote token decimals
    {
      address: getAddress(quoteToken.address),
      name: 'decimals',
    }, 
  ]
  
  const [tokenBalanceLP  , quoteTokenBalanceLP , lpTotalSupply  , tokenDecimals, quoteTokenDecimals  ] =
    await multicall(erc20, calls)

  // Balance of LP tokens being compounded by the strategy contract
  const [lpTokenBalanceStrategy, totalAllocPoint, info, emissionMC] = 
  (await multicall(masterchefABI, [
    {
    address: masterAddress,
    name: 'userInfo',
    params: [spid, getAddress(strategyAddress)],
  },
  {
    address: masterAddress,
    name: 'totalAllocPoint',
  },
  {
    address: masterAddress,
    name: 'poolInfo',
    params: [spid],
  },
  {
    address: masterAddress,
    name: emissionFunctionName,
  },
]))

  const [lpTokenBalanceMasterChef] = (await multicall(erc20, [
      {
        address: lpAddress,
        name: 'balanceOf',
        params: [masterAddress],
      },
    ]))
      
  const masterChefBalanceRatio = new BigNumber(lpTokenBalanceMasterChef).div(new BigNumber(lpTokenBalanceStrategy.amount._hex))

  // Ratio in % of LP tokens that are staked in the strategy, vs the total number in circulation
  const lpTokenRatio = new BigNumber(lpTokenBalanceStrategy.amount._hex).div(new BigNumber(lpTotalSupply))

  // Raw amount of token in the LP, including those not staked
  const tokenAmountTotal = new BigNumber(tokenBalanceLP).div(BIG_TEN.pow(tokenDecimals))
  const quoteTokenAmountTotal = new BigNumber(quoteTokenBalanceLP).div(BIG_TEN.pow(quoteTokenDecimals))

  // Amount of token in the LP that are staked in the MC (i.e amount of token * lp ratio)
  const tokenAmountMc = tokenAmountTotal.times(lpTokenRatio)
  const quoteTokenAmountMc = quoteTokenAmountTotal.times(lpTokenRatio)

  // Total staked in LP, in quote token value
  const lpTotalInQuoteToken = quoteTokenAmountMc.times(new BigNumber(2))

//  const names = vault.lpSymbol
  const allocPoint =  info ? new BigNumber(info[allocPointName]?._hex) : BIG_ZERO
  const poolWeight =  totalAllocPoint ? allocPoint.div(new BigNumber(totalAllocPoint)) : BIG_ZERO
//  const pw = poolWeight.toJSON()
//  const tp =quoteTokenAmountTotal.div(tokenAmountTotal).toJSON()

  const emission = new BigNumber(emissionMC)
  return {
    tokenAmountMc: tokenAmountMc.toJSON(),
    quoteTokenAmountMc: quoteTokenAmountMc.toJSON(),
    tokenAmountTotal: tokenAmountTotal.toJSON(),
    lpTokenBalanceMC : new BigNumber(lpTokenBalanceStrategy.amount._hex).toJSON(),
    quoteTokenAmountTotal: quoteTokenAmountTotal.toJSON(),
    lpTotalSupply: new BigNumber(lpTotalSupply).toJSON(),
    lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
    tokenPriceVsQuote: quoteTokenAmountTotal.div(tokenAmountTotal).toJSON(),
    poolWeight: poolWeight.toJSON(),
    emission: emission.toJSON(),
    masterChefBalanceRatio: masterChefBalanceRatio.toJSON()
  }
}

export const fetchVaultQuick = async (vault: Vault): Promise<PublicVaultData> => {
  const { spid, lpAddresses, token, quoteToken, strategyAddress, masterChefAddress, emissionFunctionName, allocPointName} = vault
  const lpAddress = getAddress(lpAddresses)
  const masterAddress = getAddress(masterChefAddress)
  const calls = [
    // Balance of token in the LP contract
    {
      address: getAddress(token.address),
      name: 'balanceOf',
      params: [lpAddress],
    },
    // Balance of quote token on LP contract
    {
      address: getAddress(quoteToken.address),
      name: 'balanceOf',
      params: [lpAddress],
    },

    // Total supply of LP tokens
    {
      address: lpAddress,
      name: 'totalSupply',
    },
    // Token decimals
    {
      address: getAddress(token.address),
      name: 'decimals',
    },
    // Quote token decimals
    {
      address: getAddress(quoteToken.address),
      name: 'decimals',
    }, 
  ]
  
  const [tokenBalanceLP  , quoteTokenBalanceLP , lpTotalSupply  , tokenDecimals, quoteTokenDecimals  ] =
    await multicall(erc20, calls)

  // Balance of LP tokens being compounded by the strategy contract
  const [lpTokenBalanceStrategy, emissionMC] = 
  (await multicall(quickswapABI, [
    {
    address: masterAddress,
    name: 'balanceOf',
    params: [getAddress(strategyAddress)],
  },
  {
    address: masterAddress,
    name: emissionFunctionName,
  },
]))

  const [lpTokenBalanceMasterChef] = (await multicall(erc20, [
      {
        address: lpAddress,
        name: 'balanceOf',
        params: [masterAddress],
      },
    ]))
      
  const masterChefBalanceRatio = new BigNumber(lpTokenBalanceMasterChef).div(new BigNumber(lpTokenBalanceStrategy))

  // Ratio in % of LP tokens that are staked in the strategy, vs the total number in circulation
  const lpTokenRatio = new BigNumber(lpTokenBalanceStrategy).div(new BigNumber(lpTotalSupply))

  // Raw amount of token in the LP, including those not staked
  const tokenAmountTotal = new BigNumber(tokenBalanceLP).div(BIG_TEN.pow(tokenDecimals))
  const quoteTokenAmountTotal = new BigNumber(quoteTokenBalanceLP).div(BIG_TEN.pow(quoteTokenDecimals))

  // Amount of token in the LP that are staked in the MC (i.e amount of token * lp ratio)
  const tokenAmountMc = tokenAmountTotal.times(lpTokenRatio)
  const quoteTokenAmountMc = quoteTokenAmountTotal.times(lpTokenRatio)

  // Total staked in LP, in quote token value
  const lpTotalInQuoteToken = quoteTokenAmountMc.times(new BigNumber(2))

//  const names = vault.lpSymbol
 // const allocPoint =  info ? new BigNumber(info[allocPointName]?._hex) : BIG_ZERO
  const poolWeight = BIG_ONE;// totalAllocPoint ? allocPoint.div(new BigNumber(totalAllocPoint)) : BIG_ZERO
//  const pw = poolWeight.toJSON()
//  const tp =quoteTokenAmountTotal.div(tokenAmountTotal).toJSON()

  const emission = new BigNumber(emissionMC)
  return {
    tokenAmountMc: tokenAmountMc.toJSON(),
    quoteTokenAmountMc: quoteTokenAmountMc.toJSON(),
    tokenAmountTotal: tokenAmountTotal.toJSON(),
    lpTokenBalanceMC : lpTokenBalanceStrategy,
    quoteTokenAmountTotal: quoteTokenAmountTotal.toJSON(),
    lpTotalSupply: new BigNumber(lpTotalSupply).toJSON(),
    lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
    tokenPriceVsQuote: quoteTokenAmountTotal.div(tokenAmountTotal).toJSON(),
    poolWeight: poolWeight.toJSON(),
    emission: emission.toJSON(),
    masterChefBalanceRatio: masterChefBalanceRatio.toJSON()
  }
}

export const fetchVaultSingle = async (vault: Vault): Promise<PublicVaultData> => {
  const { spid, lpAddresses, token, quoteToken, strategyAddress, masterChefAddress, emissionFunctionName, allocPointName} = vault
  const lpAddress = getAddress(lpAddresses)
  const masterAddress = getAddress(masterChefAddress)
  const calls = [
    // Total supply of LP tokens
    {
      address: lpAddress,
      name: 'totalSupply',
    },
    // Token decimals
    {
      address: getAddress(token.address),
      name: 'decimals',
    },
  ]
  
  const [lpTotalSupply, tokenDecimals] = await multicall(erc20, calls)
  const quoteTokenBalanceLP = lpTotalSupply
  const quoteTokenDecimals = tokenDecimals
  const tokenBalanceLP = lpTotalSupply

  // Balance of LP tokens being compounded by the strategy contract
  const [lpTokenBalanceStrategy, totalAllocPoint,  info, emissionMC] = 
  (await multicall(masterchefABI, [
    {
    address: masterAddress,
    name: 'userInfo',
    params: [spid, getAddress(strategyAddress)],
  },
  {
    address: masterAddress,
    name: 'totalAllocPoint',
  },
  {
    address: masterAddress,
    name: 'poolInfo',
    params: [spid],
  },
  {
    address: masterAddress,
    name: emissionFunctionName,
  }, 
]))

  
  const [lpTokenBalanceMasterChef] = (await multicall(erc20, [
      {
        address: lpAddress,
        name: 'balanceOf',
        params: [masterAddress],
      },
      // Quote token decimals
      {
        address: lpAddress,
        name: 'decimals',
      },
    ]))
      
  const masterChefBalanceRatio = new BigNumber(lpTokenBalanceMasterChef).div(new BigNumber(lpTokenBalanceStrategy.amount._hex))

  // Ratio in % of LP tokens that are staked in the strategy, vs the total number in circulation
  const lpTokenRatio = new BigNumber(lpTokenBalanceStrategy.amount._hex).div(new BigNumber(lpTotalSupply))

  // Raw amount of token in the LP, including those not staked
  const tokenAmountTotal = new BigNumber(tokenBalanceLP).div(BIG_TEN.pow(tokenDecimals))
  const quoteTokenAmountTotal = new BigNumber(quoteTokenBalanceLP).div(BIG_TEN.pow(quoteTokenDecimals))

  // Amount of token in the LP that are staked in the MC (i.e amount of token * lp ratio)
  const tokenAmountMc = tokenAmountTotal.times(lpTokenRatio)
  const quoteTokenAmountMc = quoteTokenAmountTotal.times(lpTokenRatio)

  // Total staked in LP, in quote token value
  const lpTotalInQuoteToken = quoteTokenAmountMc // .times(new BigNumber(2))

  const allocPoint =  info ? new BigNumber(info[allocPointName]?._hex) : BIG_ZERO
  const poolWeight =  totalAllocPoint ? allocPoint.div(new BigNumber(totalAllocPoint)) : BIG_ZERO

  const emission = new BigNumber(emissionMC)
  return {
    tokenAmountMc: tokenAmountMc.toJSON(),
    quoteTokenAmountMc: quoteTokenAmountMc.toJSON(),
    tokenAmountTotal: tokenAmountTotal.toJSON(),
    lpTokenBalanceMC : new BigNumber(lpTokenBalanceStrategy.amount._hex).toJSON(),
    quoteTokenAmountTotal: quoteTokenAmountTotal.toJSON(),
    lpTotalSupply: new BigNumber(lpTotalSupply).toJSON(),
    lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
    tokenPriceVsQuote: quoteTokenAmountTotal.div(tokenAmountTotal).toJSON(),
    poolWeight: poolWeight.toJSON(),
    emission: emission.toJSON(),
    masterChefBalanceRatio: masterChefBalanceRatio.toJSON()
  }
}
// export default fetchVaultLP
