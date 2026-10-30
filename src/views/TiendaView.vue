<template>
  <section class="tienda">
    <h1 class="titulo">Tienda</h1>
    <p class="subtitulo">Productos de anime organizados por categoría.</p>

    <div class="filtros">
      <button
        type="button"
        class="filtro"
        :class="{ activo: categoriaActiva === '' }"
        @click="categoriaActiva = ''"
      >
        Todos
      </button>
      <button
        v-for="cat in categorias"
        :key="cat"
        type="button"
        class="filtro"
        :class="{ activo: categoriaActiva === cat }"
        @click="categoriaActiva = cat"
      >
        {{ cat }}
      </button>
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
import type { IProducto, CategoriaProducto } from '../interfaces/IProducto'
import { productos } from '../data/productos'
import { useCarrito } from '../composables/useCarrito'
import TarjetaProducto from '../components/TarjetaProducto.vue'

const { agregar } = useCarrito()

const categoriaActiva = ref<CategoriaProducto | ''>('')
const mensaje = ref('')
let temporizador: ReturnType<typeof setTimeout> | undefined

const categorias = computed(() => [...new Set(productos.map(p => p.categoria))])

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
  justify-content: center;
  gap: 10px;
  margin-bottom: 25px;
}

.filtro {
  padding: 8px 20px;
  border: 2px solid #d4c5b2;
  border-radius: 30px;
  background: rgba(255, 248, 240, 0.8);
  color: #5c4033;
  font-family: 'Quicksand', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.filtro:hover {
  border-color: #b8957a;
}

.filtro.activo {
  background: #b8957a;
  border-color: #b8957a;
  color: #f5efe8;
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