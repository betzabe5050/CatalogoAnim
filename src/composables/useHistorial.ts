import { ref, computed } from 'vue'
import type { IPedido } from '../interfaces/IPedido'
import type { IItemCarrito } from '../interfaces/IItemCarrito'
import { useSesion } from './useSesion'

const CLAVE = 'historial-kiseki'

function cargar(): IPedido[] {
  try {
    const guardado = localStorage.getItem(CLAVE)
    if (guardado) return JSON.parse(guardado) as IPedido[]
  } catch {
    // sin almacenamiento disponible: se empieza sin historial
  }
  return []
}

const pedidos = ref<IPedido[]>(cargar())

function guardar() {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(pedidos.value))
  } catch {
    // si no se puede guardar, el historial sigue funcionando en memoria
  }
}

export function useHistorial() {
  const { usuarioActual } = useSesion()

  // Solo las compras del usuario con sesión, de la más reciente a la más antigua
  const misPedidos = computed(() =>
    pedidos.value
      .filter(p => p.correo === usuarioActual.value?.correo)
      .sort((a, b) => b.fecha.localeCompare(a.fecha))
  )

  const totalGastado = computed(() =>
    misPedidos.value.reduce((suma, p) => suma + p.total, 0)
  )

  const registrarCompra = (items: IItemCarrito[], total: number): IPedido | null => {
    if (!usuarioActual.value || items.length === 0) return null

    const nuevo: IPedido = {
      id: Date.now(),
      fecha: new Date().toISOString(),
      correo: usuarioActual.value.correo,
      // Se guarda una copia, para que el pedido no cambie si el carrito cambia después
      items: items.map(i => ({ producto: { ...i.producto }, cantidad: i.cantidad })),
      total,
      articulos: items.reduce((suma, i) => suma + i.cantidad, 0)
    }

    pedidos.value.push(nuevo)
    guardar()
    return nuevo
  }

  return { misPedidos, totalGastado, registrarCompra }
}