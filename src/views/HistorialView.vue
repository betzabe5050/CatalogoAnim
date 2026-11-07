<template>
  <section class="historial">
    <h1 class="titulo">Historial de compras</h1>

    <!-- Sin sesión -->
    <div v-if="!estaLogueado" class="vacio">
      <p>Inicia sesión para ver tus compras.</p>
      <button type="button" class="btn" @click="abrirLogin">Iniciar sesión</button>
    </div>

    <!-- Con sesión, pero sin compras -->
    <div v-else-if="misPedidos.length === 0" class="vacio">
      <p>Aún no tienes compras.</p>
      <RouterLink to="/tienda" class="btn">Ir a la tienda</RouterLink>
    </div>

    <!-- Con compras -->
    <template v-else>
      <p class="resumen">
        {{ misPedidos.length }} {{ misPedidos.length === 1 ? 'compra' : 'compras' }}
        · Total gastado: <strong>{{ formatoMoneda(totalGastado) }}</strong>
      </p>

      <article v-for="pedido in misPedidos" :key="pedido.id" class="pedido">
        <header class="pedido-cabecera">
          <div>
            <h2>Compra del {{ formatearFecha(pedido.fecha) }}</h2>
            <small>{{ pedido.articulos }} {{ pedido.articulos === 1 ? 'artículo' : 'artículos' }}</small>
          </div>
          <span class="pedido-total">{{ formatoMoneda(pedido.total) }}</span>
        </header>

        <ul class="pedido-items">
          <li v-for="item in pedido.items" :key="item.producto.id">
            <img
              v-if="item.producto.imagen"
              :src="item.producto.imagen"
              :alt="item.producto.nombre"
            />
            <div class="info">
              <strong>{{ item.producto.nombre }}</strong>
              <small>{{ item.cantidad }} × {{ formatoMoneda(item.producto.precio) }}</small>
            </div>
            <span class="subtotal">
              {{ formatoMoneda(item.producto.precio * item.cantidad) }}
            </span>
          </li>
        </ul>

        <button type="button" class="btn-secundario" @click="volverAComprar(pedido)">
          Volver a comprar
        </button>
      </article>
    </template>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useSesion } from '../composables/useSesion'
import { useLoginModal } from '../composables/useLoginModal'
import { useCarrito } from '../composables/useCarrito'
import { useHistorial } from '../composables/useHistorial'
import { formatoMoneda } from '../utils/moneda'
import type { IPedido } from '../interfaces/IPedido'

const router = useRouter()
const { estaLogueado } = useSesion()
const { abrirLogin } = useLoginModal()
const { agregar } = useCarrito()
const { misPedidos, totalGastado } = useHistorial()

function formatearFecha(iso: string): string {
  return new Date(iso).toLocaleString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Agrega al carrito los mismos productos y cantidades de esa compra
function volverAComprar(pedido: IPedido) {
  pedido.items.forEach(item => {
    for (let i = 0; i < item.cantidad; i++) {
      agregar(item.producto)
    }
  })
  router.push('/carrito')
}
</script>

<style scoped>
.historial {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px;
  background: linear-gradient(145deg, #ffffff 0%, #f0ebeb 100%);
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(60, 20, 30, 0.2);
  color: var(--texto);
}

.titulo {
  text-align: center;
  font-size: clamp(1.8rem, 5vw, 2.4rem);
  margin-bottom: 20px;
}

.vacio {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 30px 0;
  color: var(--texto-suave);
}

.resumen {
  text-align: center;
  color: var(--texto-suave);
  margin-bottom: 20px;
}

.pedido {
  margin-bottom: 20px;
  padding: 20px;
  background: #ffffff;
  border: 1px solid #e3dcdc;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(60, 20, 30, 0.08);
}

.pedido-cabecera {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e3dcdc;
}

.pedido-cabecera h2 {
  font-size: 1.1rem;
}

.pedido-cabecera small {
  color: var(--texto-suave);
}

.pedido-total {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-principal);
}

.pedido-items {
  list-style: none;
  padding: 0;
  margin: 12px 0;
  display: grid;
  gap: 10px;
}

.pedido-items li {
  display: flex;
  align-items: center;
  gap: 12px;
}

.pedido-items img {
  width: 56px;
  height: 56px;
  object-fit: cover;
  border-radius: 10px;
  flex-shrink: 0;
}

.info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.info small {
  color: var(--texto-suave);
}

.subtotal {
  font-weight: 600;
}

.btn,
.btn-secundario {
  display: inline-block;
  padding: 10px 22px;
  border-radius: 30px;
  font-family: 'Quicksand', sans-serif;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: transform 0.2s;
}

.btn {
  border: none;
  background: var(--color-principal);
  color: #ffffff;
}

.btn-secundario {
  border: 2px solid var(--color-principal);
  background: none;
  color: var(--color-principal);
}

.btn:hover,
.btn-secundario:hover {
  transform: scale(1.05);
}

@media (max-width: 600px) {
  .historial {
    padding: 18px;
  }

  .pedido-cabecera {
    flex-direction: column;
  }
}
</style>