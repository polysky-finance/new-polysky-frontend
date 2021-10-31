import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Skeleton, Text } from '@polysky-libs/uikit'
import { useTranslation } from 'contexts/Localization'
import { useGetStats } from 'hooks/api'
import {useTotalFarmValue, useTotalPoolValue, useTotalVaultValue} from 'state/hooks'
import { BIG_ONE, BIG_TEN } from 'utils/bigNumber'
import CardValue from './CardValue'


const StyledTotalValueLockedCard = styled(Card)`
  align-items: center;
  display: flex;
  flex: 1;
`

const TotalValueLockedCard = () => {
  const { t } = useTranslation()
  const poolValue = useTotalPoolValue();
  const farmValue = useTotalFarmValue();
  const vaultValue = useTotalVaultValue();
  
  return (
    <StyledTotalValueLockedCard>
      <CardBody>
        <Heading scale="lg" mb="24px">
          {t('Total Value Locked (TVL)')}
        </Heading>
        { farmValue && poolValue && vaultValue && farmValue.gt(BIG_TEN) && poolValue.gt(BIG_TEN) && vaultValue.gt(BIG_TEN) ?
           (
            <CardValue value={poolValue.plus(farmValue).plus(vaultValue).toNumber()} prefix="$" decimals={2}/> 
           ) : (
            <Skeleton width={175} height={50}/>
           )}
           <Text color="textSubtle">{t('Across all LPs and Pools')}</Text>       
      </CardBody>
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
