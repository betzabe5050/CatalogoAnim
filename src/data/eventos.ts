import type { IEvento } from '../interfaces/IEvento'

export const eventos: IEvento[] = [
  {
    id: 1,
    titulo: 'Convención Tsunami',
    fecha: '2026-11-14',
    fechaFin: '2026-11-15',
    tipo: 'Convención',
    lugar: 'Mérida, Yucatán',
    descripcion: 'Convención de anime, manga y cultura pop con invitados, tiendas y concursos.',
    link: ''
  },
  {
    id: 2,
    titulo: 'Concurso de cosplay',
    fecha: '2026-11-21',
    tipo: 'Cosplay',
    lugar: 'Mérida, Yucatán',
    descripcion: 'Desfile y concurso de cosplay con premios para los mejores trajes.',
    link: ''
  },
  {
    id: 3,
    titulo: 'Reunión de la comunidad anime',
    fecha: '2026-12-05',
    tipo: 'Comunidad',
    lugar: 'Mérida, Yucatán',
    descripcion: 'Encuentro de fans: intercambio de mangas, juegos y convivencia.',
    link: ''
  },
    {
    id: 4,
    titulo: 'LaConve 66',
    fecha: '2026-11-14',
    fechaFin: '2026-11-15',
    tipo: 'Convención',
    lugar: 'Cintermex, Monterrey, Nuevo León',
    descripcion: 'Convención de anime, cómics y entretenimiento con cosplay, cine, series y videojuegos.',
    link: 'https://www.ticketopolis.com/laconveanimex/'
  },
  {
    id: 5,
    titulo: 'Animecon 2026',
    fecha: '2026-12-20',
    tipo: 'Convención',
    lugar: 'Arena ITSON, Ciudad Obregón, Sonora',
    descripcion: 'Convención de anime, manga, cómics y videojuegos con invitados y concursos de cosplay.',
    link: 'https://animecon.mx/'
  },
  {
    id: 6,
    titulo: 'Concurso de Cosplay Individual - Animecon',
    fecha: '2026-12-20',
    tipo: 'Cosplay',
    lugar: 'Arena ITSON, Ciudad Obregón, Sonora',
    descripcion: 'Concurso con premios en efectivo, trofeo y medalla. Pre-registro en línea obligatorio, con límite de 20 participantes.',
    link: 'https://www.animecon.mx/pages/participa_cosplay_individual.php'
  },
  {
    id: 7,
    titulo: 'La Mole Horror (2.ª edición)',
    fecha: '2026-10-31',
    fechaFin: '2026-11-01',
    tipo: 'Convención',
    lugar: 'Colonia Nápoles, Ciudad de México',
    descripcion: 'Convención de cultura pop con Artists Alley, Cosplay Alley, doblaje y lucha libre.',
    link: 'https://lamole.com.mx/'
  }
]