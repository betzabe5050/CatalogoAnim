import { createRouter, createWebHistory } from 'vue-router'
import Iniciobien from '../components/Iniciobien.vue'
import RegistroView from '../views/RegistroView.vue'
import EnConstruccionView from '../views/EnConstruccionView.vue'
import AyudaView from '../views/AyudaView.vue'
import CatalogoView from '../views/Catalogoview.vue'
import TiendaView from '../views/TiendaView.vue'
import CarritoView from '../views/CarritoView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'inicio', component: Iniciobien },
    { path: '/tienda', name: 'tienda', component: TiendaView },
    { path: '/carrito', name: 'carrito', component: CarritoView },
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