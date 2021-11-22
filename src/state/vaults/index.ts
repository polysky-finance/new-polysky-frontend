/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import vaultsConfig from 'config/constants/vaults'
import farmsConfig from 'config/constants/farms'
import priceHelperLpsConfig from 'config/constants/priceHelperLps'
import fetchFarms from 'state/farms/fetchFarms'
import fetchVaults from './fetchVaults'
import fetchVaultsPrices from './fetchVaultsPrices'
import {
  fetchVaultUserAllowances,
  fetchVaultUserTokenBalances,
  fetchVaultUserStakedBalances,
  fetchVaultUserCurrentBalances
} from './fetchVaultUser'
import { VaultsState, Vault } from '../types'


const noAccountVaultConfig = vaultsConfig.map((vault) => ({
  ...vault,
  userData: {
    allowance: '0',
    tokenBalance: '0',
    stakedBalance: '0',
    currentBalance: '0',
  },
}))

const initialState: VaultsState = { data: noAccountVaultConfig, loadArchivedVaultsData: false, userDataLoaded: false }

export const nonArchivedVaults = vaultsConfig.filter(({ pid }) => true)

// Async thunks
export const fetchVaultsPublicDataAsync = createAsyncThunk<Vault[], number[]>(
  'vaults/fetchVaultsPublicDataAsync',
  async (pids) => {
    const vaultsToFetch = vaultsConfig.filter((vaultConfig) => pids.includes(vaultConfig.pid))

    const vaults = await fetchVaults(vaultsToFetch)
    const farms = await fetchFarms(farmsConfig.concat(priceHelperLpsConfig))
    const vaultsWithPrices = await fetchVaultsPrices(vaults, farms)
    return vaultsWithPrices
  },
)

interface VaultUserDataResponse {
  pid: number
  allowance: string
  tokenBalance: string
  stakedBalance: string
  currentBalance: string
}

export const fetchVaultUserDataAsync = createAsyncThunk<VaultUserDataResponse[], { account: string; pids: number[] }>(
  'vaults/fetchVaultUserDataAsync',
  async ({ account, pids }) => {
    const vaultsToFetch = vaultsConfig.filter((vaultConfig) => pids.includes(vaultConfig.pid))
    const userVaultAllowances = await fetchVaultUserAllowances(account, vaultsToFetch)
    const userVaultTokenBalances = await fetchVaultUserTokenBalances(account, vaultsToFetch)
    const userStakedBalances = await fetchVaultUserStakedBalances(account, vaultsToFetch)
    const userCurrentBalances = await fetchVaultUserCurrentBalances(account, vaultsToFetch)

    return userVaultAllowances.map((vaultAllowance, index) => {
      return {
        pid: vaultsToFetch[index].pid,
        allowance: userVaultAllowances[index],
        tokenBalance: userVaultTokenBalances[index],
        stakedBalance: userStakedBalances[index],
        currentBalance: userCurrentBalances[index],
      }
    })
  },
)

export const vaultsSlice = createSlice({
  name: 'Vaults',
  initialState,
  reducers: {
    setLoadArchivedVaultsData: (state, action) => {
      const loadArchivedVaultsData = action.payload
      state.loadArchivedVaultsData = loadArchivedVaultsData
    },
  },
  extraReducers: (builder) => {
    // Update vaults with live data
    builder.addCase(fetchVaultsPublicDataAsync.fulfilled, (state, action) => {
      state.data = state.data.map((vault) => {
        const liveVaultData = action.payload.find((vaultData) => vaultData.pid === vault.pid)
        return { ...vault, ...liveVaultData }
      })
    })

    // Update vaults with user data
    builder.addCase(fetchVaultUserDataAsync.fulfilled, (state, action) => {
      action.payload.forEach((userDataEl) => {
        const { pid } = userDataEl
        const index = state.data.findIndex((vault) => vault.pid === pid)
        state.data[index] = { ...state.data[index], userData: userDataEl }
      })
      state.userDataLoaded = true
    })
  },
})

// Actions
export const { setLoadArchivedVaultsData } = vaultsSlice.actions

export default vaultsSlice.reducer
