import { ref, computed } from 'vue'
import type { IProducto } from '../interfaces/IProducto'
import type { IItemCarrito } from '../interfaces/IItemCarrito'

const CLAVE = 'carrito-kiseki'

function cargar(): IItemCarrito[] {
  try {
    const guardado = localStorage.getItem(CLAVE)
    if (guardado) return JSON.parse(guardado) as IItemCarrito[]
  } catch {
    // sin almacenamiento disponible: se empieza con el carrito vacío
  }
  return []
}

const items = ref<IItemCarrito[]>(cargar())

function guardar() {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(items.value))
  } catch {
    // si no se puede guardar, el carrito sigue funcionando en memoria
  }
}

export function useCarrito() {
  // Variables computadas: su valor sale de otras variables
  const totalArticulos = computed(() =>
    items.value.reduce((suma, item) => suma + item.cantidad, 0)
  )

  const totalPagar = computed(() =>
    items.value.reduce((suma, item) => suma + item.producto.precio * item.cantidad, 0)
  )

  const agregar = (producto: IProducto) => {
    const existente = items.value.find(i => i.producto.id === producto.id)
    if (existente) {
      existente.cantidad++
    } else {
      items.value.push({ producto, cantidad: 1 })
    }
    guardar()
  }

  const eliminar = (id: number) => {
    items.value = items.value.filter(i => i.producto.id !== id)
    guardar()
  }

  const quitar = (id: number) => {
    const existente = items.value.find(i => i.producto.id === id)
    if (!existente) return
    existente.cantidad--
    if (existente.cantidad <= 0) {
      eliminar(id)
    } else {
      guardar()
    }
  }

  const vaciar = () => {
    items.value = []
    guardar()
  }

  return { items, totalArticulos, totalPagar, agregar, quitar, eliminar, vaciar }
}