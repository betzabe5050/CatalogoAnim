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
  background: linear-gradient(145deg, #f5efe8 0%, #e8dccc 100%);
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(139, 115, 85, 0.4);
}

.pagina-title {
  color: #5c4033;
  font-family: 'Dancing Script', cursive;
  font-size: 3rem;
  margin-bottom: 15px;
}

.pagina-texto {
  color: #8b7355;
  margin-bottom: 30px;
}

.btn-volver {
  display: inline-block;
  padding: 10px 24px;
  background: linear-gradient(135deg, #b8957a, #a8846b);
  color: #f5efe8;
  border-radius: 30px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
}

.btn-volver:hover {
  transform: scale(1.04);
}
</style>