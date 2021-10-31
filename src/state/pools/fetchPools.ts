import BigNumber from 'bignumber.js'
import poolsConfig from 'config/constants/pools'
import sousChefABI from 'config/abi/sousChef.json'
import siriusABI from 'config/abi/sirius.json'
import wbnbABI from 'config/abi/weth.json'
import multicall from 'utils/multicall'
import masterchefABI from 'config/abi/masterchefSKY.json'
import { getAddress, getWmaticAddress, getMasterChefAddress } from 'utils/addressHelpers'
import { BIG_ZERO } from 'utils/bigNumber'

export const fetchPoolsTotalStaking = async () => {
  const nonBnbPools = poolsConfig.filter((p) => p.stakingToken.symbol !== 'WMATIC')
  const bnbPool = poolsConfig.filter((p) => p.stakingToken.symbol === 'WMATIC')

  const callsNonBnbPools = nonBnbPools.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.stakingToken.address),
      name: 'balanceOf',
      params: [getAddress(poolConfig.contractAddress)],
    }
  })

  const callsBnbPools = bnbPool.map((poolConfig) => {
    return {
      address: getWmaticAddress(),
      name: 'balanceOf',
      params: [getAddress(poolConfig.contractAddress)],
    }
  })

  const nonBnbPoolsTotalStaked = await multicall(siriusABI, callsNonBnbPools)
  const bnbPoolsTotalStaked = await multicall(wbnbABI, callsBnbPools)

  return [
    ...nonBnbPools.map((p, index) => ({
      sousId: p.sousId,
      totalStaked: new BigNumber(nonBnbPoolsTotalStaked[index]).toJSON(),
    })),
    ...bnbPool.map((p, index) => ({
      sousId: p.sousId,
      totalStaked: new BigNumber(bnbPoolsTotalStaked[index]).toJSON(),
    })),
  ]
}

export const fetchPoolWeight = async () => {  
  const callInfos = poolsConfig.map((poolConfig) => {
    return {
      address: getMasterChefAddress(),
      name: 'poolInfo',
      params: [poolConfig.sousId],
    }
  })

  const callTotalPoints = poolsConfig.map((poolConfig) => {
    return {
      address: getMasterChefAddress(),
      name: 'totalAllocPoint',
    }
  })
  const infos = await multicall(masterchefABI, callInfos);
  const totalPoints = await multicall(masterchefABI, callTotalPoints);

  return [
    ...poolsConfig.map((p, index) => ({
      sousId: p.sousId,
      poolWeight: infos[index][1]/totalPoints[0],
      depositFee: infos[index][4]/100,
    }))]
}