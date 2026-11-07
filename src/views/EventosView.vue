<template>
  <section class="eventos">
    <h1 class="titulo">Eventos</h1>
    <p class="subtitulo">Convenciones, cosplay y reuniones de la comunidad anime.</p>

        <div v-if="tipoActivo !== 'Todos'" class="filtros">
      <RouterLink to="/eventos" class="chip" title="Quitar filtro">
        {{ tipoActivo }}
        <span aria-hidden="true">✕</span>
      </RouterLink>
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
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute} from 'vue-router'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import esLocale from '@fullcalendar/core/locales/es'
import type { EventClickArg } from '@fullcalendar/core'
import { eventos } from '../data/eventos'
import type { IEvento } from '../interfaces/IEvento'
import { normalizar } from '../utils/normalizar'

const route = useRoute()


const tipos = ['Todos', 'Convención', 'Cosplay', 'Comunidad']


function tipoDesdeRuta(): string {
  const param = String(route.params.categoria ?? '')
  return tipos.find(t => normalizar(t) === normalizar(param)) ?? 'Todos'
}

const tipoActivo = ref(tipoDesdeRuta())


watch(() => route.params.categoria, () => {
  if (route.name !== 'eventos') return
  tipoActivo.value = tipoDesdeRuta()
})


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

function formatear(fecha: string): string {
  return new Date(fecha + 'T12:00:00').toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}


function dias(inicio: string, fin?: string): string[] {
  const lista: string[] = []
  const d = new Date(inicio + 'T12:00:00')
  const ultimo = new Date((fin ?? inicio) + 'T12:00:00')
  while (d <= ultimo) {
    lista.push(d.toISOString().slice(0, 10))
    d.setDate(d.getDate() + 1)
  }
  return lista
}


function irAFecha(fecha: string) {
  calendario.value?.getApi().gotoDate(fecha)
}

function irAEvento(e: IEvento) {
  seleccionado.value = e
  irAFecha(e.fecha)
}


function irAlProximo() {
  const hoy = new Date().toISOString().slice(0, 10)
  const proximo =
    ordenados.value.find(e => (e.fechaFin ?? e.fecha) >= hoy) ?? ordenados.value[0]

  if (!proximo) {
    seleccionado.value = null
    return
  }

  irAFecha(proximo.fecha)
  seleccionado.value = tipoActivo.value === 'Todos' ? null : proximo
}


watch(tipoActivo, irAlProximo)


onMounted(() => {
  if (tipoActivo.value !== 'Todos') irAlProximo()
})

const opcionesCalendario = computed(() => ({
  plugins: [dayGridPlugin],
  initialView: 'dayGridMonth',
  locale: esLocale,
  height: 'auto',
  // Un marcador por cada día del evento
  events: filtrados.value.flatMap(e =>
    dias(e.fecha, e.fechaFin).map(dia => ({
      title: e.titulo,
      start: dia,
      extendedProps: { eventoId: e.id }
    }))
  ),
  eventClick: (info: EventClickArg) => {
    seleccionado.value =
      eventos.find(e => e.id === info.event.extendedProps.eventoId) ?? null
  }
}))
</script>

<style scoped>
.eventos {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: var(--texto);
}

.titulo { text-align: center; font-size: clamp(2rem, 6vw, 3rem); margin: 0; }
.subtitulo { text-align: center; opacity: 0.8; }

.filtros {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin: 20px 0;
}



.chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border: 1.5px solid var(--color-principal);
  border-radius: 30px;
  color: var(--color-principal);
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
}

.chip:hover {
  background: var(--color-principal);
  color: #ffffff;
}




/* Calendario a la izquierda y lista a la derecha */
.contenido {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  align-items: start;
}

.calendario {
  background: #ffffff;
  border-radius: 20px;
  padding: 16px;
  container-type: inline-size;
  box-shadow: 0 8px 25px rgba(60, 20, 30, 0.2);



  --fc-button-bg-color: var(--color-principal);
  --fc-button-border-color: var(--color-principal);
  --fc-button-hover-bg-color: var(--texto);
  --fc-button-hover-border-color: var(--texto);
  --fc-button-active-bg-color: var(--texto);
  --fc-button-active-border-color: var(--texto);

  --fc-event-bg-color: transparent;
  --fc-event-border-color: transparent;
  --fc-event-text-color: var(--texto);
}

.detalle {
  margin-bottom: 16px;
  padding: 20px;
  border-radius: 20px;
  background: #ffffff;
  border: 2px solid var(--color-principal);
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
  background: #ffffff;
  border: 2px solid transparent;
  cursor: pointer;
}
.lista-item.activo { border-color: var(--color-principal); }
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
  background: var(--color-principal);
  color: #ffffff;
  font-family: inherit;
  font-weight: 600;
  cursor: pointer;
}



@container (max-width: 700px) {
  .evento-titulo { display: none; }
  .evento-marca { justify-content: center; }
  .evento-icono { width: 24px; height: 24px; }

  .calendario :deep(.fc-toolbar) { flex-wrap: wrap; gap: 8px; }
  .calendario :deep(.fc-toolbar-chunk) { display: flex; align-items: center; gap: 6px; }
  .calendario :deep(.fc-toolbar-title) { font-size: 1.2rem; }
}

@media (max-width: 600px) {
  .eventos { padding: 12px; }
}



@media (max-width: 900px) {
  .contenido { grid-template-columns: 1fr; }
}


</style>