import { all, fork } from 'redux-saga/effects'
import news from './news'
import coinbase from './coinbase'

export default function* rootSaga () {
  return yield all([
    news,
    coinbase
  ].map(fork))
}
