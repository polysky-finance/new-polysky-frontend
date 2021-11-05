import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react'
import { Route, useRouteMatch, useLocation} from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Flex, Image, Heading, RowType, Toggle, Text, Box } from '@polysky-libs/uikit'
import { ChainId } from '@polysky-libs/sdk'
import styled from 'styled-components'
import {VaultWithStakedValue} from 'views/Vaults/components/VaultTable/Row'
import { getBalanceAmount, getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import Page from 'components/Layout/Page'
import { usePriceWMaticUsdc } from 'state/hooks'
import { usePollFarmsDataSubset, useVaults, usePollVaultsData, usePriceSiriusUsdc } from 'state/hooks'
import { Vault } from 'state/types'
import { getVaultApr } from 'utils/apr'
import { useTranslation } from 'contexts/Localization'
import { orderBy } from 'lodash'
import { latinise } from 'utils/latinise'
import PageHeader from 'components/PageHeader'
import SearchInput from 'components/SearchInput'
import FoldableText from 'components/FoldableText'
import Select, { OptionProps } from 'components/Select/Select'
import Table from './components/VaultTable/VaultTable'
import VaultTabButtons from './components/VaultTabButtons'
import { RowProps } from './components/VaultTable/Row'
import { DesktopColumnSchema} from './components/types'
import { BIG_TEN, BIG_ZERO, BIG_ONE } from '../../utils/bigNumber'
import FeesMessage from './components/FeesMessage'
import BuybackCard from './components/BuybackCard'

const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 32px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
    margin-bottom: 0;
  }
`

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  ${Text} {
    margin-left: 8px;
  }
`

const LabelWrapper = styled.div`
  > ${Text} {
    font-size: 12px;
  }
`

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
    padding: 0;
  }
`

const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    width: auto;

    > div {
      padding: 0;
    }
  }
`

const StyledImage = styled(Image)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 58px;
`
const NUMBER_OF_VAULTS_VISIBLE = 12

const getDisplayApr = (siriusRewardsApr?: number, lpRewardsApr?: number) => {
  if (siriusRewardsApr && lpRewardsApr) {
    return ((siriusRewardsApr + lpRewardsApr)/365).toLocaleString('en-US', { maximumFractionDigits: 2 })
  }
  if (siriusRewardsApr) {
    return (siriusRewardsApr/365).toLocaleString('en-US', { maximumFractionDigits: 2 })
  }
  return null
}

const getApy = (siriusRewardsApr?: number, lpRewardsApr?: number) => {
  if (siriusRewardsApr && lpRewardsApr) {
    const exponent = (1+(siriusRewardsApr + lpRewardsApr)/36500)**365;
    const apy = (exponent -1)*100;
    return apy
  }
  if (siriusRewardsApr) {
    const exponent = (1+(siriusRewardsApr)/36500)**365;
    const apy = (exponent -1)*100;
    return apy
  }
  return null
}

const getDisplayApy = (siriusRewardsApr?: number, lpRewardsApr?: number) => {
  if (siriusRewardsApr && lpRewardsApr) {
    const exponent = (1+(siriusRewardsApr + lpRewardsApr)/36500)**365;
    const apy = (exponent -1)*100;
    return (apy).toLocaleString('en-US', { maximumFractionDigits: 2 })
  }
  if (siriusRewardsApr) {
    const exponent = (1+(siriusRewardsApr)/36500)**365;
    const apy = (exponent -1)*100;
    return (apy).toLocaleString('en-US', { maximumFractionDigits: 2 })
  }
  return null
}

const Vaults: React.FC = () => {
  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const { t } = useTranslation()
// const { data: farmsLP} = useFarms()
  const { data: vaultsLP, userDataLoaded } = useVaults()
  const siriusPrice = usePriceSiriusUsdc()  
  const [query, setQuery] = useState('')
  const { account } = useWeb3React()
  const [sortOption, setSortOption] = useState('hot')
  const [platformOption, setPlatformOption] = useState('All')
  const [typeOption, setTypeOption] = useState('All')
  const [showBurning, setShowBurning] = useState(true)

  const isArchived = pathname.includes('archived')
  const isInactive = pathname.includes('history')
  const isActive = !isInactive && !isArchived

  usePollFarmsDataSubset(isArchived)
  usePollVaultsData(isArchived)

  // Users with no wallet connected should see 0 as Earned amount
  // Connected users should see loading indicator until first userData has loaded
  const userDataReady = !account || (!!account && userDataLoaded)

  const [stakedOnly, setStakedOnly] = useState(!isActive)
  useEffect(() => {
    setStakedOnly(!isActive)
  }, [isActive])

  const pVaultsLP = vaultsLP.filter(v=> {
	  if(!showBurning && v.isBurning)
	  {
		   return false;
	  }
	  if(platformOption !== "All" && v.platform !== platformOption)
	  {
		  return false;
	  }
	  if(typeOption === "Single" && !v.isSingle)
	  {
		  return false;
	  }
	  if(typeOption === "Pair" && v.isSingle)
	  {
		  return false;
	  }
	  if(typeOption === "Stable" && !v.isStable)
	  {
		  return false;
	  }
	  return true;
//	  return (platformOption === "All" || v.platform === platformOption) && (showBurning || !v.isBurning)
  })

  const activeVaults = pVaultsLP.filter((vault) =>  !vault.isArchived)
  const inactiveVaults = pVaultsLP.filter((vault) =>  vault.isArchived)
  const archivedVaults = pVaultsLP.filter((vault) => vault.isArchived)

  const wmaticPriceUsdc = usePriceWMaticUsdc()

  const stakedOnlyVaults = activeVaults.filter(
    (vault) => vault.userData && new BigNumber(vault.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedInactiveVaults = inactiveVaults.filter(
    (vault) => vault.userData && new BigNumber(vault.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedArchivedVaults = archivedVaults.filter(
    (vault) => vault.userData && new BigNumber(vault.userData.stakedBalance).isGreaterThan(0),
  )

  const vaultsList = useCallback(
    (vaultsToDisplay: Vault[]): VaultWithStakedValue[] => {
      let vaultsToDisplayWithAPR: VaultWithStakedValue[] = vaultsToDisplay.map((vault) => {
        if (!vault.lpTotalInQuoteToken || !vault.quoteToken.usdcPrice) {
          return vault;
        }
        const totalLiquidity =  (vault.isSingle? BIG_ONE:new BigNumber(2)).times(new BigNumber(vault.quoteTokenAmountTotal)).times(vault.quoteToken.usdcPrice)
        const stratLiquidity = new BigNumber(vault.lpTotalInQuoteToken).times(vault.quoteToken.usdcPrice);
        const rewardTokenPrice = new BigNumber(vault.rewardToken.usdcPrice)
        const rewardPerBlock = new BigNumber(vault.emission).times(new BigNumber(vault.emissionMultiplier)).div(BIG_TEN.pow(vault.rewardToken.decimals))
        const masterLiquidity = totalLiquidity.times(new BigNumber(vault.lpTokenBalanceMasterChef)).div(new BigNumber(vault.lpTotalSupply))
        const maticPerDayUsdc=vault.maticPerDay? new BigNumber(vault.maticPerDay).times(wmaticPriceUsdc): BIG_ZERO

        const { siriusRewardsApr, lpRewardsApr } = isActive
          ? getVaultApr(new BigNumber(vault.poolWeight), rewardTokenPrice, masterLiquidity, vault.lpAddresses[ChainId.MAINNET], rewardPerBlock, vault.lpRewardsApr, maticPerDayUsdc)
          : { siriusRewardsApr: 0, lpRewardsApr: 0 }

        return { ...vault, apr: siriusRewardsApr, lpRewardsApr, liquidity: stratLiquidity }
      })

      if (query) {
        const lowercaseQuery = latinise(query.toLowerCase())
        vaultsToDisplayWithAPR = vaultsToDisplayWithAPR.filter((vault: VaultWithStakedValue) => {
          return latinise(vault.lpSymbol.toLowerCase()).includes(lowercaseQuery)
        })
      }
      return vaultsToDisplayWithAPR
    },
    [query, isActive, wmaticPriceUsdc],
  )

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const loadMoreRef = useRef<HTMLDivElement>(null)

  const [numberOfVaultsVisible, setNumberOfVaultsVisible] = useState(NUMBER_OF_VAULTS_VISIBLE)
  const [observerIsSet, setObserverIsSet] = useState(false)

  const vaultsStakedMemoized = useMemo(() => {
    let vaultsStaked = []

    const sortVaults = (vaults: VaultWithStakedValue[]): VaultWithStakedValue[] => {
      switch (sortOption) {
        case 'platform':
          return orderBy(vaults, (vault: VaultWithStakedValue) => vault.platform, 'desc')
        case 'apy':
          return orderBy(
            vaults,
            (vault: VaultWithStakedValue) => (vault.apr ? getApy(vault.apr, vault.lpRewardsApr) : 0),
            'desc',
          )
        case 'liquidity':
          return orderBy(vaults, (vault: VaultWithStakedValue) => Number(vault.liquidity), 'desc')
        default:
          return vaults
      }
    }

    if (isActive) {
      vaultsStaked = stakedOnly ? vaultsList(stakedOnlyVaults) : vaultsList(activeVaults)
    }
    if (isInactive) {
      vaultsStaked = stakedOnly ? vaultsList(stakedInactiveVaults) : vaultsList(inactiveVaults)
    }
    if (isArchived) {
      vaultsStaked = stakedOnly ? vaultsList(stakedArchivedVaults) : vaultsList(archivedVaults)
    }

    return sortVaults(vaultsStaked).slice(0, numberOfVaultsVisible)
  }, [
    sortOption,
    activeVaults,
    vaultsList,
    inactiveVaults,
    archivedVaults,
    isActive,
    isInactive,
    isArchived,
    stakedArchivedVaults,
    stakedInactiveVaults,
    stakedOnly,
    stakedOnlyVaults,
    numberOfVaultsVisible,
  ])

  useEffect(() => {
    const showMoreVaults = (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setNumberOfVaultsVisible((vaultsCurrentlyVisible) => vaultsCurrentlyVisible + NUMBER_OF_VAULTS_VISIBLE)
      }
    }

    if (!observerIsSet) {
      const loadMoreObserver = new IntersectionObserver(showMoreVaults, {
        rootMargin: '0px',
        threshold: 1,
      })
      loadMoreObserver.observe(loadMoreRef.current)
      setObserverIsSet(true)
    }
  }, [vaultsStakedMemoized, observerIsSet])

  const rowData = vaultsStakedMemoized.map((vault) => {
    const { token, quoteToken } = vault
    const tokenAddress = token.address
    const quoteTokenAddress = quoteToken.address
    const lpLabel = vault.lpSymbol;// && vault.lpSymbol.split(' ')[0].toUpperCase().replace('PANCAKE', '')
    let lpPrice = BIG_ZERO

    if (vault.lpTotalSupply && vault.lpTotalInQuoteToken) {
      // Total value of base token in LP
      const valueOfBaseTokenInVault = new BigNumber(vault.token.usdcPrice).times(vault.tokenAmountTotal)
      // Double it to get overall value in LP
      const overallValueOfAllTokensInVault =vault.isSingle? valueOfBaseTokenInVault: valueOfBaseTokenInVault.times(2)
      // Divide total value of all tokens, by the number of LP tokens
      const totalLpTokens = getBalanceAmount(new BigNumber(vault.lpTotalSupply))
      lpPrice = getBalanceAmount(overallValueOfAllTokensInVault.div(totalLpTokens))
    }

    const row: RowProps = {
      apr: {
        value: getDisplayApr(vault.apr, vault.lpRewardsApr),
        multiplier: vault.multiplier,
        lpLabel,
        tokenAddress,
        quoteTokenAddress,
        siriusPrice,
        originalValue: vault.apr,
      },
      apy: {
        value: getDisplayApy(vault.apr, vault.lpRewardsApr),
        multiplier: vault.multiplier,
        lpLabel,
        tokenAddress,
        quoteTokenAddress,
        siriusPrice,
        originalValue: getApy(vault.apr, vault.lpRewardsApr),
      },
      vault: {
        label: lpLabel,
        pid: vault.pid,
        token: vault.token,
        quoteToken: vault.quoteToken,
        isSingle: vault.isSingle,
        isBurning: vault.isBurning,
        exchange: vault.exchange
      },
      earned: {
        earnings: getBalanceNumber(new BigNumber(vault.userData.currentBalance).minus(vault.userData.stakedBalance)),  // new BigNumber(vault.userData.earnings)),
        pid: vault.pid,
        percent: vault.userData.stakedBalance? getBalanceNumber((new BigNumber(vault.userData.currentBalance).minus(vault.userData.stakedBalance)).times(new BigNumber(100)).div(vault.userData.stakedBalance)): 0,
      },
      liquidity: {
        liquidity: vault.liquidity,
      },
      multiplier: {
        multiplier: vault.multiplier,
      },
      wallet:{
        wallet: !userDataLoaded ? undefined: new BigNumber(vault.userData.tokenBalance).times(lpPrice),
      },
      staked:{
        wallet: !userDataLoaded ? undefined: new BigNumber(vault.userData.currentBalance).times(lpPrice),
      },
      details: vault,
    }

    return row
  })

  const renderContent = (): JSX.Element => {
      const columnSchema = DesktopColumnSchema

      const columns = columnSchema.map((column) => ({
        id: column.id,
        name: column.name,
        label: column.label,
        sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
          switch (column.name) {
            case 'vault':
              return b.id - a.id
            case 'apy':
              if (a.original.apy.value && b.original.apy.value) {
                return (a.original.apy.originalValue.minus(b.original.apy.originalValue)).toNumber();
              }
              return 0
            case 'liquidity':
            if(a.original.liquidity && b.original.liquidity){
              return (a.original.liquidity.liquidity.minus(a.original.liquidity.liquidity)).toNumber()
            }
            return 0
            default:
              return 1
          }
        },
        sortable: column.sortable,
      }))

      return <Table data={rowData} columns={columns} userDataReady={userDataReady} />
  }

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }

  const handlePlatformOptionChange = (option: OptionProps): void => {
    setPlatformOption(option.value)
  }
  
  const handleTypeOptionChange = (option: OptionProps): void => {
    setTypeOption(option.value)
  }

  return (
    <>
      <PageHeader>
      <Flex justifyContent="space-between" flexDirection={['column', null, null, 'row']}>
	      <Flex flex="1" flexDirection="column" mr={['8px', 0]}>
            <Heading as="h1" scale="xxl" color="secondary" mb="24px">
               {t('Vaults')}
           </Heading>
	          <Heading scale="md" color="text">
             {t('Polysky helps you earn the highest yield by auto-compounding.')} <u><a color="blue" href="https://www.certik.org/projects/polysky-finance" target="_blank" rel="noreferrer">On-boarded by Certik.</a></u>
            </Heading>            
		    </Flex>  
        <Flex flex="1" height="fit-content" justifyContent="center" alignItems="center" mt={['24px', null, '0']}>
                <BuybackCard />
        </Flex>
        </Flex>
      </PageHeader>
	  
	  <FoldableText title={t('')} mt="24px">
              <Box display="inline">
					<FeesMessage />
          </Box>
      </FoldableText>
	  
      <Page>
        <ControlContainer>
        <ViewControls style={{ marginLeft: 16 }}>
            <VaultTabButtons hasStakeInFinishedVaults={stakedInactiveVaults.length > 0} />
          </ViewControls>
          
          <ViewControls style={{ marginLeft: 16 }}>
            <LabelWrapper>
              <Text textTransform="uppercase"> {t('Staked only')}</Text>      
              <Toggle checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} scale="sm" />              
          </LabelWrapper>           
          </ViewControls>
          <ViewControls style={{ marginLeft: 16 }}>
            <LabelWrapper>
              <Text textTransform="uppercase"> {t('Show burning')}</Text>      
              <Toggle checked={showBurning} onChange={() => setShowBurning(!showBurning)} scale="sm" />              
            </LabelWrapper>           
          </ViewControls>

         
          <FilterContainer style={{ marginLeft: 16 }}>
          <LabelWrapper>
              <Text textTransform="uppercase">{t('Platform')}</Text>
              <Select
                options={[
                  {
                    label: t('All'),
                    value: 'All',
                  },
                  {
                    label: t('Apeswap'),
                    value: 'Apeswap',
                  },
                  {
                    label: t('Polysky'),
                    value: 'Polysky',
                  },
                  {
                    label: t('Quickswap'),
                    value: 'Quickswap',
                  },
				  {
                    label: t('Cafeswap'),
                    value: 'Cafeswap',
                  },
                ]}
                onChange={handlePlatformOptionChange}
              />
            </LabelWrapper>
            </FilterContainer>
            <FilterContainer style={{ marginLeft: 16 }}>
            <LabelWrapper>
              <Text textTransform="uppercase">{t('Sort by')}</Text>
              <Select
                options={[
                  {
                    label: t('Hot'),
                    value: 'hot',
                  },
                  {
                    label: t('APY'),
                    value: 'apy',
                  },
                  {
                    label: t('Platform'),
                    value: 'platform',
                  },
                  {
                    label: t('TVL'),
                    value: 'liquidity',
                  },
                ]}
                onChange={handleSortOptionChange}
              />
            </LabelWrapper>            
          </FilterContainer>
		  <FilterContainer style={{ marginLeft: 16 }}>
            <LabelWrapper>
              <Text textTransform="uppercase">{t('Asset Type')}</Text>
              <Select
                options={[
                  {
                    label: t('All'),
                    value: 'All',
                  },
                  {
                    label: t('Single'),
                    value: 'Single',
                  },
                  {
                    label: t('Pair'),
                    value: 'Pair',
                  },
                  {
                    label: t('Stable'),
                    value: 'Stable',
                  },
                ]}
                onChange={handleTypeOptionChange}
              />
            </LabelWrapper>            
          </FilterContainer>
          <FilterContainer style={{ marginLeft: 16 }}>
            <LabelWrapper >
              <Text textTransform="uppercase">{t('Search')}</Text>
              <SearchInput onChange={handleChangeQuery} placeholder="Search Vaults" />
            </LabelWrapper>
           </FilterContainer>
        </ControlContainer>
        {renderContent()}
        <div ref={loadMoreRef} />
        {/* <StyledImage src="/images/decorations/3dpan.png" alt="Polysky illustration" width={120} height={103} /> */}
      </Page>
    </>
  )
}

export default Vaults
