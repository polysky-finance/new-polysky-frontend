import { ChainId, Token } from '@polysky-libs/sdk'

export const SIRIUS: { [chainId: number]: Token } = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '0xb1289f48e8d8ad1532e83a8961f6e8b5a134661d',
    18,
    'SIRIUS',
    'Polysky Token',
  ),
  [ChainId.TESTNET]: new Token(
    ChainId.TESTNET,
    '0xa7f7c08f253c83852ff88c25f6ec9f34ae8ca683',
    18,
    'SIRIUS',
    'Polysky Token',
  ),
}

export const WMATIC = new Token(ChainId.MAINNET, '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270', 18, 'WMATIC', 'Wrapped Matic')
export const DAI = new Token(ChainId.MAINNET, '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063', 18, 'DAI', 'Dai Stablecoin')
export const USDT = new Token(ChainId.MAINNET, '0xc2132d05d31c914a87c6611c10748aeb04b58e8f', 6, 'USDT', 'Tether USD')

export const WETH = new Token(
  ChainId.MAINNET,
  '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
  18,
  'WETH',
  'Wrapped Ether',
)

const tokens = {
  matic: {
    symbol: 'MATIC',
    projectLink: 'https://polygon.technology/',
  },
  sirius: {
    symbol: 'SIRIUS',
    address: {
      137: '0xb1289f48e8d8ad1532e83a8961f6e8b5a134661d',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://polysky.finance/',
  },
	fish: {
    symbol: 'FISH',
    address: {
      137: '0x3a3df212b7aa91aa0402b9035b098891d276572b',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://polycat.finance/',
  },
  wmatic: {
    symbol: 'WMATIC',
    address: {
      137: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://polygon.technology/',
  },
  usdc: {
    symbol: 'USDC',
    address: {
      137: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
      80001: '',
    },
    decimals: 6,
    projectLink: 'https://www.centre.io/',
  },
  usdt: {
    symbol: 'USDT',
    address: {
      137: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
      80001: '',
    },
    decimals: 6,
    projectLink: 'https://tether.to/',
  },
  banana: {
    symbol: 'BANANA',
    address: {
      137: '0x5d47baba0d66083c52009271faf3f50dcc01023c',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://app.apeswap.finance/',
  },
  weth: {
    symbol: 'WETH',
    address: {
      137: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://ethereum.org/en/',
  },
  wbtc: {
    symbol: 'WBTC',
    address: {
      137: '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6',
      80001: '',
    },
    decimals: 8,
    projectLink: 'https://bitcoin.org/en/',
  },
  sushi: {
    symbol: 'SUSHI',
    address: {
      137: '0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://app.sushi.com/',
  },
  quick: {
    symbol: 'QUICK',
    address: {
      137: '0x831753dd7087cac61ab5644b308642cc1c33dc13',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://quickswap.exchange/',
  },
  dai: {
    symbol: 'DAI',
    address: {
      137: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://makerdao.com/en/',
  },
  dfyn: {
    symbol: 'DFYN',
    address: {
      137: '0xc168e40227e4ebd8c1cae80f7a55a4f0e6d66c97',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://exchange.dfyn.network/',
  },
  link: {
    symbol: 'LINK',
    address: {
      137: '0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://exchange.dfyn.network/',
  },
    bnb: {
    symbol: 'BNB',
    address: {
      137: '0xa649325aa7c5093d12d6f98eb4378deae68ce23f',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://binance.com/',
  },
  give: {
    symbol: 'GIVE',
    address: {
      137: '0x9bbcda2606e616659b118399a2823e8a392f55da',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://bcharityecssen.netlify.app/',
  },
  paws: {
    symbol: 'PAWS',
    address: {
      137: '0x6971aca589bbd367516d70c3d210e4906b090c96',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://polycat.finance/',
  },
  pdoge: {
    symbol: 'POLYDOGE',
    address: {
      137: '0x8a953cfe442c5e8855cc6c61b1293fa648bae472',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://www.polydoge.com/',
  },
  kogecoin: {
    symbol: 'KOGECOIN',
    address: {
      137: '0x13748d548d95d78a3c83fe3f32604b4796cffa23',
      80001: '',
    },
    decimals: 9,
    projectLink: 'https://kogefarm.io/',
  },
  mai: {
    symbol: 'MAI',
    address: {
      137: '0xa3fa99a148fa48d14ed51d610c367c61876997f1',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://app.mai.finance/farm',
  },
  qi: {
    symbol: 'QI',
    address: {
      137: '0x580a84c73811e1839f75d86d75d88cca0c241ff4',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://app.mai.finance/farm',
  },
  avax: {
    symbol: 'AVAX',
    address: {
      137: '0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://www.avax.network/',
  },
  uni: {
    symbol: 'UNI',
    address: {
      137: '0xb33eaad8d922b1083446dc23f610c2567fb5180f',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://uniswap.org/',
  },
  sol: {
    symbol: 'SOL',
    address: {
      137: '0x7dff46370e9ea5f0bad3c4e29711ad50062ea7a4',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://solana.com/',
  },
  aave: {
    symbol: 'AAVE',
    address: {
      137: '0xd6df932a45c0f255f85145f286ea0b292b21c90b',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://aave.com/',
  },
  ftm: {
    symbol: 'FTM',
    address: {
      137: '0xb85517b87bf64942adf3a0b9e4c71e4bc5caa4e5',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://fantom.foundation',
  },
  pbrew: {
    symbol: 'pBREW',
    address: {
      137: '0xb5106a3277718ecad2f20ab6b86ce0fee7a21f09',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://polygon.cafeswap.finance/',
  },
  brew: {
    symbol: 'BREW',
    address: {
      137: '0xa0b20decbc557e3f68e140ed5a0c69bc865f865a',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://polygon.cafeswap.finance/',
  },
  ust: {
    symbol: 'UST',
    address: {
      137: '0x692597b009d13c4049a947cab2239b7d6517875f',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://www.terra.money/',
  },
  bifi: {
    symbol: 'BIFI',
    address: {
      137: '0xfbdd194376de19a88118e84e279b977f165d01b8',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://www.beefy.finance/',
  },
}

export default tokens
