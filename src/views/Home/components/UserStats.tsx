import React from 'react'
import { Card, CardBody, Heading, Text, Skeleton } from '@polysky-libs/uikit'
import styled from 'styled-components'
import { SIRIUS_PER_BLOCK } from 'config'
import {useUserTotalPoolValue, useUserTotalFarmValue, useUserTotalVaultValue} from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import { getSiriusAddress } from 'utils/addressHelpers'
import { BIG_ZERO } from 'utils/bigNumber'
import { usePollFarmsData, useVaults, usePollVaultsData, usePriceSiriusUsdc, usePools, useFetchPublicPoolsData } from 'state/hooks'
import { useWeb3React } from '@web3-react/core'
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

const UserStats = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  
 // usePollFarmsData(false)
 // usePollVaultsData(false) 
 // useFetchPublicPoolsData()
 // const { pools: poolsWithoutAutoVault, userDataLoaded } = usePools(account)
  
  const userFarm =   useUserTotalFarmValue()   
  const userVault =   useUserTotalVaultValue()
  const userPool = useUserTotalPoolValue() 
  const userTotal = userPool && userFarm && userVault? userPool.plus(userFarm).plus(userVault): undefined;

  return (
    <StyledCakeStats>
      <CardBody>
        <Heading scale="xl" mb="12px">
          {t('Your Portfolio')}
        </Heading>

        <Row>
          <Text fontSize="16px">{t('Pool')}</Text>
          {userPool ? 
          ( <CardValue fontSize="16px" value={userPool.toNumber()} prefix="$" decimals={2}/>):
          (<Skeleton width={125} height={25}/>) }
        </Row>
        <Row>
          <Text fontSize="16px">{t('Farm')}</Text>
          {userFarm ? 
          ( <CardValue fontSize="16px" value={userFarm.toNumber()} prefix="$" decimals={2}/>):
          (<Skeleton width={125} height={25}/>) }
        </Row>
        <Row>
          <Text fontSize="16px">{t('Vault')}</Text>
          {userVault ? 
          ( <CardValue fontSize="16px" value={userVault.toNumber()} prefix="$" decimals={2}/>):
          (<Skeleton width={125} height={25}/>) }
        </Row>
        <Row>
          <Text fontSize="24px" fontStyle="bold">{t('Total')}</Text>
          {userTotal ? 
          ( <CardValue fontSize="16px" value={userTotal.toNumber()} prefix="$" decimals={2}/>):
          (<Skeleton width={125} height={25}/>) }
        </Row>
      </CardBody>
    </StyledCakeStats>
  )
}

export default UserStats
