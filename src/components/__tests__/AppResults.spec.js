import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useTipCalculatorStore } from '@/stores/tipCalculator'

import AppResults from '@/components/AppResults.vue'

describe('AppResults.vue Test with empty pinia store', () => {
  let wrapper = null
  let store = null

  // SETUP - run prior to each unit test
  beforeEach(() => {
    // render the component
    wrapper = shallowMount(AppResults, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            // stubActions: false,
          }),
        ],
      },
    })

    // create the data store using the testing pinia
    store = useTipCalculatorStore()
  })

  // TEARDOWN - run after each unit test
  afterEach(() => {
    wrapper.unmount()
  })

  test('the component is mounted', () => {
    expect(wrapper.find('h2').text()).toContain('Calculated Results')
  })

  test('initializes with all output elements with $0.00 and the reset button disabled', () => {
    // check that there are 2 output elements
    expect(wrapper.findAll('output').length).toEqual(2)

    // check that all are initialized as $0.00
    wrapper.findAll('output').forEach((element) => {
      expect(element.html()).toContain('$0.00')
    })

    // check that there is 1 reset button
    expect(wrapper.findAll('button[type=reset]').length).toEqual(1)
    // check that it is initialized as disabled
    expect(wrapper.find('button[type=reset]').attributes().disabled).toBeDefined()
    expect(wrapper.find('button[type=reset]').element.disabled).toBe(true)
  })

  test('outputs values and reset button is enabled', async () => {
    // Set the store state variables

    // Option 1
    await store.$patch({
      billSubtotal: 142.55,
      tipPercentage: 0.15,
      numberOfPeople: 5,
    })

    // Option 2
    // store.billSubtotal = 142.55
    // store.tipPercentage = 0.15
    // store.numberOfPeople = 5
    // await wrapper.vm.$nextTick() // Wait for DOM updates

    // Check that the store getters are updated
    expect(store.isStarted).toEqual(true)
    expect(store.tipAmountPerPersonFormatted).toEqual('$4.28')
    expect(store.billTotalPerPersonFormatted).toEqual('$32.79')

    // Check that the component elements are updated
    expect(wrapper.findAll('output').length).toEqual(2)
    // Option 1 - find all output elements as an array
    const outputElements = wrapper.findAll('output')
    expect(outputElements[0].html()).toContain('$4.28')
    expect(outputElements[1].html()).toContain('$32.79')
    // Option 2 - find each output element by its id
    const tipAmountOutput = wrapper.find('#result-tip-amount')
    const totalOutput = wrapper.find('#result-total')
    expect(tipAmountOutput.text()).toBe('$4.28')
    expect(totalOutput.text()).toBe('$32.79')

    expect(wrapper.find('button[type=reset]').element.disabled).toBe(false)
  })
})

describe('AppResults.vue Test with filled-in pinia store', () => {
  let wrapper = null
  let store = null

  // SETUP - run prior to each unit test
  beforeEach(() => {
    // render the component
    wrapper = shallowMount(AppResults, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              tipCalculator: {
                billSubtotal: 142.55,
                tipPercentage: 0.15,
                numberOfPeople: 5,
              },
            },
            // stubActions: false,
          }),
        ],
      },
    })

    // create the data store using the testing pinia
    store = useTipCalculatorStore()
  })

  // TEARDOWN - run after each unit test
  afterEach(() => {
    wrapper.unmount()
  })

  test('outputs values and reset button is enabled', async () => {
    expect(store.isStarted).toEqual(true)
    expect(store.tipAmountPerPersonFormatted).toEqual('$4.28')
    expect(store.billTotalPerPersonFormatted).toEqual('$32.79')
    expect(wrapper.find('button[type=reset]').element.disabled).toBe(false)
  })
})
