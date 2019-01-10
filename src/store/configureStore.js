import { createStore, applyMiddleware, compose } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory, createMemoryHistory } from 'history'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers'
import rootSaga from '../sagas'

export const isServer = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

export default (url = '/') => {
  const history = isServer
    ? createMemoryHistory({
      initialEntries: [url]
    })
    : createBrowserHistory()

  const enhancers = []

  if (process.env.NODE_ENV === 'development' && !isServer) {
    const devToolsExtension = window.devToolsExtension

    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  const sagaMiddleware = createSagaMiddleware()
  const middleware = [sagaMiddleware, routerMiddleware(history)]
  const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
  )

  const initialState = !isServer ? window.__PRELOADED_STATE__ : {}

  if (!isServer) {
    delete window.__PRELOADED_STATE__
  }

  // Create the store
  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    composedEnhancers
  )

  sagaMiddleware.run(rootSaga)

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('../reducers', () => {
        store.replaceReducer(rootReducer)
      })
    }
  }

  return {
    store,
    history
  }
}
