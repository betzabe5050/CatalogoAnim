<template>
  <section class="carrito">
    <h1 class="titulo">Mi carrito</h1>

    <div v-if="items.length === 0" class="vacio">
      <p>Tu carrito está vacío.</p>
      <RouterLink to="/tienda" class="btn-principal">Ir a la tienda</RouterLink>
    </div>

    <template v-else>
      <ul class="lista">
        <li v-for="item in items" :key="item.producto.id" class="item">
          <div class="info">
            <h3>{{ item.producto.nombre }}</h3>
            <p>{{ item.producto.categoria }} · {{ formatoMoneda(item.producto.precio) }} c/u</p>
          </div>

          <div class="cantidad">
            <button type="button" aria-label="Quitar una pieza" @click="quitar(item.producto.id)">−</button>
            <span>{{ item.cantidad }}</span>
            <button type="button" aria-label="Agregar una pieza" @click="agregar(item.producto)">+</button>
          </div>

          <strong class="subtotal">
            {{ formatoMoneda(item.producto.precio * item.cantidad) }}
          </strong>

          <button type="button" class="btn-eliminar" @click="eliminar(item.producto.id)">
            Eliminar
          </button>
        </li>
      </ul>

      <div class="resumen">
        <p>Artículos: <strong>{{ totalArticulos }}</strong></p>
        <p class="total">Total a pagar: <strong>{{ formatoMoneda(totalPagar) }}</strong></p>
        <button type="button" class="btn-vaciar" @click="vaciar">Vaciar carrito</button>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import { useCarrito } from '../composables/useCarrito'
import { formatoMoneda } from '../utils/moneda'

const { items, totalArticulos, totalPagar, agregar, quitar, eliminar, vaciar } = useCarrito()
</script>

<style scoped>
.carrito {
  max-width: 900px;
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
  margin-bottom: 20px;
}

.vacio {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  color: #8b7355;
}

.btn-principal {
  padding: 10px 24px;
  border-radius: 30px;
  background: linear-gradient(135deg, #b8957a, #a8846b);
  color: #f5efe8;
  font-weight: 600;
  text-decoration: none;
}

.lista {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.item {
  display: grid;
  grid-template-columns: 1fr auto auto auto;
  align-items: center;
  gap: 16px;
  padding: 14px 18px;
  background: rgba(255, 248, 240, 0.9);
  border-radius: 16px;
}

.info h3 {
  color: #5c4033;
  font-size: 1rem;
}

.info p {
  color: #8b7355;
  font-size: 0.85rem;
}

.cantidad {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cantidad button {
  width: 30px;
  height: 30px;
  border: 2px solid #b8957a;
  border-radius: 50%;
  background: none;
  color: #5c4033;
  font-weight: 700;
  cursor: pointer;
}

.cantidad button:hover {
  background: #b8957a;
  color: #f5efe8;
}

.subtotal {
  color: #5c4033;
  min-width: 90px;
  text-align: right;
}

.btn-eliminar,
.btn-vaciar {
  padding: 6px 14px;
  border: 2px solid #b3392f;
  border-radius: 30px;
  background: none;
  color: #b3392f;
  font-family: 'Quicksand', sans-serif;
  font-weight: 600;
  cursor: pointer;
}

.btn-eliminar:hover,
.btn-vaciar:hover {
  background: #b3392f;
  color: #fff;
}

.resumen {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  margin-top: 22px;
  padding-top: 18px;
  border-top: 2px solid #d4c5b2;
  color: #5c4033;
}

.total {
  font-size: 1.4rem;
}

@media (max-width: 640px) {
  .item {
    grid-template-columns: 1fr 1fr;
  }
}
</style>