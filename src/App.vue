<template>
  <div id="app">
    <NavBar />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue'
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&family=Dancing+Script:wght@400;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Quicksand', sans-serif;
  min-height: 100vh;
  background: linear-gradient(135deg, #d4c5b2 0%, #f5efe8 50%, #e8dccc 100%);
  background-attachment: fixed;
  padding: 20px;
}

#app {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
  text-align: left;
}
</style>