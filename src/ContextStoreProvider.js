import PropTypes from 'prop-types'
import React from 'react'

export default function ContextStoreProvider(props) {
  const { Context, children, store } = props

  return <Context.Provider value={store}>{children}</Context.Provider>
}

ContextStoreProvider.propTypes = {
  Context: PropTypes.objectOf(PropTypes.any).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  store: PropTypes.objectOf(PropTypes.any).isRequired,
}

ContextStoreProvider.defaultProps = {
  children: null,
}
