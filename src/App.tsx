import React, { lazy } from 'react'
import { Router, Redirect, Route, Switch } from 'react-router-dom'
import { ResetCSS } from '@polysky-libs/uikit'
import BigNumber from 'bignumber.js'
import useEagerConnect from 'hooks/useEagerConnect'
// import { usePollCoreFarmData,usePollCoreVaultData, usePollBlockNumber } from 'state/hooks'
import { DatePickerPortal } from 'components/DatePicker'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import { ToastListener } from './contexts/ToastsContext'
import PageLoader from './components/PageLoader'
import EasterEgg from './components/EasterEgg'
import Pools from './views/Pools'
import history from './routerHistory'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
const Home = lazy(() => import('./views/Home'))
const Farms = lazy(() => import('./views/Farms'))
const Vaults = lazy(() => import('./views/Vaults'))
const FarmAuction = lazy(() => import('./views/FarmAuction'))
const NotFound = lazy(() => import('./views/NotFound'))


// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
//  usePollBlockNumber()
  useEagerConnect()
//  usePollCoreFarmData()
//  usePollCoreVaultData()

  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <Menu>
        <SuspenseWithChunkError fallback={<PageLoader />}>
          <Switch>
           <Route path="/" exact>
              <Home />
            </Route> 
		         <Route path="/vaults">
              <Vaults />
            </Route>
                       
            <Route path="/farms">
              <Farms />
            </Route>
            <Route path="/pools">
              <Pools />
            </Route>
            
            <Route path="/staking">
              <Redirect to="/pools" />
            </Route>

            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </SuspenseWithChunkError>
      </Menu>
      <ToastListener />
      <DatePickerPortal />
    </Router>
  )
}

export default React.memo(App)
