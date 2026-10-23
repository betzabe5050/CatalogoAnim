<template>
  <div class="registro-container">
    <h1 class="registro-title">Registro de usuario</h1>
    <p class="nota">Los campos con <span class="req">*</span> son obligatorios.</p>

    <form class="registro-form" @submit.prevent="enviar" novalidate>
      <div class="campo">
        <label>Nombre <span class="req">*</span></label>
        <input v-model="form.nombre" type="text" placeholder="Tu nombre" />
        <small v-if="intentoEnvio && errores.nombre" class="error">{{ errores.nombre }}</small>
      </div>

      <div class="campo">
        <label>Apellidos <span class="req">*</span></label>
        <input v-model="form.apellidos" type="text" placeholder="Tus apellidos" />
        <small v-if="intentoEnvio && errores.apellidos" class="error">{{ errores.apellidos }}</small>
      </div>

      <div class="campo">
        <label>Correo <span class="req">*</span></label>
        <input v-model="form.correo" type="email" placeholder="correo@ejemplo.com" />
        <small v-if="(intentoEnvio || form.correo) && errores.correo" class="error">{{ errores.correo }}</small>
      </div>

      <div class="campo">
        <label>Teléfono <span class="req">*</span></label>
        <input v-model="form.telefono" type="tel" placeholder="10 dígitos" maxlength="10" />
        <small v-if="intentoEnvio && errores.telefono" class="error">{{ errores.telefono }}</small>
      </div>

      <div class="campo">
        <label>Edad <span class="req">*</span></label>
        <input v-model.number="form.edad" type="number" min="1" max="120" placeholder="Tu edad" />
        <small v-if="intentoEnvio && errores.edad" class="error">{{ errores.edad }}</small>
      </div>

      <div class="campo">
        <label>Fecha de nacimiento <span class="req">*</span></label>
        <input v-model="form.fechaNacimiento" type="date" :max="hoy" />
        <small v-if="intentoEnvio && errores.fechaNacimiento" class="error">{{ errores.fechaNacimiento }}</small>
      </div>

      <div class="campo">
        <label>Contraseña <span class="req">*</span></label>
        <input v-model="form.contrasena" type="password" placeholder="Mínimo 6 caracteres" />
        <small v-if="intentoEnvio && errores.contrasena" class="error">{{ errores.contrasena }}</small>
      </div>

      <div class="campo">
        <label>Sugerencia (opcional)</label>
        <textarea v-model="form.sugerencia" rows="3" placeholder="¿Algo que quieras sugerirnos?"></textarea>
      </div>

      <button type="submit" class="btn-registro">Registrarme</button>

      <p v-if="registroExitoso" class="exito">✅ ¡Registro exitoso! Ya puedes iniciar sesión.</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useUsuarios } from '../composables/useUsuarios'
import { useLoginModal } from '../composables/useLoginModal'

const { correoExiste, registrar } = useUsuarios()
const { abrirLogin } = useLoginModal()

const form = reactive({
  nombre: '',
  apellidos: '',
  correo: '',
  telefono: '',
  sugerencia: '',
  edad: null as number | null,
  fechaNacimiento: '',
  contrasena: ''
})

const intentoEnvio = ref(false)
const registroExitoso = ref(false)
const hoy = new Date().toISOString().split('T')[0]

// Variables computadas: su valor se calcula a partir de otras variables
const correoValido = computed(() =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo.trim())
)

const correoDuplicado = computed(
  () => correoValido.value && correoExiste(form.correo)
)

const errores = computed(() => ({
  nombre: form.nombre.trim() === '' ? 'El nombre es obligatorio' : '',
  apellidos: form.apellidos.trim() === '' ? 'Los apellidos son obligatorios' : '',
  correo:
    form.correo.trim() === ''
      ? 'El correo es obligatorio'
      : !correoValido.value
        ? 'Escribe un correo válido'
        : correoDuplicado.value
          ? 'Este correo ya está registrado'
          : '',
  telefono: /^\d{10}$/.test(form.telefono.trim())
    ? ''
    : 'El teléfono debe tener 10 dígitos',
  edad:
    form.edad !== null && form.edad >= 1 && form.edad <= 120
      ? ''
      : 'Escribe una edad válida',
  fechaNacimiento:
    form.fechaNacimiento === '' ? 'La fecha de nacimiento es obligatoria' : '',
  contrasena:
    form.contrasena.length >= 6 ? '' : 'La contraseña debe tener al menos 6 caracteres'
}))

const formularioValido = computed(() =>
  Object.values(errores.value).every(e => e === '')
)

const enviar = () => {
  intentoEnvio.value = true
  registroExitoso.value = false
  if (!formularioValido.value) return

  registrar({
    nombre: form.nombre.trim(),
    apellidos: form.apellidos.trim(),
    correo: form.correo.trim(),
    telefono: form.telefono.trim(),
    sugerencia: form.sugerencia.trim(),
    edad: form.edad as number,
    fechaNacimiento: form.fechaNacimiento,
    contraseña: form.contrasena
  })

  registroExitoso.value = true
  intentoEnvio.value = false
  Object.assign(form, {
    nombre: '',
    apellidos: '',
    correo: '',
    telefono: '',
    sugerencia: '',
    edad: null,
    fechaNacimiento: '',
    contraseña: ''
  })
}
</script>

<style scoped>
.registro-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
  background: linear-gradient(145deg, #f5efe8 0%, #e8dccc 100%);
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(139, 115, 85, 0.4);
}

.registro-title {
  text-align: center;
  color: #5c4033;
  font-family: 'Dancing Script', cursive;
  font-size: 2.6rem;
  margin-bottom: 5px;
}

.nota {
  text-align: center;
  color: #8b7355;
  margin-bottom: 20px;
  font-size: 0.9rem;
}

.req {
  color: #b3392f;
  font-weight: 700;
}

.registro-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.campo label {
  color: #5c4033;
  font-weight: 600;
}

.campo input,
.campo textarea {
  padding: 12px 18px;
  border: 2px solid #d4c5b2;
  border-radius: 20px;
  font-size: 1rem;
  font-family: 'Quicksand', sans-serif;
  background: rgba(255, 248, 240, 0.8);
  color: #5c4033;
}

.campo input:focus,
.campo textarea:focus {
  outline: none;
  border-color: #b8957a;
  box-shadow: 0 0 15px rgba(184, 149, 122, 0.2);
}

.error {
  color: #b3392f;
  font-size: 0.85rem;
  padding-left: 10px;
}

.btn-registro {
  padding: 12px;
  background: linear-gradient(135deg, #b8957a, #a8846b);
  color: #f5efe8;
  border: none;
  border-radius: 30px;
  font-size: 1.05rem;
  font-weight: 600;
  font-family: 'Quicksand', sans-serif;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-registro:hover {
  transform: scale(1.02);
  box-shadow: 0 5px 20px rgba(184, 149, 122, 0.3);
}

.exito {
  text-align: center;
  color: #3d7a4a;
  font-weight: 600;
}
</style>