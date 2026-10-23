<template>
  <section class="ayuda-container">
    <h1 class="ayuda-title">Ayuda</h1>
    <p class="ayuda-sub">Elige una pregunta y te responderemos.</p>

    <div class="chat">
      <div ref="contenedor" class="chat-mensajes">
        <div
          v-for="m in mensajes"
          :key="m.id"
          class="mensaje"
          :class="m.autor"
        >
          <p class="burbuja">{{ m.texto }}</p>
          <small class="hora">{{ m.hora }}</small>
        </div>

        <div v-if="escribiendo" class="mensaje asistente">
          <p class="burbuja escribiendo">Escribiendo...</p>
        </div>
      </div>

      <div class="chat-opciones">
        <p class="opciones-titulo">Preguntas frecuentes:</p>
        <div class="opciones-lista">
          <button
            v-for="p in preguntasDisponibles"
            :key="p.id"
            type="button"
            class="btn-pregunta"
            :disabled="escribiendo"
            @click="preguntar(p)"
          >
            {{ p.pregunta }}
          </button>
        </div>

        <button
          v-if="mensajes.length > 1"
          type="button"
          class="btn-reiniciar"
          @click="reiniciar"
        >
          ↻ Reiniciar chat
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import type { IPreguntaAyuda, IMensajeChat } from '../interfaces/IAyuda'
import { preguntasAyuda } from '../data/preguntasAyuda'

const contenedor = ref<HTMLElement | null>(null)
const escribiendo = ref(false)
let contador = 0

const horaActual = () =>
  new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })

const crearMensaje = (
  autor: IMensajeChat['autor'],
  texto: string
): IMensajeChat => ({
  id: ++contador,
  autor,
  texto,
  hora: horaActual()
})

const saludo = '¡Hola! 👋 Soy el asistente del Catálogo Anime. ¿En qué te puedo ayudar?'
const mensajes = ref<IMensajeChat[]>([crearMensaje('asistente', saludo)])


const preguntasDisponibles = computed(() => {
  const hechas = mensajes.value
    .filter(m => m.autor === 'usuario')
    .map(m => m.texto)
  return preguntasAyuda.filter(p => !hechas.includes(p.pregunta))
})

const bajarScroll = async () => {
  await nextTick()
  if (contenedor.value) {
    contenedor.value.scrollTop = contenedor.value.scrollHeight
  }
}

const preguntar = async (p: IPreguntaAyuda) => {
  mensajes.value.push(crearMensaje('usuario', p.pregunta))
  escribiendo.value = true
  await bajarScroll()

  setTimeout(async () => {
    escribiendo.value = false
    mensajes.value.push(crearMensaje('asistente', p.respuesta))
    await bajarScroll()
  }, 700)
}

const reiniciar = () => {
  contador = 0
  mensajes.value = [crearMensaje('asistente', saludo)]
}
</script>

<style scoped>
.ayuda-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 30px;
  background: linear-gradient(145deg, #f5efe8 0%, #e8dccc 100%);
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(139, 115, 85, 0.4);
}

.ayuda-title {
  text-align: center;
  color: #5c4033;
  font-family: 'Quicksand', sans-serif;
  font-size: 2.8rem;
}

.ayuda-sub {
  text-align: center;
  color: #8b7355;
  margin-bottom: 20px;
}

.chat {
  display: flex;
  flex-direction: column;
  background: rgba(255, 248, 240, 0.9);
  border: 2px solid #d4c5b2;
  border-radius: 20px;
  overflow: hidden;
}

.chat-mensajes {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 340px;
  padding: 18px;
  overflow-y: auto;
}

.mensaje {
  display: flex;
  flex-direction: column;
  max-width: 80%;
}

.mensaje.asistente {
  align-self: flex-start;
}

.mensaje.usuario {
  align-self: flex-end;
  align-items: flex-end;
}

.burbuja {
  padding: 10px 16px;
  border-radius: 18px;
  line-height: 1.4;
  font-size: 0.95rem;
}

.asistente .burbuja {
  background: #e8dccc;
  color: #5c4033;
  border-bottom-left-radius: 4px;
}

.usuario .burbuja {
  background: linear-gradient(135deg, #b8957a, #a8846b);
  color: #f5efe8;
  border-bottom-right-radius: 4px;
}

.escribiendo {
  font-style: italic;
  color: #8b7355;
}

.hora {
  margin-top: 3px;
  color: #8b7355;
  font-size: 0.7rem;
}

.chat-opciones {
  padding: 16px 18px;
  background: rgba(232, 220, 204, 0.6);
  border-top: 2px solid #d4c5b2;
}

.opciones-titulo {
  color: #5c4033;
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.opciones-lista {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.btn-pregunta {
  padding: 8px 16px;
  background: rgba(255, 248, 240, 0.95);
  color: #5c4033;
  border: 2px solid #b8957a;
  border-radius: 30px;
  font-family: 'Quicksand', sans-serif;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-pregunta:hover:not(:disabled) {
  background: #b8957a;
  color: #f5efe8;
}

.btn-pregunta:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-reiniciar {
  margin-top: 12px;
  background: none;
  border: none;
  color: #8b7355;
  font-family: 'Quicksand', sans-serif;
  font-weight: 600;
  cursor: pointer;
}

.btn-reiniciar:hover {
  color: #5c4033;
}
</style>