import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { LinkExternal, Text } from '@polysky-libs/uikit'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { getAddress } from 'utils/addressHelpers'
import { getPolygonScanAddressUrl } from 'utils/polygonscan'
import { CommunityTag, BurningTag, CoreTag, DualTag } from 'components/Tags'
import BigNumber from 'bignumber.js'
import StakedAction from './StakedAction'
import Apr, { AprProps } from '../Apr'
import LiquidityDetails, { LiquidityProps } from '../LiquidityDetails'


declare const NewAPR: AprProps

export interface VaultWithStakedValue extends Farm {
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

const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 25px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 16px;
  }

  > div {
    height: 24px;
    padding: 0 6px;
    font-size: 14px;
    margin-right: 4px;

    svg {
      width: 14px;
    }
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

  const { t } = useTranslation()
  const isActive = vault.isactive
  const lpLabel = vault.lpSymbol && vault.lpSymbol.toUpperCase().replace('POLYSKY', '')
  
  const lpAddress = getAddress(vault.lpAddresses)
  const polygon = getPolygonScanAddressUrl(lpAddress)
  const info = vault.isSingle?`https://info.quickswap.exchange/token/${lpAddress}`:`https://info.quickswap.exchange/pair/${lpAddress}`
  const label = lpLabel === 'AUTO SIRIUS'? 'SIRIUS':lpLabel;
  

  const aprval : AprProps ={ 
    value: new BigNumber(apr.value).div(100).plus(1).pow(365).minus(1).times(100).decimalPlaces(2).toJSON(),
    multiplier: apr.multiplier,
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
            <StyledLinkExternal href={info}>
              {t('Get %symbol%', { symbol: label })}
            </StyledLinkExternal>
          </StakeContainer>
        )}
        <StyledLinkExternal href={polygon}>{t('View Contract')}</StyledLinkExternal>
        <StyledLinkExternal href={info}>{t('See Pair Info')}</StyledLinkExternal>

      </InfoContainer>
      <ValueContainer>
        <ValueWrapper>
           <Text>{t('APY')}</Text>
          <Apr {...aprval} /> 
        </ValueWrapper>
      </ValueContainer>
      <ActionContainer>
        <StakedAction {...vault} userDataReady={userDataReady} />
      </ActionContainer>
    </Container>
  )
}

export default ActionPanel
