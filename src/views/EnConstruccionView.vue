<template>
  <section class="pagina">
    <h1 class="pagina-title">{{ titulo }}</h1>
    <p class="pagina-texto">{{ descripcion }}</p>
    <RouterLink to="/" class="btn-volver">← Volver al inicio</RouterLink>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const titulo = computed(() => String(route.meta.titulo ?? 'Sección'))
const descripcion = computed(() => String(route.meta.descripcion ?? ''))
</script>

<style scoped>
.pagina {
  max-width: 800px;
  margin: 0 auto;
  padding: 50px 30px;
  text-align: center;
  background: linear-gradient(145deg, #ffffff 0%, #f0ebeb 100%);
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(60, 20, 30, 0.4);
}

.pagina-title {
  color: var(--texto);
  font-family: 'Quicksand', sans-serif;
  font-size: 3rem;
  margin-bottom: 15px;
}

.pagina-texto {
  color: var(--texto-suave);
  margin-bottom: 30px;
}

.btn-volver {
  display: inline-block;
  padding: 10px 24px;
  background: linear-gradient(135deg, var(--color-principal), var(--color-principal-oscuro));
  color: #ffffff;
  border-radius: 30px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
}

.btn-volver:hover {
  transform: scale(1.04);
}
</style>