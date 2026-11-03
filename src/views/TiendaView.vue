<template>
  <section class="tienda">
    <h1 class="titulo">Tienda</h1>
    <p class="subtitulo">Productos de anime organizados por categoría.</p>

    <div class="filtros">
      <span class="categoria-activa">
        {{ categoriaActiva === '' ? 'Todos' : categoriaActiva }}
      </span>
      <RouterLink v-if="categoriaActiva !== ''" to="/tienda" class="ver-todos">
        Ver toda la tienda
      </RouterLink>
    </div>

    <div class="grid">
      <TarjetaProducto
        v-for="producto in productosFiltrados"
        :key="producto.id"
        :producto="producto"
        @agregar="alAgregar"
      />
    </div>

    <Transition name="aviso">
      <div v-if="mensaje" class="toast">{{ mensaje }}</div>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import type { IProducto, CategoriaProducto } from '../interfaces/IProducto'
import { productos } from '../data/productos'
import { useCarrito } from '../composables/useCarrito'
import { normalizar } from '../utils/normalizar'
import TarjetaProducto from '../components/TarjetaProducto.vue'

const route = useRoute()
const { agregar } = useCarrito()

const mensaje = ref('')
let temporizador: ReturnType<typeof setTimeout> | undefined

const categorias = computed(() => [...new Set(productos.map(p => p.categoria))])


const categoriaActiva = computed<CategoriaProducto | ''>(() => {
  const param = String(route.params.categoria ?? '')
  return categorias.value.find(c => normalizar(c) === normalizar(param)) ?? ''
})

const productosFiltrados = computed(() =>
  categoriaActiva.value === ''
    ? productos
    : productos.filter(p => p.categoria === categoriaActiva.value)
)

const alAgregar = (producto: IProducto) => {
  agregar(producto)
  mensaje.value = `✔ ${producto.nombre} se agregó al carrito`
  clearTimeout(temporizador)
  temporizador = setTimeout(() => {
    mensaje.value = ''
  }, 1800)
}
</script>

<style scoped>
.tienda {
  max-width: 1400px;
  margin: 0 auto;
  padding: 30px;
  background: linear-gradient(145deg, #f5efe8 0%, #e8dccc 100%);
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(139, 115, 85, 0.4);
}

.titulo {
  text-align: center;
  color: #5c4033;
  font-size: 2.4rem;
}

.subtitulo {
  text-align: center;
  color: #8b7355;
  margin-bottom: 20px;
}

.filtros {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-bottom: 25px;
}

.categoria-activa {
  padding: 8px 22px;
  border-radius: 30px;
  background: var(--color-principal);
  color: #f5efe8;
  font-weight: 600;
}

.ver-todos {
  color: #5c4033;
  font-weight: 600;
  text-decoration: underline;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 22px;
}

.toast {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 24px;
  border-radius: 30px;
  background: #5c4033;
  color: #f5efe8;
  font-weight: 600;
  box-shadow: 0 10px 30px rgba(92, 64, 51, 0.4);
  z-index: 200;
}

.aviso-enter-active,
.aviso-leave-active {
  transition: opacity 0.3s;
}

.aviso-enter-from,
.aviso-leave-to {
  opacity: 0;
}
</style>