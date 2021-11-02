import React from 'react'
import styled from 'styled-components'
import { Address } from 'config/constants/types'
import BigNumber from 'bignumber.js'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { Skeleton } from '@polysky-libs/uikit'

export interface ApyProps {
  value: string
  multiplier: string
  lpLabel: string
  tokenAddress?: Address
  quoteTokenAddress?: Address
  siriusPrice: BigNumber
  originalValue: number
  hideButton?: boolean
  baseLiquidityUrl?: string
}

const Container = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};

  button {
    width: 16px;
    height: 20px;

    svg {
      path {
        fill: ${({ theme }) => theme.colors.textSubtle};
      }
    }
  }
`

const AprWrapper = styled.div`
  min-width: 60px;
  text-align: left;
`

const Apr: React.FC<ApyProps> = ({
  value,
  lpLabel,
  tokenAddress,
  quoteTokenAddress,
  siriusPrice,
  originalValue,
  baseLiquidityUrl,
  hideButton = false,
}) => {

  return originalValue !== 0 ? (
    <Container>
      {originalValue ? (
        <>
          <AprWrapper>{value}%</AprWrapper>
        </>
      ) : (
        <AprWrapper>
          <Skeleton width={60} />
        </AprWrapper>
      )}
    </Container>
  ) : (
    <Container>
      <AprWrapper>{originalValue}%</AprWrapper>
    </Container>
  )
}

export default Apr
