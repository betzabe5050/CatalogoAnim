export type CategoriaProducto = 'Funkos' | 'Mangas' | 'Merch' | 'Ropa'

export interface IProducto {
  id: number
  nombre: string
  serie: string
  modelo: string
  categoria: CategoriaProducto
  precio: number
  imagen: string
  descripcion: string
}