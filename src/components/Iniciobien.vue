<template>
  <div class="inicio-wrapper">
    
    <header class="hero-section">
      <h1 class="hero-title">Bienvenido a Kiseki</h1>
      <p class="hero-subtitle">Tu universo de anime en un solo lugar</p>
    </header>

    
    <div class="cards-grid">
      <RouterLink to="/multimedia" class="card">
        <div class="card-icon">📺</div>
        <h3>Multimedia</h3>
        <p>Nose</p>
      </RouterLink>

      <RouterLink to="/carrito" class="card">
        <div class="card-icon">🛍️</div>
        <h3>Tienda</h3>
        <p>Encuentra tus favoritos.</p>
      </RouterLink>

      <RouterLink to="/eventos" class="card">
        <div class="card-icon">📅</div>
        <h3>Eventos</h3>
        <p>Convenciones y bazares.</p>
      </RouterLink>
    </div>

    
    <section class="preview-section">
      <h2 class="section-title">Recomendaciones Destacadas</h2>
      <div class="series-grid">
        <!-- Aquí usamos .slice(0, 3) para traer solo los 3 primeros -->
        <div v-for="serie in series.slice(0, 3)" :key="serie.id" class="series-card">
          <div class="card-image">
            <img :src="serie.image" :alt="serie.title" />
            <span class="badge">{{ serie.category }}</span>
          </div>
          <div class="card-content">
            <h3>{{ serie.title }}</h3>
            <p class="creator">Creador: {{ serie.creator }}</p>
          </div>
        </div>
      </div>
      
      <!-- Botón para ir al catálogo completo -->
      <div class="btn-container">
        <RouterLink to="/catalogo" class="btn-ver-todo">
          Ver Catálogo Completo
        </RouterLink>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { IAnime } from '../interfaces/IAnime'
import { animes } from '../data/animes'

const series = ref<IAnime[]>(animes)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

.inicio-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

/* 1. Hero Section */
.hero-section {
  text-align: center;
  padding: 40px 0;
}

.hero-title {
  font-family: 'Quicksand', sans-serif;
  font-size: 3rem;
  color: #5c4033;
  margin-bottom: 10px;
}

.hero-subtitle {
  color: #8b7355;
  font-size: 1.2rem;
}

/* 2. Tarjetas */
.cards-grid {
  display: flex;
  gap: 20px;
  margin-bottom: 50px;
  flex-wrap: wrap;
}

.card {
  flex: 1;
  min-width: 200px;
  background: #f5efe8;
  padding: 30px 20px;
  border-radius: 15px;
  text-align: center;
  text-decoration: none;
  color: #5c4033;
  border: 2px solid transparent;
  transition: all 0.3s;
}

.card:hover {
  border-color: #b8957a;
  transform: translateY(-5px);
}

.card-icon {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

/* 3. Vista previa del catálogo */
.section-title {
  color: #5c4033;
  font-family: 'Quicksand', sans-serif;
  font-size: 2rem;
  margin-bottom: 20px;
  padding-left: 15px;
  border-left: 5px solid #b8957a;
}

.series-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

.series-card {
  background: rgba(255, 248, 240, 0.9);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(139, 115, 85, 0.15);
}

.card-image {
  position: relative;
  height: 200px;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(92, 64, 51, 0.9);
  color: #f5efe8;
  padding: 5px 15px;
  border-radius: 30px;
  font-size: 0.8rem;
}

.card-content {
  padding: 20px;
}

.card-content h3 {
  color: #5c4033;
  font-family: 'Quicksand', sans-serif;
  font-size: 1.4rem;
  margin-bottom: 5px;
}

.creator {
  color: #8b7355;
  font-size: 0.95rem;
}

.btn-container {
  text-align: center;
  margin-top: 40px;
}

.btn-ver-todo {
  display: inline-block;
  padding: 12px 30px;
  background: linear-gradient(135deg, #b8957a, #a8846b);
  color: #f5efe8;
  text-decoration: none;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s;
}

.btn-ver-todo:hover {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .cards-grid {
    flex-direction: column;
  }
}
</style>