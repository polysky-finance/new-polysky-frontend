import React from 'react'
import { Flex, Text, Skeleton } from '@polysky-libs/uikit'
import { useTranslation } from 'contexts/Localization'
import Balance from 'components/Balance'
import { Pool } from 'state/types'



const MultiplierRow: React.FC<Pool> = ({ pool}) => {
  const { t } = useTranslation()
  const { depositFee, isFinished } = pool
 
  return (
    <Flex alignItems="center" justifyContent="space-between">

      <Text>{`${t('Deposit Fee:')}`}</Text>
      {isFinished || (!depositFee && depositFee !== 0) ? (
        <Skeleton width="82px" height="32px" />
      ) : (
        <Flex alignItems="center">
          <Balance
            fontSize="16px"
            isDisabled={isFinished}
            value={depositFee}
            decimals={2}
            unit="%"
            bold
          />
        </Flex>
    )}
    </Flex>
  )
}

export default MultiplierRow
