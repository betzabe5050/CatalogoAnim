import { ref } from 'vue'
import type { IUsuario } from '../interfaces/IUsuario'
import { usuarios as usuariosIniciales } from '../data/usuarios'

const CLAVE = 'usuarios-registrados'

function cargar(): IUsuario[] {
  try {
    const guardado = localStorage.getItem(CLAVE)
    if (guardado) return JSON.parse(guardado) as IUsuario[]
  } catch {
    // si falla, se usan los usuarios iniciales
  }
  return [...usuariosIniciales]
}

const usuarios = ref<IUsuario[]>(cargar())

export function useUsuarios() {
  const correoExiste = (correo: string): boolean =>
    usuarios.value.some(
      u => u.correo.toLowerCase() === correo.trim().toLowerCase()
    )

  const registrar = (datos: Omit<IUsuario, 'id'>): IUsuario => {
    const nuevo: IUsuario = {
      ...datos,
      id: Date.now()
    }
    usuarios.value.push(nuevo)
    localStorage.setItem(CLAVE, JSON.stringify(usuarios.value))
    return nuevo
  }

  return { usuarios, correoExiste, registrar }
}