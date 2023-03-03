const querystring = require('node:querystring');
const axios = require('axios');

const base_url = process.env.PUBLIC_API_BASE_URL;
const query_url = base_url.concat("/query");

const apikey = process.env.PUBLIC_API_KEY;

module.exports = {
    get_data: (params) => {
        return new Promise((resolve, reject) => {
            let url = query_url.concat("?" + querystring.stringify({
                function: "TIME_SERIES_INTRADAY",
                symbol: "IBM",
                interval: "5min",
                apikey
            }));
            axios({
                method: 'GET',
                url,
                headers: { 'User-Agent': 'request' }, // Required by Public API.
                responseType: 'json'
            })
                .then((resp) => {
                    let data = resp.data;
                    let result = Object.keys(data["Time Series (5min)"]).map(time => ({ ...data["Time Series (5min)"][time], time }));
                    let sorted = result.sort((a, b) => new Date(a.time) < new Date(b.time) ? -1 : 1);
                    let slice = sorted.slice(params.start, params.end);
                    resolve(slice.filter((obj) => {
                        return [
                            (!params.open || (!!params.open && obj["1. open"] == params.open)),
                            (!params.high || (!!params.high && obj["2. high"] == params.high)),
                            (!params.low || (!!params.low && obj["3. low"] == params.low)),
                            (!params.close || (!!params.close && obj["4. close"] == params.close)),
                            (!params.volume || (!!params.volume && obj["5. volume"] == params.volume))
                        ].every(c => c === true);
                    }));
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}