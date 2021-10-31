import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'Polysky',
  description:
    'Secure, decentralized hybrid-yield aggregator that auto-compounds crypto assets',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  switch (path) {
    case '/':
      return {
        title: `${t('Home')} | ${t('Polysky')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('Polysky')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('Polysky')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('Polysky')}`,
      }
	case '/vaults':
      return {
        title: `${t('Vaults')} | ${t('Polysky')}`,
      }
    default:
      return null
  }
}
