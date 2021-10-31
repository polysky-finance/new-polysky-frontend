import { useCallback } from 'react'
import { ethers, Contract } from 'ethers'
import { useVaultChef } from 'hooks/useContract'

const useApproveVault = (lpContract: Contract) => {
  const vaultChefContract = useVaultChef()
  const handleApprove = useCallback(async () => {
    try {
      const tx = await lpContract.approve(vaultChefContract.address, ethers.constants.MaxUint256)
      const receipt = await tx.wait()
      return receipt.status
    } catch (e) {
      return false
    }
  }, [lpContract, vaultChefContract])

  return { onApprove: handleApprove }
}

export default useApproveVault
