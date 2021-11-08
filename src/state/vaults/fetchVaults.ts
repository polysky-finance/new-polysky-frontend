import { VaultConfig } from 'config/constants/types'
import { getAddress} from 'utils/addressHelpers'
import multicall from 'utils/multicall'
import BigNumber from 'bignumber.js'
import erc20 from 'config/abi/erc20.json'
import gravity from 'config/abi/gravity.json'
import {fetchVaultLP, fetchVaultSingle, fetchVaultQuick, fetchVaultGravity, fetchVaultSingleGravity} from './fetchPublicVaultData'

export const tokenBalancesLP = async (vaultsToFetch: VaultConfig[]) => {
  const calls = vaultsToFetch.map((vault) => {
    const lpAddresses = vault.lpAddresses
    const lpAddress = getAddress(lpAddresses)
    return { address: getAddress(vault.token.address), name: 'balanceOf', params: [lpAddress] }
  })

  const rawLpAllowances = await multicall(erc20, calls)
  return rawLpAllowances
}

export const quoteTokenBalancesLP = async (vaultsToFetch: VaultConfig[]) => {
  const calls = vaultsToFetch.map((vault) => {
    const lpAddresses = vault.lpAddresses
    const lpAddress = getAddress(lpAddresses)
    return { address: getAddress(vault.quoteToken.address), name: 'balanceOf', params: [lpAddress] }
  })

  const rawLpAllowances = await multicall(erc20, calls)
  return rawLpAllowances
}

export const lpTotalSupplies = async (vaultsToFetch: VaultConfig[]) => {
  const calls = vaultsToFetch.map((vault) => {
    const lpAddresses = vault.lpAddresses
    const lpAddress = getAddress(lpAddresses)
    return { address: lpAddress, name: 'totalSupply' }
  })

  const rawLpAllowances = await multicall(erc20, calls)
  return rawLpAllowances
}

export const tokenDecimals = async (vaultsToFetch: VaultConfig[]) => {
  const calls = vaultsToFetch.map((vault) => {
    return { address: getAddress(vault.token.address), name: 'decimals' }
  })

  const rawLpAllowances = await multicall(erc20, calls)
  return rawLpAllowances
}

export const quoteTokenDecimals = async (vaultsToFetch: VaultConfig[]) => {
  const calls = vaultsToFetch.map((vault) => {
    return { address: getAddress(vault.quoteToken.address), name: 'decimals' }
  })

  const rawLpAllowances = await multicall(erc20, calls)
  return rawLpAllowances
}

export const lpTokenBalanceStrategies = async (vaultsToFetch: VaultConfig[]) => {
  const calls = vaultsToFetch.map((vault) => {
    const masterAddress = getAddress(vault.masterChefAddress)
    if(vault.platform === 'Quickswap')
    {
      return { address: masterAddress, name: 'balanceOf', params: [getAddress(vault.strategyAddress)] }
    }
    if(vault.platform === 'Gravity')
    {
      return { address: '0x45a5CB25F3E3bFEe615F6da0731740093F59b768', name: 'balanceOf', params: [getAddress(vault.strategyAddress)] }
    }
    return { address: masterAddress, name: 'userInfo', params: [vault.spid, getAddress(vault.strategyAddress)] }
  })

  const rawLpAllowances = await multicall(erc20, calls)
  return rawLpAllowances
}
export const lpTokenBalanceStrategiesGravity = async (vaultsToFetch: VaultConfig[]) => {
  const calls = vaultsToFetch.map((vault) => {
    const masterAddress = getAddress(vault.masterChefAddress)
    if(vault.platform === 'Gravity')
    {
      return { address: masterAddress, name: 'userInfo', params: [getAddress(vault.strategyAddress)] }
    }
    return { address: '0x8105662cf0F7c1A9d4066E7F2C81049049bC184d', name: 'userInfo', params: [getAddress(vault.strategyAddress)] }
  })

  const rawLpAllowances = await multicall(gravity, calls)
  return rawLpAllowances
}

export const totalAllocPoints = async (vaultsToFetch: VaultConfig[]) => {
  const calls = vaultsToFetch.map((vault) => {
    const masterAddress = getAddress(vault.masterChefAddress)
    if(vault.platform === 'Quickswap')
    {
      return { address: masterAddress, name: 'balanceOf', params: [getAddress(vault.strategyAddress)] }
    }
    if(vault.platform === 'Gravity')
    {
      return { address: '0x45a5CB25F3E3bFEe615F6da0731740093F59b768', name: 'balanceOf', params: [getAddress(vault.strategyAddress)] }
    }
    return { address: masterAddress, name: 'totalAllocPoint' }
  })

  const rawLpAllowances = await multicall(erc20, calls)
  return rawLpAllowances
}

export const infos = async (vaultsToFetch: VaultConfig[]) => {
  const calls = vaultsToFetch.map((vault) => {
    const masterAddress = getAddress(vault.masterChefAddress)
    if(vault.platform === 'Quickswap')
    {
      return {address: masterAddress, name: 'balanceOf', params: [getAddress(vault.strategyAddress)] }
    }
    if(vault.platform === 'Gravity')
    {
      return {address: '0x9891548FB271C2350bd0FA25eb56A3b558cD4A64', name: 'balanceOf', params: [getAddress(vault.strategyAddress)] }
    }
    return { address: masterAddress, name: 'poolInfo', params: [vault.spid] }
  })

  const rawLpAllowances = await multicall(erc20, calls)
  return rawLpAllowances
}

export const emissionMCs = async (vaultsToFetch: VaultConfig[]) => {
  const calls = vaultsToFetch.map((vault) => {
    const masterAddress = getAddress(vault.masterChefAddress)
    return { address: masterAddress, name: vault.emissionFunctionName }
  })

  const rawLpAllowances = await multicall(erc20, calls)
  return rawLpAllowances
}

export const lpTokenBalanceMasterChefs = async (vaultsToFetch: VaultConfig[]) => {
  const calls = vaultsToFetch.map((vault) => {
    const lpAddresses = vault.lpAddresses
    const lpAddress = getAddress(lpAddresses)
    const masterAddress = getAddress(vault.masterChefAddress)
    return { address: lpAddress, name: 'balanceOf', params: [masterAddress] }
  })

  const rawLpAllowances = await multicall(erc20, calls)
  return rawLpAllowances
}

export const quickPer10000dQuicks = async (vaultsToFetch: VaultConfig[]) => {
  const calls = vaultsToFetch.map((vault) => {
    return { address: '0xf28164A485B0B2C90639E47b0f377b4a438a16B1', name: 'dQUICKForQUICK', params: [10000] }
  })

  const rawLpAllowances = await multicall(erc20, calls)
  return rawLpAllowances
}

export const emissionRewarders = async (vaultsToFetch: VaultConfig[]) => {
  const calls = vaultsToFetch.map((vault) => {
    const masterAddress = getAddress(vault.masterChefAddress)
    const rewardAddress = vault.rewarder;
    return rewardAddress? { address: rewardAddress, name: 'rewardPerSecond' }: { address: masterAddress, name: vault.emissionFunctionName }
  })

  const rawLpAllowances = await multicall(erc20, calls)
  return rawLpAllowances
}

export const totalStakes = async (vaultsToFetch: VaultConfig[]) => {
  
  const calls = vaultsToFetch.map((vault) => {
    const masterAddress = getAddress(vault.masterChefAddress)
    if(vault.platform === 'Gravity')
    {
      return { address: masterAddress, name: 'totalStakedAmount' }
    }
    if(vault.platform === 'Quickswap')
    {
      return { address: masterAddress, name: 'totalSupply' }
    }
    return { address: '0x8105662cf0F7c1A9d4066E7F2C81049049bC184d', name: 'totalStakedAmount' }
  })

  const rawLpAllowances = await multicall(erc20, calls)
  return rawLpAllowances
}

const fetchVaults = async (vaultsToFetch: VaultConfig[]) => {
  const tokenBalances = await tokenBalancesLP(vaultsToFetch);
  const quoteTokenBalances = await quoteTokenBalancesLP(vaultsToFetch);
  const lpTotalSupply = await lpTotalSupplies(vaultsToFetch);
  const tokenDecimal = await tokenDecimals(vaultsToFetch)
  const quoteTokenDecimal = await quoteTokenDecimals(vaultsToFetch)  
  const lpTokenBalanceMasterChef = await lpTokenBalanceMasterChefs(vaultsToFetch)
  const lpTokenBalanceStrategy = await lpTokenBalanceStrategies(vaultsToFetch);
  const totalAllocs = await totalAllocPoints(vaultsToFetch)
  const info =await infos(vaultsToFetch)
  const emissionMC = await emissionMCs(vaultsToFetch)
  const quickPer10000dQuick = await quickPer10000dQuicks(vaultsToFetch)
  const emissionRewarder = await emissionRewarders(vaultsToFetch)
  const lpTokenBalanceStrategyGravity = await lpTokenBalanceStrategiesGravity(vaultsToFetch);
  const totalStaked = await totalStakes(vaultsToFetch)

  const vaults =await Promise.all(vaultsToFetch.map(async (vault, index)=>
  {
    let v =null
      if(vault.isSingle && vault.platform !== 'Gravity')
      {
         v = await fetchVaultSingle(vault, lpTotalSupply[index],tokenDecimal[index],
          lpTokenBalanceMasterChef[index], lpTokenBalanceStrategy[index],info[index], totalAllocs[index], emissionMC[index], emissionRewarder[index])
      }
      else if(vault.platform === 'Quickswap')
      {
        v= await fetchVaultQuick(vault, lpTokenBalanceStrategy[index],
          lpTotalSupply[index], tokenBalances[index], tokenDecimal[index], quoteTokenBalances[index], quoteTokenDecimal[index],
          emissionMC[index], quickPer10000dQuick[index], emissionRewarder[index], totalStaked[index] )
      }
      else if(vault.platform === 'Gravity')
      {
        if(!vault.isSingle){
          v= await fetchVaultGravity(vault, lpTokenBalanceMasterChef[index], lpTokenBalanceStrategyGravity[index],
            lpTotalSupply[index], tokenBalances[index], tokenDecimal[index], quoteTokenBalances[index], quoteTokenDecimal[index],
            emissionMC[index], emissionRewarder[index], totalStaked[index] )
          }
          else
          {
            v = await fetchVaultSingleGravity(vault, lpTotalSupply[index],tokenDecimal[index],
              lpTokenBalanceMasterChef[index], lpTokenBalanceStrategyGravity[index], emissionMC[index], emissionRewarder[index], totalStaked[index])
          }
      }
      else
      {
        v =await fetchVaultLP(vault, lpTokenBalanceMasterChef[index],lpTokenBalanceStrategy[index],
          lpTotalSupply[index], tokenBalances[index], tokenDecimal[index], quoteTokenBalances[index], quoteTokenDecimal[index],
          info[index],totalAllocs[index],
          emissionMC[index], emissionRewarder[index] )
      }
        return {...vault, ...v};
  }))
  return vaults
}

export default fetchVaults
