import { ChainId } from '@polysky-libs/sdk'
import addresses from 'config/constants/contracts'
import tokens from 'config/constants/tokens'
import { Address } from 'config/constants/types'

export const getAddress = (address: Address): string => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  return address[chainId] ? address[chainId] : address[ChainId.MAINNET]
}
export const getSiriusAddress = () => {
  return getAddress(tokens.sirius.address)
}

export const getMasterChefAddress = () => {
  return getAddress(addresses.masterChef)
}
export const getMulticallAddress = () => {
  return getAddress(addresses.multiCall)
}
export const getWmaticAddress = () => {
  return getAddress(tokens.wmatic.address)
}
export const getVaultChefAddress = () => {
  return getAddress(addresses.vaultChef)
}
export const getChainlinkOracleAddress = () => {
  return getAddress(addresses.chainlinkOracle)
}
