   import type { IAnime } from '../interfaces/IAnime'

   export const animes: IAnime[] = [
  {
    id: 1,
    title: 'One Piece',
    creator: 'Eiichiro Oda',
    year: 1999,
    category: 'Animación para adultos',
    image: 'https://wallpapers.com/images/featured/one-piece-c0pujiakubq5rwas.jpg',
    synopsis: 'Sigue las aventuras de Monkey D. Luffy y su tripulación de piratas en su búsqueda del tesoro legendario One Piece, mientras enfrentan enemigos poderosos y descubren los misterios del mundo.',
    features: [
      'Animación épica y dinámica',
      'Historia profunda y emocional',
      'Personajes carismáticos',
      'Mundo extenso y detallado',
      'Momentos de acción y comedia'
    ],
    characters: [
      { name: 'Luffy', role: 'Protagonista', avatar: 'https://avatarfiles.alphacoders.com/354/thumb-350-354743.webp' },
      { name: 'Zoro', role: 'Espadachín', avatar: 'https://i.pinimg.com/564x/51/d1/fe/51d1fe87ea082136b8516df6828eed89.jpg' },
      { name: 'Nami', role: 'Navegante', avatar: 'https://i.pinimg.com/originals/df/df/14/dfdf14c5d9bba5aaba4a9dd0aade9d52.jpg' }
    ],
    platforms: [
      { name: 'Crunchyroll', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/crunchyroll.svg', link: 'https://www.crunchyroll.com/es-es/series/GRMG8ZQZR/one-piece' },
      { name: 'Netflix', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/netflix.svg', link: 'https://www.netflix.com/title/80107103' }
    ]
  },
  {
    id: 2,
    title: 'My Hero Academia',
    creator: 'Kohei Horikoshi',
    year: 2016,
    category: 'Superhéroes',
    image: 'https://m.media-amazon.com/images/S/pv-target-images/e381dc7f4f80059a8a417c65ccb66f554f02971deb2c4cc570cbf922848fd8c6.jpg',
    synopsis: 'En un mundo donde la mayoría de las personas tienen superpoderes llamados "Quirks", un joven sin poderes sueña con convertirse en el héroe número uno, y su determinación lo llevará a la academia de héroes más prestigiosa.',
    features: [
      'Acción intensa y emocionante',
      'Desarrollo de personajes',
      'Sistema de poderes creativo',
      'Mensajes inspiradores',
      'Animación de alta calidad'
    ],
    characters: [
      { name: 'Izuku Midoriya', role: 'Protagonista', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8RpvCBWr-8trOhSJK30IYmCesgk0JPuk5ldjHkkT0h17uozPfdKcxssek&s=10' },
      { name: 'Katsuki Bakugo', role: 'Rival', avatar: 'https://assets.puzzlefactory.com/puzzle/400/498/original.jpg' },
      { name: 'Ochaco Uraraka', role: 'Amiga', avatar: 'https://i.pinimg.com/236x/0a/c7/51/0ac7510f11f5c232bb26c0329e433a35.jpg' }
    ],
    platforms: [
      { name: 'Crunchyroll', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/crunchyroll.svg', link: 'https://www.crunchyroll.com/es-es/series/G63V7G7KR/my-hero-academia' },
      { name: 'Netflix', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/netflix.svg', link: 'https://www.netflix.com/title/80135674' }
    ]
  },
  {
    id: 3,
    title: 'Neon Genesis Evangelion',
    creator: 'Hideaki Anno',
    year: 1995,
    category: 'Ciencia ficción',
    image: 'https://images6.alphacoders.com/691/thumb-1920-691066.jpg',
    synopsis: 'En un mundo post-apocalíptico, adolescentes pilotan enormes biomechas llamadas "Evangelions" para luchar contra criaturas misteriosas conocidas como Ángeles, mientras exploran temas de identidad, trauma y existencia.',
    features: [
      'Psicología profunda',
      'Simbolismo complejo',
      'Diseño de mechas icónico',
      'Banda sonora inolvidable',
      'Filosofía existencial'
    ],
    characters: [
      { name: 'Shinji Ikari', role: 'Protagonista', avatar: 'https://cdn.rafled.com/anime-icons/images/101b64f8a970d22bc98fd21ab0d7873202ba1af7e578d8b2920150d2cb5a257c.jpg' },
      { name: 'Rei Ayanami', role: 'Piloto', avatar: 'https://avatarfiles.alphacoders.com/341/thumb-1920-341948.jpg' },
      { name: 'Asuka Langley', role: 'Piloto', avatar: 'https://i.pinimg.com/736x/8e/55/1c/8e551caf70ec9f22861c5596d41654bd.jpg' }
    ],
    platforms: [
      { name: 'Netflix', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/netflix.svg', link: 'https://www.netflix.com/title/81002939' },
      { name: 'Amazon Prime', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/amazonprime.svg', link: 'https://www.primevideo.com/detail/Neon-Genesis-Evangelion/0FZR4K9G7W' }
    ]
  },
  {
    id: 4,
    title: 'Los Caballeros del Zodiaco',
    creator: 'Masami Kurumada',
    year: 1986,
    category: 'Acción histórica',
    image: 'https://images8.alphacoders.com/914/thumb-1920-914330.png',
    synopsis: 'Jóvenes guerreros conocidos como Caballeros protegen a la diosa Atenea en su lucha contra fuerzas del mal, vistiendo armaduras basadas en las constelaciones del zodiaco y demostrando valores de honor y sacrificio.',
    features: [
      'Mitología griega',
      'Diseños de armaduras espectaculares',
      'Temas de amistad y honor',
      'Acción dinámica',
      'Personajes legendarios'
    ],
    characters: [
      { name: 'Seiya', role: 'Protagonista', avatar: 'https://i.pinimg.com/736x/08/ed/c0/08edc0a35bd843ce3b2e9331e074f04c.jpg' },
      { name: 'Shiryu', role: 'Caballero de Dragón', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5hxvS43e85ZT3FUPgtr_Ga1L1s10v8ZvoqmyizdQR9gISsR1VIT_srdM&s=10' },
      { name: 'Hyoga', role: 'Caballero de Cisne', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCB75OypExe_CEVSvK6Xpb3OfXbRgoPddyWM4p00f209Ul6ERM8A_LmBA&s=10' }
    ],
     platforms: [
      { name: 'Netflix', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/netflix.svg', link: 'https://www.netflix.com/title/80216688' },
      { name: 'Amazon Prime', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/amazonprime.svg', link: 'https://www.primevideo.com/detail/Saint-Seiya/0FZR4K9G7W' }
    ]
  }
]
   