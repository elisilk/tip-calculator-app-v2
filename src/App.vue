<script setup>
import AppInputs from '@/components/AppInputs.vue'
import AppResults from '@/components/AppResults.vue'
</script>

<template>
  <div class="app__container">
    <header class="app__header">
      <h1>
        <span class="sr-only">Splitter - Tip Calculator App</span>
        <img src="/logo.svg" alt="Splitter app logo" class="app__logo" width="87" height="54" />
      </h1>
    </header>

    <main class="app__main">
      <div class="app__inner">
        <AppInputs />
        <AppResults />
      </div>
    </main>
  </div>
</template>

<style scoped>
.app__container {
  min-block-size: 100svb;
  display: grid;
  grid-template-rows: min-content 1fr;
}

.app__header {
  margin-block-start: var(--header-block-margin-start);
  margin-block-end: var(--header-block-margin-end);
}

.app__logo {
  margin-inline: auto;
}

.app__main {
  background-color: var(--color-background-main);

  inline-size: min(100% - 2 * var(--main-inline-size-gutter), var(--main-inline-size-max));

  border-start-start-radius: var(--br-400);
  border-start-end-radius: var(--br-400);

  padding-inline: var(--main-inline-size-padding);
  padding-block: var(--main-block-size-padding);
}

.app__inner {
  max-inline-size: var(--form-inline-size-max);
  margin-inline: auto;
  display: grid;
  row-gap: var(--space-400); /* (m) 32px -> (t) 40px */
}

/* viewport: mobile -> tablet */
@media (min-width: 40rem) {
  .app__container {
    grid-template-rows: min-content min-content;
    justify-items: center;
    align-content: center;
  }

  .app__main {
    border-radius: var(--br-400);
    box-shadow: var(--shadow1);
    margin-block-end: var(--header-block-margin-start);
  }

  .app__inner {
    row-gap: var(--space-500); /* (m) 32px -> (t) 40px */
  }
}

/* viewport: tablet -> desktop */
@media (min-width: 60rem) {
  .app__inner {
    display: grid;
    grid-template-columns: 379px 1fr;
    column-gap: var(--space-600); /* 48px */
  }
}
</style>
