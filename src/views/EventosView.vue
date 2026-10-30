<template>
  <section class="eventos">
    <h1 class="titulo">Eventos</h1>
    <p class="subtitulo">Convenciones, cosplay y reuniones de la comunidad anime.</p>

    <div class="filtros">
      <button
        v-for="t in tipos"
        :key="t"
        type="button"
        class="filtro"
        :class="{ activo: tipoActivo === t }"
        @click="tipoActivo = t"
      >
        {{ t }}
      </button>
    </div>

    <div class="contenido">
      <div class="calendario">
        <FullCalendar ref="calendario" :options="opcionesCalendario">
  <template #eventContent="arg">
    <div class="evento-marca">
      <img src="/img/marcador-evento.png" alt="" class="evento-icono" />
      <span class="evento-titulo">{{ arg.event.title }}</span>
    </div>
  </template>
</FullCalendar>
      </div>

      <aside class="lateral">
        <div v-if="seleccionado" class="detalle">
          <h2>{{ seleccionado.titulo }}</h2>
          <p class="meta">
            {{ formatear(seleccionado.fecha) }}
            <template v-if="seleccionado.fechaFin"> al {{ formatear(seleccionado.fechaFin) }}</template>
            · {{ seleccionado.lugar }}
          </p>
          <p>{{ seleccionado.descripcion }}</p>
          <a v-if="seleccionado.link" :href="seleccionado.link" target="_blank" rel="noopener" class="btn-link">
            Más información
          </a>
          <button type="button" class="btn-cerrar" @click="seleccionado = null">Cerrar</button>
        </div>

        <h2 class="lista-titulo">Lista de eventos</h2>
        <ul class="lista">
          <li
            v-for="e in ordenados"
            :key="e.id"
            class="lista-item"
            :class="{ activo: seleccionado?.id === e.id }"
            @click="irAEvento(e)"
          >
            <img src="/img/marcador-evento.png" alt="" class="punto" />
            <div>
              <strong>{{ e.titulo }}</strong>
              <small>{{ formatear(e.fecha) }} · {{ e.lugar }}</small>
            </div>
          </li>
        </ul>
      </aside>
    </div>

    <RouterLink to="/" class="btn-link">← Volver al inicio</RouterLink>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import esLocale from '@fullcalendar/core/locales/es'
import type { EventClickArg } from '@fullcalendar/core'
import { eventos } from '../data/eventos'
import type { IEvento } from '../interfaces/IEvento'

const tipos = ['Todos', 'Convención', 'Cosplay', 'Comunidad']
const tipoActivo = ref('Todos')
const seleccionado = ref<IEvento | null>(null)
const calendario = ref<InstanceType<typeof FullCalendar> | null>(null)



const filtrados = computed(() =>
  tipoActivo.value === 'Todos'
    ? eventos
    : eventos.filter(e => e.tipo === tipoActivo.value)
)

const ordenados = computed(() =>
  [...filtrados.value].sort((a, b) => a.fecha.localeCompare(b.fecha))
)

// FullCalendar toma la fecha final como "exclusiva", por eso se suma un día
function sumarDia(fecha: string): string {
  const d = new Date(fecha + 'T12:00:00')
  d.setDate(d.getDate() + 1)
  return d.toISOString().slice(0, 10)
}

function formatear(fecha: string): string {
  return new Date(fecha + 'T12:00:00').toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

// Mueve el calendario al mes de esa fecha
function irAFecha(fecha: string) {
  calendario.value?.getApi().gotoDate(fecha)
}

// Al hacer clic en la lista: abre el detalle y mueve el calendario
function irAEvento(e: IEvento) {
  seleccionado.value = e
  irAFecha(e.fecha)
}

// Al cambiar de categoría: va al próximo evento de esa categoría
watch(tipoActivo, () => {
  const hoy = new Date().toISOString().slice(0, 10)
  const proximo =
    ordenados.value.find(e => (e.fechaFin ?? e.fecha) >= hoy) ?? ordenados.value[0]

  if (!proximo) {
    seleccionado.value = null
    return
  }

  irAFecha(proximo.fecha)
  seleccionado.value = tipoActivo.value === 'Todos' ? null : proximo
})

const opcionesCalendario = computed(() => ({
  plugins: [dayGridPlugin],
  initialView: 'dayGridMonth',
  locale: esLocale,
  height: 'auto',
  events: filtrados.value.map(e => ({
    id: String(e.id),
    title: e.titulo,
    start: e.fecha,
    end: e.fechaFin ? sumarDia(e.fechaFin) : undefined
  })),
  eventClick: (info: EventClickArg) => {
    seleccionado.value = eventos.find(e => String(e.id) === info.event.id) ?? null
  }
}))
</script>

<style scoped>
.eventos {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #5c4033;
}

.titulo { text-align: center; font-size: clamp(2rem, 6vw, 3rem); margin: 0; }
.subtitulo { text-align: center; opacity: 0.8; }

.filtros { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin: 20px 0; }

.filtro {
  padding: 8px 18px;
  border: 2px solid #b8957a;
  border-radius: 30px;
  background: none;
  color: #5c4033;
  font-family: inherit;
  font-weight: 600;
  cursor: pointer;
}
.filtro.activo { background: #b8957a; color: #f5efe8; }

/* Calendario a la izquierda y lista a la derecha */
.contenido {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  align-items: start;
}

.calendario {
  background: #fdf6ee;
  border-radius: 20px;
  padding: 16px;
  box-shadow: 0 8px 25px rgba(139, 115, 85, 0.2);

  /* Colores de los botones del calendario */
  --fc-button-bg-color: #b8957a;
  --fc-button-border-color: #b8957a;
  --fc-button-hover-bg-color: #5c4033;
  --fc-button-hover-border-color: #5c4033;
  --fc-button-active-bg-color: #5c4033;
  --fc-button-active-border-color: #5c4033;
  --fc-event-bg-color: transparent;
  --fc-event-border-color: transparent;
  --fc-event-text-color: #5c4033;
}

.detalle {
  margin-bottom: 16px;
  padding: 20px;
  border-radius: 20px;
  background: #fdf6ee;
  border: 2px solid #b8957a;
}
.detalle h2 { margin-top: 0; }
.meta { opacity: 0.8; }

.lista-titulo { margin: 0 0 10px; }
.lista {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;
  max-height: 520px;
  overflow-y: auto;
}
.lista-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 16px;
  background: #fdf6ee;
  border: 2px solid transparent;
  cursor: pointer;
}
.lista-item.activo { border-color: #b8957a; }
.lista-item small { display: block; opacity: 0.75; }

.punto {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  object-fit: contain;
}

.evento-marca {
  display: flex;
  align-items: flex-start;
  gap: 4px;
  padding: 2px 4px;
  cursor: pointer;
}

.evento-icono {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
}

.evento-titulo {
  font-size: 0.8rem;
  font-weight: 600;
  line-height: 1.2;
  white-space: normal;
  overflow-wrap: anywhere;
}

.btn-link, .btn-cerrar {
  display: inline-block;
  margin: 10px 8px 0 0;
  padding: 10px 22px;
  border: none;
  border-radius: 30px;
  background: #b8957a;
  color: #f5efe8;
  font-family: inherit;
  font-weight: 600;
  cursor: pointer;
}
@media (max-width: 900px) {
  .contenido { grid-template-columns: 1fr; }
}

@media (max-width: 600px) {
  .eventos { padding: 12px; }
}
@media (max-width: 600px) {
  .evento-icono { width: 16px; height: 16px; }
  .evento-titulo { font-size: 0.65rem; }
}
</style>