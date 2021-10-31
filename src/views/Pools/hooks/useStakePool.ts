import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { updateUserStakedBalance, updateUserBalance } from 'state/actions'
import { stakeFarm } from 'utils/calls'
import BigNumber from 'bignumber.js'
import { DEFAULT_TOKEN_DECIMAL, DEFAULT_GAS_LIMIT } from 'config'
import { BIG_TEN } from 'utils/bigNumber'
import { useSousChef } from 'hooks/useContract'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

const sousStake = async (sousId, sousChefContract, amount, decimals = 18) => {
  const tx = await sousChefContract.deposit(sousId, new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString(), options)
  const receipt = await tx.wait()
  return receipt.status
}

const sousStakeBnb = async (sousId, sousChefContract, amount) => {
  const tx = await sousChefContract.deposit(sousId, new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString(), options)
  const receipt = await tx.wait()
  return receipt.status
}

const useStakePool = (sousId: number, isUsingBnb = false) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const sousChefContract = useSousChef(sousId)

  const handleStake = useCallback(
    async (amount: string, decimals: number) => {
	  if (isUsingBnb) {
        await sousStakeBnb(sousId, sousChefContract, amount)
      } else {
        await sousStake(sousId, sousChefContract, amount, decimals)
      }
      dispatch(updateUserStakedBalance(sousId, account))
      dispatch(updateUserBalance(sousId, account))
    },
    [account, dispatch, isUsingBnb, sousChefContract, sousId],
  )

  return { onStake: handleStake }
}

export default useStakePool
