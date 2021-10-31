/* eslint-disable import/prefer-default-export */
import BigNumber from 'bignumber.js'
import pools from 'config/constants/pools'
import multicall from '../multicall'
import { simpleRpcProvider } from '../providers'
import { getAddress } from '../addressHelpers'

/**
 * Returns the total number of pools that were active at a given block
 */
export const getActivePools = async (block?: number) => {
  const eligiblePools = pools
    .filter((pool) => pool.sousId !== 0)
    .filter((pool) => pool.isFinished === false || pool.isFinished === undefined)
  
  return eligiblePools.reduce((accum, poolCheck, index) => {
    return accum 
    return [...accum, poolCheck]
  }, [])
}
