<template>
  <section class="tienda">
    <h1 class="titulo">Tienda</h1>
    <p class="subtitulo">Productos de anime organizados por categoría.</p>

        <div v-if="categoriaActiva !== ''" class="filtros">
      <RouterLink to="/tienda" class="chip" title="Quitar filtro">
        {{ categoriaActiva }}
        <span aria-hidden="true">✕</span>
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
  background: linear-gradient(145deg, #ffffff 0%, #f0ebeb 100%);
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(60, 20, 30, 0.4);
}

.titulo {
  text-align: center;
  color: var(--texto);
  font-size: 2.4rem;
}

.subtitulo {
  text-align: center;
  color: var(--texto-suave);
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





.chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border: 1.5px solid var(--color-principal);
  border-radius: 30px;
  color: var(--color-principal);
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
}

.chip:hover {
  background: var(--color-principal);
  color: #ffffff;
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
  background: var(--texto);
  color: #ffffff;
  font-weight: 600;
  box-shadow: 0 10px 30px rgba(36, 22, 24, 0.4);
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