export interface IPreguntaAyuda {
  id: number
  pregunta: string
  respuesta: string
}

export interface IMensajeChat {
  id: number
  autor: 'usuario' | 'asistente'
  texto: string
  hora: string
}