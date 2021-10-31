import BigNumber from 'bignumber.js'
import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL } from 'config'
import {estimateGas} from 'utils/calls/estimateGas'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

export const stakeFarm = async (masterChefContract, pid, amount) => {
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  
  const opts = {
	  gasLimit: estimateGas(masterChefContract, 'deposit', [pid, value, options],30000),
  }
  
  const tx = await masterChefContract.deposit(pid, value, opts)
  const receipt = await tx.wait()
  return receipt.status
}

export const unstakeFarm = async (masterChefContract, pid, amount) => {
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  
  const opts = {
	  gasLimit: estimateGas(masterChefContract, 'withdraw', [pid, value, options],30000),
  }
  
  const tx = await masterChefContract.withdraw(pid, value, opts)
  const receipt = await tx.wait()
  return receipt.status
}

export const harvestFarm = async (masterChefContract, pid) => {
  const opts = {
	  gasLimit: estimateGas(masterChefContract, 'deposit', [pid, '0', options],30000),
  }
  
  const tx = await masterChefContract.deposit(pid, '0', opts)
  const receipt = await tx.wait()
  return receipt.status
}
