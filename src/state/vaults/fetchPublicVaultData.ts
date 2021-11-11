import BigNumber from 'bignumber.js'
import { getAddress} from 'utils/addressHelpers'
import { BIG_ONE, BIG_TEN, BIG_ZERO } from 'utils/bigNumber'
import {getLPAPR} from 'utils/vaultHelper'
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
  lpTokenBalanceMasterChef: SerializedBigNumber
  rewardEmission: SerializedBigNumber
  fetchedLPAPR: SerializedBigNumber
}

export const fetchVaultLP = async (vault: Vault, lpTokenBalanceMasterChef:any, lpTokenBalanceStrategy:any,lpTotalSupply:any,
  tokenBalanceLP:any, tokenDecimals:any, quoteTokenBalanceLP:any,quoteTokenDecimals:any, info, totalAllocPoint, emissionMC, emissionRewarder ): Promise<PublicVaultData> => {
  
      
  const masterChefBalanceRatio = new BigNumber(lpTokenBalanceMasterChef).div(new BigNumber(lpTokenBalanceStrategy.amount._hex))

  // Ratio in % of LP tokens that are staked in the strategy, vs the total number in circulation
  const lpTokenRatio = new BigNumber(lpTokenBalanceStrategy.amount._hex).div(new BigNumber(lpTotalSupply))

  // Raw amount of token in the LP, including those not staked
  const tokenAmountTotal = new BigNumber(tokenBalanceLP).div(BIG_TEN.pow(tokenDecimals))
  const quoteTokenAmountTotal = new BigNumber(quoteTokenBalanceLP).div(BIG_TEN.pow(quoteTokenDecimals))

  // Amount of token in the LP that are staked in the Strategy (i.e amount of token * lp ratio)
  const tokenAmountMc = tokenAmountTotal.times(lpTokenRatio)
  const quoteTokenAmountMc = quoteTokenAmountTotal.times(lpTokenRatio)



  // Total staked in LP, in quote token value
  const lpTotalInQuoteToken = new BigNumber(quoteTokenBalanceLP).times(2).div(BIG_TEN.pow(quoteTokenDecimals))

//  const names = vault.lpSymbol
  const allocPoint =  info ? new BigNumber(info[vault.allocPointName]?._hex) : BIG_ZERO
  const poolWeight =  totalAllocPoint ? allocPoint.div(new BigNumber(totalAllocPoint)) : BIG_ZERO
//  const pw = poolWeight.toJSON()
//  const tp =quoteTokenAmountTotal.div(tokenAmountTotal).toJSON()

  const emission = new BigNumber(emissionMC)
  const rewardEmission = vault.rewarder?  new BigNumber(emissionRewarder):BIG_ZERO
  const LPAPR =  await getLPAPR(vault.exchange, getAddress(vault.lpAddresses))
  return {
    tokenAmountMc: tokenAmountMc.toJSON(),
    quoteTokenAmountMc: quoteTokenAmountMc.times(2).toJSON(),
    tokenAmountTotal: tokenAmountTotal.toJSON(),
    lpTokenBalanceMC : new BigNumber(lpTokenBalanceStrategy.amount._hex).toJSON(),
    quoteTokenAmountTotal: quoteTokenAmountTotal.times(2).toJSON(),
    lpTotalSupply: new BigNumber(lpTotalSupply).toJSON(),
    lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
    tokenPriceVsQuote: quoteTokenAmountTotal.div(tokenAmountTotal).toJSON(),
    poolWeight: poolWeight.toJSON(),
    emission: emission.toJSON(),
    masterChefBalanceRatio: masterChefBalanceRatio.toJSON(),
    lpTokenBalanceMasterChef: new BigNumber(lpTokenBalanceMasterChef).toJSON(),
    rewardEmission: rewardEmission.toJSON(),
    fetchedLPAPR: LPAPR.toJSON()
  }
}

export const fetchVaultQuick = async (vault: Vault,
   lpTokenBalanceStrategy:any,lpTotalSupply:any,
  tokenBalanceLP:any,tokenDecimals:any, quoteTokenBalanceLP:any,
  quoteTokenDecimals:any, emissionMC:any, quickPer10000dQuick:any, emissionRewarder:any, totalStaked:any): Promise<PublicVaultData> => {
      
  const masterChefBalanceRatio = new BigNumber(totalStaked).div(new BigNumber(lpTokenBalanceStrategy))

  // Ratio in % of LP tokens that are staked in the strategy, vs the total number in circulation
  const lpTokenRatio = new BigNumber(lpTokenBalanceStrategy).div(new BigNumber(lpTotalSupply))

  // Raw amount of token in the LP, including those not staked
  const tokenAmountTotal = new BigNumber(tokenBalanceLP).div(BIG_TEN.pow(tokenDecimals))
  const quoteTokenAmountTotal = new BigNumber(quoteTokenBalanceLP).div(BIG_TEN.pow(quoteTokenDecimals))

  // Amount of token in the LP that are staked in the MC (i.e amount of token * lp ratio)
  const tokenAmountMc = tokenAmountTotal.times(lpTokenRatio)
  const quoteTokenAmountMc = quoteTokenAmountTotal.times(lpTokenRatio)

  // Total staked in LP, in quote token value
  const lpTotalInQuoteToken = new BigNumber(quoteTokenBalanceLP).times(2).div(BIG_TEN.pow(quoteTokenDecimals))

//  const names = vault.lpSymbol
 // const allocPoint =  info ? new BigNumber(info[allocPointName]?._hex) : BIG_ZERO
  const poolWeight = BIG_ONE;// totalAllocPoint ? allocPoint.div(new BigNumber(totalAllocPoint)) : BIG_ZERO
//  const pw = poolWeight.toJSON()
//  const tp =quoteTokenAmountTotal.div(tokenAmountTotal).toJSON()

  const emission = new BigNumber(emissionMC).times(quickPer10000dQuick).div(new BigNumber(10000))
  const rewardEmission = vault.rewarder?  new BigNumber(emissionRewarder):BIG_ZERO
  const LPAPR = await getLPAPR(vault.exchange, getAddress(vault.lpAddresses))
  return {
    tokenAmountMc: tokenAmountMc.toJSON(),
    quoteTokenAmountMc: quoteTokenAmountMc.times(2).toJSON(),
    tokenAmountTotal: tokenAmountTotal.toJSON(),
    lpTokenBalanceMC : lpTokenBalanceStrategy,
    quoteTokenAmountTotal: quoteTokenAmountTotal.times(2).toJSON(),
    lpTotalSupply: new BigNumber(lpTotalSupply).toJSON(),
    lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
    tokenPriceVsQuote: quoteTokenAmountTotal.div(tokenAmountTotal).toJSON(),
    poolWeight: poolWeight.toJSON(),
    emission: emission.toJSON(),
    masterChefBalanceRatio: masterChefBalanceRatio.toJSON(),
    lpTokenBalanceMasterChef: new BigNumber(totalStaked).toJSON(),
    rewardEmission: rewardEmission.toJSON(),
    fetchedLPAPR: LPAPR.toJSON()
  }
}


export const fetchVaultGravity = async (vault: Vault,
  lpTokenBalanceMasterChef:any, lpTokenBalanceStrategy:any,lpTotalSupply:any,
  tokenBalanceLP:any,tokenDecimals:any, quoteTokenBalanceLP:any,
  quoteTokenDecimals:any, emissionMC:any,  emissionRewarder:any, totalStaked: any): Promise<PublicVaultData> => {
      
  const masterChefBalanceRatio = new BigNumber(lpTokenBalanceMasterChef.balance._hex).div(new BigNumber(lpTokenBalanceStrategy.amount._hex))

  // Ratio in % of LP tokens that are staked in the strategy, vs the total number in circulation
  const lpTokenRatio = new BigNumber(lpTokenBalanceStrategy.amount._hex).div(new BigNumber(lpTotalSupply))

  // Raw amount of token in the LP, including those not staked
  const tokenAmountTotal = new BigNumber(tokenBalanceLP).div(BIG_TEN.pow(tokenDecimals))
  const quoteTokenAmountTotal = new BigNumber(quoteTokenBalanceLP).div(BIG_TEN.pow(quoteTokenDecimals))

  // Amount of token in the LP that are staked in the MC (i.e amount of token * lp ratio)
  const tokenAmountMc = tokenAmountTotal.times(lpTokenRatio)
  const quoteTokenAmountMc = quoteTokenAmountTotal.times(lpTokenRatio)

  // Total staked in LP, in quote token value
  const lpTotalInQuoteToken = new BigNumber(quoteTokenBalanceLP).times(2).div(BIG_TEN.pow(quoteTokenDecimals))

//  const names = vault.lpSymbol
 // const allocPoint =  info ? new BigNumber(info[allocPointName]?._hex) : BIG_ZERO
  const poolWeight = BIG_ONE;// totalAllocPoint ? allocPoint.div(new BigNumber(totalAllocPoint)) : BIG_ZERO
//  const pw = poolWeight.toJSON()
//  const tp =quoteTokenAmountTotal.div(tokenAmountTotal).toJSON()

  const emission = new BigNumber(emissionMC.blockReward._hex)
  const rewardEmission = vault.rewarder? new BigNumber(emissionRewarder): BIG_ZERO
  const LPAPR = await getLPAPR(vault.exchange, getAddress(vault.lpAddresses))
  return {
    tokenAmountMc: tokenAmountMc.toJSON(),
    quoteTokenAmountMc: quoteTokenAmountMc.times(2).toJSON(),
    tokenAmountTotal: tokenAmountTotal.toJSON(),
    lpTokenBalanceMC : lpTokenBalanceStrategy,
    quoteTokenAmountTotal: quoteTokenAmountTotal.times(2).toJSON(),
    lpTotalSupply: new BigNumber(lpTotalSupply).toJSON(),
    lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
    tokenPriceVsQuote: quoteTokenAmountTotal.div(tokenAmountTotal).toJSON(),
    poolWeight: poolWeight.toJSON(),
    emission: emission.toJSON(),
    masterChefBalanceRatio: masterChefBalanceRatio.toJSON(),
    lpTokenBalanceMasterChef: new BigNumber(lpTokenBalanceMasterChef).toJSON(),
    rewardEmission: rewardEmission.toJSON(),
    fetchedLPAPR: LPAPR.toJSON()
  }
}

export const fetchVaultSingle = async(vault: Vault, lpTotalSupply: any,tokenDecimals: any,
  lpTokenBalanceMasterChef:any, lpTokenBalanceStrategy:any, info: any, totalAllocPoint:any,
  emissionMC: any, emissionRewarder): Promise<PublicVaultData> => { 
  
  const quoteTokenBalanceLP = lpTotalSupply
  const quoteTokenDecimals = tokenDecimals
  const tokenBalanceLP = lpTotalSupply
      
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
  const lpTotalInQuoteToken = new BigNumber(quoteTokenBalanceLP).div(BIG_TEN.pow(quoteTokenDecimals))

  const allocPoint =  info ? new BigNumber(info[vault.allocPointName]?._hex) : BIG_ZERO
  const poolWeight =  totalAllocPoint ? allocPoint.div(new BigNumber(totalAllocPoint)) : BIG_ZERO

  const emission = new BigNumber(emissionMC)
  const rewardEmission = new BigNumber(emissionRewarder)
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
    masterChefBalanceRatio: masterChefBalanceRatio.toJSON(),
    lpTokenBalanceMasterChef: new BigNumber(lpTokenBalanceMasterChef).toJSON(),
    rewardEmission: rewardEmission.toJSON(),
    fetchedLPAPR: "0"
  }
}


export const fetchVaultSingleGravity = async(vault: Vault, lpTotalSupply: any,tokenDecimals: any,
  lpTokenBalanceMasterChef:any, lpTokenBalanceStrategy:any, 
  emissionMC: any, emissionRewarder:any, totalStaked:any): Promise<PublicVaultData> => { 
  
  const quoteTokenBalanceLP = lpTotalSupply
  const quoteTokenDecimals = tokenDecimals
  const tokenBalanceLP = lpTotalSupply
      
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
  const lpTotalInQuoteToken = new BigNumber(quoteTokenBalanceLP).div(BIG_TEN.pow(quoteTokenDecimals))

  const poolWeight = BIG_ONE 

  const emission = new BigNumber(emissionMC.blockReward._hex)
  const rewardEmission = vault.rewarder? new BigNumber(emissionRewarder): BIG_ZERO
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
    masterChefBalanceRatio: masterChefBalanceRatio.toJSON(),
    lpTokenBalanceMasterChef: new BigNumber(lpTokenBalanceMasterChef).toJSON(),
    rewardEmission: rewardEmission.toJSON(),
    fetchedLPAPR: "0"
  }
}
// export default fetchVaultLP
