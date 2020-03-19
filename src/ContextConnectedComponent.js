import PropTypes from 'prop-types'
import React, { memo } from 'react'

function ContextConnectedComponent({ Component, ...props }) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Component {...props} />
  )
}

ContextConnectedComponent.propTypes = {
  Component: PropTypes.elementType.isRequired,
}

export default memo(ContextConnectedComponent)
