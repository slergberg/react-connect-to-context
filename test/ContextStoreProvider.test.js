import React, { createContext } from 'react'
import { shallow } from 'enzyme'

import { ContextStoreProvider } from '../src/index'

const testStore = { foo: 'bar' }

const TestContext = createContext(testStore)

function TestContainer() {
  return (
    <ContextStoreProvider Context={TestContext} store={testStore}>
      <div>bar</div>
    </ContextStoreProvider>
  )
}

describe('ContextStoreProvider', () => {
  it('should render children with a Context.Provider wrapper', () => {
    const wrapper = shallow(<TestContainer />)
    const testContainerWrapper = wrapper.find(ContextStoreProvider).dive()

    expect(
      testContainerWrapper.contains(
        <TestContext.Provider value={testStore}>
          <div>bar</div>
        </TestContext.Provider>,
      ),
    ).toEqual(true)
  })
})
