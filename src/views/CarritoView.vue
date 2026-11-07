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

        <div class="acciones">
          <button type="button" class="btn-vaciar" @click="vaciar">Vaciar carrito</button>
          <button type="button" class="btn-finalizar" @click="finalizarCompra">
            Finalizar compra
          </button>
        </div>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCarrito } from '../composables/useCarrito'
import { useSesion } from '../composables/useSesion'
import { useLoginModal } from '../composables/useLoginModal'
import { useHistorial } from '../composables/useHistorial'
import { formatoMoneda } from '../utils/moneda'

const router = useRouter()
const { items, totalArticulos, totalPagar, agregar, quitar, eliminar, vaciar } = useCarrito()
const { estaLogueado } = useSesion()
const { abrirLogin } = useLoginModal()
const { registrarCompra } = useHistorial()

const finalizarCompra = () => {
  // Para comprar se necesita sesión
  if (!estaLogueado.value) {
    abrirLogin()
    return
  }

  const pedido = registrarCompra(items.value, totalPagar.value)
  if (pedido) {
    vaciar()
    router.push('/historial')
  }
}
</script>

<style scoped>
.carrito {
  max-width: 900px;
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
  margin-bottom: 20px;
}

.vacio {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  color: var(--texto-suave);
}

.btn-principal {
  padding: 10px 24px;
  border-radius: 30px;
  background: linear-gradient(135deg, var(--color-principal), var(--color-principal-oscuro));
  color: #ffffff;
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
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
}

.info h3 {
  color: var(--texto);
  font-size: 1rem;
}

.info p {
  color: var(--texto-suave);
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
  border: 2px solid var(--color-principal);
  border-radius: 50%;
  background: none;
  color: var(--texto);
  font-weight: 700;
  cursor: pointer;
}

.cantidad button:hover {
  background: var(--color-principal);
  color: #ffffff;
}

.subtotal {
  color: var(--texto);
  min-width: 90px;
  text-align: right;
}

.btn-eliminar,
.btn-vaciar {
  padding: 6px 14px;
  border: 2px solid var(--color-principal);
  border-radius: 30px;
  background: none;
  color: var(--color-principal);
  font-family: 'Quicksand', sans-serif;
  font-weight: 600;
  cursor: pointer;
}

.btn-eliminar:hover,
.btn-vaciar:hover {
  background: var(--color-principal);
  color: #fff;
}

.resumen {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  margin-top: 22px;
  padding-top: 18px;
  border-top: 2px solid #e3dcdc;
  color: var(--texto);
}

.total {
  font-size: 1.4rem;
}

.acciones {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 6px;
}

.btn-finalizar {
  padding: 8px 22px;
  border: none;
  border-radius: 30px;
  background: linear-gradient(135deg, var(--color-principal), var(--color-principal-oscuro));
  color: #ffffff;
  font-family: 'Quicksand', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-finalizar:hover {
  transform: scale(1.05);
}

@media (max-width: 640px) {
  .item {
    grid-template-columns: 1fr 1fr;
  }

  .acciones {
    justify-content: stretch;
    width: 100%;
  }

  .acciones button {
    flex: 1;
  }
}
</style>