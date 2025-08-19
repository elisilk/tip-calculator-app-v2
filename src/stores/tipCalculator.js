import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { round, toCurrencyString } from '@/utils/index'

export const useTipCalculatorStore = defineStore('tipCalculator', () => {
  // state properties
  const billSubtotal = ref(null)
  const tipPercentage = ref(null)
  const tipPercentageCustom = ref(null)
  const numberOfPeople = ref(null)

  // getters

  const isStarted = computed(
    () =>
      billSubtotal.value !== null || numberOfPeople.value !== null || tipPercentage.value !== null,
  )

  const isValid = computed(() => {
    // Check if billSubtotal is a positive number
    const validBillSubtotal =
      billSubtotal.value !== null &&
      typeof billSubtotal.value === 'number' &&
      billSubtotal.value > 0

    // Check if numberOfPeople is a positive integer
    const validNumberOfPeople =
      numberOfPeople.value !== null &&
      Number.isInteger(numberOfPeople.value) &&
      numberOfPeople.value > 0

    // Check if tipPercentage is a valid nonnegative number
    const validTipPercentage =
      tipPercentage.value !== null &&
      (tipPercentage.value === 'custom'
        ? tipPercentageCustom.value !== null &&
          typeof tipPercentageCustom.value === 'number' &&
          tipPercentageCustom.value >= 0
        : typeof tipPercentage.value === 'number' && tipPercentage.value >= 0)

    // Form is valid only if all of the inputs are valid
    return validBillSubtotal && validNumberOfPeople && validTipPercentage
  })

  // getters -- calculated intermediate quantities

  const tipAmountTotal = computed(() =>
    round(
      billSubtotal.value *
        (tipPercentage.value === 'custom' ? tipPercentageCustom.value / 100 : tipPercentage.value),
    ),
  )

  const billTotal = computed(() => round(billSubtotal.value + tipAmountTotal.value))

  // getters -- calculated final quantities

  const tipAmountPerPerson = computed(() =>
    isValid.value ? round(tipAmountTotal.value / numberOfPeople.value) : 0,
  )

  const billTotalPerPerson = computed(() =>
    isValid.value ? round(billTotal.value / numberOfPeople.value) : 0,
  )

  // getters -- formatted + calculated final quantities

  const tipAmountPerPersonFormatted = computed(() => toCurrencyString(tipAmountPerPerson.value))

  const billTotalPerPersonFormatted = computed(() => toCurrencyString(billTotalPerPerson.value))

  // actions

  function $reset() {
    billSubtotal.value = null
    tipPercentage.value = null
    tipPercentageCustom.value = null
    numberOfPeople.value = null
  }

  return {
    billSubtotal,
    tipPercentage,
    tipPercentageCustom,
    numberOfPeople,
    isStarted,
    isValid,
    tipAmountPerPerson,
    billTotalPerPerson,
    tipAmountPerPersonFormatted,
    billTotalPerPersonFormatted,
    $reset,
  }
})
