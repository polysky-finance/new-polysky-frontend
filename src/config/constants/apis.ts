// import { ExchangeConfig } from './types'

export default {
	"Quick LP":{
		api: "https://api.thegraph.com/subgraphs/name/sameepsi/quickswap06",
		liquidityFeeFraction:0.3,
		pairID: "pairAddress",
		volumeUSD: "dailyVolumeUSD",
	},
	"Gravity LP":
	{
		api: "https://api.thegraph.com/subgraphs/name/inthenextversion/gravity-exchange-analytics",
		liquidityFeeFraction:0.3,
		pairID: "pairAddress",
		volumeUSD: "dailyVolumeUSD",
    },
	"Sushi LP":
	{
		api: "https://api.thegraph.com/subgraphs/name/sushiswap/matic-exchange",
		liquidityFeeFraction:0.3,
		pairID: "pair",
		volumeUSD: "volumeUSD",
    }
}

