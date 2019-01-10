import { takeLatest, call, put } from 'redux-saga/effects'
import * as actions from '../actions/coinbase'
import axios from 'axios'

const fetchCoinbase = () =>
  axios.get('https://cors.hazratgs.com/https://graphs2.coinmarketcap.com/currencies/crypterium/', {
    headers: {
      'X-CMC_PRO_API_KEY': '82d983d1-ac33-4e9f-85ba-e0a7ba8107a6'
    }
  })

const fetchCoinmarketcup = () =>
  axios.get('https://cors.hazratgs.com/https://api.coinmarketcap.com/v2/ticker/2447/')

function* fetchCoinbaseAsync () {
  try {
    const responseCoinbase = yield call(fetchCoinbase)
    const responseCoinmarketcup = yield call(fetchCoinmarketcup)

    const data = {
      marketCap: responseCoinbase.data.market_cap_by_available_supply,
      priceBtc: responseCoinbase.data.price_btc,
      priceUsd: responseCoinbase.data.price_usd,
      volumeUsd: responseCoinbase.data.volume_usd,
      info: responseCoinmarketcup.data.data
    }

    yield put(actions.requestedCoinbaseSuccessed(data))
  } catch (err) {
    yield put(actions.requestedCoinbaseError)
  }
}

export default function* watcher () {
  yield takeLatest(actions.fetchCoinbase, fetchCoinbaseAsync)
}
