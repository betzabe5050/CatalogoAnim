import type { IMenuItem } from '../interfaces/IMenuItem'

export const menu: IMenuItem[] = [
  { etiqueta: 'Inicio', ruta: '/' },
  {
    etiqueta: 'Eventos',
    ruta: '/eventos',
    submenu: [
      { etiqueta: 'Convención', ruta: '/eventos/convencion' },
      { etiqueta: 'Cosplay', ruta: '/eventos/cosplay' },
      { etiqueta: 'Comunidad', ruta: '/eventos/comunidad' }
    ]
  },
  { etiqueta: 'Historial', ruta: '/historial' },
  { etiqueta: 'Ayuda', ruta: '/ayuda' },
  {
    etiqueta: 'Tienda',
    ruta: '/tienda',
    submenu: [
      { etiqueta: 'Funkos', ruta: '/tienda/funkos' },
      { etiqueta: 'Mangas', ruta: '/tienda/mangas' },
      { etiqueta: 'Merch', ruta: '/tienda/merch' },
      { etiqueta: 'Ropa', ruta: '/tienda/ropa' }
    ]
  }
]