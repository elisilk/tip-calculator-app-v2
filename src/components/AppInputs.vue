<script setup>
import { ref, useTemplateRef, computed } from 'vue'
import { useTipCalculatorStore } from '@/stores/tipCalculator'
import { validityError } from '@/utils/index'

const tipCalculatorStore = useTipCalculatorStore()

const tipPercentages = [0.05, 0.1, 0.15, 0.25, 0.5]

const tipPercentageId = (percentage) => `input-tip-percentage-${percentage * 100}`

const tipPercentageLabel = (percentage) => `${percentage * 100}%`

const customTipPercentageOption = useTemplateRef('input-tip-percentage-custom')

const customTipPercentageValue = useTemplateRef('input-tip-percentage-custom-value')

function handleNonCustomInputOptionClick() {
  customTipPercentageValue.value.tabIndex = -1
}

function handleCustomInputOptionClick() {
  customTipPercentageValue.value.focus()
  customTipPercentageValue.value.tabIndex = 0
}

function handleCustomInputValueClick() {
  customTipPercentageOption.value.checked = true
}

const tipCalculatorForm = useTemplateRef('tip-calculator-form')

const errorMessages = {
  'input-bill-subtotal': {
    valueMissing: 'Fill in',
    rangeUnderflow: 'Must be > 0',
  },
  'input-tip-percentage': {
    valueMissing: 'Choose one',
  },
  'input-tip-percentage-custom-value': {
    valueMissing: 'Fill in',
    stepMismatch: 'Use a whole number',
    rangeUnderflow: 'Must be > 0',
  },
  'input-number-of-people': {
    valueMissing: 'Fill in',
    stepMismatch: 'Use a whole number',
    rangeUnderflow: 'Must be > 0',
    // rangeUnderflow: "Can't be zero", // the text used in the Figma design file
  },
}

const errors = ref({})

function validateInput(input) {
  const inputName = input.name
  const inputIsValid = input.validity.valid
  inputIsValid
    ? delete errors.value[inputName] // input is valid, so clear errors for this input
    : (errors.value[inputName] = validityError(input)) // input not valid, so add error for this input
}

function handleInputEvent(event) {
  validateInput(event.target)
}

const isInputInvalid = computed(() => (inputName) => inputName in errors.value)

const inputErrorMessage = computed(
  () => (inputName) => errorMessages[inputName][errors.value[inputName]],
)

function handleFormSubmit() {
  Array.from(tipCalculatorForm.value.elements)
    .filter((element) => element.nodeName === 'INPUT')
    .forEach((input) => validateInput(input))
}

function handleFormReset() {
  tipCalculatorStore.$reset()
  errors.value = {}
}
</script>

<template>
  <form
    name="tip-calculator-form"
    id="tip-calculator-form"
    class="app__form"
    novalidate
    ref="tip-calculator-form"
    @submit.prevent="handleFormSubmit"
    @reset="handleFormReset"
  >
    <section class="inputs" aria-labelledby="inputs-section-heading">
      <h2 id="inputs-section-heading" class="sr-only">Input Form</h2>

      <div class="input__container">
        <label class="input__label" for="input-bill-subtotal">Bill</label>
        <input
          class="input__number"
          id="input-bill-subtotal"
          name="input-bill-subtotal"
          type="number"
          step=".01"
          min="0.01"
          placeholder="0"
          required
          v-model="tipCalculatorStore.billSubtotal"
          @blur="handleInputEvent"
        />
        <img
          src="/icon-dollar.svg"
          alt="Dollar sign icon"
          class="input__icon"
          width="11"
          height="17"
          role="img"
          aria-label="Enter a dollar amount"
        />
        <span
          v-if="isInputInvalid('input-bill-subtotal')"
          class="input__error"
          id="input-bill-subtotal-error"
          aria-live="polite"
          >{{ inputErrorMessage('input-bill-subtotal') }}</span
        >
      </div>

      <fieldset class="input__container input__fieldset">
        <legend class="input__legend">Select Tip %</legend>

        <div class="input__options">
          <div
            v-for="percentage in tipPercentages"
            class="input__option-container"
            :key="tipPercentageId(percentage)"
          >
            <input
              class="input__option"
              type="radio"
              name="input-tip-percentage"
              :id="tipPercentageId(percentage)"
              :value="percentage"
              required
              @click="handleNonCustomInputOptionClick"
              @blur="handleInputEvent"
              v-model="tipCalculatorStore.tipPercentage"
            />
            <label class="input__option-label" :for="tipPercentageId(percentage)">{{
              tipPercentageLabel(percentage)
            }}</label>
          </div>

          <div class="input__option-container">
            <input
              class="input__option"
              type="radio"
              name="input-tip-percentage"
              id="input-tip-percentage-custom"
              value="custom"
              ref="input-tip-percentage-custom"
              @blur="handleInputEvent"
              @click="handleCustomInputOptionClick"
              v-model="tipCalculatorStore.tipPercentage"
            />
            <label
              class="input__option-label input__option-label--custom"
              for="input-tip-percentage-custom"
              >Custom</label
            >
            <input
              class="input__number input__number--custom"
              id="input-tip-percentage-custom-value"
              name="input-tip-percentage-custom-value"
              type="number"
              min="0"
              placeholder="Custom"
              tabindex="-1"
              ref="input-tip-percentage-custom-value"
              @blur="handleInputEvent"
              @click="handleCustomInputValueClick"
              v-model="tipCalculatorStore.tipPercentageCustom"
            />
          </div>
        </div>

        <span
          v-if="isInputInvalid('input-tip-percentage')"
          class="input__error"
          id="input-tip-percentage-error"
          aria-live="polite"
          >{{ inputErrorMessage('input-tip-percentage') }}</span
        >
        <span
          v-if="isInputInvalid('input-tip-percentage-custom-value')"
          class="input__error"
          id="input-tip-percentage-custom-value-error"
          aria-live="polite"
          >{{ inputErrorMessage('input-tip-percentage-custom-value') }}</span
        >
      </fieldset>

      <div class="input__container">
        <label class="input__label" for="input-number-of-people">Number of People</label>
        <input
          class="input__number"
          id="input-number-of-people"
          name="input-number-of-people"
          type="number"
          min="1"
          placeholder="0"
          required
          v-model="tipCalculatorStore.numberOfPeople"
          @blur="handleInputEvent"
        />
        <img
          src="/icon-person.svg"
          alt="People icon"
          class="input__icon"
          width="13"
          height="16"
          role="img"
          aria-label="Enter the number of people"
        />
        <span
          v-if="isInputInvalid('input-number-of-people')"
          class="input__error"
          id="input-number-of-people-error"
          aria-live="polite"
          >{{ inputErrorMessage('input-number-of-people') }}</span
        >
      </div>
    </section>
  </form>
</template>

<style scoped>
.inputs {
  display: grid;
  row-gap: var(--space-400); /* (m) 32px -> (t) 24px -> (d) 40px */
}

.input__container {
  display: grid;
  gap: var(--space-100);
  grid-template-areas:
    'label error'
    'input input';
  align-items: end;
}

.input__fieldset {
  margin-block: 0;
  margin-inline: 0;
  padding-block: 0;
  padding-inline: 0;
  border: 0;
}

.input__label,
.input__legend {
  grid-area: label;
  color: var(--color-text-input-label);
  font-size: var(--fs-400);
  line-height: var(--lh-400);
  padding-inline: 0;
}

.input__label {
  cursor: pointer;
}

/* input number */

.input__number {
  grid-area: input;
  inline-size: 100%;
  background-color: var(--color-background-input-number);
  color: var(--color-text-input-value);
  font-size: var(--fs-600);
  line-height: var(--lh-600);
  border-radius: var(--br-200);
  border: 0;
  padding: var(--input-padding-block) var(--input-padding-inline);
  text-align: end;
}

.input__number--custom {
  background-color: var(--color-background-input-custom);
  color: var(--color-text-input-custom);
  text-align: center;
}

.input__number::placeholder {
  color: var(--color-text-input-placeholder);
}

.input__number:hover,
.input__number:focus-visible {
  outline: 2px solid var(--color-text-input-outline);
  outline-offset: -2px;
}

/* invalid states */

.input__number:not(:focus):not(:placeholder-shown):invalid {
  outline: 2px solid var(--color-text-input-error);
  outline-offset: -2px;
}

/* input error */

.input__error {
  grid-area: error;
  margin-inline-start: auto;
  color: var(--color-text-input-error);
  font-size: var(--fs-400);
  line-height: var(--lh-400);
  text-align: end;
}

/* input icon */

.input__icon {
  grid-area: input;
  margin-inline-start: var(--input-padding-inline);
  align-self: center;
}

/* input options */

.input__options {
  grid-area: input;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-200);
}

.input__option-container {
  position: relative;
  display: grid;
  grid-template-areas: 'stack';
}

.input__option-container > * {
  grid-area: stack;
}

.input__option {
  cursor: pointer;
  margin: 0;
  outline: 0;
  border: 0;
  border-radius: var(--br-200);
  z-index: 1;
  display: block;
  padding-inline: 0;
  padding-block: 0;
  opacity: 0;
}

.input__option-label {
  cursor: pointer;
  padding: var(--space-100) var(--space-200);
  inline-size: 100%;
  border-radius: var(--br-200);
  text-align: center;
  background-color: var(--color-background-input-option-label);
  color: var(--color-text-input-option-label);
  font-size: var(--fs-600);
  line-height: var(--lh-600);
}

.input__option-label--custom {
  opacity: 0;
}

.input__option-container:has(:checked) .input__option-label {
  background-color: var(--color-background-input-option-label-selected);
  color: var(--color-text-input-option-label-selected);
}

.input__option-container:has(:hover):not(:has(:checked)) .input__option-label,
.input__option-container:has(:focus-visible):not(:has(:checked)) .input__option-label {
  background-color: var(--color-background-input-option-label-active);
  color: var(--color-text-input-option-label-active);
}

.input__option-container:has(:focus-visible) .input__option-label {
  outline: 2px solid var(--color-text-input-outline);
  outline-offset: 2px;
}

/* viewport: mobile -> tablet */
@media (min-width: 40rem) {
  .inputs {
    row-gap: var(--space-300); /* (m) 32px -> (t) 24px -> (d) 40px */
  }

  .input__options {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* viewport: tablet -> desktop */
@media (min-width: 60rem) {
  .inputs {
    row-gap: var(--space-500); /* (m) 32px -> (t) 24px -> (d) 40px */
  }
}
</style>
