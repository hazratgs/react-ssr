import React from 'react'
import ReactGA from 'react-ga'

const event = ({ category, action, label }) => ReactGA.event({
  category: category,
  action: action,
  label: label
})

const pathname = () => typeof window === 'undefined' ? '/' : window.location.pathname

export default function (Component) {
  const ModifiedComponent = (ownProps) => (
    <Component {...ownProps} event={event} pathname={pathname}/>
  )
  return ModifiedComponent
}
