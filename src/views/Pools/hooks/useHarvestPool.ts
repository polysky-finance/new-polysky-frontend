import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { updateUserBalance, updateUserPendingReward } from 'state/actions'
import { harvestFarm } from 'utils/calls'
import { BIG_ZERO } from 'utils/bigNumber'
import { useMasterchef, useSousChef } from 'hooks/useContract'
import { DEFAULT_GAS_LIMIT } from 'config'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

const harvestPool = async (sousChefContract) => {
  const tx = await sousChefContract.deposit('0', options)
  const receipt = await tx.wait()
  return receipt.status
}

const harvestPoolBnb = async (sousChefContract) => {
  const tx = await sousChefContract.deposit({ ...options, value: BIG_ZERO })
  const receipt = await tx.wait()
  return receipt.status
}

const useHarvestPool = (sousId, isUsingBnb = false) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const sousChefContract = useMasterchef() // useSousChef(sousId)
  const masterChefContract = useMasterchef()

  const handleHarvest = useCallback(async () => {
//    if (sousId === 0) {
      await harvestFarm(masterChefContract, sousId)
/*    } else if (isUsingBnb) {
      await harvestPoolBnb(sousChefContract)
    } else {
      await harvestPool(sousChefContract)
    } */
    dispatch(updateUserPendingReward(sousId, account))
    dispatch(updateUserBalance(sousId, account))
  }, [account, dispatch,  masterChefContract,  sousId])

  return { onReward: handleHarvest }
}

export default useHarvestPool
