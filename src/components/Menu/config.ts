import { MenuEntry } from '@polysky-libs/uikit'
import { ContextApi } from 'contexts/Localization/types'

const config: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: t('Home'),
    icon: 'HomeIcon',
    href: '/',
  },
	{
    label: t('Vaults '),
    icon: 'VaultsIcon',
    href: '/vaults',
  },
 
  {
    label: t('Trade'),
    icon: 'TradeIcon',
    items: [
      {
        label: t('Exchange (Quickswap)'),
        href: 'https://quickswap.exchange/#/swap?outputCurrency=0xB1289f48E8d8Ad1532e83A8961f6E8b5a134661D',
      },
      {
        label: t('Liquidity (Quickswap)'),
        href: 'https://quickswap.exchange/#/add/ETH/0xb1289f48e8d8ad1532e83a8961f6e8b5a134661d',
      },
      {
        label: t('Exchange (Apeswap)'),
        href: 'https://app.apeswap.finance/swap?inputCurrency=ETH&outputCurrency=0xB1289f48E8d8Ad1532e83A8961f6E8b5a134661D',
      },
      {
        label: t('Liquidity (Apeswap)'),
        href: 'https://app.apeswap.finance/add/ETH/0xB1289f48E8d8Ad1532e83A8961f6E8b5a134661D',
      },
    ],
  },
  {
    label: t('Farms'),
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: t('Pools'),
    icon: 'PoolIcon',
    href: '/pools',
  },
  
  {
    label: t('Charts'),
    icon: 'InfoIcon',
    items: [
      {
        label: t('Quickchart chart'),
        href: 'https://quickchart.app/token/0xb1289f48e8d8ad1532e83a8961f6e8b5a134661d?pairedWith=WMATIC',
      },
      {
        label: t('Poocoin chart'),
        href: 'https://polygon.poocoin.app/tokens/0xb1289f48e8d8ad1532e83a8961f6e8b5a134661d',
      },
      {
        label: t('Dexguru chart'),
        href: 'https://dex.guru/token/0xb1289f48e8d8ad1532e83a8961f6e8b5a134661d-polygon',
      },
	  {
        label: t('Nomics chart'),
        href: 'https://nomics.com/assets/SIRIUS-Sirius',
      },
    ],
  },
  
  {
    label: t('More'),
    icon: 'MoreIcon',
    items: [
      
      {
        label: t('Github'),
        href: 'https://github.com/polysky-finance/polysky-contracts',
      },
      {
        label: t('Docs'),
        href: "https://Polysky-finance.gitbook.io/",
      },
      {
        label: t('Polygon explorer'),
        href: 'https://polygonscan.com/token/0xb1289f48e8d8ad1532e83a8961f6e8b5a134661d',
      },
	  {
        label: t('vfat tools'),
        href: 'https://vfat.tools/polygon/polysky/',
      },
    ],
  },

];


export default config
