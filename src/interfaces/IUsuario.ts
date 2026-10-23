export interface IUsuario {
  id: number
  nombre: string
  apellidos: string
  correo: string
  telefono: string
  sugerencia?: string
  edad: number
  fechaNacimiento: string
  contraseña: string
}
export type IUsuarioSesion = Omit<IUsuario, 'contraseña'>