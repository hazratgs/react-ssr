import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import withEvents from '../../utils/withEvents'
import Helmet from 'react-helmet'

@withEvents
@connect(
  state => ({
    screens: state.main.screens
  })
)
export default class Main extends PureComponent {
  render () {
    return (
      <Fragment>
        <Helmet
          title='Crypterium — Cryptobank for Cryptopeople'
          description='Crypterium — revolutionary digital cryptobank with credit subtoken and open platform.'
          keywords='Cryptobank, ICO, cryptocurrency'
        >
          <meta name="description" content="Crypterium — revolutionary digital cryptobank with credit subtoken and open platform." />
          <meta name="keywords" content="Cryptobank, ICO, cryptocurrency" />
          <meta property="og:title" content="Crypterium — Cryptobank for Cryptopeople" />
          <meta property="og:image" content="/public/img/og/1024x512.jpg" />
          <meta property="og:description" content="Crypterium — revolutionary digital cryptobank with credit subtoken and open platform." />
          <meta property="og:url" content="https://crypterium.com/" />
          <meta property="og:type" content="website" />
          <meta name="twitter:title" content="Crypterium — Cryptobank for Cryptopeople" />
          <meta name="twitter:description" content="Crypterium — revolutionary digital cryptobank with credit subtoken and open platform." />
          <meta name="twitter:image:src" content="/public/img/og/1024x512.jpg" />
          <meta itemprop="image" content="https://crypterium.com/img/og/1200x1200.jpg" />
        </Helmet>
        Hello, World!
      </Fragment>
    )
  }
}
