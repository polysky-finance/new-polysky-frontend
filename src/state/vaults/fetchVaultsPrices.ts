import BigNumber from 'bignumber.js'
import { BIG_ONE, BIG_ZERO } from 'utils/bigNumber'
import { filterVaultsByQuoteToken } from 'utils/vaultsPriceHelpers'
import { filterFarmsByQuoteToken } from 'utils/farmsPriceHelpers'
import { Vault, Farm } from 'state/types'
import fetchFarmsPrices from 'state/farms/fetchFarmsPrices'
import { getAddress } from 'utils/addressHelpers'

const getPriceFromTokenFarm = (farms, address) =>{
    const farm = farms.find((f:Farm) => getAddress(f.token.address) === address && f.token.usdcPrice)
    return !farm? null: farm.token.usdcPrice
}
const getPriceFromQuoteTokenFarm = (farms, address) =>{
  const farm = farms.find((f:Farm) => getAddress(f.quoteToken.address) === address && f.quoteToken.usdcPrice)
  return !farm? null: farm.quoteToken.usdcPrice
}

const getPrice = (farms, address)=>{
  const tokenPrice = getPriceFromTokenFarm(farms, address);
  if(tokenPrice)
  {
    return tokenPrice;
  }
  return getPriceFromQuoteTokenFarm(farms, address);
}

const fetchVaultsPrices = async (vaults, farms) => {  
  const farmPrices= await fetchFarmsPrices(farms);

  const vaultsWithPrices = vaults.map((vault) => {
    const baseTokenPrice = getPrice(farmPrices, getAddress(vault.token.address))
    const quoteTokenPrice = getPrice(farmPrices, getAddress(vault.quoteToken.address))
    const rewardTokenPrice = getPrice(farmPrices, getAddress(vault.rewardToken.address))

    const token = { ...vault.token, usdcPrice: baseTokenPrice }
    const quoteToken = { ...vault.quoteToken, usdcPrice: quoteTokenPrice }
    const rewardToken = {...vault.rewardToken, usdcPrice: rewardTokenPrice}
    return { ...vault, token, quoteToken, rewardToken }
  })

  return vaultsWithPrices
}

export default fetchVaultsPrices
