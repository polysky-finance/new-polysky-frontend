import React from 'react'
import { Card, CardBody, Heading, Text } from '@polysky-libs/uikit'
import styled from 'styled-components'
import { SIRIUS_PER_BLOCK } from 'config'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import { getSiriusAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'


const StyledCakeStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const CakeStats = () => {
  const { t } = useTranslation()
  const totalSupply = useTotalSupply()
  const burnedBalance = getBalanceNumber(useBurnedBalance(getSiriusAddress()))
  const siriusSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0

  return (
    <StyledCakeStats>
      <CardBody>
        <Heading scale="xl" mb="24px">
          {t('SIRIUS Stats')}
        </Heading>
        <Row>
          <Text fontSize="14px">{t('Total Supply')}</Text>
          {siriusSupply && <CardValue fontSize="14px" value={getBalanceNumber(totalSupply)} />}
        </Row>
        <Row>
          <Text fontSize="14px">{t('Circulating Supply')}</Text>
          {siriusSupply && <CardValue fontSize="14px" value={siriusSupply} />}
        </Row>
        <Row>
          <Text fontSize="14px">{t('Total Burned')}</Text>
          <CardValue fontSize="14px" decimals={0} value={burnedBalance} />
        </Row>
        <Row>
          <Text fontSize="14px">{t('New SIRIUS/block')}</Text>
          <CardValue fontSize="14px" decimals={2} value={SIRIUS_PER_BLOCK.toNumber()} />
        </Row>
		<Row>
          <Text fontSize="14px">{t('Maximum supply')}</Text>
          <CardValue fontSize="14px" decimals={0} value={10000000} />
        </Row>
      </CardBody>
    </StyledCakeStats>
  )
}

export default CakeStats
