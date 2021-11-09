import React from 'react'
import styled from 'styled-components'
import { Text, Skeleton} from '@polysky-libs/uikit'
import { useTranslation } from 'contexts/Localization'
import {getDecimalPlaces, reduceNumber} from 'utils/stringFormater'
import BigNumber from 'bignumber.js'

const ReferenceElement = styled.div`
  display: inline-block;
`

export interface WalletProps {
  wallet: BigNumber
  prefix?: string
}

const WalletWrapper = styled.div`
  min-width: 60px;
  font-weight: 600;
  text-align: left;
  margin-right: 0;
  `

const Container = styled.div`
  display: flex;
  align-items: center;
`

const Wallet: React.FunctionComponent<WalletProps> = ({ wallet}) => {
  const formattedLPPrice = reduceNumber(wallet)
  const digits = getDecimalPlaces(new BigNumber(formattedLPPrice[0]))
  
  
  const displayWallet =
    wallet && !wallet.isNaN() ? (
      `$${Number(formattedLPPrice[0]).toLocaleString(undefined, { maximumFractionDigits: digits })}${formattedLPPrice[1]}`
    ) : (
      <Skeleton width={60} />
    )
  const { t } = useTranslation()

  return (
    <Container>
      <WalletWrapper>
        <Text>{displayWallet}</Text>
      </WalletWrapper>
    </Container>
  )
}

export default Wallet
