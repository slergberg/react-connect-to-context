import React, { useContext } from 'react'

import ConnectedComponent from './ConnectedComponent'

export default function connectToContextStore(Context, mapContextToProps) {
  return function contextStoreConnector(Component) {
    return function ContextStoreConnection(props) {
      const contextValues = useContext(Context)
      const contextProps = mapContextToProps(contextValues, props)

      /* eslint-disable react/jsx-props-no-spreading */
      return (
        <ConnectedComponent
          Component={Component}
          {...contextProps}
          {...props}
        />
      )
      /* eslint-enable react/jsx-props-no-spreading */
    }
  }
}
