import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react'
import { Route, useRouteMatch, useLocation} from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Flex, Image, Heading, RowType, Toggle, Text, Box } from '@polysky-libs/uikit'
import { ChainId } from '@polysky-libs/sdk'
import styled from 'styled-components'
import {VaultWithStakedValue} from 'views/Vaults/components/VaultTable/Row'
import { getBalanceNumber, getBalanceAmount } from 'utils/formatBalance'
import Page from 'components/Layout/Page'
import { usePriceWMaticUsdc } from 'state/hooks'
import { usePollFarmsDataSubset, useVaults, usePollVaultsData, usePriceSiriusUsdc } from 'state/hooks'
import {getDecimalPlaces, reduceNumber} from 'utils/stringFormater'
import { Vault } from 'state/types'
import { getVaultApr } from 'utils/apr'
import { useTranslation } from 'contexts/Localization'
import { orderBy } from 'lodash'
import { latinise } from 'utils/latinise'
import PageHeader from 'components/PageHeader'
import SearchInput from 'components/SearchInput'
import Select, { OptionProps } from 'components/Select/Select'
import Table from './components/VaultTable/VaultTable'
import VaultTabButtons from './components/VaultTabButtons'
import { RowProps } from './components/VaultTable/Row'
import { DesktopColumnSchema} from './components/types'
import { BIG_TEN, BIG_ZERO, BIG_ONE } from '../../utils/bigNumber'
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

const formatNumber = (number)=>{
  const formattedNumber = reduceNumber(new BigNumber(number))
  const digits = getDecimalPlaces(new BigNumber(formattedNumber[0]))
  return `${(Number(formattedNumber[0])).toLocaleString('en-US', { maximumFractionDigits: digits })}${formattedNumber[1]}`
}

const getDisplayApy = (siriusRewardsApr?: number, lpRewardsApr?: number) => {
  if (siriusRewardsApr && lpRewardsApr) {
    const exponent = (1+(siriusRewardsApr + lpRewardsApr)/36500)**365;
    const apy = (exponent -1)*100;
    return formatNumber(apy)
   // return (apy).toLocaleString('en-US', { maximumFractionDigits: 2 })
  }
  if (siriusRewardsApr) {
    const exponent = (1+(siriusRewardsApr)/36500)**365;
    const apy = (exponent -1)*100;
    return formatNumber(apy)
 //   return (apy).toLocaleString('en-US', { maximumFractionDigits: 2 })
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
  const [showBurning, setShowBurning] = useState(false)

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
        const totalLiquidity =  new BigNumber(vault.lpTotalInQuoteToken).times(vault.quoteToken.usdcPrice).times(vault.lpTokenBalanceMasterChef).div(vault.lpTotalSupply)
        const stratLiquidity = new BigNumber(vault.quoteTokenAmountMc).times(vault.quoteToken.usdcPrice);
        const rewardTokenPrice = new BigNumber(vault.rewardToken.usdcPrice)
        const rewardPerBlock = new BigNumber(vault.emission).times(new BigNumber(vault.emissionMultiplier)).div(BIG_TEN.pow(vault.rewardToken.decimals))

        const maticPerDay = vault.rewarder?new BigNumber(43200).times(new BigNumber(vault.rewardEmission)).times(vault.poolWeight).times(new BigNumber(vault.emissionMultiplier)).div(BIG_TEN.pow(18)) : BIG_ZERO

        const maticPerDayUsdc=vault.rewarder? new BigNumber(maticPerDay).times(wmaticPriceUsdc) : BIG_ZERO

        const { siriusRewardsApr, lpRewardsApr } = isActive
          ? getVaultApr(new BigNumber(vault.poolWeight), rewardTokenPrice, totalLiquidity, vault.lpAddresses[ChainId.MAINNET], rewardPerBlock, vault.lpRewardsApr, maticPerDayUsdc)
          : { siriusRewardsApr: 0, lpRewardsApr: 0 }
        
        const wallet = vault.userData && vault.userData.tokenBalance?new BigNumber(vault.userData.tokenBalance).times(totalLiquidity).div(vault.lpTokenBalanceMasterChef): BIG_ZERO
        const staked = vault.userData && vault.userData.tokenBalance?new BigNumber(vault.userData.currentBalance).times(totalLiquidity).div(vault.lpTokenBalanceMasterChef): BIG_ZERO

        return { ...vault, apr: siriusRewardsApr, lpRewardsApr, liquidity: stratLiquidity, wallet, staked }
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
        case 'staked':
          return orderBy(vaults, (vault: VaultWithStakedValue) => Number(vault.staked), 'desc')
        case 'wallet':
          return orderBy(vaults, (vault: VaultWithStakedValue) => Number(vault.wallet), 'desc')
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
    let lpPrice;
    if (vault.lpTotalSupply &&  vault.quoteToken.usdcPrice) {
      // Total value of base token in LP
      const totalLiquidity =  new BigNumber(vault.quoteTokenAmountTotal).times(vault.quoteToken.usdcPrice)
      // Divide total value of all tokens, by the number of LP tokens
      const totalLpTokens = getBalanceAmount(new BigNumber(vault.lpTotalSupply))
      lpPrice = totalLiquidity.div(totalLpTokens)      
    }

    const row: RowProps = {
      apr: {
        value: getDisplayApr(vault.apr, vault.fetchedLPAPR !== '0' ? new BigNumber(vault.fetchedLPAPR).toNumber(): vault.lpRewardsApr),
        farmAPR: vault.apr,
        lpLabel,
        tokenAddress,
        quoteTokenAddress,
        siriusPrice,
        originalValue: vault.apr,
      },
      apy: {
        value: getDisplayApy(vault.apr, vault.fetchedLPAPR !== '0' ? new BigNumber(vault.fetchedLPAPR).toNumber(): vault.lpRewardsApr),
        lpLabel,
        tokenAddress,
        quoteTokenAddress,
        siriusPrice,
        originalValue: getApy(vault.apr, vault.fetchedLPAPR !== '0' ? new BigNumber(vault.fetchedLPAPR).toNumber(): vault.lpRewardsApr),
      },
      vault: {
        label: lpLabel,
        pid: vault.pid,
        token: vault.token,
        quoteToken: vault.quoteToken,
        isSingle: vault.isSingle,
        isBurning: vault.isBurning,
        exchange: vault.exchange,
        platform: vault.platform
      },
      earned: {
        earnings: getBalanceNumber(new BigNumber(vault.userData.currentBalance).minus(vault.userData.stakedBalance)),  // new BigNumber(vault.userData.earnings)),
        pid: vault.pid,
        percent: vault.userData.stakedBalance? getBalanceNumber((new BigNumber(vault.userData.currentBalance).minus(vault.userData.stakedBalance)).times(new BigNumber(100)).div(vault.userData.stakedBalance)): 0,
      },
      liquidity: {
        liquidity: vault.liquidity,
      },
      wallet:{
        wallet: !userDataLoaded ? undefined: getBalanceAmount(new BigNumber(vault.userData.tokenBalance)).times(lpPrice),
      },
      staked:{
        wallet: !userDataLoaded ? undefined: getBalanceAmount(new BigNumber(vault.userData.currentBalance)).times(lpPrice),
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
                return (a.original.apy.originalValue-b.original.apy.originalValue)
              }
              return 0
            case 'liquidity':
            if(a.original.liquidity && b.original.liquidity){
              return (a.original.liquidity.liquidity.minus(a.original.liquidity.liquidity)).toNumber()
            }
            return 0
            case 'staked':
              if(a.original.staked && b.original.staked){
                return (a.original.staked.wallet.minus(b.original.staked.wallet)).toNumber()
              }
              return 0
            case 'wallet':
              if(a.original.wallet && b.original.wallet){
                return (a.original.wallet.wallet.minus(b.original.wallet.wallet)).toNumber()
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
             {t('Polysky helps you earn the highest yield by auto-compounding.')} <u><a color="blue" href="https://www.certik.org/projects/polysky-finance" target="_blank" rel="noreferrer">Audited by Certik.</a></u>
            </Heading>  
            <br/>  
            <Heading scale="md" color="text">
              {t('Please unstake your token from the old vault and stake them below. The old vault is at ')}
              <u><a color="#8B0000" href="https://old.polysky.finance" target="_blank" rel="noreferrer">https://old.polysky.finance</a></u>
            </Heading>  
            <br/>
            <Heading scale="md" color="#8B0000">
              {t('Some of the vaults are invested in third party platforms. Please DYOR before investing.')}
            </Heading>  
                
		    </Flex>  
         
        </Flex>
      </PageHeader>
	  
      <Page>
      <Flex flex="1" height="fit-content" justifyContent="center" alignItems="center" mt={['24px', null, '0']}>
                <BuybackCard />
        </Flex>
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
                    label: t('Cafeswap'),
                    value: 'Cafeswap',
                  },
                  {
                    label: t('Crystal Finance'),
                    value: 'Crystal',
                  },
				          {
                    label: t('Dinoswap'),
                    value: 'Dinoswap',
                  }, 
                  {
                    label: t('Gravity'),
                    value: 'Gravity',
                  }, 
				          {
                    label: t('Jetswap'),
                    value: 'Jetswap',
                  }, 
				          {
                    label: t('Kogefarm'),
                    value: 'Kogefarm',
                  },
				          {
                    label: t('Pearzap'),
                    value: 'Pearzap',
                  },				  
                  {
                    label: t('Polysky'),
                    value: 'Polysky',
                  },
				          {
                    label: t('Qi Dao'),
                    value: 'Qi Dao',
                  },
                  {
                    label: t('Quickswap'),
                    value: 'Quickswap',
                  },
                  {
                    label: t('Sushiswap'),
                    value: 'Sushiswap',
                  },
				  {
                    label: t('Wault'),
                    value: 'Wault',
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
                  {
                    label: t('Staked'),
                    value: 'staked',
                  },
                  {
                    label: t('Wallet'),
                    value: 'wallet',
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
           
           <FilterContainer style={{ marginLeft: 16 }}>
            <a color="blue" href="https://www.certik.org/projects/polysky-finance" target="_blank" rel="noreferrer">
              <>
              <img src="/images/Certik.svg" width={116} height={46} />
              </>
            </a> 
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
