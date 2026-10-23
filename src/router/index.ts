import { createRouter, createWebHistory } from 'vue-router'
import SeriesCata from '../components/SeriesCata.vue'
import RegistroView from '../views/RegistroView.vue'
import EnConstruccionView from '../views/EnConstruccionView.vue'
import AyudaView from '../views/AyudaView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'inicio', component: SeriesCata },
    { path: '/registro', name: 'registro', component: RegistroView },
    {
      path: '/multimedia',
      name: 'multimedia',
      component: EnConstruccionView,
      meta: {
        titulo: 'Multimedia',
        descripcion: 'Aquí irán los videos de productos.'
      }
    },
    {
      path: '/eventos',
      name: 'eventos',
      component: EnConstruccionView,
      meta: {
        titulo: 'Eventos',
        descripcion: 'Aquí estará el calendario con los próximos eventos.'
      }
    },
    {
      path: '/carrito',
      name: 'carrito',
      component: EnConstruccionView,
      meta: {
        titulo: 'Carrito',
        descripcion: 'Aquí verás los artículos agregados y el total a pagar.'
      }
    },
    {
      path: '/historial',
      name: 'historial',
      component: EnConstruccionView,
      meta: {
        titulo: 'Historial de compras',
        descripcion: 'Aquí se mostrarán las compras realizadas.'
      }
    },
    {
  path: '/ayuda',
  name: 'ayuda',
  component: AyudaView
}
  ]
})

export default router