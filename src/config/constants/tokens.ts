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
  aave: {
    symbol: 'AAVE',
    address: {
      137: '0xd6df932a45c0f255f85145f286ea0b292b21c90b',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://aave.com',
  },
  addy: {
    symbol: 'ADDY',
    address: {
      137: '0xc3fdbadc7c795ef1d6ba111e06ff8f16a20ea539',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://adamant.finance/',
  },
  ads: {
    symbol: 'ADS',
    address: {
      137: '0x598e49f01befeb1753737934a5b11fea9119c796',
      80001: '',
    },
    decimals: 11,
    projectLink: 'https://adshares.net/',
  },
  akt: {
    symbol: 'AKT',
    address: {
      137: '0xf14fbc6b30e2c4bc05a1d4fbe34bf9f14313309d',
      80001: '',
    },
    decimals: 6,
    projectLink: 'https://akash.network/token/',
  },
  aln: {
    symbol: 'ALN',
    address: {
      137: '0xa8fcee762642f156b5d757b6fabc36e06b6d4a1a',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://aluna.social/token /',
  },
  alpha: {
    symbol: 'ALPHA',
    address: {
      137: '0x0b048d6e01a6b9002c291060bf2179938fd8264c',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://polyalpha.finance/',
  },
  angel: {
    symbol: 'ANGEL',
    address: {
      137: '0x0b6afe834dab840335f87d99b45c2a4bd81a93c7',
      80001: '',
    },
    decimals: 18,
    projectLink: '',
  },
  anrx: {
    symbol: 'ANRX',
    address: {
      137: '0x554f074d9ccda8f483d1812d4874cbebd682644e',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://anrkeyx.io/',
  },
  arpa: {
    symbol: 'ARPA',
    address: {
      137: '0xee800b277a96b0f490a1a732e1d6395fad960a26',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://arpachain.io/',
  },
  atom: {
    symbol: 'ATOM',
    address: {
      137: '0xac51c4c48dc3116487ed4bc16542e27b5694da1b',
      80001: '',
    },
    decimals: 6,
    projectLink: 'https://cosmos.network/',
  },
  avax: {
    symbol: 'AVAX',
    address: {
      137: '0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://www.avax-projects.com/',
  },
  axs: {
    symbol: 'AXS',
    address: {
      137: '0x61bdd9c7d4df4bf47a4508c0c8245505f2af5b7b',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://axieinfinity.com/axs/',
  },
  ball: {
    symbol: 'BALL',
    address: {
      137: '0x883abe4168705d2e5da925d28538b7a6aa9d8419',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://ball.polypup.finance/',
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
  bel: {
    symbol: 'BEL',
    address: {
      137: '0x28c388fb1f4fa9f9eb445f0579666849ee5eeb42',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://bella.fi/',
  },
  beta: {
    symbol: 'BETA',
    address: {
      137: '0xac3090b7042fca2cdbf233022e4a9823a032600c',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://polybeta.finance/',
  },
  bifi: {
    symbol: 'BIFI',
    address: {
      137: '0xfbdd194376de19a88118e84e279b977f165d01b8',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://polygon.beefy.finance/',
  },
  bnb: {
    symbol: 'BNB',
    address: {
      137: '0xa649325aa7c5093d12d6f98eb4378deae68ce23f',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://www.binance.org/en/',
  },
  bone: {
    symbol: 'BONE',
    address: {
      137: '0x6bb45ceac714c52342ef73ec663479da35934bf7',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://bone.polypup.finance/',
  },
  brew: {
    symbol: 'BREW',
    address: {
      137: '0xa0b20decbc557e3f68e140ed5a0c69bc865f865a',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://cafeswap.finance/',
  },
  cgg: {
    symbol: 'CGG',
    address: {
      137: '0x2ab4f9ac80f33071211729e45cfc346c1f8446d5',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://chainguardians.io/',
  },
  ciotx: {
    symbol: 'CIOTX',
    address: {
      137: '0x300211def2a644b036a9bdd3e58159bb2074d388',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://iotex.io/blog/ciotx-cross-chain-iotx/',
  },
  cntr: {
    symbol: 'CNTR',
    address: {
      137: '0xdae89da41a96956e9e70320ac9c0dd077070d3a5',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://cntr.finance/',
  },
  collar: {
    symbol: 'COLLAR',
    address: {
      137: '0x8df26a1bd9bd98e2ec506fc9d8009954716a05dc',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://polypup.finance/',
  },
  combo: {
    symbol: 'COMBO',
    address: {
      137: '0x6ddb31002abc64e1479fc439692f7ea061e78165',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://furucombo.app/',
  },
  cosmic: {
    symbol: 'COSMIC',
    address: {
      137: '0xa5eb60ca85898f8b26e18ff7c7e43623ccba772c',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://cosmicswap.finance/',
  },
  crv: {
    symbol: 'CRV',
    address: {
      137: '0x172370d5cd63279efa6d502dab29171933a610af',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://www.curve.fi/',
  },
  crystl: {
    symbol: 'CRYSTL',
    address: {
      137: '0x76bf0c28e604cc3fe9967c83b3c3f31c213cfe64',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://www.polycrystal.finance/',
  },
  d11: {
    symbol: 'D11',
    address: {
      137: '0xc58158c14d4757ef36ce25e493758f2fceedec5d',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://defieleven.com/',
  },
  dai: {
    symbol: 'DAI',
    address: {
      137: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://makerdao.com/',
  },
  des: {
    symbol: 'DES',
    address: {
      137: '0xa062fc09ca6bdeb2f6e3b77e1d4e09c42c964742',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://despace.io/',
  },
  dfyn: {
    symbol: 'DFYN',
    address: {
      137: '0xc168e40227e4ebd8c1cae80f7a55a4f0e6d66c97',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://dfyn.network/',
  },
  dg: {
    symbol: 'DG',
    address: {
      137: '0x2a93172c8dccbfbc60a39d56183b7279a2f647b4',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://decentral.games/',
  },
  dht: {
    symbol: 'DHT',
    address: {
      137: '0x8c92e38eca8210f4fcbf17f0951b198dd7668292',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://www.dhedge.org/',
  },
  dhv: {
    symbol: 'DHV',
    address: {
      137: '0x5fcb9de282af6122ce3518cde28b7089c9f97b26',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://dehive.finance/',
  },
  dino: {
    symbol: 'DINO',
    address: {
      137: '0xaa9654becca45b5bdfa5ac646c939c62b527d394',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://dinoswap.exchange/',
  },
  dnxc: {
    symbol: 'DNXC',
    address: {
      137: '0xcaf5191fc480f43e4df80106c7695eca56e48b18',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://dinox.io/',
  },
  dogira: {
    symbol: 'DOGIRA',
    address: {
      137: '0xdda40cdfe4a0090f42ff49f264a831402adb801a',
      80001: '',
    },
    decimals: 9,
    projectLink: 'https://dogira.net/',
  },
  dpi: {
    symbol: 'DPI',
    address: {
      137: '0x85955046df4668e1dd369d2de9f3aeb98dd2a369',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://www.indexcoop.com/',
  },
  dtop: {
    symbol: 'dTOP',
    address: {
      137: '0x0361bdeab89df6bbcc52c43589fabba5143d19dd',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://www.dhedge.org/',
  },
  egg: {
    symbol: 'EGG',
    address: {
      137: '0x245e5ddb65efea6522fa913229df1f4957fb2e21',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://app.loserchick.fi/',
  },
  ele: {
    symbol: 'ELE',
    address: {
      137: '0xacd7b3d9c10e97d0efa418903c0c7669e702e4c0',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://eleven.finance/#/',
  },
  elet: {
    symbol: 'ELET',
    address: {
      137: '0x07738eb4ce8932ca961c815cb12c9d4ab5bd0da4',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://tcg.etherlegends.com/',
  },
  elk: {
    symbol: 'ELK',
    address: {
      137: '0xe1c110e1b1b4a1ded0caf3e42bfbdbb7b5d7ce1c',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://elk.finance/',
  },
  elon: {
    symbol: 'ELON',
    address: {
      137: '0xe0339c80ffde91f3e20494df88d4206d86024cdf',
      80001: '',
    },
    decimals: 18,
    projectLink: 'http://dogelonmars.com/',
  },
  erowan: {
    symbol: 'EROWAN',
    address: {
      137: '0xa7051c5a22d963b81d71c2ba64d46a877fbc1821',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://sifchain.finance/',
  },
  etha: {
    symbol: 'ETHA',
    address: {
      137: '0x59e9261255644c411afdd00bd89162d09d862e38',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://ethalend.org/',
  },
  ez: {
    symbol: 'EZ',
    address: {
      137: '0x34c1b299a74588d6abdc1b85a53345a48428a521',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://easyfi.network/index.html/',
  },
  fear: {
    symbol: 'FEAR',
    address: {
      137: '0xa2ca40dbe72028d3ac78b5250a8cb8c404e7fb8c',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://www.fear.io/',
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
  for: {
    symbol: 'FOR',
    address: {
      137: '0x546b4c391520e6652897c65153074088bfc0a909',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://www.theforceprotocol.com/',
  },
  fox: {
    symbol: 'FOX',
    address: {
      137: '0x65a05db8322701724c197af82c9cae41195b0aa8',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://shapeshift.com/',
  },
  frax: {
    symbol: 'FRAX',
    address: {
      137: '0x104592a158490a9228070e0a8e5343b499e125d0',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://frax.finance/',
  },
  ftm: {
    symbol: 'FTM',
    address: {
      137: '0xb85517b87bf64942adf3a0b9e4c71e4bc5caa4e5',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://fantom.foundation/',
  },
  fxs: {
    symbol: 'FXS',
    address: {
      137: '0x3e121107f6f22da4911079845a470757af4e1a1b',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://frax.finance/',
  },
  gamee: {
    symbol: 'GAMEE',
    address: {
      137: '0xcf32822ff397ef82425153a9dcb726e5ff61dca7',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://token.gamee.com/',
  },
  gbnt: {
    symbol: 'GBNT',
    address: {
      137: '0x8c9aaca6e712e2193acccbac1a024e09fb226e51',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://gamma.polypulsar.farm/',
  },
  genx: {
    symbol: 'GENX',
    address: {
      137: '0x3ecdeb8fc5023839b92b0c293d049d61069e02b1',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://evodefi.com/',
  },
  gfi: {
    symbol: 'GFI',
    address: {
      137: '0x874e178a2f3f3f9d34db862453cd756e7eab0381',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://gravityfinance.io/',
  },
  ghst: {
    symbol: 'GHST',
    address: {
      137: '0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://www.aavegotchi.com/',
  },
  gns: {
    symbol: 'GNS',
    address: {
      137: '0xe5417af564e4bfda1c483642db72007871397896',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://gains.trade/',
  },
  gpul: {
    symbol: 'GPUL',
    address: {
      137: '0x40ed0565ecfb14ebcdfe972624ff2364933a8ce3',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://gamma.polypulsar.farm/',
  },
  grt: {
    symbol: 'GRT',
    address: {
      137: '0x5fe2b58c013d7601147dcdd68c143a77499f5531',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://thegraph.com/',
  },
  guard: {
    symbol: 'GUARD',
    address: {
      137: '0x948d2a81086a075b3130bac19e4c6dee1d2e3fe8',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://www.helmet.insure/',
  },
  hair: {
    symbol: 'HAIR',
    address: {
      137: '0x100a947f51fa3f1dcdf97f3ae507a72603cae63c',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://barbershop.finance/',
  },
  honor: {
    symbol: 'HONOR',
    address: {
      137: '0xb82a20b4522680951f11c94c54b8800c1c237693',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://polygon.farmhero.io/',
  },
  hope: {
    symbol: 'HOPE',
    address: {
      137: '0xd78c475133731cd54dadcb430f7aae4f03c1e660',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://firebird.finance/',
  },
  ibbtc: {
    symbol: 'ibBTC',
    address: {
      137: '0x4eac4c4e9050464067d673102f8e24b2fcceb350',
      80001: '',
    },
    decimals: 18,
    projectLink: '',
  },
  ice: {
    symbol: 'ICE',
    address: {
      137: '0x4a81f8796e0c6ad4877a51c86693b0de8093f2ef',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://iron.finance/',
  },
  idle: {
    symbol: 'IDLE',
    address: {
      137: '0xc25351811983818c9fe6d8c580531819c8ade90f',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://idle.finance/#/',
  },
  imx: {
    symbol: 'IMX',
    address: {
      137: '0x60bb3d364b765c497c8ce50ae0ae3f0882c5bd05',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://impermax.finance/',
  },
  insur: {
    symbol: 'INSUR',
    address: {
      137: '0x8a0e8b4b0903929f47c3ea30973940d4a9702067',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://www.insurace.io/',
  },
  iris: {
    symbol: 'IRIS',
    address: {
      137: '0x3dc6052a693e4a2fc28eb2ea12fe0cfd3bd221d1',
      80001: '',
    },
    decimals: 6,
    projectLink: 'https://www.irisnet.org/',
  },
  iron: {
    symbol: 'IRON',
    address: {
      137: '0xd86b5923f3ad7b585ed81b448170ae026c65ae9a',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://iron.finance/',
  },
  jdi: {
    symbol: 'JDI',
    address: {
      137: '0x340fe1d898eccaad394e2ba0fc1f93d27c7b717a',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://www.jdiyield.com/',
  },
  jrt: {
    symbol: 'JRT',
    address: {
      137: '0x596ebe76e2db4470966ea395b0d063ac6197a8c5',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://jarvis.network/',
  },
  kavian_l2: {
    symbol: 'KAVIAN-L2',
    address: {
      137: '0x9a33bac266b02faff8fa566c8cb5da08820e28ba',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://kavian.finance/',
  },
  knight: {
    symbol: 'KNIGHT',
    address: {
      137: '0x4455ef8b4b4a007a93daa12de63a47eeac700d9d',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://www.forestknight.io/',
  },
  kogecoin: {
    symbol: 'KOGECOIN',
    address: {
      137: '0x13748d548d95d78a3c83fe3f32604b4796cffa23',
      80001: '',
    },
    decimals: 9,
    projectLink: 'https://kogecoin.io/',
  },
  kom: {
    symbol: 'KOM',
    address: {
      137: '0xc004e2318722ea2b15499d6375905d75ee5390b8',
      80001: '',
    },
    decimals: 8,
    projectLink: 'https://www.kommunitas.net/',
  },
  link: {
    symbol: 'LINK',
    address: {
      137: '0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://chain.link/',
  },
  mai: {
    symbol: 'MAI',
    address: {
      137: '0xa3fa99a148fa48d14ed51d610c367c61876997f1',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://www.mai.finance/',
  },
  mana: {
    symbol: 'MANA',
    address: {
      137: '0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://decentraland.org/',
  },
  mask: {
    symbol: 'MASK',
    address: {
      137: '0x2b9e7ccdf0f4e5b24757c1e1a80e311e34cb10c7',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://mask.io/',
  },
  mcash: {
    symbol: 'MCASH',
    address: {
      137: '0xa25610a77077390a75ad9072a084c5fbc7d43a0d',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://monsoon.finance/',
  },
  meeb: {
    symbol: 'MEEB',
    address: {
      137: '0x64afdf9e28946419e325d801fb3053d8b8ffdc23',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://www.meebmaster.com/',
  },
  mitx: {
    symbol: 'MITx',
    address: {
      137: '0x31042a4e66eda0d12143ffc8cc1552d611da4cba',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://www.morpheuslabs.io/',
  },
  mocha: {
    symbol: 'MOCHA',
    address: {
      137: '0xb01371072fdcb9b4433b855e16a682b461f94ab3',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://cafeswap.finance/',
  },
  mona: {
    symbol: 'MONA',
    address: {
      137: '0x6968105460f67c3bf751be7c15f92f5286fd0ce5',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://www.digitalax.xyz/homepage',
  },
  mooned: {
    symbol: 'MOONED',
    address: {
      137: '0x7e4c577ca35913af564ee2a24d882a4946ec492b',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://moonedge.finance/#/',
  },
  mvi: {
    symbol: 'MVI',
    address: {
      137: '0xfe712251173a2cd5f5be2b46bb528328ea3565e1',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://www.indexcoop.com/mvi',
  },
  nexo: {
    symbol: 'NEXO',
    address: {
      137: '0x41b3966b4ff7b427969ddf5da3627d6aeae9a48e',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://nexo.io/',
  },
  oddz: {
    symbol: 'ODDZ',
    address: {
      137: '0x4e830f67ec499e69930867f9017aeb5b3f629c73',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://www.oddz.fi/',
  },
  om: {
    symbol: 'OM',
    address: {
      137: '0xc3ec80343d2bae2f8e680fdadde7c17e71e114ea',
      80001: '',
    },
    decimals: 18,
    projectLink: 'http://mantradao.com/',
  },
  ooe: {
    symbol: 'OOE',
    address: {
      137: '0x9d5565da88e596730522cbc5a918d2a89dbc16d9',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://openocean.finance/',
  },
  orbs: {
    symbol: 'ORBS',
    address: {
      137: '0x614389eaae0a6821dc49062d56bda3d9d45fa2ff',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://www.orbs.com/',
  },
  pauto: {
    symbol: 'pAUTO',
    address: {
      137: '0x7f426f6dc648e50464a0392e60e1bb465a67e9cf',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://bridge.orbitchain.io/',
  },
  paw: {
    symbol: 'PAW',
    address: {
      137: '0xbc5b59ea1b6f8da8258615ee38d40e999ec5d74f',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://polycat.finance/',
  },
  pbr: {
    symbol: 'PBR',
    address: {
      137: '0x0d6ae2a429df13e44a07cd2969e085e4833f64a0',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://polkabridge.org/',
  },
  pbrew: {
    symbol: 'pBREW',
    address: {
      137: '0xb5106a3277718ecad2f20ab6b86ce0fee7a21f09',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://cafeswap.finance/',
  },
  pear: {
    symbol: 'PEAR',
    address: {
      137: '0xc8bcb58caef1be972c0b638b1dd8b0748fdc8a44',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://pearzap.com/',
  },
  pera: {
    symbol: 'PERA',
    address: {
      137: '0xe95fd76cf16008c12ff3b3a937cb16cd9cc20284',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://pera.finance/',
  },
  phx: {
    symbol: 'PHX',
    address: {
      137: '0x9c6bfedc14b5c23e3900889436edca7805170f01',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://www.phx.finance/',
  },
  pickle: {
    symbol: 'PICKLE',
    address: {
      137: '0x2b88ad57897a8b496595925f43048301c37615da',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://www.pickle.finance/',
  },
  piratep: {
    symbol: 'PIRATEP',
    address: {
      137: '0x3750144acd56cc1d3e8dafd8a187ad10d174d462',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://treasurekey.bet/',
  },
  plr: {
    symbol: 'PLR',
    address: {
      137: '0xa6b37fc85d870711c56fbcb8afe2f8db049ae774',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://pillar.fi/',
  },
  pnaut: {
    symbol: 'pNAUT',
    address: {
      137: '0xca469963a030a3670ed76832a6a181d280af108d',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://polygon.astronaut.to/',
  },
  polybunny: {
    symbol: 'polyBunny',
    address: {
      137: '0x4c16f69302ccb511c5fac682c7626b9ef0dc126a',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://polygon.pancakebunny.finance/',
  },
  polydoge: {
    symbol: 'polyDoge',
    address: {
      137: '0x8a953cfe442c5e8855cc6c61b1293fa648bae472',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://polydoge.com/',
  },
  pool: {
    symbol: 'POOL',
    address: {
      137: '0x25788a1a171ec66da6502f9975a15b609ff54cf6',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://pooltogether.com/',
  },
  power: {
    symbol: 'POWER',
    address: {
      137: '0x00d5149cdf7cec8725bf50073c51c4fa58ecca12',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://unipower.network/',
  },
  pswamp: {
    symbol: 'pSWAMP',
    address: {
      137: '0x5f1657896b38c4761dbc5484473c7a7c845910b6',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://swamp.finance/polygon/',
  },
  pwings: {
    symbol: 'pWINGS',
    address: {
      137: '0x845e76a8691423fbc4ecb8dd77556cb61c09ee25',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://polygon.jetswap.finance/',
  },
  qi: {
    symbol: 'QI',
    address: {
      137: '0x580a84c73811e1839f75d86d75d88cca0c241ff4',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://www.mai.finance/',
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
  ramp: {
    symbol: 'RAMP',
    address: {
      137: '0xaecebfcf604ad245eaf0d5bd68459c3a7a6399c2',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://www.rampdefi.com/',
  },
  regen: {
    symbol: 'REGEN',
    address: {
      137: '0xec482de9569a5ea3dd9779039b79e53f15791fde',
      80001: '',
    },
    decimals: 6,
    projectLink: 'https://www.regen.network/token/',
  },
  rei: {
    symbol: 'REI',
    address: {
      137: '0xb9f9e37c2cdbaff928c3da730b02f06fe09ae70e',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://zerogoki.org/#/',
  },
  relay: {
    symbol: 'RELAY',
    address: {
      137: '0x904371845bc56dcbbcf0225ef84a669b2fd6bd0d',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://www.relaychain.com/',
  },
  renbtc: {
    symbol: 'renBTC',
    address: {
      137: '0xdbf31df14b66535af65aac99c32e9ea844e14501',
      80001: '',
    },
    decimals: 8,
    projectLink: 'https://renproject.io/',
  },
  rendgb: {
    symbol: 'renDGB',
    address: {
      137: '0x2628568509e87c4429fbb5c664ed11391be1bd29',
      80001: '',
    },
    decimals: 8,
    projectLink: 'https://renproject.io/',
  },
  rendoge: {
    symbol: 'renDoge',
    address: {
      137: '0xce829a89d4a55a63418bcc43f00145adef0edb8e',
      80001: '',
    },
    decimals: 8,
    projectLink: 'https://renproject.io/',
  },
  revv: {
    symbol: 'REVV',
    address: {
      137: '0x70c006878a5a50ed185ac4c87d837633923de296',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://revvmotorsport.com/',
  },
  route: {
    symbol: 'ROUTE',
    address: {
      137: '0x16eccfdbb4ee1a85a33f3a9b21175cd7ae753db4',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://www.routerprotocol.com/',
  },
  rusd: {
    symbol: 'rUSD',
    address: {
      137: '0xfc40a4f89b410a1b855b5e205064a38fc29f5eb5',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://www.rampdefi.com/',
  },
  sage: {
    symbol: 'SAGE',
    address: {
      137: '0x2ed945dc703d85c80225d95abde41cdee14e1992',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://www.polysage.finance/',
  },
  sfi: {
    symbol: 'SFI',
    address: {
      137: '0x35b937583f04a24963eb685f728a542240f28dd8',
      80001: '',
    },
    decimals: 18,
    projectLink: 'http://saffron.finance/',
  },
  shi3ld: {
    symbol: 'SHI3LD',
    address: {
      137: '0xf239e69ce434c7fb408b05a0da416b14917d934e',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://polyshield.finance/#/home',
  },
  shib: {
    symbol: 'SHIB',
    address: {
      137: '0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://shibatoken.com/',
  },
  sing: {
    symbol: 'SING',
    address: {
      137: '0xcb898b0efb084df14dd8e018da37b4d0f06ab26d',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://singular.farm/farm/',
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
  sne: {
    symbol: 'SNE',
    address: {
      137: '0x32934cb16da43fd661116468c1b225fc26cf9a8c',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://strongnode.io/',
  },
  snx: {
    symbol: 'SNX',
    address: {
      137: '0x50b728d8d964fd00c2d0aad81718b71311fef68a',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://www.synthetix.io/',
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
  spade: {
    symbol: 'SPADE',
    address: {
      137: '0xf5ea626334037a2cf0155d49ea6462fddc6eff19',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://polygonfarm.finance',
  },
  start: {
    symbol: 'START',
    address: {
      137: '0x6ccf12b480a99c54b23647c995f4525d544a7e72',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://starter.xyz/',
  },
  stkghst: {
    symbol: 'stkGHST',
    address: {
      137: '0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://www.aavegotchi.com/',
  },
  sushi: {
    symbol: 'SUSHI',
    address: {
      137: '0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://sushi.com/',
  },
  swap: {
    symbol: 'SWAP',
    address: {
      137: '0x3809dcdd5dde24b37abe64a5a339784c3323c44f',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://trustswap.org/',
  },
  sx: {
    symbol: 'SX',
    address: {
      137: '0x840195888db4d6a99ed9f73fcd3b225bb3cb1a79',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://www.sx.technology/',
  },
  tcp: {
    symbol: 'TCP',
    address: {
      137: '0x032f85b8fbf8540a92b986d953e4c3a61c76d39e',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://www.thecryptoprophecies.com/',
  },
  time: {
    symbol: 'TIME',
    address: {
      137: '0x5c59d7cb794471a9633391c4927ade06b8787a90',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://timeleap.finance/',
  },
  titan: {
    symbol: 'TITAN',
    address: {
      137: '0xaaa5b9e6c589642f98a1cda99b9d024b8407285a',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://polygon.iron.finance/',
  },
  tmgo: {
    symbol: 'TMGO',
    address: {
      137: '0x034d706c3af9d11f0ba90d9967947abeda7a5758',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://tamagoswap.finance/',
  },
  trade: {
    symbol: 'TRADE',
    address: {
      137: '0x692ac1e363ae34b6b489148152b12e2785a3d8d6',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://polytrade.finance/',
  },
  tusd: {
    symbol: 'TUSD',
    address: {
      137: '0x2e1ad108ff1d8c782fcbbb89aad783ac49586756',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://www.trusttoken.com/trueusd/',
  },
  uco: {
    symbol: 'UCO',
    address: {
      137: '0x3c720206bfacb2d16fa3ac0ed87d2048dbc401fc',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://uniris.io/',
  },
  ufi: {
    symbol: 'UFI',
    address: {
      137: '0x3c205c8b3e02421da82064646788c82f7bd753b9',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://purefi.io/',
  },
  ugt: {
    symbol: 'UGT',
    address: {
      137: '0xba4c54ea2d66b904c82847a7d2357d22b857e812',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://unreal.finance/',
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
  ust: {
    symbol: 'UST',
    address: {
      137: '0x692597b009d13c4049a947cab2239b7d6517875f',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://terra.money/',
  },
  watch: {
    symbol: 'WATCH',
    address: {
      137: '0x09211dc67f9fe98fb7bbb91be0ef05f4a12fa2b2',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://www.yieldwatch.net/',
  },
  waultx: {
    symbol: 'WAULTx',
    address: {
      137: '0x3053ad3b31600074e9a90440770f78d5e8fc5a54',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://wault.finance/',
  },
  wbtc: {
    symbol: 'WBTC',
    address: {
      137: '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6',
      80001: '',
    },
    decimals: 8,
    projectLink: 'https://www.wbtc.network/',
  },
  weth: {
    symbol: 'WETH',
    address: {
      137: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://weth.io/',
  },
  wexpoly: {
    symbol: 'WEXpoly',
    address: {
      137: '0x4c4bf319237d98a30a929a96112effa8da3510eb',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://wault.finance/',
  },
  wfil: {
    symbol: 'WFIL',
    address: {
      137: '0xede1b77c0ccc45bfa949636757cd2ca7ef30137f',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://www.wrapped.com/',
  },
  wise: {
    symbol: 'WISE',
    address: {
      137: '0x4c19ddeebaf84ca3a255730295ad9d824d4ff51f',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://polywise.finance/',
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
  woo: {
    symbol: 'WOO',
    address: {
      137: '0x1b815d120b3ef02039ee11dc2d33de7aa4a8c603',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://woo.network/',
  },
  woofy: {
    symbol: 'WOOFY',
    address: {
      137: '0xd0660cd418a64a1d44e9214ad8e459324d8157f1',
      80001: '',
    },
    decimals: 12,
    projectLink: 'https://woofy.finance/',
  },
  work: {
    symbol: 'WORK',
    address: {
      137: '0x6002410dda2fb88b4d0dc3c1d562f7761191ea80',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://opolis.co/',
  },
  wow: {
    symbol: 'WOW',
    address: {
      137: '0x855d4248672a1fce482165e8dbe1207b94b1968a',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://wowswap.io/',
  },
  wusd: {
    symbol: 'WUSD',
    address: {
      137: '0xb8ab048d6744a276b2772dc81e406a4b769a5c3d',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://wault.finance/',
  },
  xcad: {
    symbol: 'XCAD',
    address: {
      137: '0xa55870278d6389ec5b524553d03c04f5677c061e',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://xcadnetwork.com/',
  },
  xcash: {
    symbol: 'XCASH',
    address: {
      137: '0x03678f2c2c762dc63c2bb738c3a837d366eda560',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://www.xcash.foundation/',
  },
  xed: {
    symbol: 'XED',
    address: {
      137: '0x2fe8733dcb25bfbba79292294347415417510067',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://exeedme.com/',
  },
  xmark: {
    symbol: 'XMARK',
    address: {
      137: '0xf153eff70dc0bf3b085134928daeea248d9b30d0',
      80001: '',
    },
    decimals: 9,
    projectLink: 'https://benchmarkprotocol.finance/',
  },
  xprt: {
    symbol: 'XPRT',
    address: {
      137: '0xb3b9c016ad1e9f7efdae451b04ef696e05658b32',
      80001: '',
    },
    decimals: 6,
    projectLink: 'https://persistence.one/',
  },
  yamp: {
    symbol: 'YAMP',
    address: {
      137: '0x87f654c4b347230c60cad8d7ea9cf0d7238bcc79',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://yamp.finance/',
  },
  zusd: {
    symbol: 'zUSD',
    address: {
      137: '0x5668f6d40e15188045a1de6295054103c13ffac1',
      80001: '',
    },
    decimals: 18,
    projectLink: 'https://zerogoki.org/#/',
  },
}

export default tokens
