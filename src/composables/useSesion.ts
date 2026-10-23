import { ref, computed } from 'vue'
import type { IUsuarioSesion } from '../interfaces/IUsuario'
import { useUsuarios } from './useUsuarios'

const CLAVE = 'sesion-actual'

function cargar(): IUsuarioSesion | null {
  try {
    const guardado = localStorage.getItem(CLAVE)
    if (guardado) return JSON.parse(guardado) as IUsuarioSesion
  } catch {
    // si falla, se considera que no hay sesión
  }
  return null
}

const usuarioActual = ref<IUsuarioSesion | null>(cargar())

export function useSesion() {
  const { usuarios } = useUsuarios()

  const estaLogueado = computed(() => usuarioActual.value !== null)

  const iniciarSesion = (correo: string, contrasena: string): boolean => {
    const encontrado = usuarios.value.find(
      u =>
        u.correo.toLowerCase() === correo.trim().toLowerCase() &&
        u.contraseña === contrasena
    )
    if (!encontrado) return false

    const { contraseña: _omitida, ...sinContrasena } = encontrado
    usuarioActual.value = sinContrasena
    localStorage.setItem(CLAVE, JSON.stringify(sinContrasena))
    return true
  }

  const cerrarSesion = () => {
    usuarioActual.value = null
    localStorage.removeItem(CLAVE)
  }

  return { usuarioActual, estaLogueado, iniciarSesion, cerrarSesion }
}