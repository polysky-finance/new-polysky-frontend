import { Vault } from 'state/types'
import {fetchVaultLP, fetchVaultSingle, fetchVaultQuick} from './fetchPublicVaultData'

const fetchVault = async (vault: Vault): Promise<Vault> => {
  let vaultPublicData = null;
 /*  if(vault.isSingle){
    vaultPublicData= await fetchVaultSingle(vault)
  } else if(vault.isQuickswap){
    vaultPublicData =await fetchVaultQuick(vault);
  }else{
    vaultPublicData =await fetchVaultLP(vault);
  } */

  return { ...vault, ...vaultPublicData }
}

export default fetchVault
