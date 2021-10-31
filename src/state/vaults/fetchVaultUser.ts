import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import vaultChefABI from 'config/abi/vaultchef.json'
import multicall from 'utils/multicall'
import { getAddress, getVaultChefAddress } from 'utils/addressHelpers'
import { VaultConfig } from 'config/constants/types'

export const fetchVaultUserAllowances = async (account: string, vaultsToFetch: VaultConfig[]) => {
  const vaultChefAddress = getVaultChefAddress()

  const calls = vaultsToFetch.map((vault) => {
    const lpContractAddress = getAddress(vault.lpAddresses)
    return { address: lpContractAddress, name: 'allowance', params: [account, vaultChefAddress] }
  })

  const rawLpAllowances = await multicall(erc20ABI, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toJSON()
  })
  return parsedLpAllowances
}

export const fetchVaultUserTokenBalances = async (account: string, vaultsToFetch: VaultConfig[]) => {
  const calls = vaultsToFetch.map((vault) => {
    const lpContractAddress = getAddress(vault.lpAddresses)
    return {
      address: lpContractAddress,
      name: 'balanceOf',
      params: [account],
    }
  })

  const rawTokenBalances = await multicall(erc20ABI, calls)
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance).toJSON()
  })
  return parsedTokenBalances
}

export const fetchVaultUserStakedBalances = async (account: string, vaultsToFetch: VaultConfig[]) => {
  const vaultChefAddress = getVaultChefAddress()

  const calls = vaultsToFetch.map((vault) => {
    return {
      address: vaultChefAddress,
      name: 'userInfo',
      params: [vault.pid, account],
    }
  })

  const rawStakedBalances = await multicall(vaultChefABI, calls)
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON()
  })
  return parsedStakedBalances
}


export const fetchVaultUserCurrentBalances = async (account: string, vaultsToFetch: VaultConfig[]) => {
  const vaultChefAddress = getVaultChefAddress()

  const calls = vaultsToFetch.map((vault) => {
    return {
      address: vaultChefAddress,
      name: 'stakedWantTokens',
      params: [vault.pid, account],
    }
  })

  const rawStakedBalances = await multicall(vaultChefABI, calls)
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON()
  })
  return parsedStakedBalances
}
