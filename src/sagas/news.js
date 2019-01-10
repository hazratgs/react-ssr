import { takeLatest, call, put } from 'redux-saga/effects'
import * as actions from '../actions/news'
import axios from 'axios'
import sortNews from '../utils/sortNews'

function* getNews () {
  try {
    const data = yield call(axios, 'https://s3-us-west-1.amazonaws.com/crypterium.com/content/news.json')
    const items = sortNews(data.data)
    yield put(actions.successLoadNews(items))
  } catch (err) {
    yield put(actions.errorLoadNews)
  }
}

export default function* watcher () {
  yield takeLatest(actions.getNews, getNews)
}
