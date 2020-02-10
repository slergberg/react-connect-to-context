import PropTypes from 'prop-types'
import React, { memo } from 'react'

function ConnectedComponent({ Component, ...props }) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Component {...props} />
  )
}

ConnectedComponent.propTypes = {
  Component: PropTypes.elementType.isRequired,
}

export default memo(ConnectedComponent)
