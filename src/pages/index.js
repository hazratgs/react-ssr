import React, { PureComponent } from 'react'
import { hot } from 'react-hot-loader'
import { withRouter, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import NotFound from '../containers/NotFound'
import Main from './main'

@hot(module)
@withRouter
@connect(
  state => ({
    hiddenOtherElements: state.app.hiddenOtherElements
  })
)
export default class Pages extends PureComponent {
  state = {
    reloadServerRender: false
  }

  componentDidMount () {
    this.props.getNews()
    if (typeof window !== 'undefined') {
      this.setState({ reloadServerRender: true })
    }
  }

  redirectFaq = () => (
    <Redirect to='/faq'/>
  )

  render () {
    const app = (
      <Container>
        <Switch>
          <Route path='/' exact component={Main} />
          <Route component={NotFound}/>
        </Switch>
      </Container>
    )

    return this.state.reloadServerRender
      ? <div className='server-render'>{app}</div>
      : app
  }
}
