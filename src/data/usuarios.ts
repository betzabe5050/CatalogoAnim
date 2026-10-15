import type { IUsuario } from '../interfaces/IUsuario'

export const usuarios: IUsuario[] = [
  {
    id: 1,
    nombre: 'Admin',
    apellidos: 'General',
    correo: 'admin@catalogo.com',
    telefono: '9990000001',
    edad: 25,
    fechaNacimiento: '2001-01-01',
    contrasena: 'admin123',
    rol: 'admin',
    permisos: ['ver-catalogo', 'comprar', 'crear-eventos', 'ver-historial']
  },
  {
    id: 2,
    nombre: 'Usuario',
    apellidos: 'Prueba',
    correo: 'usuario@catalogo.com',
    telefono: '9990000002',
    edad: 20,
    fechaNacimiento: '2006-05-10',
    contrasena: 'user123',
    rol: 'usuario',
    permisos: ['ver-catalogo', 'comprar', 'ver-historial']
  }
]