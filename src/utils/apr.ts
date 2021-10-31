import BigNumber from 'bignumber.js'
import { SIRIUS_PER_YEAR, BLOCKS_PER_YEAR } from 'config'
import lpAprs from 'config/constants/lpAprs.json'
import { BIG_ZERO } from './bigNumber';

/**
 * Get the APR value in %
 * @param stakingTokenPrice Token price in the same quote currency
 * @param rewardTokenPrice Token price in the same quote currency
 * @param totalStaked Total amount of stakingToken in the pool
 * @param tokenPerBlock Amount of new sirius allocated to the pool for each new block
 * @returns Null if the APR is NaN or infinite.
 */
export const getPoolApr = (
  poolWeight: BigNumber,
  stakingTokenPrice: number,
  siriusPriceUsd: BigNumber,
  totalStaked: number,
): number => {
  if(SIRIUS_PER_YEAR.comparedTo(0) === 0){
    return 0.001;
  }
  if(totalStaked.valueOf() === 0){
     return 100000;
  }
  const yearlySiriusRewardAllocation = SIRIUS_PER_YEAR.times(poolWeight)
  const totalStakingTokenInPool = new BigNumber(stakingTokenPrice).times(totalStaked)
  const apr = yearlySiriusRewardAllocation.times(siriusPriceUsd).div(totalStakingTokenInPool).times(100)

  if(apr.isNaN() || !apr.isFinite()){
      return null;
    } 
    return apr.toNumber() > 100000 ? 100000: apr.toNumber();
}


/**
 * Get farm APR value in %
 * @param poolWeight allocationPoint / totalAllocationPoint
 * @param siriusPriceUsd Cake price in USD
 * @param poolLiquidityUsd Total pool liquidity in USD
 * @returns
 */
 export const getVaultApr = (
  poolWeight: BigNumber,
  rewardTokenPriceUsd: BigNumber,
  poolLiquidityUsd: BigNumber,
  farmAddress: string,
  rewardPerBlock: BigNumber,
  lpApr: number
): { siriusRewardsApr: number; lpRewardsApr: number } => {

  const lpRewardsApr = lpApr // lpAprs[farmAddress?.toLocaleLowerCase()] ?? 0
  if(rewardPerBlock.comparedTo(0) === 0){
    return { siriusRewardsApr: 0.0001, lpRewardsApr }
  }
  if(poolLiquidityUsd.comparedTo(0) === 0){
    return { siriusRewardsApr: 100000, lpRewardsApr }
  }
  const rewardPerYear = BLOCKS_PER_YEAR.times(rewardPerBlock)
  const yearlyRewardAllocation = rewardPerYear.times(poolWeight)
  const rewardsApr = yearlyRewardAllocation.times(rewardTokenPriceUsd).div(poolLiquidityUsd).times(100)
  let rewardsAprAsNumber = null
  if (!rewardsApr.isNaN() && rewardsApr.isFinite()) {
    rewardsAprAsNumber = rewardsApr.toNumber()> 100000? 100000:rewardsApr.toNumber()
  }
  
  return { siriusRewardsApr: rewardsAprAsNumber, lpRewardsApr }
}


/**
 * Get farm APR value in %
 * @param poolWeight allocationPoint / totalAllocationPoint
 * @param siriusPriceUsd Cake price in USD
 * @param poolLiquidityUsd Total pool liquidity in USD
 * @returns
 */
export const getFarmApr = (
  poolWeight: BigNumber,
  siriusPriceUsd: BigNumber,
  poolLiquidityUsd: BigNumber,
  farmAddress: string,
): { siriusRewardsApr: number; lpRewardsApr: number } => {

  const lpRewardsApr = lpAprs[farmAddress?.toLocaleLowerCase()] ?? 0
  if(SIRIUS_PER_YEAR.comparedTo(0) === 0){
    return { siriusRewardsApr: 0.0001, lpRewardsApr }
  }
  if(poolLiquidityUsd.comparedTo(0) === 0){
    return { siriusRewardsApr: 100000, lpRewardsApr }
  }

  const yearlySiriusRewardAllocation = SIRIUS_PER_YEAR.times(poolWeight)
  const siriusRewardsApr = yearlySiriusRewardAllocation.times(siriusPriceUsd).div(poolLiquidityUsd).times(100)
  let siriusRewardsAprAsNumber = null
  if (!siriusRewardsApr.isNaN() && siriusRewardsApr.isFinite()) {
    siriusRewardsAprAsNumber = siriusRewardsApr.toNumber()> 100000? 100000:siriusRewardsApr.toNumber()
  }
  
  return { siriusRewardsApr: siriusRewardsAprAsNumber, lpRewardsApr }
}

export default null
