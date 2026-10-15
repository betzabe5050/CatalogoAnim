export interface IUsuario {
  id: number
  nombre: string
  apellidos: string
  correo: string
  telefono: string
  sugerencia?: string
  edad: number
  fechaNacimiento: string
  contrasena: string
  rol: 'admin' | 'usuario'
  permisos: string[]
}