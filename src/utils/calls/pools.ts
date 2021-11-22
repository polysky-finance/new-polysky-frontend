/* eslint-disable import/prefer-default-export */
import pools from 'config/constants/pools'

/**
 * Returns the total number of pools that were active at a given block
 */
export const getActivePools = async (block?: number) => {
  const eligiblePools = pools
    .filter((pool) => pool.sousId !== 0)
    .filter((pool) => pool.isFinished === false || pool.isFinished === undefined)
  
  return eligiblePools.reduce((accum, poolCheck, index) => {
    return accum 
  }, [])
}
