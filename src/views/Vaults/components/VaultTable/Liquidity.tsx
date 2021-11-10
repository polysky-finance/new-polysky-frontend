import React from 'react'
import styled from 'styled-components'
import { Text, Skeleton} from '@polysky-libs/uikit'
import { useTranslation } from 'contexts/Localization'
import BigNumber from 'bignumber.js'
import {getDecimalPlaces, reduceNumber} from 'utils/stringFormater'

const ReferenceElement = styled.div`
  display: inline-block;
`

export interface LiquidityProps {
  liquidity: BigNumber
}

const LiquidityWrapper = styled.div`
  min-width: 60px;
  font-weight: 600;
  text-align: left;
  margin-right: 0;
  `

const Container = styled.div`
  display: flex;
  align-items: center;
`

const Liquidity: React.FunctionComponent<LiquidityProps> = ({ liquidity }) => {
  const formattedNumber = reduceNumber(new BigNumber(liquidity), false)
  let digits = getDecimalPlaces(new BigNumber(formattedNumber[0]))
  digits = digits===0?0 : digits-1

  const displayLiquidity =
    liquidity ? (
      `$${Number(formattedNumber[0]).toLocaleString(undefined, { maximumFractionDigits: digits })}${formattedNumber[1]}`
    ) : (
      <Skeleton width={60} />
    )
  const { t } = useTranslation()

  return (
    <Container>
      <LiquidityWrapper>
        <Text>{displayLiquidity}</Text>
      </LiquidityWrapper>
    </Container>
  )
}

export default Liquidity
