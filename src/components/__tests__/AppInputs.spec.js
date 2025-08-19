import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

import AppInputs from '@/components/AppInputs.vue'

describe('AppInputs.vue Test with empty pinia store', () => {
  let wrapper = null

  // SETUP - run prior to each unit test
  beforeEach(() => {
    // render the component
    wrapper = shallowMount(AppInputs, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    })
  })

  // TEARDOWN - run after each unit test
  afterEach(() => {
    wrapper.unmount()
  })

  test('the component is mounted', () => {
    expect(wrapper.find('h2').text()).toContain('Input Form')
  })

  test('initializes with all input elements undefined and not checked', () => {
    // check that there are 3 number inputs
    expect(wrapper.findAll('input[type=number]').length).toEqual(3)
    // check that all are initialized as empty
    wrapper
      .findAll('input[type=number]')
      .forEach((element) => expect(element.element.value).toBe(''))

    // check that there are 6 radio inputs
    expect(wrapper.findAll('input[type=radio]').length).toEqual(6)
    // check that all are initialized as unchecked
    wrapper
      .findAll('input[type=radio]')
      .forEach((element) => expect(element.element.checked).toBe(false))
  })

  test('receives input values', async () => {
    const billInput = wrapper.find('#input-bill-subtotal')
    const tipOption15Input = wrapper.find("input[type=radio][value='0.15']")
    const tipOption10Input = wrapper.find("input[type=radio][value='0.1']")
    const numPeopleInput = wrapper.find('#input-number-of-people')

    await billInput.setValue('142.55')
    await tipOption15Input.setValue()
    await numPeopleInput.setValue('5')

    expect(billInput.element.value).toBe('142.55')
    expect(tipOption15Input.element.checked).toBe(true)
    expect(tipOption10Input.element.checked).toBe(false)
    expect(numPeopleInput.element.value).toBe('5')
  })
})
