import { createRouter, createWebHistory } from 'vue-router'
import Iniciobien from '../components/Iniciobien.vue'
import RegistroView from '../views/RegistroView.vue'
import EnConstruccionView from '../views/EnConstruccionView.vue'
import AyudaView from '../views/AyudaView.vue'
import CatalogoView from '../views/Catalogoview.vue'
import TiendaView from '../views/TiendaView.vue'
import CarritoView from '../views/CarritoView.vue'
import EventosView from '../views/EventosView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'inicio', component: Iniciobien },
    { path: '/tienda/:categoria?', name: 'tienda', component: TiendaView },
    { path: '/carrito', name: 'carrito', component: CarritoView },
    { path: '/registro', name: 'registro', component: RegistroView },
    
    {
      path: '/eventos/:categoria?',
      name: 'eventos',
      component: EventosView,
      meta: {
        titulo: 'Eventos',
      }
    },
  {
  path: '/carrito',
  name: 'carrito',
  component: () => import('../views/CarritoView.vue'),
  meta: {
    titulo: 'Carrito',
    descripcion: 'Revisa y gestiona los productos de tu carrito'
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
},
{
  path: '/catalogo',
  name: 'catalogo',
  component: CatalogoView,
  meta: { titulo: 'Catálogo Completo' }
}
  ]
})

export default router