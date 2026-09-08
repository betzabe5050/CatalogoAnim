<template>
  <div id="app">
    <SeriesCatalog />
  </div>
</template>

<script setup>
import SeriesCatalog from './components/SeriesCata.vue'
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Quicksand', sans-serif;
  min-height: 100vh;
  background: linear-gradient(135deg, #d4c5b2 0%, #f5efe8 50%, #e8dccc 100%);
  padding: 20px;
}

#app {
  min-height: 100vh;
}
</style>