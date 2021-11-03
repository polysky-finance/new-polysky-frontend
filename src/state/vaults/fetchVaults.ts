import { VaultConfig } from 'config/constants/types'
import { getAddress} from 'utils/addressHelpers'
import multicall from 'utils/multicall'
import BigNumber from 'bignumber.js'
import erc20 from 'config/abi/erc20.json'
import {fetchVaultLP, fetchVaultSingle, fetchVaultQuick} from './fetchPublicVaultData'

export const tokenBalancesLP = async (vaultsToFetch: VaultConfig[]) => {
  const calls = vaultsToFetch.map((vault) => {
    const lpAddresses = vault.lpAddresses
    const lpAddress = getAddress(lpAddresses)
    return { address: getAddress(vault.token.address), name: 'allowance', params: [lpAddress] }
  })

  const rawLpAllowances = await multicall(erc20, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance)
  })
  return parsedLpAllowances
}

export const quoteTokenBalancesLP = async (vaultsToFetch: VaultConfig[]) => {
  const calls = vaultsToFetch.map((vault) => {
    const lpAddresses = vault.lpAddresses
    const lpAddress = getAddress(lpAddresses)
    return { address: getAddress(vault.quoteToken.address), name: 'allowance', params: [lpAddress] }
  })

  const rawLpAllowances = await multicall(erc20, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance)
  })
  return parsedLpAllowances
}

export const lpTotalSupplies = async (vaultsToFetch: VaultConfig[]) => {
  const calls = vaultsToFetch.map((vault) => {
    const lpAddresses = vault.lpAddresses
    const lpAddress = getAddress(lpAddresses)
    return { address: lpAddress, name: 'totalSupply' }
  })

  const rawLpAllowances = await multicall(erc20, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance)
  })
  return parsedLpAllowances
}

export const tokenDecimals = async (vaultsToFetch: VaultConfig[]) => {
  const calls = vaultsToFetch.map((vault) => {
    return { address: getAddress(vault.token.address), name: 'decimals' }
  })

  const rawLpAllowances = await multicall(erc20, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance)
  })
  return parsedLpAllowances
}

export const quoteTokenDecimals = async (vaultsToFetch: VaultConfig[]) => {
  const calls = vaultsToFetch.map((vault) => {
    return { address: getAddress(vault.quoteToken.address), name: 'decimals' }
  })

  const rawLpAllowances = await multicall(erc20, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance)
  })
  return parsedLpAllowances
}

export const lpTokenBalanceStrategies = async (vaultsToFetch: VaultConfig[]) => {
  const calls = vaultsToFetch.map((vault) => {
    const masterAddress = getAddress(vault.masterChefAddress)
    return vault.isQuickswap?{ address: masterAddress, name: 'balanceOf', params: [getAddress(vault.strategyAddress)] }  :{ address: masterAddress, name: 'userInfo', params: [vault.spid, getAddress(vault.strategyAddress)] }
  })

  const rawLpAllowances = await multicall(erc20, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance)
  })
  return parsedLpAllowances
}

export const totalAllocPoints = async (vaultsToFetch: VaultConfig[]) => {
  const calls = vaultsToFetch.map((vault) => {
    const masterAddress = getAddress(vault.masterChefAddress)
    return vault.isQuickswap?{ address: masterAddress, name: 'balanceOf', params: [getAddress(vault.strategyAddress)] }  :{ address: masterAddress, name: 'totalAllocPoint' }
  })

  const rawLpAllowances = await multicall(erc20, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance)
  })
  return parsedLpAllowances
}

export const infos = async (vaultsToFetch: VaultConfig[]) => {
  const calls = vaultsToFetch.map((vault) => {
    const masterAddress = getAddress(vault.masterChefAddress)
    return vault.isQuickswap?{ address: masterAddress, name: 'balanceOf', params: [getAddress(vault.strategyAddress)] }  :{ address: masterAddress, name: 'poolInfo', params: [vault.spid] }
  })

  const rawLpAllowances = await multicall(erc20, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance)
  })
  return parsedLpAllowances
}

export const emissionMCs = async (vaultsToFetch: VaultConfig[]) => {
  const calls = vaultsToFetch.map((vault) => {
    const masterAddress = getAddress(vault.masterChefAddress)
    return { address: masterAddress, name: vault.emissionFunctionName }
  })

  const rawLpAllowances = await multicall(erc20, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance)
  })
  return parsedLpAllowances
}

export const lpTokenBalanceMasterChefs = async (vaultsToFetch: VaultConfig[]) => {
  const calls = vaultsToFetch.map((vault) => {
    const lpAddresses = vault.lpAddresses
    const lpAddress = getAddress(lpAddresses)
    const masterAddress = getAddress(vault.masterChefAddress)
    return { address: lpAddress, name: 'balanceOf', params: [masterAddress] }
  })

  const rawLpAllowances = await multicall(erc20, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance)
  })
  return parsedLpAllowances
}

export const quickPer10000dQuicks = async (vaultsToFetch: VaultConfig[]) => {
  const calls = vaultsToFetch.map((vault) => {
    return { address: '0xf28164A485B0B2C90639E47b0f377b4a438a16B1', name: 'dQUICKForQUICK', params: [10000] }
  })

  const rawLpAllowances = await multicall(erc20, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance)
  })
  return parsedLpAllowances
}

const fetchVaults = async (vaultsToFetch: VaultConfig[]) => {
  const tokenBalances = await tokenBalancesLP(vaultsToFetch);
  const quoteTokenBalances = await quoteTokenBalancesLP(vaultsToFetch);
  const lpTotalSupply = await lpTotalSupplies(vaultsToFetch);
  const tokenDecimal = await tokenDecimals(vaultsToFetch)
  const quoteTokenDecimal = await quoteTokenBalancesLP(vaultsToFetch)  
  const lpTokenBalanceMasterChef = await lpTokenBalanceMasterChefs(vaultsToFetch)
  const lpTokenBalanceStrategy = await lpTokenBalanceStrategies(vaultsToFetch);
  const totalAllocs = await totalAllocPoints(vaultsToFetch)
  const info =await infos(vaultsToFetch)
  const emissionMC = await emissionMCs(vaultsToFetch)
  const quickPer10000dQuick = await quickPer10000dQuicks(vaultsToFetch)
 
  return vaultsToFetch.map((vault, index)=>
  {
      if(vault.isSingle)
      {
         return fetchVaultSingle(vault, lpTotalSupply[index],tokenDecimal[index],
          lpTokenBalanceMasterChef[index], lpTokenBalanceStrategy[index],info[index], totalAllocs[index], emissionMC[index])
      }
      if(vault.isQuickswap)
      {
        return fetchVaultQuick(vault, lpTokenBalanceMasterChef[index],lpTokenBalanceStrategy[index],
          lpTotalSupply[index], tokenBalances[index], tokenDecimal[index], quoteTokenBalances[index], quoteTokenDecimal[index],
          emissionMC[index], quickPer10000dQuick[index] )
      }
      return fetchVaultLP(vault, lpTokenBalanceMasterChef[index],lpTokenBalanceStrategy[index],
        lpTotalSupply[index], tokenBalances[index], tokenDecimal[index], quoteTokenBalances[index], quoteTokenDecimal[index],
        info[index],totalAllocs[index],
        emissionMC[index] )
  })
}

export default fetchVaults
