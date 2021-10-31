import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout } from '@polysky-libs/uikit'
import { useTranslation } from 'contexts/Localization'
import Page from 'components/Layout/Page'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
import CakeStats from 'views/Home/components/CakeStats'
import UserStats from 'views/Home/components/UserStats'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
import TwitterCard from 'views/Home/components/TwitterCard'
import EarnAPRCard from 'views/Home/components/EarnAPRCard'
import EarnAssetCard from 'views/Home/components/EarnAssetCard'
import AutoCompounding from './components/AutoCompounding'


const Hero = styled.div`
  align-items: center;
  background-image: url('/images/sirius.svg');
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  padding-top: 116px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url('/images/sirius.svg'), url('/images/sirius.svg');
    background-position: left center, right center;
    height: 165px;
    padding-top: 0;
  }
`
const Image = styled.div`
  align-items: start;
  display: flex;
  justify-content: center;
  margin: auto;
  margin-bottom: 12px;
  padding-top: 16px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    align-items: start;
  display: flex;
    height: 165px;
    padding-top: 0;
  }
`
const Image2 = styled.div`
  align-items: end;
  display: flex;
  justify-content: center;
  margin: auto;
  margin-bottom: 32px;
  padding-top: 116px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    align-items: start;
    display: flex;
    height: 165px;
    padding-top: 0;
  }
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 24px;
  grid-gap: 24px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: 32px;
    grid-gap: 32px;

    & > div {
      grid-column: span 6;
    }
  }
`

const CTACards = styled(BaseLayout)`
  align-items: start;
  margin-bottom: 24px;
  grid-gap: 24px;

  & > div {
    grid-column: span 6;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: 32px;
    grid-gap: 32px;

    & > div {
      grid-column: span 4;
    }
  }
`

const Home: React.FC = () => {
  const { t } = useTranslation()
/*   const { account } = useWeb3React()
  For live loading of portfolio data
  usePollFarmsData(false)
  setTimeout( () => { const b =1 }, 2000 ); 
  usePollVaultsData(false) 
  setTimeout( () => { const b =1 }, 2000 ); 
  useFetchPublicPoolsData()
  setTimeout( () => { const c=1 }, 2000 );
   const { pools: poolsWithoutAutoVault, userDataLoaded } = usePools(account) 
*/
  return (
    <>
      
      <Page>
        <Hero>
          <img src="/images/centre_image.svg" alt="Sirius logo" width={200} height={150} />
		  <br/>
          <Text>{t('Second generation hybrid-yield aggregator for the polygon network')}</Text>
        </Hero>
        <div>
          <Cards>
            <FarmStakingCard />
            <TwitterCard />
          </Cards>
          <Cards> 
            <UserStats/>            
            <EarnAPRCard />                      
          </Cards>
          <Cards>
            <AutoCompounding />
            <EarnAssetCard />
          </Cards>
          <Cards>
            <CakeStats />
            <TotalValueLockedCard />
          </Cards>
        </div>
      </Page>
    </>
  )
}

export default Home
