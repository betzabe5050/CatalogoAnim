import { ref } from 'vue'

const mostrarLogin = ref(false)

export function useLoginModal() {
  const abrirLogin = () => {
    mostrarLogin.value = true
  }

  const cerrarLogin = () => {
    mostrarLogin.value = false
  }

  return { mostrarLogin, abrirLogin, cerrarLogin }
}