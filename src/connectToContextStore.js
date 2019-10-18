import React, { useContext } from 'react'

import ConnectedComponent from './ConnectedComponent'

const connectToContextStore = (Context, mapContextToProps) => (Component) =>
  function ContextStoreConnection(props) {
    const contextValues = useContext(Context)
    const contextProps = mapContextToProps(contextValues, props)

    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <ConnectedComponent Component={Component} {...contextProps} {...props} />
    )
  }

export default connectToContextStore
