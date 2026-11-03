<template>
  <article class="tarjeta">
    <div class="imagen">
      <img v-if="producto.imagen" :src="producto.imagen" :alt="producto.nombre" />
      <span v-else class="sin-imagen">{{ producto.categoria }}</span>
      <span class="etiqueta">{{ producto.categoria }}</span>
    </div>

    <div class="contenido">
      <h3>{{ producto.nombre }}</h3>
      <p class="serie">{{ producto.serie }} · {{ producto.modelo }}</p>
      <p class="descripcion">{{ producto.descripcion }}</p>

      <div class="pie">
        <span class="precio">{{ formatoMoneda(producto.precio) }}</span>
        <button type="button" class="btn-agregar" @click="emit('agregar', producto)">
          Agregar al carrito
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { IProducto } from '../interfaces/IProducto'
import { formatoMoneda } from '../utils/moneda'

defineProps<{ producto: IProducto }>()

const emit = defineEmits<{
  (e: 'agregar', producto: IProducto): void
}>()
</script>

<style scoped>
.tarjeta {
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(60, 20, 30, 0.15);
}

.imagen {
  position: relative;
  height: 180px;
  background: #f0ebeb;
}

.imagen img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sin-imagen {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--texto-suave);
  font-weight: 700;
  font-size: 1.2rem;
}

.etiqueta {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 4px 14px;
  border-radius: 30px;
  background: rgba(36, 22, 24, 0.9);
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 600;
}

.contenido {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  padding: 18px;
}

h3 {
  color: var(--texto);
  font-size: 1.1rem;
}

.serie {
  color: var(--texto-suave);
  font-size: 0.85rem;
}

.descripcion {
  color: var(--texto-suave);
  font-size: 0.9rem;
  flex: 1;
}

.pie {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 10px;
}

.precio {
  color: var(--texto);
  font-weight: 700;
  font-size: 1.1rem;
}

.btn-agregar {
  padding: 8px 16px;
  border: none;
  border-radius: 30px;
  background: linear-gradient(135deg, var(--color-principal), var(--color-principal-oscuro));
  color: #ffffff;
  font-family: 'Quicksand', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-agregar:hover {
  transform: scale(1.05);
}
</style>