export interface ISubmenuItem {
  etiqueta: string
  ruta: string
}

export interface IMenuItem {
  etiqueta: string
  ruta: string
  submenu?: ISubmenuItem[]
}