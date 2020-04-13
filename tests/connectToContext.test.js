import PropTypes from 'prop-types'
import React, { createContext } from 'react'
import { mount } from 'enzyme'

import connectToContext, { ContextConnectedComponent } from '../src'

const testContextValue = { foo: 'bar', baz: 'baz' }

const TestContext = createContext(testContextValue)
const TestContextProvider = TestContext.Provider

function TestComponent({ foo }) {
  return <div>{foo}</div>
}

TestComponent.propTypes = {
  foo: PropTypes.string.isRequired,
}

function TestContainer(props) {
  const { contextMapper, value } = props

  let ConnectedTestComponent
  if (contextMapper) {
    ConnectedTestComponent = connectToContext(
      TestContext,
      contextMapper,
    )(TestComponent)
  } else {
    ConnectedTestComponent = connectToContext(TestContext)(TestComponent)
  }

  return (
    <TestContextProvider value={value}>
      <ConnectedTestComponent />
    </TestContextProvider>
  )
}

TestContainer.propTypes = {
  contextMapper: PropTypes.func,
  value: PropTypes.objectOf(PropTypes.any).isRequired,
}

describe('connectToContext', () => {
  it('should map all context values to props and memoize', () => {
    const contextConnectedComponent = (
      <ContextConnectedComponent
        Component={TestComponent}
        foo="bar"
        baz="baz"
      />
    )

    const wrapper = mount(<TestContainer value={testContextValue} />)
    expect(wrapper.contains(contextConnectedComponent)).toEqual(true)

    const divComponent = <div>bar</div>

    const testComponentWrapper = wrapper.find(TestComponent)
    expect(testComponentWrapper.props().foo).toEqual('bar')
    expect(testComponentWrapper.props().baz).toEqual('baz')
    expect(testComponentWrapper.contains(divComponent)).toEqual(true)
  })

  it('should map specific context values to props and memoize', () => {
    const contextMapper = (context) => ({
      foo: context.foo,
    })

    const contextConnectedComponent = (
      <ContextConnectedComponent Component={TestComponent} foo="bar" />
    )

    const wrapper = mount(
      <TestContainer contextMapper={contextMapper} value={testContextValue} />,
    )
    expect(wrapper.contains(contextConnectedComponent)).toEqual(true)

    const divComponent = <div>bar</div>

    const testComponentWrapper = wrapper.find(TestComponent)
    expect(testComponentWrapper.props().foo).toEqual('bar')
    expect(testComponentWrapper.contains(divComponent)).toEqual(true)
  })

  it('should update component when context values change', () => {
    const wrapper = mount(<TestContainer value={testContextValue} />)
    wrapper.setProps({ value: { foo: 'foo' } })

    const testComponentWrapper = wrapper.find(TestComponent)
    expect(testComponentWrapper.props().foo).toEqual('foo')
    expect(testComponentWrapper.contains(<div>foo</div>)).toEqual(true)
  })
})
