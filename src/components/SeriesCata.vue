<template>
  <div class="catalog-container">
    <h1 class="main-title">Catálogo sobre Animes</h1>
    
    
    <div class="filters-section">
      <input 
        v-model="searchTerm" 
        placeholder="Buscar animes o personajes..."
        class="search-input"
      />
      <select v-model="selectedCategory" class="filter-select">
        <option value="">Todas las categorías</option>
        <option v-for="cat in categories" :key="cat" :value="cat">
          {{ cat }}
        </option>
      </select>
    </div>

    
    <section class="series-section">
      <h2 class="section-title"> Mis recomendaciones</h2>
      <div class="series-grid">
        <div v-for="serie in filteredSeries" :key="serie.id" class="series-card">
          <div class="card-image">
            <img :src="serie.image" :alt="serie.title" />
            <span class="badge">{{ serie.category }}</span>
          </div>
          <div class="card-content">
            <h3>{{ serie.title }}</h3>
            <p class="creator">Creador: {{ serie.creator }}</p>
            <p class="year">Año: {{ serie.year }}</p>
            
            
            <div class="features">
              <h4> Características:</h4>
              <ul>
                <li v-for="(feature, index) in serie.features" :key="index">
                  {{ feature }}
                </li>
              </ul>
            </div>

            
            <div class="characters">
              <h4>Personajes principales:</h4>
              <div class="character-list">
                <div v-for="char in serie.characters" :key="char.name" class="character-item">
                  <img :src="char.avatar" :alt="char.name" class="character-avatar" />
                  <span>{{ char.name }}</span>
                </div>
              </div>
            </div>


      
        <button @click="showDetails(serie)" class="details-btn">
          Ver más detalles 
        </button>
      </div>
    </div>
  </div>
</section>

    
   <section class="influencers-section">
  <h2 class="section-title">Opiniones de Influencers</h2>
  <div class="influencers-grid">
    <div v-for="influencer in influencers" :key="influencer.name" class="influencer-card">
      <div class="influencer-header">
        <img :src="influencer.avatar" :alt="influencer.name" class="influencer-avatar" />
        <div class="influencer-info">
          <h3>{{ influencer.name }}</h3>
          <p class="influencer-role">{{ influencer.role }}</p>
        </div>
      </div>
      <p class="opinion">"{{ influencer.opinion }}"</p>
      <a :href="influencer.link" target="_blank" class="social-link">
        <span class="yt-icon">▶</span> Ver canal en YouTube
      </a>
    </div>
  </div>
</section>

    
    <div v-if="selectedSerie" class="modal-overlay" @click="closeDetails">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeDetails">✕</button>
        <h2>{{ selectedSerie.title }}</h2>
        <div class="modal-body">
          <img :src="selectedSerie.image" :alt="selectedSerie.title" class="modal-image" />
          <div class="modal-info">
            <p><strong> Creador:</strong> {{ selectedSerie.creator }}</p>
            <p><strong>Año:</strong> {{ selectedSerie.year }}</p>
            <p><strong>Categoría:</strong> {{ selectedSerie.category }}</p>
            <p><strong>Sinopsis:</strong> {{ selectedSerie.synopsis }}</p>
            <h4> Características:</h4>
            <ul>
              <li v-for="(feature, index) in selectedSerie.features" :key="index">
                {{ feature }}
              </li>
            </ul>
            <h4>Personajes:</h4>
            <ul>
              <li v-for="char in selectedSerie.characters" :key="char.name">
                {{ char.name }} - {{ char.role }}
              </li>
            </ul>

            <div class="modal-platforms" v-if="selectedSerie.platforms">
              <h4> Disponible en:</h4>
              <div class="platform-list">
              <a 
              v-for="platform in selectedSerie.platforms" 
              :key="platform.name"
              :href="platform.link"
              target="_blank"
              class="platform-link"
              >
              <img :src="platform.icon" :alt="platform.name" class="platform-icon" />
              <span>{{ platform.name }}</span>
              <span class="platform-badge">Necesitas suscripción</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { IAnime } from '../interfaces/IAnime'
import { animes } from '../data/animes'
import { influencers as influencersData } from '../data/influencers'

const searchTerm = ref('')
const selectedCategory = ref('')
const selectedSerie = ref<IAnime | null>(null)

const series = ref<IAnime[]>(animes)
const influencers = ref(influencersData)

const categories = computed(() => {
  const cats = series.value.map(s => s.category)
  return [...new Set(cats)]
})

const filteredSeries = computed(() => {
  let filtered = series.value

  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase()
    filtered = filtered.filter(serie =>
      serie.title.toLowerCase().includes(term) ||
      serie.creator.toLowerCase().includes(term) ||
      serie.characters.some(char => char.name.toLowerCase().includes(term))
    )
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(serie =>
      serie.category === selectedCategory.value
    )
  }

  return filtered
})

const showDetails = (serie: IAnime) => {
  selectedSerie.value = serie
  document.body.style.overflow = 'hidden'
}

const closeDetails = () => {
  selectedSerie.value = null
  document.body.style.overflow = 'auto'
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&family=Dancing+Script:wght@400;700&display=swap');

.catalog-container {
  background: linear-gradient(145deg, #f5efe8 0%, #e8dccc 100%);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 20px 60px rgba(139, 115, 85, 0.4);
  max-width: 1400px;
  margin: 0 auto;
  font-family: 'Quicksand', sans-serif;
}

.main-title {
  text-align: center;
  color: #5c4033;
  font-family: 'Quicksand',  sans-serif;
  font-weight: 500;
  font-size: 3rem;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 3px solid #b8957a;
  letter-spacing: 1px;
}

.filters-section {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
  justify-content: center;
}

.search-input {
  flex: 1;
  min-width: 250px;
  padding: 12px 20px;
  border: 2px solid #d4c5b2;
  border-radius: 30px;
  font-size: 1rem;
  font-family: 'Quicksand', sans-serif;
  background: rgba(255, 248, 240, 0.8);
  transition: all 0.3s;
  color: #5c4033;
}

.search-input:focus {
  outline: none;
  border-color: #b8957a;
  box-shadow: 0 0 15px rgba(184, 149, 122, 0.2);
}

.filter-select {
  padding: 12px 20px;
  border: 2px solid #d4c5b2;
  border-radius: 30px;
  font-size: 1rem;
  font-family: 'Quicksand', sans-serif;
  background: rgba(255, 248, 240, 0.8);
  cursor: pointer;
  color: #5c4033;
  transition: all 0.3s;
}

.filter-select:focus {
  outline: none;
  border-color: #b8957a;
}

.section-title {
  color: #5c4033;
  font-family: 'Quicksand',  sans-serif;
  font-size: 2.5rem;
  margin: 40px 0 20px 0;
  padding-left: 15px;
  border-left: 5px solid #b8957a;
  font-weight: 400;
}

.series-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.series-card {
  background: rgba(255, 248, 240, 0.9);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(139, 115, 85, 0.15);
  transition: transform 0.3s, box-shadow 0.3s;
  backdrop-filter: blur(10px);
}

.series-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(139, 115, 85, 0.25);
}

.card-image {
  position: relative;
  height: 200px;
  overflow: hidden;
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
  font-weight: 600;
  backdrop-filter: blur(5px);
}

.card-content {
  padding: 20px;
}

.card-content h3 {
  color: #5c4033;
  font-family: 'Dancing Script', cursive;
  font-size: 1.8rem;
  margin-bottom: 5px;
}

.creator, .year {
  color: #8b7355;
  margin: 5px 0;
  font-weight: 400;
  font-size: 0.95rem;
}

.features {
  margin: 15px 0;
}

.features h4 {
  color: #5c4033;
  margin-bottom: 8px;
  font-weight: 600;
}

.features ul {
  list-style: none;
  padding: 0;
}

.features ul li {
  padding: 4px 0;
  color: #6b5a4a;
  font-size: 0.9rem;
}

.features ul li::before {
  content: "✦ ";
  color: #b8957a;
}

.characters {
  margin: 15px 0;
}

.characters h4 {
  color: #5c4033;
  margin-bottom: 8px;
  font-weight: 600;
}

.character-list {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.character-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.8rem;
  color: #6b5a4a;
}

.character-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #d4c5b2;
  transition: transform 0.3s;
}

.character-avatar:hover {
  transform: scale(1.1);
}

.details-btn {
  width: 100%;
  padding: 10px;
  background: linear-gradient(135deg, #b8957a, #a8846b);
  color: #f5efe8;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Quicksand', sans-serif;
  cursor: pointer;
  transition: all 0.3s;
  letter-spacing: 1px;
}

.details-btn:hover {
  transform: scale(1.02);
  box-shadow: 0 5px 20px rgba(184, 149, 122, 0.3);
}

.influencers-section {
  margin-top: 50px;
  padding-top: 30px;
  border-top: 2px solid #d4c5b2;
}

.influencers-grid {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.influencer-card {
  background: rgba(255, 248, 240, 0.9);
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(139, 115, 85, 0.1);
  transition: all 0.3s ease;
  max-width: 450px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.influencer-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(184, 149, 122, 0.25);
}

.influencer-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
  width: 100%;
  justify-content: center;
}
.influencer-avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #b8957a;
  flex-shrink: 0;
}

.influencer-info {
  text-align: left;
}

.influencer-info h3 {
  color: #5c4033;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  margin: 0;
}
.influencer-role {
  color: #8b7355;
  font-size: 0.85rem;
  font-weight: 400;
  margin: 4px 0 0 0;
}

.opinion {
  color: #6b5a4a;
  font-style: italic;
  margin: 10px 0 15px 0;
  font-size: 0.95rem;
  line-height: 1.6;
  font-weight: 300;
  text-align: center;
  padding: 0 10px;
}
.social-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  color: #b8957a;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s;
  padding: 8px 20px;
  border-radius: 30px;
  background: rgba(184, 149, 122, 0.1);
}
.social-link:hover {
  color: #5c4033;
  background: rgba(184, 149, 122, 0.2);
  transform: translateX(4px);
}

.yt-icon {
  font-size: 0.8rem;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(92, 64, 51, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: linear-gradient(145deg, #f5efe8, #e8dccc);
  border-radius: 30px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 30px;
  position: relative;
  box-shadow: 0 30px 80px rgba(92, 64, 51, 0.5);
}

.modal-close {
  position: sticky;
  top: 0;
  float: right;
  background: #b8957a;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s;
}

.modal-close:hover {
  background: #5c4033;
  transform: rotate(90deg);
}

.modal-body {
  display: flex;
  gap: 20px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.modal-image {
  width: 100%;
  max-width: 300px;
  border-radius: 15px;
  object-fit: cover;
  box-shadow: 0 8px 25px rgba(139, 115, 85, 0.2);
}

.modal-info {
  flex: 1;
}

.modal-info h4 {
  margin-top: 15px;
  color: #5c4033;
  font-weight: 600;
}

.modal-info ul {
  margin-left: 20px;
  color: #6b5a4a;
}

.modal-platforms {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 2px solid rgba(184, 149, 122, 0.15);
}

.modal-platforms h4 {
  color: #5c4033;
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 10px;
  letter-spacing: 0.5px;
}

.modal-platforms .platform-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.modal-platforms .platform-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  background: rgba(255, 248, 240, 0.6);
  border-radius: 12px;
  color: #5c4033;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s;
  border: 1px solid rgba(184, 149, 122, 0.1);
}

.modal-platforms .platform-link:hover {
  background: rgba(255, 248, 240, 0.9);
  border-color: #b8957a;
  transform: translateX(5px);
  box-shadow: 0 2px 10px rgba(184, 149, 122, 0.15);
}

.modal-platforms .platform-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.modal-platforms .platform-badge {
  margin-left: auto;
  font-size: 0.7rem;
  color: #8b7355;
  background: rgba(184, 149, 122, 0.1);
  padding: 2px 12px;
  border-radius: 20px;
  font-weight: 400;
  letter-spacing: 0.3px;
}


@media (max-width: 768px) {
  .series-grid {
    grid-template-columns: 1fr;
  }
  
  .modal-body {
    flex-direction: column;
  }
  
  .modal-image {
    max-width: 100%;
  }
  
  .filters-section {
    flex-direction: column;
  }
  
  .main-title {
    font-size: 2.2rem;
  }
}
</style>