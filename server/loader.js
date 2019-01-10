import path from 'path'
import fs from 'fs'

import React from 'react'
import { renderToString } from 'react-dom/server'
import Helmet from 'react-helmet'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'
import { Frontload, frontloadServerRender } from 'react-frontload'
import Loadable from 'react-loadable'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

// import newsLoader from './newsLoader'

import createStore from '../src/store/configureStore'
import Pages from '../src/pages'

// import manifest from '../build/asset-manifest.json'

const isServer = __SSR__ // eslint-disable-line

const sheet = new ServerStyleSheet()

export default (req, res) => {
  const injectHTML = (data, { html, title, meta, body, scripts, state }) => {
    data = data.replace('<html>', `<html ${html}>`)
    data = data.replace(/<title>.*?<\/title>/g, title)
    data = data.replace('</head>', `${meta}</head>`)
    data = data.replace(
      '<div id="root"></div>',
      `<div id="root">${body}</div><script>window.__PRELOADED_STATE__ = ${state}</script>`
    )
    // data = data.replace('</body>', scripts.join('') + '</body>')

    return data
  }

  fs.readFile(
    path.resolve(__dirname, '../build/index.html'),
    'utf8',
    async (err, htmlData) => {
      if (err) {
        console.error('Read error', err)

        return res.status(404).end()
      }

      const { store } = createStore(req.url)

      let news = require('../src/public/news.json')

      // We will give these news
      if (req.url.indexOf('/news/open/') !== -1) {
        const [id] = req.url.split('/').slice(-1)
        const allNews = require('../src/public/allNews.json')
        const [newsContent] = allNews.filter(item => item.id === id)
        if (newsContent) news = news.map(item => item.id === id ? newsContent : item)
      }

      store.dispatch({
        type: 'SUCCESS_LOAD_NEWS',
        payload: news
      })

      const context = {}
      const modules = []

      frontloadServerRender(() =>
        renderToString(
          <StyleSheetManager sheet={sheet.instance}>
            <Loadable.Capture report={m => modules.push(m)}>
              <Provider store={store}>
                <StaticRouter location={req.url} context={context}>
                  <Frontload isServer={isServer}>
                    <Pages />
                  </Frontload>
                </StaticRouter>
              </Provider>
            </Loadable.Capture>
          </StyleSheetManager>
        )
      ).then(routeMarkup => {
        if (context.url) {
          res.writeHead(302, {
            Location: context.url
          })

          res.end()
        } else {

          const styleTags = sheet.getStyleTags()

          const extractAssets = (assets, chunks) =>
            Object.keys(assets)
              .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
              .map(k => assets[k])

          // const extraChunks = extractAssets(manifest, modules).map(
          //   c => `<script type="text/javascript" src="/${c}"></script>`
          // )

          const helmet = Helmet.renderStatic()

          const html = injectHTML(htmlData, {
            html: helmet.htmlAttributes.toString(),
            title: helmet.title.toString(),
            meta: helmet.meta.toString() + ' ' + styleTags,
            body: routeMarkup,
            // scripts: extraChunks,
            state: JSON.stringify(store.getState()).replace(/</g, '\\u003c')
          })

          res.send(html)
        }
      })
    }
  )
}
