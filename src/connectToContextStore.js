import PropTypes from 'prop-types'
import React, { memo, useContext } from 'react'

// eslint-disable-next-line react/jsx-props-no-spreading
const ConnectedComponent = ({ Component, ...props }) => <Component {...props} />

ConnectedComponent.propTypes = {
  Component: PropTypes.elementType.isRequired,
}

const MemoizedComponent = memo(ConnectedComponent)

const connectToContextStore = (Context, mapContextToProps) => (Component) =>
  function ContextStoreConnection(props) {
    const contextValues = useContext(Context)
    const contextProps = mapContextToProps(contextValues, props)

    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <MemoizedComponent Component={Component} {...contextProps} {...props} />
    )
  }

export default connectToContextStore
