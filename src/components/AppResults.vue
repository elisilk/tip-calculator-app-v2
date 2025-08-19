<script setup>
import { useTipCalculatorStore } from '@/stores/tipCalculator'
const tipCalculatorStore = useTipCalculatorStore()
</script>

<template>
  <section class="results" aria-labelledby="results-section-heading">
    <h2 id="results-section-heading" class="sr-only">Calculated Results</h2>

    <div class="results__output">
      <div class="result__container">
        <label class="result__label" for="result-tip-amount"
          >Tip Amount <span>/ person</span></label
        >
        <output
          class="result__value"
          id="result-tip-amount"
          name="result-tip-amount"
          form="tip-calculator-form"
          for="input-bill-subtotal input-tip-percentage input-number-of-people"
          aria-live="polite"
          >{{ tipCalculatorStore.tipAmountPerPersonFormatted }}</output
        >
      </div>

      <div class="result__container">
        <label class="result__label" for="result-total">Total <span>/ person</span></label>
        <output
          class="result__value"
          id="result-total"
          name="result-total"
          form="tip-calculator-form"
          for="input-bill-subtotal input-tip-percentage input-number-of-people"
          aria-live="polite"
          >{{ tipCalculatorStore.billTotalPerPersonFormatted }}</output
        >
      </div>
    </div>

    <button
      type="reset"
      form="tip-calculator-form"
      class="results__button"
      :disabled="!tipCalculatorStore.isStarted"
    >
      Reset
    </button>

    <button type="submit" form="tip-calculator-form" class="sr-only">Submit</button>
  </section>
</template>

<style scoped>
/* results */
.results {
  background: var(--color-background-results);
  color: var(--color-text-secondary);
  border-radius: var(--br-300);

  padding: var(--space-300); /* (m) b/i 24px -> (t) b 24px i 32px */

  display: grid;
  grid-template-rows: min-content 1fr;
  gap: var(--space-400); /* (m) 32px -> (t) 16px */
}

/* results output */
.results__output {
  display: grid;
  gap: var(--space-300); /* 24px */
}

.result__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  column-gap: var(--space-100);
  row-gap: 0;
}

.result__label {
  display: grid;
  color: var(--color-text-result-label);
  font-size: var(--fs-400);
  line-height: var(--lh-400);
}

.result__label > span {
  color: var(--color-text-result-sublabel);
  font-size: var(--fs-300);
  line-height: var(--lh-300);
}

.result__value {
  color: var(--color-text-result-value);
  font-size: var(--fs-700);
  line-height: var(--lh-700);
  letter-spacing: var(--ls-700);
}

/* reset button */
.results__button {
  margin-block-start: auto;
  cursor: pointer;
  inline-size: 100%;
  block-size: var(--space-600); /* (m) 48px */
  padding: var(--space-100) var(--space-400); /* (m) 8px 32px -> (t) 8px 40px */

  font-size: var(--fs-500);
  line-height: var(--lh-500);
  text-transform: uppercase;

  color: var(--color-text-button);
  background-color: var(--color-background-button);
  border-radius: var(--br-200);
}

.results__button:hover,
.results__button:focus-visible {
  background-color: var(--color-background-button-active);
}

.results__button:focus-visible {
  outline: 2px dashed var(--color-background-button-active);
  outline-offset: 2px;
}

.results__button:disabled {
  cursor: not-allowed;
  color: var(--color-text-button-disabled);
  background-color: var(--color-background-button-disabled);
}

/* viewport: mobile -> tablet */
@media (min-width: 40rem) {
  .results {
    padding: var(--space-300) var(--space-400); /* (m) b/i 24px -> (t) b 24px i 32px */
    gap: var(--space-200); /* (m) 32px -> (t) 16px */
  }

  .result__value {
    color: var(--color-text-result-value);
    font-size: var(--fs-800);
    line-height: var(--lh-800);
    letter-spacing: var(--ls-800);
  }
}
</style>
