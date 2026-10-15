export interface IPersonaje {
  name: string
  role: string
  avatar: string
}

export interface IPlataforma {
  name: string
  icon: string
  link: string
}

export interface IAnime {
  id: number
  title: string
  creator: string
  year: number
  category: string
  image: string
  synopsis: string
  features: string[]
  characters: IPersonaje[]
  platforms: IPlataforma[]
}