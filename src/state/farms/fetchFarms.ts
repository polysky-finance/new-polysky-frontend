import { FarmConfig } from 'config/constants/types'
import { getAddress, getMasterChefAddress} from 'utils/addressHelpers'
import erc20 from 'config/abi/erc20.json'
import masterchefABI from 'config/abi/masterchefSKY.json'
import multicall from 'utils/multicall'
import fetchFarm from './fetchPublicFarmData'

export const tokenBalancesLPs = async (farmsToFetch: FarmConfig[]) => {
  const calls = farmsToFetch.map((farm) => {
    const lpAddresses = farm.lpAddresses
    const lpAddress = getAddress(lpAddresses)
    return { address: getAddress(farm.token.address), 
      name: 'balanceOf', params: [lpAddress] }
  })

  const rawLpAllowances = await multicall(erc20, calls)
  return rawLpAllowances
}

export const quoteTokenBalancesLPs = async (farmsToFetch: FarmConfig[]) => {
  const calls = farmsToFetch.map((farm) => {
    const lpAddresses = farm.lpAddresses
    const lpAddress = getAddress(lpAddresses)
    return { address: getAddress(farm.quoteToken.address), 
      name: 'balanceOf', params: [lpAddress] }
  })

  const rawLpAllowances = await multicall(erc20, calls)
  return rawLpAllowances
}

export const lpTokenBalanceMCs = async (farmsToFetch: FarmConfig[]) => {
  const calls = farmsToFetch.map((farm) => {
    const lpAddresses = farm.lpAddresses
    const lpAddress = getAddress(lpAddresses)
    return { address: lpAddress, 
      name: 'balanceOf', params: [getMasterChefAddress()] }
  })

  const rawLpAllowances = await multicall(erc20, calls)
  return rawLpAllowances
}

export const lpTotalSupplies = async (farmsToFetch: FarmConfig[]) => {
  const calls = farmsToFetch.map((farm) => {
    const lpAddresses = farm.lpAddresses
    const lpAddress = getAddress(lpAddresses)
    return { address: lpAddress, 
      name: 'totalSupply'}
  })

  const rawLpAllowances = await multicall(erc20, calls)
  return rawLpAllowances
}

export const tokenDecimals = async (farmsToFetch: FarmConfig[]) => {
  const calls = farmsToFetch.map((farm) => {
    const lpAddresses = farm.lpAddresses
    return { address: getAddress(farm.token.address), 
      name: 'decimals'}
  })

  const rawLpAllowances = await multicall(erc20, calls)
  return rawLpAllowances
}

export const quoteTokenDecimals = async (farmsToFetch: FarmConfig[]) => {
  const calls = farmsToFetch.map((farm) => {
    const lpAddresses = farm.lpAddresses
    return { address: getAddress(farm.quoteToken.address), 
      name: 'decimals'}
  })

  const rawLpAllowances = await multicall(erc20, calls)
  return rawLpAllowances
}

export const infos = async (farmsToFetch: FarmConfig[]) => {
  const calls = farmsToFetch.map((farm) => {
    return { address: getMasterChefAddress(), 
      name: 'poolInfo', params: [farm.pid?farm.pid:0]}

  })

  const rawLpAllowances = await multicall(masterchefABI, calls)
  return rawLpAllowances
}

export const totalAllocPoints = async (farmsToFetch: FarmConfig[]) => {
  const calls = farmsToFetch.map((farm) => {
    if(farm.pid || farm.pid ===0){
      return { address: getMasterChefAddress(), 
        name: 'totalAllocPoint'}
    }
    return { address: '0xd0023db30d1f4db77e1049e79817b4d5dc571d15', 
      name: 'totalAllocPoint'}
  })

  const rawLpAllowances = await multicall(masterchefABI, calls)
  return rawLpAllowances
}


const fetchFarms = async (farmsToFetch: FarmConfig[]) => {
  const tokenBalanceLP = await tokenBalancesLPs(farmsToFetch)
  const quoteTokenBalanceLP = await quoteTokenBalancesLPs(farmsToFetch)
  const lpTokenBalanceMC = await lpTokenBalanceMCs(farmsToFetch)
  const lpTotalSupply = await lpTotalSupplies(farmsToFetch)
  const tokenDecimal = await tokenDecimals(farmsToFetch)
  const quoteTokenDecimal =await quoteTokenDecimals(farmsToFetch)
  const info = await infos(farmsToFetch)
  const totalAllocPoint =await totalAllocPoints(farmsToFetch)

  const data = await Promise.all(
    farmsToFetch.map(async (farmConfig, index) => {
      const farm = await fetchFarm(farmConfig, tokenBalanceLP[index], quoteTokenBalanceLP[index],
        lpTokenBalanceMC[index], lpTotalSupply[index], tokenDecimal[index], quoteTokenDecimal[index],
        info[index], totalAllocPoint[index])
      return {...farmConfig, ...farm}
    }),
  )
  return data
}

export default fetchFarms
