import { describe, test, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTipCalculatorStore } from '@/stores/tipCalculator'

// test use cases:
// - returns "$0.00" for both result calculations when the 3 main inputs are not all complete and valid
// - returns the correct result calculations when the 3 main inputs are complete and valid
// - reset function returns the store back to the initial values

describe('Tip Calculator Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia())
  })

  test('Returns $0.00 when the inputs are not valid', () => {
    const tipCalculatorStore = useTipCalculatorStore()
    tipCalculatorStore.billSubtotal = 142.55
    tipCalculatorStore.tipPercentage = 0.15
    tipCalculatorStore.numberOfPeople = null
    expect(tipCalculatorStore.numberOfPeople).toBe(null)
    expect(tipCalculatorStore.isValid).toBe(false)
    expect(tipCalculatorStore.tipAmountPerPersonFormatted).toBe('$0.00')
    expect(tipCalculatorStore.billTotalPerPersonFormatted).toBe('$0.00')
  })

  test('Results calculations #1', () => {
    const tipCalculatorStore = useTipCalculatorStore()
    tipCalculatorStore.billSubtotal = 142.55
    tipCalculatorStore.tipPercentage = 0.15
    tipCalculatorStore.numberOfPeople = 5
    expect(tipCalculatorStore.numberOfPeople).toBe(5)
    expect(tipCalculatorStore.isValid).toBe(true)
    expect(tipCalculatorStore.tipAmountPerPersonFormatted).toBe('$4.28')
    expect(tipCalculatorStore.billTotalPerPersonFormatted).toBe('$32.79')
  })

  test('Results calculations #2', () => {
    const tipCalculatorStore = useTipCalculatorStore()
    tipCalculatorStore.billSubtotal = 189.37
    tipCalculatorStore.tipPercentage = 0.25
    tipCalculatorStore.numberOfPeople = 3
    expect(tipCalculatorStore.tipAmountPerPersonFormatted).toBe('$15.78')
    expect(tipCalculatorStore.billTotalPerPersonFormatted).toBe('$78.90')
  })

  test('Reset store', () => {
    const tipCalculatorStore = useTipCalculatorStore()
    tipCalculatorStore.billSubtotal = 189.37
    tipCalculatorStore.tipPercentage = 0.25
    tipCalculatorStore.numberOfPeople = 3

    expect(tipCalculatorStore.tipAmountPerPersonFormatted).toBe('$15.78')
    expect(tipCalculatorStore.billTotalPerPersonFormatted).toBe('$78.90')

    tipCalculatorStore.$reset()

    expect(tipCalculatorStore.isStarted).toEqual(false)
    expect(tipCalculatorStore.billSubtotal).toEqual(null)
    expect(tipCalculatorStore.tipPercentage).toEqual(null)
    expect(tipCalculatorStore.numberOfPeople).toEqual(null)
  })
})
