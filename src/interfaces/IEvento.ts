export interface IEvento {
  id: number
  titulo: string
  fecha: string          // 'AAAA-MM-DD'
  fechaFin?: string      // último día, solo si dura varios días
  tipo: 'Convención' | 'Cosplay' | 'Comunidad'
  lugar: string
  descripcion: string
  link?: string
}