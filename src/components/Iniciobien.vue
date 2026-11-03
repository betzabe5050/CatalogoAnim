<template>
  <div class="inicio-wrapper">
    <header class="hero-section">
      <h1 class="hero-title">Bienvenido a Kiseki</h1>
      <p class="hero-subtitle">Tu universo de anime en un solo lugar</p>
    </header>

    <section class="about-section">
      <div class="about-logo">
        <img src="/Logo.png" alt="Logo de Kiseki" />
      </div>

      <div class="about-text">
        <h2 class="section-title">¿Quiénes somos?</h2>
        <p>
          Kiseki es una página dedicada al anime. Aquí encontrarás recomendaciones
          de series para descubrir tu próxima historia favorita, con su sinopsis,
          sus personajes y los lugares donde verlas.
        </p>
        <p>
          También contamos con una tienda de productos de colección, como funkos,
          mangas y merch, organizada por categorías, además de eventos para que
          la comunidad se encuentre y comparta su pasión.
        </p>
      </div>
    </section>

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
  color: var(--texto);
  margin-bottom: 10px;
}

.hero-subtitle {
  color: var(--texto-suave);
  font-size: 1.2rem;
}

/* 2. Quiénes somos */
.about-section {
  display: flex;
  align-items: center;
  gap: 40px;
  margin-bottom: 60px;
  padding: 40px;
  background: linear-gradient(145deg, #ffffff 0%, #f0ebeb 100%);
  border-radius: 24px;
  box-shadow: 0 10px 35px rgba(60, 20, 30, 0.2);
}

.about-logo {
  flex: 0 0 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  border: 3px solid #e3dcdc;
  border-radius: 50%;
  box-shadow: 0 8px 25px rgba(60, 20, 30, 0.15);
}

.about-logo img {
  width: 120px;
  height: auto;
}

.about-text {
  flex: 1;
}

.about-text .section-title {
  margin-bottom: 18px;
}

.about-text p {
  color: var(--texto-suave);
  font-size: 1.05rem;
  line-height: 1.7;
  margin-bottom: 12px;
}

/* 3. Vista previa del catálogo */
.section-title {
  color: var(--texto);
  font-family: 'Quicksand', sans-serif;
  font-size: 2rem;
  margin-bottom: 20px;
  padding-left: 15px;
  border-left: 5px solid var(--color-principal);
}

.series-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

.series-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(60, 20, 30, 0.15);
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
  background: rgba(36, 22, 24, 0.9);
  color: #ffffff;
  padding: 5px 15px;
  border-radius: 30px;
  font-size: 0.8rem;
}

.card-content {
  padding: 20px;
}

.card-content h3 {
  color: var(--texto);
  font-family: 'Quicksand', sans-serif;
  font-size: 1.4rem;
  margin-bottom: 5px;
}

.creator {
  color: var(--texto-suave);
  font-size: 0.95rem;
}

.btn-container {
  text-align: center;
  margin-top: 40px;
}

.btn-ver-todo {
  display: inline-block;
  padding: 12px 30px;
  background: linear-gradient(135deg, var(--color-principal), var(--color-principal-oscuro));
  color: #ffffff;
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
  .about-section {
    flex-direction: column;
    padding: 28px 22px;
    }

  .about-logo {
    flex-basis: auto;
    width: 170px;
    height: 170px;
  }

  .hero-title {
    font-size: 2.2rem;
  }
}
</style>