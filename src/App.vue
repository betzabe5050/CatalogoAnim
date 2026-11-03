<template>
  <div id="app">
    <NavBar />
    <main class="contenido-pagina">
      <RouterView />
    </main>
    <LoginModal />
    <PiePagina />
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import LoginModal from './components/LoginModal.vue'
import PiePagina from './components/PiePagina.vue'
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&family=Dancing+Script:wght@400;700&display=swap');

* {
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  min-height: calc(100vh - 40px);
  text-align: left;
}

.contenido-pagina {
  flex: 1;
  padding: 16px;
}
</style>