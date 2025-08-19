import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
// import { useTipCalculatorStore } from '@/stores/tipCalculator'

import App from '@/App.vue'

describe('Whole App', () => {
  let wrapper = null
  // let store = null

  // SETUP - run prior to each unit test
  beforeEach(() => {
    // render the component
    wrapper = mount(App, {
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
    // store = useTipCalculatorStore()
  })

  // TEARDOWN - run after each unit test
  afterEach(() => {
    wrapper.unmount()
  })

  test('mounts renders properly', () => {
    expect(wrapper.text()).toContain('Splitter')
    expect(wrapper.findAll('h2')[0].text()).toContain('Input Form')
    expect(wrapper.findAll('h2')[1].text()).toContain('Calculated Results')
  })

  test('happy path - a successful calculation', async () => {
    // find the key input elements
    const billInput = wrapper.find('#input-bill-subtotal')
    const tipOption15Input = wrapper.find("input[type=radio][value='0.15']")
    const numPeopleInput = wrapper.find('#input-number-of-people')
    // find the key output elements
    const tipAmountOutput = wrapper.find('#result-tip-amount')
    const totalOutput = wrapper.find('#result-total')

    // set the value of the input elements
    await billInput.setValue('142.55')
    await tipOption15Input.setValue()
    await numPeopleInput.setValue('5')

    // check the value of the output elements
    expect(tipAmountOutput.text()).toBe('$4.28')
    expect(totalOutput.text()).toBe('$32.79')
    expect(wrapper.find('button[type=reset]').element.disabled).toBe(false)
  })

  test('error path - inputs invalid values and receives error messages', async () => {
    // find the key input elements
    const numPeopleInput = wrapper.find('#input-number-of-people')
    // find the key output elements
    const tipAmountOutput = wrapper.find('#result-tip-amount')
    const totalOutput = wrapper.find('#result-total')
    const form = wrapper.find('form')

    // set the value of the input elements
    // await billInput.setValue('0')
    // await tipOption15Input.setValue()
    await numPeopleInput.setValue('-1')
    await form.trigger('submit') // Simulate submitting the form

    // find the error elements
    const errorElements = wrapper.findAll('.input__error')

    // debug with some console output
    // console.log(errorElements.length)
    // console.log(errorElements[0].text())
    // console.log(errorElements[1].text())
    // console.log(errorElements[2].text())

    // Check that the error elements exist and have appropriate error messages
    expect(wrapper.findAll('.input__error').length).toEqual(3)
    expect(errorElements[0].text()).toBe('Fill in')
    expect(errorElements[1].text()).toBe('Choose one')
    expect(errorElements[2].text()).toBe('Must be > 0')

    // Check that the results are the default values
    expect(tipAmountOutput.text()).toBe('$0.00')
    expect(totalOutput.text()).toBe('$0.00')
  })
})
