import React from 'react'
import { Flex, Text, Skeleton } from '@polysky-libs/uikit'
import { useTranslation } from 'contexts/Localization'
import Balance from 'components/Balance'

const MultiplierRow: React.FC = () => {
  const { t } = useTranslation()
 
  return (
    <Flex alignItems="center" justifyContent="right">
      
        <Flex alignItems="right">
          <Balance
            fontSize="16px"
            value={0}
            decimals={2}
            unit="%"
            bold
          />
        </Flex>
    </Flex>
  )
}

export default MultiplierRow
