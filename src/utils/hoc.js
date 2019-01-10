import React from 'react'

const HoC = (newProps) => (WrappedComponent) => {
  const ModifiedComponent = (ownProps) => (
    <WrappedComponent {...ownProps} {...newProps} />
  )
  return ModifiedComponent
}

export default HoC
