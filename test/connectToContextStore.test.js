import PropTypes from 'prop-types'
import React, { createContext } from 'react'
import { mount } from 'enzyme'

import ConnectedComponent from '../src/ConnectedComponent'
import { connectToContextStore } from '../src'

const testStore = { foo: 'bar' }

const TestContext = createContext(testStore)
const TestContextProvider = TestContext.Provider

function TestComponent({ foo }) {
  return <div>{foo}</div>
}

TestComponent.propTypes = {
  foo: PropTypes.string.isRequired,
}

function mapTestContextToProps(context) {
  return {
    foo: context.foo,
  }
}

const ConnectedTestComponent = connectToContextStore(
  TestContext,
  mapTestContextToProps,
)(TestComponent)

function TestContainer({ value }) {
  return (
    <TestContextProvider value={value}>
      <ConnectedTestComponent />
    </TestContextProvider>
  )
}

TestContainer.propTypes = {
  value: PropTypes.objectOf(PropTypes.any).isRequired,
}

describe('connectToContextStore', () => {
  it('should map context values to props and memoize component', () => {
    const connectedComponent = (
      <ConnectedComponent Component={TestComponent} foo="bar" />
    )

    const wrapper = mount(<TestContainer value={testStore} />)
    expect(wrapper.contains(connectedComponent)).toEqual(true)

    const divComponent = <div>bar</div>

    const testComponentWrapper = wrapper.find(TestComponent)
    expect(testComponentWrapper.props().foo).toEqual('bar')
    expect(testComponentWrapper.contains(divComponent)).toEqual(true)
  })

  it('should update component when context values change', () => {
    const wrapper = mount(<TestContainer value={testStore} />)
    wrapper.setProps({ value: { foo: 'foo' } })

    const testComponentWrapper = wrapper.find(TestComponent)
    expect(testComponentWrapper.props().foo).toEqual('foo')
    expect(testComponentWrapper.contains(<div>foo</div>)).toEqual(true)
  })
})
