import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useMatchBreakpoints } from '@polysky-libs/uikit'
import {BigNumber} from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import useDelayedUnmount from 'hooks/useDelayedUnmount'
import { useVaultUser } from 'state/hooks'
import {Vault as VaultType} from 'state/types'
import Apr, { AprProps } from './Apr'
import Apy, { ApyProps } from './Apy'
import Vault, { VaultProps } from './Vault'
import Details from './Details'
import Liquidity, { LiquidityProps } from './Liquidity'
import Wallet, { WalletProps } from './Wallet'
import ActionPanel from './Actions/ActionPanel'
import CellLayout from './CellLayout'
import { DesktopColumnSchema, MobileColumnSchema } from '../types'
import Earned, { EarnedProps } from './Earned'

export interface VaultWithStakedValue extends VaultType {
  apr?: number
  lpRewardsApr: number
  liquidity?: BigNumber
}

export interface MultiplierProps {
  multiplier: string
}

export interface RowProps {
  apr: AprProps
  apy: ApyProps
  vault: VaultProps
  earned?: EarnedProps
  multiplier: MultiplierProps
  liquidity: LiquidityProps
  wallet: WalletProps
  staked: WalletProps
  details: VaultWithStakedValue
}

interface RowPropsWithLoading extends RowProps {
  userDataReady: boolean
}

const cells = {
  apr: Apr,
  apy: Apy,
  earned: Earned,
  vault: Vault,
  details: Details,
  liquidity: Liquidity,
  wallet: Wallet,
  staked: Wallet,
}

const CellInner = styled.div`
  padding: 24px 0px;
  display: flex;
  width: 100%;
  align-items: center;
  padding-right: 8px;

  ${({ theme }) => theme.mediaQueries.xl} {
    padding-right: 32px;
  }
`

const StyledTr = styled.tr`
  cursor: pointer;
  border-bottom: 2px solid ${({ theme }) => theme.colors.cardBorder};
`

const AprMobileCell = styled.td`
  padding-top: 16px;
  padding-bottom: 24px;
`

const VaultMobileCell = styled.td`
  padding-top: 24px;
`

const Row: React.FunctionComponent<RowPropsWithLoading> = (props) => {
  const { details, userDataReady } = props
  const hasStakedAmount = !!useVaultUser(details.pid).stakedBalance.toNumber()
  const [actionPanelExpanded, setActionPanelExpanded] = useState(hasStakedAmount)
  const shouldRenderChild = useDelayedUnmount(actionPanelExpanded, 300)
  const { t } = useTranslation()

  const toggleActionPanel = () => {
    setActionPanelExpanded(!actionPanelExpanded)
  }

  useEffect(() => {
    setActionPanelExpanded(false)
  }, [hasStakedAmount])

  const { isXl, isXs } = useMatchBreakpoints()

  const isMobile = !isXl
  const tableSchema = isMobile ? MobileColumnSchema : DesktopColumnSchema
  const columnNames = tableSchema.map((column) => column.name)

  const handleRenderRow = () => {
    if (!isXs) {
      return (
        <StyledTr onClick={toggleActionPanel}>
          {Object.keys(props).map((key) => {
            const columnIndex = columnNames.indexOf(key)
            if (columnIndex === -1) {
              return null
            }

            switch (key) {
              case 'details':
                return (
                  <td key={key}>
                    <CellInner>
                      <CellLayout>
                        <Details actionPanelToggled={actionPanelExpanded} />
                      </CellLayout>
                    </CellInner>
                  </td>
                )
              case 'apr':
                return (
                  <td key={key}>
                    <CellInner>
                      <CellLayout label={t(tableSchema[columnIndex].label)}>
                        <Apr {...props.apr} />
                      </CellLayout>
                    </CellInner>
                  </td>
                )
                case 'apy':
                  return (
                    <td key={key}>
                      <CellInner>
                        <CellLayout label={t(tableSchema[columnIndex].label)}>
                          <Apy {...props.apy} />
                        </CellLayout>
                      </CellInner>
                    </td>
                  )
              case 'liquidity':
                return (
                  <td key={key}>
                    <CellInner>
                      <CellLayout label={t(tableSchema[columnIndex].label)}>
                        {React.createElement(cells[key], { ...props[key], userDataReady })}
                      </CellLayout>
                    </CellInner>
                  </td>
                )
                case 'wallet':
                  return (
                    <td key={key}>
                      <CellInner>
                        <CellLayout label={t(tableSchema[columnIndex].label)}>
                          {React.createElement(cells[key], { ...props[key], userDataReady })}
                        </CellLayout>
                      </CellInner>
                    </td>
                  )
                  case 'staked':
                    return (
                      <td key={key}>
                        <CellInner>
                          <CellLayout label={t(tableSchema[columnIndex].label)}>
                            {React.createElement(cells[key], { ...props[key], userDataReady })}
                          </CellLayout>
                        </CellInner>
                      </td>
                    )
                case 'liquidityHeading':
                return (
                  <td key={key}>
                    <CellInner>
                      <CellLayout label={t(tableSchema[columnIndex].label)}>
                        {React.createElement(cells[key], { ...props.liquidity, userDataReady })}
                      </CellLayout>
                    </CellInner>
                  </td>
                )
              case 'vault':
                return (
                  <td key={key}>
                    <CellInner>
                      <CellLayout label={t(tableSchema[columnIndex].label)}>
                        {React.createElement(cells[key], { ...props[key], userDataReady, 
                          exchange: props.details.exchange, platform: props.details.platform})}
                      </CellLayout>
                    </CellInner>
                  </td>
                )
              case 'earned':
                  return (
                    <td key={key}>
                      <CellInner>
                        <CellLayout label={t(tableSchema[columnIndex].label)}>
                          {React.createElement(cells[key], { ...props[key], userDataReady })}
                        </CellLayout>                        
                      </CellInner>                      
                    </td>
                  )
              default:
                return (
                  <td key={key}>
                    <CellInner>
                      <CellLayout label={t(tableSchema[columnIndex].label)}>
                       {/* {React.createElement(cells[key], { ...props[key], userDataReady })} */}
                      </CellLayout>
                    </CellInner>
                  </td>
                )
            }
          })}
        </StyledTr>
      )
    }

    return (
      <StyledTr onClick={toggleActionPanel}>
        <td>
          <tr>
            <VaultMobileCell>
              <CellLayout>
                <Vault {...props.vault} />
              </CellLayout>
            </VaultMobileCell>
          </tr>
          <tr>
             <AprMobileCell>
              <CellLayout label={t('APR')}>
                <Apr {...props.apr} hideButton />
              </CellLayout>
            </AprMobileCell> 
          </tr>
        </td>
        <td>
          <CellInner>
            <CellLayout>
              <Details actionPanelToggled={actionPanelExpanded} /> 
            </CellLayout>
          </CellInner>
        </td>
      </StyledTr>
    )
  }

  return (
    <>
      {handleRenderRow()}
      {shouldRenderChild && (
        <tr>
          <td colSpan={6}>
            <ActionPanel {...props} expanded={actionPanelExpanded} /> 
          </td>
        </tr>
      )}
    </>
  )
}

export default Row
