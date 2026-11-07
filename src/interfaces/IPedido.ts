import type { IItemCarrito } from './IItemCarrito'

export interface IPedido {
  id: number
  fecha: string        // fecha y hora en formato ISO
  correo: string       // correo del usuario que compró
  items: IItemCarrito[]
  total: number
  articulos: number
}