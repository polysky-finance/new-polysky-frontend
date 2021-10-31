import { useCallback } from 'react'
import { stakeVault } from 'utils/calls'
import { useVaultChef } from 'hooks/useContract'

const useStakeVaults = (pid: number) => {
  const vaultChefContract = useVaultChef()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stakeVault(vaultChefContract, pid, amount)
      console.info(txHash)
    },
    [vaultChefContract, pid],
  )

  return { onStake: handleStake }
}

export default useStakeVaults
