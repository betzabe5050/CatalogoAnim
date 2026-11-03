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
  box-sizing: border-box;
}

body {
  font-family: 'Quicksand', sans-serif;
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    var(--color-vino) 0%,
    var(--color-principal-oscuro) 50%,
    var(--color-vino) 100%
  );
  background-attachment: fixed;
  padding: 20px;
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
  background: linear-gradient(
    145deg,
    var(--panel-claro) 0%,
    var(--panel-medio) 100%
  );
  color: #5c4033;
  border: 6px solid var(--color-principal);
  border-radius: 20px;
  box-shadow:
    inset 0 0 60px rgba(196, 32, 55, 0.35),
    0 8px 25px rgba(60, 0, 10, 0.45);
}
</style>