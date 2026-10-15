import { createRouter, createWebHistory } from 'vue-router'
import SeriesCata from '../components/SeriesCata.vue'
import RegistroView from '../views/RegistroView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'inicio', component: SeriesCata },
    { path: '/registro', name: 'registro', component: RegistroView }
  ]
})

export default router