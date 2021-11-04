import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon, Skeleton } from '@polysky-libs/uikit'
import { ChainId } from '@polysky-libs/sdk'
import max from 'lodash/max'
import { NavLink } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import { useDispatch } from 'react-redux'
import { useFarms, useVaults, usePriceSiriusUsdc } from 'state/hooks'
import { fetchFarmsPublicDataAsync, nonArchivedFarms } from 'state/farms'
import { fetchVaultsPublicDataAsync, nonArchivedVaults } from 'state/vaults'
import { fetchPoolsPublicDataAsync} from 'state/pools'
import { getFarmApr } from 'utils/apr'
import useIntersectionObserver from 'hooks/useIntersectionObserver'

const StyledFarmStakingCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }

  transition: opacity 200ms;
  &:hover {
    opacity: 0.65;
  }
`
const CardMidContent = styled(Heading).attrs({ scale: 'xl' })`
  line-height: 44px;
`
const EarnAPRCard = () => {
  const [isFetchingFarmData, setIsFetchingFarmData] = useState(true)
  const [isFetchingVaultData, setIsFetchingVaultData] = useState(true)
  const [isFetchingPoolData, setIsFetchingPoolData] = useState(true)

  const { t } = useTranslation()
  const { data: farmsLP } = useFarms()
 // const { data: vaultsLP } = useVaults()
  const siriusPrice = usePriceSiriusUsdc()
  const dispatch = useDispatch()
  const { observerRef, isIntersecting } = useIntersectionObserver()

  // Fetch farm data once to get the max APR
  useEffect(() => {
    const fetchFarmData = async () => {
      try {
        await dispatch(fetchFarmsPublicDataAsync(nonArchivedFarms.map((nonArchivedFarm) => nonArchivedFarm.pid)))
      } finally {
        setIsFetchingFarmData(false)
      }
    }

    if (isIntersecting) {
      fetchFarmData()
    }
  }, [dispatch, setIsFetchingFarmData, isIntersecting])

  // Fetch pool data once for the TVL
  useEffect(() => {
    const fetchPoolData = async () => {
      try {
        await dispatch(fetchPoolsPublicDataAsync())
      } finally {
        setIsFetchingPoolData(false)
      }
    }

    if (isIntersecting) {
      fetchPoolData()
    }
  }, [dispatch, setIsFetchingPoolData, isIntersecting])


// Fetch vault data once to get the max APR
 useEffect(() => {
  const fetchVaultData = async () => {
    try {
      await dispatch(fetchVaultsPublicDataAsync(nonArchivedVaults.map((nonArchivedVault) => nonArchivedVault.pid)))
    } finally {
      setIsFetchingVaultData(false)
    }
  }

  if (isIntersecting) {
    fetchVaultData()
  }
}, [dispatch, setIsFetchingVaultData, isIntersecting])



  const highestApr = useMemo(() => {
    if (siriusPrice.gt(0)) {
      const aprs = farmsLP.map((farm) => {
        // Filter inactive farms, because their theoretical APR is super high. In practice, it's 0.
        if (farm.pid !== 0 && farm.multiplier !== '0X' && farm.lpTotalInQuoteToken && farm.quoteToken.usdcPrice) {
          const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteToken.usdcPrice)
          const { siriusRewardsApr, lpRewardsApr } = getFarmApr(
            new BigNumber(farm.poolWeight),
            siriusPrice,
            totalLiquidity,
            farm.lpAddresses[ChainId.MAINNET],
          )
          return siriusRewardsApr + lpRewardsApr
        }
        return null
      })

      const maxApr = max(aprs)
      return maxApr?.toLocaleString('en-US', { maximumFractionDigits: 2 })
    }
    return null
  }, [siriusPrice, farmsLP])

  const aprText = highestApr || '-'
  const earnAprText = t('Earn up to %highestApr% APR in Farms', { highestApr: aprText })
  const [earnUpTo, InFarms] = earnAprText.split(aprText)

  return (
    <StyledFarmStakingCard>
      <NavLink exact activeClassName="active" to="/farms" id="farm-apr-cta">
        <CardBody>
          <Heading color="contrast" scale="lg">
            {earnUpTo}
          </Heading>
          <CardMidContent color="contrast">
            {highestApr && !isFetchingFarmData && !isFetchingVaultData? (
              `${highestApr}%`
            ) : (
              <>
                <Skeleton animation="pulse" variant="rect" height="44px" />
                <div ref={observerRef} />
              </>
            )}
          </CardMidContent>
          <Flex justifyContent="space-between">
            <Heading color="contrast" scale="lg">
              {InFarms}
            </Heading>
            <ArrowForwardIcon mt={30} color="primary" />
          </Flex>
        </CardBody>
      </NavLink>
    </StyledFarmStakingCard>
  )
}

export default EarnAPRCard
