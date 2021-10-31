'use strict';
import fetch as "node-fetch";
import fs from 'fs'
import {default as tokens2} '/src/config/constants/tokens2'

let address_list = []
for (const key of Object.keys(tokens2)) {
    address_list.push(key);
}
let address =''
for (let i = 0; i < address_list.length; i++) {
    address = address + address_list[i];
    if (i < address_list.length - 1) {
        address = address +','
    }
}

try {

    const fetch_command = 'https://api.coingecko.com/api/v3/simple/price?ids=' + address + '&vs_currencies=usd'
    fetch(fetch_command).then(response => {
        response.json().then(responseData => {
            let prices = [];
            for (const key of Object.keys(responseData)) {
                prices.push({name: key, address:tokens2[key], price: responseData[key]['usd'] })
            }
            var json_file = JSON.stringify(prices);
            fs.writeFile(`/src/config/constants/tokenPrices.json`, JSON.stringify(prices, null, 2), (err) => {
                if (err) throw err
                console.info(` ✅ - tokenPrices.json has been updated!`)
            })
        });
    });
} catch (err) {
    console.log(err)
}