import BigNumber from 'bignumber.js'

export const getDecimalPlaces=(value:BigNumber)=>{
    if(!value)
    {
        return 0;
    }
    const absValue = value.abs();

    let digits = 0
      if(absValue.lt(new BigNumber(100)) && absValue.gt(new BigNumber(10))){
        digits =1
      }
      if(absValue.lt(new BigNumber(10)) && absValue.gt(new BigNumber(0.1))){
      digits = 2
      }
      if(absValue.lt(new BigNumber(0.1)))
      {
        digits = 3
      }
      return digits
}

export const reduceNumber=(value: BigNumber, reduceSmallNumber = true)=>{
   if(!value){
       return [undefined, '']
   }
   if( reduceSmallNumber && value.abs().lt(0.01) && !value.abs().eq(new BigNumber(0)))
   {
       let power = 0;
       let val =value.abs();
       while(val.lt(1)){
           val=val.times(10)
           power++;
       }
       return [val, `e-${power}`]
   } 
   if(value.abs().lte(999))
   {
       return [ value, '']
   }
   if(value.abs().lte(999999))
   {
       return [value.div(1000), 'k']
   }
   if(value.abs().lte(999000000))
   {
       return [value.div(1000000), 'M']
   }
   return [value.div(1000000000), 'B']
}