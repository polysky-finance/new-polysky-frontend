import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { LinkExternal, Text } from '@polysky-libs/uikit'
import { getAddress } from 'utils/addressHelpers'
import { getPolygonScanAddressUrl } from 'utils/polygonscan'
import { getBalanceAmount} from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import { useVaults} from 'state/hooks'
import {Vault} from 'state/types'
import { BIG_TEN, BIG_ZERO, BIG_ONE } from 'utils/bigNumber'
import StakedAction from './StakedAction'
import Apr, { AprProps } from '../Apr'
import { LiquidityProps } from '../LiquidityDetails'
import Wallet from '../Wallet'

export interface VaultWithStakedValue extends Vault {
  apr?: number
  lpRewardsApr?: number
  liquidity?: BigNumber
}


export interface ActionPanelProps {
  apr: AprProps
  liquidity: LiquidityProps
  details: VaultWithStakedValue
  userDataReady: boolean
  expanded: boolean
}

const expandAnimation = keyframes`
  from {
    max-height: 0px;
  }
  to {
    max-height: 500px;
  }
`

const collapseAnimation = keyframes`
  from {
    max-height: 500px;
  }
  to {
    max-height: 0px;
  }
`

const Container = styled.div<{ expanded }>`
  animation: ${({ expanded }) =>
    expanded
      ? css`
          ${expandAnimation} 300ms linear forwards
        `
      : css`
          ${collapseAnimation} 300ms linear forwards
        `};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  width: 100%;
  flex-direction: column-reverse;
  padding: 24px;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    padding: 16px 32px;
  }
`

const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 400;
`

const StakeContainer = styled.div`
  color: ${({ theme }) => theme.colors.text};
  align-items: center;
  display: flex;
  justify-content: space-between;

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
  }
`

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
    flex-basis: 0;
  }
`

const InfoContainer = styled.div`
  min-width: 200px;
`

const ValueContainer = styled.div`
  display: block;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`

const ValueWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0px;
`

const ActionPanel: React.FunctionComponent<ActionPanelProps> = ({
  details,
  apr,
  liquidity,
  userDataReady,
  expanded,
}) => {
  const vault = details
 // const apr2 = new BigNumber(apr.value).times(365).toJSON();
  const { userDataLoaded } = useVaults()
  const { t } = useTranslation()
  const isActive = vault.isactive
  const lpLabel = vault.lpSymbol && vault.lpSymbol.toUpperCase().replace('POLYSKY', '')
  
  const lpAddress = getAddress(vault.lpAddresses)
  const polygon = getPolygonScanAddressUrl(lpAddress)
  const info = vault.lpInfo
  const url = vault.baseLiquidityUrl //
  const label = lpLabel;
  
  let lpPrice;
  let digits=3;
  if (vault.lpTotalSupply &&  vault.quoteToken.usdcPrice) {
      // Total value of base token in LP
      const totalLiquidity =  new BigNumber(vault.quoteTokenAmountTotal).times(vault.quoteToken.usdcPrice)
      // Divide total value of all tokens, by the number of LP tokens
      const totalLpTokens = getBalanceAmount(new BigNumber(vault.lpTotalSupply))
      lpPrice = totalLiquidity.div(totalLpTokens)
      digits = lpPrice.gt(new BigNumber(100))? 0: 3;
      if(lpPrice.lt(new BigNumber(100)) && lpPrice.gt(new BigNumber(10))){
        digits =1
      }
      if(lpPrice.lt(new BigNumber(10)) && lpPrice.gt(new BigNumber(0.1))){
      digits = 2
      }
      if(lpPrice.lt(new BigNumber(0.1)) && lpPrice.gt(new BigNumber(0.01)))
      {
        digits = 3
      }
      if(lpPrice.lt(0.01))
      {
        digits = 4
      }
  }
  
  
  const wallet= !userDataLoaded ? undefined: getBalanceAmount(new BigNumber(vault.userData.tokenBalance)).times(lpPrice)
  const staked = !userDataLoaded ? undefined: getBalanceAmount(new BigNumber(vault.userData.currentBalance)).times(lpPrice)
  const aprval : AprProps ={ 
    value: new BigNumber(apr.value).toJSON(), // .div(100).plus(1).pow(365).minus(1).times(100).decimalPlaces(2).toJSON(),
    lpLabel: apr.lpLabel,
    tokenAddress: apr.tokenAddress,
    quoteTokenAddress: apr.quoteTokenAddress,
    siriusPrice: apr.siriusPrice,
    originalValue: apr.originalValue,
    hideButton: apr.hideButton,
    baseLiquidityUrl: apr.baseLiquidityUrl
  }

  const feesAPR : AprProps ={ 
    value: new BigNumber(vault.lpRewardsApr).toJSON(), // .div(100).plus(1).pow(365).minus(1).times(100).decimalPlaces(2).toJSON(),
    lpLabel: apr.lpLabel,
    tokenAddress: apr.tokenAddress,
    quoteTokenAddress: apr.quoteTokenAddress,
    siriusPrice: apr.siriusPrice,
    originalValue: apr.originalValue,
    hideButton: apr.hideButton,
    baseLiquidityUrl: apr.baseLiquidityUrl
  }
  const farmAPR : AprProps ={ 
    value: new BigNumber(apr.farmAPR).decimalPlaces(2).toJSON(), // .div(100).plus(1).pow(365).minus(1).times(100).decimalPlaces(2).toJSON(),
    lpLabel: apr.lpLabel,
    tokenAddress: apr.tokenAddress,
    quoteTokenAddress: apr.quoteTokenAddress,
    siriusPrice: apr.siriusPrice,
    originalValue: apr.originalValue,
    hideButton: apr.hideButton,
    baseLiquidityUrl: apr.baseLiquidityUrl
  }


  return (
    <Container expanded={expanded}>
      <InfoContainer>
        {isActive && (
          <StakeContainer>
            <StyledLinkExternal href={url}>
              {t('Get %symbol%', { symbol: label })}
            </StyledLinkExternal>
          </StakeContainer>
        )}
        <ValueWrapper>
           <Text>{t('LP Price')}</Text>
          <Wallet wallet={lpPrice} maxDigits={digits}/>
        </ValueWrapper>
        <ValueWrapper>
           <Text>{t('Farm APR:')}</Text>
          <Apr {...farmAPR} /> 
        </ValueWrapper>
        <ValueWrapper>
           <Text>{t('Fees APR:')}</Text>
          <Apr {...feesAPR} /> 
        </ValueWrapper>
        <StyledLinkExternal href={polygon}>{t('View Contract')}</StyledLinkExternal>
        <StyledLinkExternal href={info}>
              {t('See %symbol% Info', { symbol: label })}
        </StyledLinkExternal>
        <StyledLinkExternal href={url}>
              {t('Get %symbol%', { symbol: label })}
        </StyledLinkExternal>        
      </InfoContainer>
      <ValueContainer>
        <ValueWrapper>
           <Text>{t('Daily')}</Text>
          <Apr {...aprval} /> 
        </ValueWrapper>
        <ValueWrapper>
           <Text>{t('Wallet')}</Text>
          <Wallet wallet={wallet}/>
        </ValueWrapper>
        <ValueWrapper>
           <Text>{t('Staked')}</Text>
          <Wallet wallet={staked}/>
        </ValueWrapper>        
      </ValueContainer>
      <ActionContainer>
        <StakedAction {...vault} userDataReady={userDataReady} />
      </ActionContainer>
    </Container>
  )
}

export default ActionPanel
