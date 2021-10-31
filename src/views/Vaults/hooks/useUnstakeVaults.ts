import { useCallback } from 'react'
import { unstakeVault } from 'utils/calls'
import { useVaultChef } from 'hooks/useContract'

const useUnstakeVaults = (pid: number) => {
  const vaultChefContract = useVaultChef()

  const handleUnstake = useCallback(
    async (amount: string) => {
      await unstakeVault(vaultChefContract, pid, amount)
    },
    [vaultChefContract, pid],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstakeVaults
