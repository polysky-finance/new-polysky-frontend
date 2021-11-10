import exchanges from 'config/constants/apis'
import axios from 'axios'
import BigNumber from 'bignumber.js'

export const getLPAPR= async (exchange: string, lpAddress: string)=>{
    const exc = exchanges[exchange]
    if(!exc)
    {
        return undefined
    }

    const id = await getID(lpAddress, exc.api);
    return getAPR(id, exc.api, exc.liquidityFeeFraction)
}

export const getID = async(lpAddress, api)=> {
    const q = `
  {
 pairDayDatas(first: 1, orderBy: date, orderDirection: desc,
   where: {
     pairAddress: "${lpAddress}",
     date_gt: 1636070300
   }
 ) {
	id
 }
}
  `
    const result = await axios.post(api, {
        query: q
    });
    return  result.data.data.pairDayDatas[0].id

}

export const getAPR = async(id, api, fee)=> {
    const q = `
    {
        pairDayData(id: "${id}") {
        dailyVolumeUSD
        reserveUSD
      }
    }
      `
    const result = await axios.post(api, {
        query: q
    });
    return  new BigNumber(result.data.data.pairDayData.dailyVolumeUSD).times(fee).times(365.25).div(new BigNumber(result.data.data.pairDayData.reserveUSD))
}