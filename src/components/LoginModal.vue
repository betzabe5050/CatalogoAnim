<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="mostrarLogin"
        class="overlay"
        @click.self="cerrarLogin"
      >
        <div class="modal" role="dialog" aria-modal="true" aria-label="Iniciar sesión">
          <div class="modal-header">
            <h2 class="modal-title">Iniciar sesión</h2>
            <button type="button" class="btn-cerrar" aria-label="Cerrar" @click="cerrarLogin">
              ✕
            </button>
          </div>

          <!-- Paso 1: elegir con qué iniciar sesión -->
          <div v-if="metodo === null" class="opciones">
            <p class="subtitulo">Elige cómo quieres iniciar sesión</p>

            <button type="button" class="btn-opcion btn-principal" @click="metodo = 'correo'">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round"
                   stroke-linejoin="round" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="3" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              Continuar con correo
            </button>

            <button type="button" class="btn-opcion" @click="avisoGoogle = true">
              <span class="letra-g">G</span>
              Continuar con Google
            </button>
            <p v-if="avisoGoogle" class="aviso">
              El inicio de sesión con Google todavía no está disponible.
            </p>

            <div class="separador"><span>o</span></div>

            <p class="registro-link">
              ¿No tienes cuenta?
              <RouterLink to="/registro" @click="cerrarLogin">Regístrate</RouterLink>
            </p>
          </div>

          <!-- Paso 2: formulario con correo y contraseña -->
          <form v-else class="login-form" @submit.prevent="enviar" novalidate>
            <div class="campo">
              <label>Correo electrónico</label>
              <input v-model="form.correo" type="email" placeholder="correo@ejemplo.com" />
              <small v-if="intentoEnvio && errores.correo" class="error">{{ errores.correo }}</small>
            </div>

            <div class="campo">
              <label>Contraseña</label>
              <input v-model="form.contrasena" type="password" placeholder="Tu contraseña" />
              <small v-if="intentoEnvio && errores.contrasena" class="error">{{ errores.contrasena }}</small>
            </div>

            <p v-if="errorLogin" class="error-general">{{ errorLogin }}</p>

            <button type="submit" class="btn-opcion btn-principal">Iniciar sesión</button>

            <button type="button" class="btn-regresar" @click="regresar">
              ← Elegir otro método
            </button>

            <p class="registro-link">
              ¿No tienes cuenta?
              <RouterLink to="/registro" @click="cerrarLogin">Regístrate</RouterLink>
            </p>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue'
import { useSesion } from '../composables/useSesion'
import { useLoginModal } from '../composables/useLoginModal'

const { iniciarSesion } = useSesion()
const { mostrarLogin, cerrarLogin } = useLoginModal()

// Si prefieres ir directo al formulario (como en la imagen), cambia null por 'correo'
const metodo = ref<'correo' | null>(null)
const avisoGoogle = ref(false)
const intentoEnvio = ref(false)
const errorLogin = ref('')

const form = reactive({
  correo: '',
  contrasena: ''
})

// Variables computadas: se calculan a partir de lo que escribe el usuario
const errores = computed(() => ({
  correo: form.correo.trim() === '' ? 'El correo es obligatorio' : '',
  contrasena: form.contrasena === '' ? 'La contraseña es obligatoria' : ''
}))

const formularioValido = computed(() =>
  Object.values(errores.value).every(e => e === '')
)

const enviar = () => {
  intentoEnvio.value = true
  errorLogin.value = ''
  if (!formularioValido.value) return

  const correcto = iniciarSesion(form.correo, form.contrasena)
  if (!correcto) {
    errorLogin.value = 'Correo o contraseña incorrectos'
    return
  }
  cerrarLogin()
}

const regresar = () => {
  metodo.value = null
  intentoEnvio.value = false
  errorLogin.value = ''
  form.correo = ''
  form.contrasena = ''
}

const reiniciar = () => {
  regresar()
  avisoGoogle.value = false
}

// Al abrir se bloquea el scroll de la página; al cerrar se limpia todo
watch(mostrarLogin, abierto => {
  document.body.style.overflow = abierto ? 'hidden' : 'auto'
  if (!abierto) reiniciar()
})

// Cerrar con la tecla Esc
const alPresionarTecla = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && mostrarLogin.value) cerrarLogin()
}

onMounted(() => window.addEventListener('keydown', alPresionarTecla))
onUnmounted(() => window.removeEventListener('keydown', alPresionarTecla))
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(92, 64, 51, 0.65);
  backdrop-filter: blur(6px);
}

.modal {
  width: 100%;
  max-width: 400px;
  padding: 26px 28px;
  background: linear-gradient(145deg, #f5efe8 0%, #e8dccc 100%);
  border-radius: 20px;
  box-shadow: 0 30px 80px rgba(92, 64, 51, 0.5);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.modal-title {
  color: #5c4033;
  font-size: 1.4rem;
  font-weight: 700;
}

.btn-cerrar {
  background: none;
  border: none;
  color: #8b7355;
  font-size: 1.3rem;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-cerrar:hover {
  color: #5c4033;
  transform: rotate(90deg);
}

.opciones,
.login-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.subtitulo {
  color: #8b7355;
}

.btn-opcion {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px;
  background: rgba(255, 248, 240, 0.9);
  color: #5c4033;
  border: 2px solid #d4c5b2;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Quicksand', sans-serif;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-opcion:hover {
  border-color: #b8957a;
}

.btn-principal {
  background: linear-gradient(135deg, #b8957a, #a8846b);
  color: #f5efe8;
  border-color: transparent;
}

.btn-principal:hover {
  box-shadow: 0 5px 20px rgba(184, 149, 122, 0.3);
}

.letra-g {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #5c4033;
  color: #f5efe8;
  font-size: 0.8rem;
  font-weight: 700;
}

.aviso {
  color: #8b7355;
  font-size: 0.9rem;
}

.separador {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #8b7355;
}

.separador::before,
.separador::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #d4c5b2;
}

.registro-link {
  text-align: center;
  color: #6b5a4a;
  font-size: 0.95rem;
}

.registro-link a {
  color: #b8957a;
  font-weight: 700;
  text-decoration: none;
}

.registro-link a:hover {
  color: #5c4033;
}

.btn-regresar {
  background: none;
  border: none;
  color: #8b7355;
  font-family: 'Quicksand', sans-serif;
  font-weight: 600;
  cursor: pointer;
}

.btn-regresar:hover {
  color: #5c4033;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.campo label {
  color: #5c4033;
  font-weight: 600;
  font-size: 0.95rem;
}

.campo input {
  padding: 12px 14px;
  border: 2px solid #d4c5b2;
  border-radius: 12px;
  font-size: 1rem;
  font-family: 'Quicksand', sans-serif;
  background: rgba(255, 248, 240, 0.8);
  color: #5c4033;
}

.campo input:focus {
  outline: none;
  border-color: #b8957a;
  box-shadow: 0 0 15px rgba(184, 149, 122, 0.2);
}

.error {
  color: #b3392f;
  font-size: 0.85rem;
}

.error-general {
  text-align: center;
  color: #b3392f;
  font-weight: 600;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>