import BigNumber from 'bignumber.js'
import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL } from 'config'
import {estimateGas} from 'utils/calls/estimateGas'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

export const stakeVault = async (vaultChefContract, pid, amount) => {
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  
  const opts = {
	  gasLimit: estimateGas(vaultChefContract, 'deposit', [pid, value, options],30000),
  }
  
  const tx = await vaultChefContract.deposit(pid, value, opts)
  const receipt = await tx.wait()
  return receipt.status
}

export const unstakeVault = async (vaultChefContract, pid, amount) => {
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  const opts = {
	  gasLimit: estimateGas(vaultChefContract, 'withdraw', [pid, value, options],30000),
  }
  const tx = await vaultChefContract.withdraw(pid, value, opts)
  const receipt = await tx.wait()
  return receipt.status
}
