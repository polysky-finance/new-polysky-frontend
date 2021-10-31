import { useMemo } from 'react'
import useWeb3Provider from 'hooks/useWeb3Provider'
import {
  getBep20Contract,
  getSiriusContract,
  getIfoV2Contract,
  getMasterchefContract,
  getSouschefContract,
  getErc721Contract,
  getVaultChefContract,
  getChainlinkOracleContract,
} from 'utils/contractHelpers'

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useIfoV2Contract = (address: string) => {
  const provider = useWeb3Provider()
  return useMemo(() => getIfoV2Contract(address, provider.getSigner()), [address, provider])
}

export const useERC20 = (address: string) => {
  const provider = useWeb3Provider()
  return useMemo(() => getBep20Contract(address, provider.getSigner()), [address, provider])
}

/**
 * @see https://docs.openzeppelin.com/contracts/3.x/api/token/erc721
 */
export const useERC721 = (address: string) => {
  const provider = useWeb3Provider()
  return useMemo(() => getErc721Contract(address, provider.getSigner()), [address, provider])
}

export const useSirius = () => {
  const provider = useWeb3Provider()
  return useMemo(() => getSiriusContract(provider.getSigner()), [provider])
}

export const useMasterchef = () => {
  const provider = useWeb3Provider()
  return useMemo(() => getMasterchefContract(provider.getSigner()), [provider])
}

export const useVaultChef = () => {
  const provider = useWeb3Provider()
  return useMemo(() => getVaultChefContract(provider.getSigner()), [provider])
}

export const useSousChef = (id) => {
  const provider = useWeb3Provider()
  return useMemo(() => getSouschefContract(id, provider.getSigner()), [id, provider])
}

export const useChainlinkOracleContract = () => {
  const provider = useWeb3Provider()
  return useMemo(() => getChainlinkOracleContract(provider.getSigner()), [provider])
}
