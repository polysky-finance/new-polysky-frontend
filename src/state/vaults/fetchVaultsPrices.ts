import BigNumber from 'bignumber.js'
import { BIG_ONE, BIG_ZERO } from 'utils/bigNumber'
import { filterVaultsByQuoteToken } from 'utils/vaultsPriceHelpers'
import { filterFarmsByQuoteToken } from 'utils/farmsPriceHelpers'
import { Vault, Farm } from 'state/types'
import fetchFarmsPrices from 'state/farms/fetchFarmsPrices'
import { getAddress } from 'utils/addressHelpers'

const getVaultFromTokenSymbol = (vaults: Vault[], tokenSymbol: string, preferredQuoteTokens?: string[]): Vault => {
  const vaultsWithTokenSymbol = vaults.filter((vault) => vault.token.symbol === tokenSymbol)
  const filteredVault = filterVaultsByQuoteToken(vaultsWithTokenSymbol, preferredQuoteTokens)
  return filteredVault
}

const getVaultFromQuoteTokenSymbol = (vaults: Vault[], tokenSymbol: string, preferredQuoteTokens?: string[]): Vault => {
  const vaultsWithTokenSymbol = vaults.filter((vault) => vault.quoteToken.symbol === tokenSymbol)
  const filteredVault = filterVaultsByQuoteToken(vaultsWithTokenSymbol, preferredQuoteTokens)
  return filteredVault
}

const getFarmFromTokenSymbol = (farms: Farm[], tokenSymbol: string, preferredQuoteTokens?: string[]): Farm => {
  const farmsWithTokenSymbol = farms.filter((farm) => farm.token.symbol === tokenSymbol)
  const filteredFarm = filterFarmsByQuoteToken(farmsWithTokenSymbol, preferredQuoteTokens)
  return filteredFarm
}

const getVaultBaseTokenPrice = (vault: Vault, quoteTokenVault: Vault, wmaticPriceUsdc: BigNumber): BigNumber => {
  const hasTokenPriceVsQuote = Boolean(vault.tokenPriceVsQuote)

  if (vault.quoteToken.symbol === 'USDC') {
    return hasTokenPriceVsQuote ? new BigNumber(vault.tokenPriceVsQuote) : BIG_ZERO
  }

  if (vault.quoteToken.symbol === 'WMATIC') {
    return hasTokenPriceVsQuote ? wmaticPriceUsdc.times(vault.tokenPriceVsQuote) : BIG_ZERO
  }

  // We can only calculate profits without a quoteTokenVault for USDC/WMATIC vaults
  if (!quoteTokenVault) {
    return BIG_ZERO
  }

  // Possible alternative vault quoteTokens:
  // UST (i.e. MIR-UST), pBTC (i.e. PNT-pBTC), BTCB (i.e. bBADGER-BTCB), ETH (i.e. SUSHI-ETH)
  // If the vault's quote token isn't BUSD or wBNB, we then use the quote token, of the original vault's quote token
  // i.e. for vault PNT - pBTC we use the pBTC vault's quote token - BNB, (pBTC - BNB)
  // from the BNB - pBTC price, we can calculate the PNT - BUSD price
  if (quoteTokenVault.quoteToken.symbol === 'WMATIC') {
    const quoteTokenInUsdc = wmaticPriceUsdc.times(quoteTokenVault.tokenPriceVsQuote)
    return hasTokenPriceVsQuote && quoteTokenInUsdc
      ? new BigNumber(vault.tokenPriceVsQuote).times(quoteTokenInUsdc)
      : BIG_ZERO
  }

  if (quoteTokenVault.quoteToken.symbol === 'USDC') {
    const quoteTokenInUsdc = quoteTokenVault.tokenPriceVsQuote
    return hasTokenPriceVsQuote && quoteTokenInUsdc
      ? new BigNumber(vault.tokenPriceVsQuote).times(quoteTokenInUsdc)
      : BIG_ZERO
  }

  // Catch in case token does not have immediate or once-removed BUSD/wBNB quoteToken
  return BIG_ZERO
}

const getVaultQuoteTokenPrice = (vault: Vault, quoteTokenVault: Vault, wmaticPriceUsdc: BigNumber): BigNumber => {
  if (vault.quoteToken.symbol === 'USDC') {
    return BIG_ONE
  }

  if (vault.quoteToken.symbol === 'WMATIC') {
    return wmaticPriceUsdc
  }

  if (!quoteTokenVault) {
    return BIG_ZERO
  }

  if (quoteTokenVault.quoteToken.symbol === 'WMATIC') {
    return quoteTokenVault.tokenPriceVsQuote ? wmaticPriceUsdc.times(quoteTokenVault.tokenPriceVsQuote) : BIG_ZERO
  }

  if (quoteTokenVault.quoteToken.symbol === 'USDC') {
    return quoteTokenVault.tokenPriceVsQuote ? new BigNumber(quoteTokenVault.tokenPriceVsQuote) : BIG_ZERO
  }

  return BIG_ZERO
}

const getPriceFromTokenFarm = (farms, address) =>{
    const farm = farms.find((f:Farm) => getAddress(f.token.address) === address && f.token.usdcPrice)
    return !farm? null: farm.token.usdcPrice
}

const fetchVaultsPrices = async (vaults, farms) => {
  
  const farmPrices= await fetchFarmsPrices(farms);
  const wmaticUsdcFarm = farms.find((f: Farm) => f.pid === 2)
  const wmaticPriceUsdc = wmaticUsdcFarm.tokenPriceVsQuote ? BIG_ONE.div(wmaticUsdcFarm.tokenPriceVsQuote) : BIG_ZERO

  const vaultsWithPrices = vaults.map((vault) => {
    let baseTokenPrice = null
    let quoteTokenPrice =null
    if(vault.isSingle){
       baseTokenPrice = getPriceFromTokenFarm(farmPrices, getAddress(vault.token.address))
       quoteTokenPrice = getPriceFromTokenFarm(farmPrices, getAddress(vault.quoteToken.address))
    }else{
      const quoteTokenVault = getVaultFromTokenSymbol(vaults, vault.quoteToken.symbol)
      baseTokenPrice = getVaultBaseTokenPrice(vault, quoteTokenVault, wmaticPriceUsdc).toJSON()
      quoteTokenPrice = getVaultQuoteTokenPrice(vault, quoteTokenVault, wmaticPriceUsdc).toJSON()
    }
    let rewardTokenPrice = getPriceFromTokenFarm(farmPrices, getAddress(vault.rewardToken.address))
    if(!rewardTokenPrice){
       rewardTokenPrice = getAddress(vault.rewardToken.address) === getAddress(vault.token.address) ? baseTokenPrice:null;
    }
    if(!rewardTokenPrice){
      rewardTokenPrice = getAddress(vault.rewardToken.address) === getAddress(vault.quoteToken.address) ? quoteTokenPrice:0;
   }

    const token = { ...vault.token, usdcPrice: baseTokenPrice }
    const quoteToken = { ...vault.quoteToken, usdcPrice: quoteTokenPrice }
    const rewardToken = {...vault.rewardToken, usdcPrice: rewardTokenPrice}
    return { ...vault, token, quoteToken, rewardToken }
  })

  return vaultsWithPrices
}

export default fetchVaultsPrices
