import { useEffect, useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { getVaultApr } from 'utils/apr'
import { useWeb3React } from '@web3-react/core'
import { useSelector, useDispatch } from 'react-redux'
import { ChainId } from '@polysky-libs/sdk'
import { ethers } from 'ethers'
import { minBy, orderBy } from 'lodash'
import { farmsConfig, vaultsConfig} from 'config/constants'
import { simpleRpcProvider } from 'utils/providers'
import { getBalanceAmount } from 'utils/formatBalance'
import { BIG_ZERO, BIG_TEN } from 'utils/bigNumber'
import useRefresh from 'hooks/useRefresh'
import { filterFarmsByQuoteToken } from 'utils/farmsPriceHelpers'
import { filterVaultsByQuoteToken } from 'utils/vaultsPriceHelpers'
import { getAddress } from 'utils/addressHelpers'


import {
  fetchFarmsPublicDataAsync,
  fetchVaultsPublicDataAsync,
  fetchPoolsPublicDataAsync,
  fetchPoolsUserDataAsync,
  setBlock,
} from './actions'
import {
  State,
  Farm,
  Vault,
  Pool,
  PoolsState,
  FarmsState,
  VaultsState,
  NodeRound,
  ReduxNodeRound,
} from './types'

import { transformPool } from './pools/helpers'
import { fetchFarmUserDataAsync, nonArchivedFarms } from './farms'
import { fetchVaultUserDataAsync, nonArchivedVaults } from './vaults'

const ZERO = new BigNumber(0)


export const usePollFarmsData = (includeArchive = false) => {
  const dispatch = useDispatch()
  const { slowRefresh } = useRefresh()
  const { account } = useWeb3React()

  useEffect(() => {
    const farmsToFetch = includeArchive ? farmsConfig : nonArchivedFarms
    const pids = farmsToFetch.map((farmToFetch) => farmToFetch.pid)
    
    dispatch(fetchFarmsPublicDataAsync(pids))

    if (account) {
      dispatch(fetchFarmUserDataAsync({ account, pids }))
    }
  }, [includeArchive, dispatch, slowRefresh, account])
}

export const usePollFarmsDataSubset = (includeArchive = false) => {
  const dispatch = useDispatch()
  const { slowRefresh } = useRefresh()
  const { account } = useWeb3React()

  useEffect(() => {

    const pids = [1, 2]

    dispatch(fetchFarmsPublicDataAsync(pids))

    if (account) {
      dispatch(fetchFarmUserDataAsync({ account, pids }))
    }
  }, [includeArchive, dispatch, slowRefresh, account])
}


export const usePollVaultsData = (includeArchive = false) => {
  const dispatch = useDispatch()
  const { slowRefresh } = useRefresh()
  const { account } = useWeb3React()

  useEffect(() => {
    const vaultsToFetch = includeArchive ? vaultsConfig : nonArchivedVaults
    const pids = vaultsToFetch.map((vaultToFetch) => vaultToFetch.pid)

    dispatch(fetchVaultsPublicDataAsync(pids))

    if (account) {
      dispatch(fetchVaultUserDataAsync({ account, pids }))
    }
  }, [includeArchive, dispatch, slowRefresh, account])
}


/**
 * Fetches the "core" farm data used globally
 * 251 = CAKE-BNB LP
 * 252 = BUSD-BNB LP
 */
/*
 export const usePollCoreVaultData = () => {
  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    dispatch(fetchVaultsPublicDataAsync([7]))
  }, [dispatch, fastRefresh])
}

export const usePollCoreFarmData = () => {
  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    dispatch(fetchFarmsPublicDataAsync([251, 252]))
  }, [dispatch, fastRefresh])
} */

export const usePollBlockNumber = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const interval = setInterval(async () => {
      const blockNumber = await simpleRpcProvider.getBlockNumber()
      dispatch(setBlock(blockNumber))
    }, 6000)

    return () => clearInterval(interval)
  }, [dispatch])
}

//  Vaults
export const useVaults = (): {data: Vault[]; userDataLoaded: boolean} => {

  const { data, userDataLoaded } = useSelector((state: State) => ({
    data: state.vaults.data,
    userDataLoaded: state.vaults.userDataLoaded,
  }))
  
  return {data, userDataLoaded}
}

export const useVaultFromPid = (pid): Vault => {
  const vault = useSelector((state: State) => state.vaults.data.find((f) => f.pid === pid))
  return vault
}

export const useVaultFromLpSymbol = (lpSymbol: string): Vault => {
  const vault = useSelector((state: State) => state.vaults.data.find((v) => v.lpSymbol === lpSymbol))
  return vault
}

export const useVaultFromLpAddress = (lpAddress: string): Vault => {
  const vault = useSelector((state: State) => state.vaults.data.find((v) => getAddress(v.lpAddresses) === lpAddress))
  return vault
}

export const useVaultUser = (pid) => {
  const vault = useVaultFromPid(pid)

  return {
    allowance: vault.userData ? new BigNumber(vault.userData.allowance) : BIG_ZERO,
    tokenBalance: vault.userData ? new BigNumber(vault.userData.tokenBalance) : BIG_ZERO,
    stakedBalance: vault.userData ? new BigNumber(vault.userData.stakedBalance) : BIG_ZERO,
    currentBalance: vault.userData ? new BigNumber(vault.userData.currentBalance) : BIG_ZERO,
  }
}

// Return the base token price for a farm, from a given pid
export const useBusdPriceFromPidV = (pid: number): BigNumber => {
  const vault = useVaultFromPid(pid)
  return vault && new BigNumber(vault.token.usdcPrice)
}

// Vaults End
// Farms

export const useFarms = (): {data: Farm[]; userDataLoaded: boolean} => {
  const { data, userDataLoaded } = useSelector((state: State) => ({
    data: state.farms.data,
    userDataLoaded: state.farms.userDataLoaded,
  }))
  
  return {data, userDataLoaded}
}

export const usePools2 = (): {pools: Pool[]; userDataLoaded: boolean } => {
  const { pools, userDataLoaded } = useSelector((state: State) => ({
    pools: state.pools ?  state.pools.data: undefined,
    userDataLoaded: state.pools? state.pools.userDataLoaded: undefined,
  }))
  
  return {pools, userDataLoaded}
}

export const useFarmFromPid = (pid): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.pid === pid))
  return farm
}

export const useFarmFromLpSymbol = (lpSymbol: string): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.lpSymbol === lpSymbol))
  return farm
}

export const useFarmUser = (pid) => {
  const farm = useFarmFromPid(pid)

  return {
    allowance: farm.userData ? new BigNumber(farm.userData.allowance) : BIG_ZERO,
    tokenBalance: farm.userData ? new BigNumber(farm.userData.tokenBalance) : BIG_ZERO,
    stakedBalance: farm.userData ? new BigNumber(farm.userData.stakedBalance) : BIG_ZERO,
    earnings: farm.userData ? new BigNumber(farm.userData.earnings) : BIG_ZERO,
  }
}

// Return a farm for a given token symbol. The farm is filtered based on attempting to return a farm with a quote token from an array of preferred quote tokens
export const useFarmFromTokenSymbol = (tokenSymbol: string, preferredQuoteTokens?: string[]): Farm => {
  const farms = useSelector((state: State) => state.farms.data.filter((farm) => farm.token.symbol === tokenSymbol))
  const filteredFarm = filterFarmsByQuoteToken(farms, preferredQuoteTokens)
  return filteredFarm
}

// Return the base token price for a farm, from a given pid
export const useBusdPriceFromPid = (pid: number): BigNumber => {
  const farm = useFarmFromPid(pid)
  return farm && new BigNumber(farm.token.usdcPrice)
}

export const useBusdPriceFromToken = (tokenSymbol: string): BigNumber => {
  const tokenFarm = useFarmFromTokenSymbol(tokenSymbol)
  const tokenPrice = useBusdPriceFromPid(tokenFarm?.pid)
  return tokenPrice
}

export const useFarmFromTokenName = (tokenName: string): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.token.symbol === tokenName || f.quoteToken.symbol === tokenName))
  return farm
}

export const useVaultLpTokenPrice = (lpAddresses: Address) => {
  // Retrieve the vault using the LP token name. //TODO: just use the lp address to find it
  const vault = useVaultFromLpAddress(getAddress(lpAddresses))
  let lpTokenPrice = BIG_ZERO

  if (vault.lpTotalSupply && vault.lpTotalInQuoteToken) {
    // Total value of base token in LP
    const valueOfBaseTokenInVault = new BigNumber(vault.token.usdcPrice).times(vault.tokenAmountTotal)
    // Double it to get overall value in LP
    const overallValueOfAllTokensInVault =vault.isSingle? valueOfBaseTokenInVault: valueOfBaseTokenInVault.times(2)
    // Divide total value of all tokens, by the number of LP tokens
    const totalLpTokens = getBalanceAmount(new BigNumber(vault.lpTotalSupply))
    lpTokenPrice = overallValueOfAllTokensInVault.div(totalLpTokens)
  }

  return lpTokenPrice
}

export const useFarmLpTokenPrice = (symbol: string) => {
  const farm = useFarmFromLpSymbol(symbol)
  const farmTokenPriceInUsd = useBusdPriceFromPid(farm.pid)
  let lpTokenPrice = BIG_ZERO

  if (farm.lpTotalSupply && farm.lpTotalInQuoteToken) {
    // Total value of base token in LP
    const valueOfBaseTokenInFarm = farmTokenPriceInUsd.times(farm.tokenAmountTotal)
    // Double it to get overall value in LP
    const overallValueOfAllTokensInFarm = valueOfBaseTokenInFarm.times(2)
    // Divide total value of all tokens, by the number of LP tokens
    const totalLpTokens = getBalanceAmount(new BigNumber(farm.lpTotalSupply))
    lpTokenPrice = overallValueOfAllTokensInFarm.div(totalLpTokens)
  }

  return lpTokenPrice
}

// Pools

export const useFetchPublicPoolsData = () => {
  const dispatch = useDispatch()
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchPoolsPublicData = async () => {
      dispatch(fetchPoolsPublicDataAsync())
    }

    fetchPoolsPublicData()

  }, [dispatch, slowRefresh])
}

export const usePools = (account): { pools: Pool[]; userDataLoaded: boolean } => {
  const { fastRefresh } = useRefresh()
  const dispatch = useDispatch()
  useEffect(() => {
    if (account) {
      dispatch(fetchPoolsUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const { pools, userDataLoaded } = useSelector((state: State) => ({
    pools: state.pools.data,
    userDataLoaded: state.pools.userDataLoaded,
  }))
  return { pools: pools.map(transformPool), userDataLoaded }
}

export const usePoolFromPid = (sousId: number): Pool => {
  const pool = useSelector((state: State) => state.pools.data.find((p) => p.sousId === sousId))
  return transformPool(pool)
}

export const useSiriusVault = () => {
  const {
    totalShares: totalSharesAsString,
    pricePerFullShare: pricePerFullShareAsString,
    totalCakeInVault: totalCakeInVaultAsString,
    estimatedCakeBountyReward: estimatedCakeBountyRewardAsString,
    totalPendingCakeHarvest: totalPendingCakeHarvestAsString,
    fees: { performanceFee, callFee, withdrawalFee, withdrawalFeePeriod },
    userData: {
      isLoading,
      userShares: userSharesAsString,
      siriusAtLastUserAction: siriusAtLastUserActionAsString,
      lastDepositedTime,
      lastUserActionTime,
    },
  } = useSelector((state: State) => state.pools.siriusVault)

  const estimatedCakeBountyReward = useMemo(() => {
    return new BigNumber(estimatedCakeBountyRewardAsString)
  }, [estimatedCakeBountyRewardAsString])

  const totalPendingCakeHarvest = useMemo(() => {
    return new BigNumber(totalPendingCakeHarvestAsString)
  }, [totalPendingCakeHarvestAsString])

  const totalShares = useMemo(() => {
    return new BigNumber(totalSharesAsString)
  }, [totalSharesAsString])

  const pricePerFullShare = useMemo(() => {
    return new BigNumber(pricePerFullShareAsString)
  }, [pricePerFullShareAsString])

  const totalCakeInVault = useMemo(() => {
    return new BigNumber(totalCakeInVaultAsString)
  }, [totalCakeInVaultAsString])

  const userShares = useMemo(() => {
    return new BigNumber(userSharesAsString)
  }, [userSharesAsString])

  const siriusAtLastUserAction = useMemo(() => {
    return new BigNumber(siriusAtLastUserActionAsString)
  }, [siriusAtLastUserActionAsString])

  return {
    totalShares,
    pricePerFullShare,
    totalCakeInVault,
    estimatedCakeBountyReward,
    totalPendingCakeHarvest,
    fees: {
      performanceFee,
      callFee,
      withdrawalFee,
      withdrawalFeePeriod,
    },
    userData: {
      isLoading,
      userShares,
      siriusAtLastUserAction,
      lastDepositedTime,
      lastUserActionTime,
    },
  }
}

// Teams
export const usePriceWMaticUsdc = (): BigNumber => {
  const farm = useFarmFromPid(2)
  return farm.tokenPriceVsQuote ? new BigNumber(farm.quoteToken.usdcPrice):ZERO
}

export const usePriceSiriusUsdc = (): BigNumber => {
  const farm = useFarmFromPid(1)
  return farm.tokenPriceVsQuote ? new BigNumber(farm.token.usdcPrice):ZERO
}

// Block
export const useBlock = () => {
  return useSelector((state: State) => state.block)
}

export const useInitialBlock = () => {
  return useSelector((state: State) => state.block.initialBlock)
}


// Voting
export const useGetProposals = () => {
  const proposals = useSelector((state: State) => state.voting.proposals)
  return Object.values(proposals)
}

export const useGetProposal = (proposalId: string) => {
  const proposal = useSelector((state: State) => state.voting.proposals[proposalId])
  return proposal
}

export const useGetVotes = (proposalId: string) => {
  const votes = useSelector((state: State) => state.voting.votes[proposalId])
  return votes ? votes.filter((vote) => vote._inValid !== true) : []
}

export const useGetVotingStateLoadingStatus = () => {
  const votingStatus = useSelector((state: State) => state.voting.voteLoadingStatus)
  return votingStatus
}

export const useGetProposalLoadingStatus = () => {
  const votingStatus = useSelector((state: State) => state.voting.proposalLoadingStatus)
  return votingStatus
}



export const useBuybackAmount = () : BigNumber => {
  let value = new BigNumber(0);
  const { data: vaultsLP } = useVaults()
  const wmaticPriceUsdc = usePriceWMaticUsdc()
  for(let i=0; i < vaultsLP.length; i++){
    if (vaultsLP[i].lpTotalInQuoteToken && vaultsLP[i].quoteToken.usdcPrice) {        
        const vault = vaultsLP[i]
        if(vault.isBurning)
        {
          const totalLiquidity =  new BigNumber(vault.lpTotalInQuoteToken).times(vault.quoteToken.usdcPrice)
          const rewardTokenPrice = new BigNumber(vault.rewardToken.usdcPrice)
          const rewardPerBlock = new BigNumber(vault.emission).times(new BigNumber(vault.emissionMultiplier)).div(BIG_TEN.pow(vault.rewardToken.decimals))
          const masterLiquidity = new BigNumber(vault.quoteTokenAmountMc).times(vault.quoteToken.usdcPrice) // totalLiquidity.times(new BigNumber(vault.lpTokenBalanceMasterChef)).div(new BigNumber(vault.lpTotalSupply))
          const maticPerDay = new BigNumber(43200).times(new BigNumber(vault.rewardEmission)).times(vault.poolWeight).times(new BigNumber(vault.emissionMultiplier)).div(BIG_TEN.pow(18))
          const maticPerDayUsdc=vault.rewarder? new BigNumber(maticPerDay).times(wmaticPriceUsdc) : BIG_ZERO
          const { siriusRewardsApr} = getVaultApr(new BigNumber(vault.poolWeight), rewardTokenPrice, totalLiquidity, vault.lpAddresses[ChainId.MAINNET], rewardPerBlock, vault.lpRewardsApr, maticPerDayUsdc)
  
          const factor = new BigNumber(80);
          const buyback = masterLiquidity.times(siriusRewardsApr).times(factor).div(new BigNumber(3650000));
          value = value.plus(buyback);
        }
        
      }
      if(!vaultsLP[i].lpTotalInQuoteToken || !vaultsLP[i].quoteToken.usdcPrice)
      {
        return undefined
      }
  }
  return value
}

export const useTotalFarmValue = (): BigNumber => {
  const { data: farmsLP } = useFarms()
  let value = new BigNumber(0);
  for(let i=0; i < farmsLP.length; i++){
    if (farmsLP[i].lpTotalInQuoteToken && farmsLP[i].quoteToken.usdcPrice) {
      const totalLiquidity = new BigNumber(farmsLP[i].lpTotalInQuoteToken).times(farmsLP[i].quoteToken.usdcPrice);
      value = value.plus(totalLiquidity);
    }
    if(!farmsLP[i].lpTotalInQuoteToken || !farmsLP[i].quoteToken.usdcPrice)
    {
      return undefined
    }
  }
  return value
} 

export const useUserTotalFarmValue = (): BigNumber => {
  const { data: farmsLP, userDataLoaded: isLoaded } = useFarms()
  if(!isLoaded)
  {
    return undefined
  }
  let value = new BigNumber(0);
  for(let i=0; i < farmsLP.length; i++){
    if(farmsLP[i].pid !== 2)
    {
      if (farmsLP[i].lpTotalInQuoteToken && farmsLP[i].userData.stakedBalance && farmsLP[i].quoteToken.usdcPrice && farmsLP[i].lpTokenBalanceMC) {
        const totalLiquidity = new BigNumber(farmsLP[i].lpTotalInQuoteToken).times(farmsLP[i].quoteToken.usdcPrice).times(farmsLP[i].userData.stakedBalance).div(farmsLP[i].lpTokenBalanceMC);
        value = value.plus(totalLiquidity);
      }
      if(!farmsLP[i].lpTotalInQuoteToken || !farmsLP[i].quoteToken.usdcPrice || !farmsLP[i].lpTokenBalanceMC || !farmsLP[i].userData.stakedBalance)
      {
        return undefined
      }
    }
  }
  return value
} 

export const useTotalVaultValue = (): BigNumber => {
  const { data: vaultsLP } = useVaults()
  let value = new BigNumber(0);
  for(let i=0; i < vaultsLP.length; i++){
    const vault = vaultsLP[i]
    if((!vault.lpTotalInQuoteToken || !vault.quoteToken.usdcPrice) && vault.lpSymbol !== "SIRIUS")
    {
      return undefined;
    }
    if (vault.lpTotalInQuoteToken && vault.quoteToken.usdcPrice && vault.lpSymbol !== "SIRIUS") {
        const totalLiquidity = new BigNumber(vault.quoteTokenAmountMc).times(vault.quoteToken.usdcPrice);
        value = value.plus(totalLiquidity);
    }
      
  }
  return value
} 

export const useTotalVaultValue2 = (): BigNumber => {
  const { data: vaultsLP } = useVaults()

  let value = BIG_ZERO;
  for(let i=0; i < vaultsLP.length; i++){
      const vault = vaultsLP[i]
      if (vaultsLP[i].lpTotalInQuoteToken && vaultsLP[i].quoteToken.usdcPrice) {
          const masterLiquidity = new BigNumber(vault.quoteTokenAmountMc).times(vault.quoteToken.usdcPrice)
          value = value.plus(masterLiquidity);
      }
      if(!vaultsLP[i].lpTotalInQuoteToken || !vaultsLP[i].quoteToken.usdcPrice)
      {
        return undefined;
      }
  }
  return value
} 


export const useUserTotalVaultValue = (): BigNumber => {
  const { account } = useWeb3React()
  const { data: vaultsLP, userDataLoaded } = useVaults()
  const userDataReady = !account || (!!account && userDataLoaded)
  let vaultTotal = BIG_ZERO;
  if(userDataReady)
  {
    for (let i =0; i < vaultsLP.length; i++ )
    {
      const vault = vaultsLP[i]
      if (vaultsLP[i].lpTotalInQuoteToken && vaultsLP[i].quoteToken.usdcPrice && vault.platform !== 'Polysky') {
          const masterLiquidity = new BigNumber(vault.quoteTokenAmountMc).times(vault.quoteToken.usdcPrice)
          vaultTotal = vaultTotal.plus(masterLiquidity);
      }
      if(!vaultsLP[i].lpTotalInQuoteToken || !vaultsLP[i].quoteToken.usdcPrice)
      {
        return undefined;
      }
    }
  }
  return userDataReady? vaultTotal: undefined
} 



export const useTotalPoolValue = (): BigNumber => {
  const { pools: poolsLP } = usePools2()
  if(!poolsLP)
  {
    return undefined
  }
  let value = new BigNumber(0);
  for(let i=0; i < poolsLP.length; i++){

    let val = BIG_ZERO;
    if(poolsLP[i].totalStaked && poolsLP[i].stakingTokenPrice) {
      val = new BigNumber(poolsLP[i].totalStaked).times(new BigNumber(poolsLP[i].stakingTokenPrice)).div(BIG_TEN.pow(poolsLP[i].stakingToken.decimals));
    }
    if(!poolsLP[i].totalStaked || !poolsLP[i].stakingTokenPrice)
    {
       return undefined;
    }
    value = value.plus(val);
  } 
  return value;
}

export const useUserTotalPoolValue = (): BigNumber => {
 // const { account } = useWeb3React() 
  const { pools: poolsLP, userDataLoaded : isLoaded } = usePools2()// account)
  if(!isLoaded) // || account === undefined)
  {
    return undefined
  }

  let value = new BigNumber(0);
  for(let i=0; i < poolsLP.length; i++){

    let val = BIG_ZERO;
    if(poolsLP[i].stakingTokenPrice && poolsLP[i].userData.stakedBalance) {
      val = new BigNumber(poolsLP[i].userData.stakedBalance).times(new BigNumber(poolsLP[i].stakingTokenPrice)).div(BIG_TEN.pow(poolsLP[i].stakingToken.decimals));
    }
    if(!poolsLP[i].userData.stakedBalance || !poolsLP[i].stakingTokenPrice)
    {
       return undefined;
    }
    value = value.plus(val);
  } 
  return value;
}
