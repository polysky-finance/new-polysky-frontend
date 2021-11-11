import exchanges from 'config/constants/apis'
import axios from 'axios'
import BigNumber from 'bignumber.js'
import { BIG_ZERO } from './bigNumber'

export const getLPAPR= async (exchange: string, lpAddress: string)=>{
    const exc = exchanges[exchange]
    
    if(!exc)
    {
        return BIG_ZERO
    }
    try {
    if(exc.pairID === 'pair')
    {
      const p = 'p'
    }

    const id = await getID(lpAddress, exc);
    return getAPR(id, exc)
  }catch(err){
    return BIG_ZERO
  }
}

export const getID = async(lpAddress, exchange)=> {
    const q = `
  {
 pairDayDatas(first: 1, orderBy: date, orderDirection: desc,
   where: {
     ${exchange.pairID}: "${lpAddress.toLowerCase()}",
     date_gt: 1636070300
   }
 ) {
	id
 }
}
  `
    const result = await axios.post(exchange.api, {
        query: q
    });
    return  result.data.data.pairDayDatas[0].id

}

export const getAPR = async(id, exchange)=> {
    const q = `
    {
        pairDayData(id: "${id}") {
        ${exchange.volumeUSD}
        reserveUSD
      }
    }
      `
    const result = await axios.post(exchange.api, {
        query: q
    });
    if(exchange.volumeUSD ==='volumeUSD')
    {
       const hi= "h"
    }
    return  new BigNumber(result.data.data.pairDayData[exchange.volumeUSD]).times(exchange.liquidityFeeFraction).times(365.25).div(new BigNumber(result.data.data.pairDayData.reserveUSD))
}