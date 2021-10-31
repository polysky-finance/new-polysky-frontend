import { VaultConfig } from 'config/constants/types'
import fetchVaultLP from './fetchVault'

const fetchVaults = async (vaultsToFetch: VaultConfig[]) => {
  const data = await Promise.all(
    vaultsToFetch.map(async (vaultConfig) => {
      const vault = await fetchVaultLP(vaultConfig)
      return vault
    }),
  )
  return data
}

export default fetchVaults
