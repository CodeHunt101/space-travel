export enum Path {
  HOME = '/',
  DESTINATION = '/destination',
  CREW = '/crew',
  TECHNOLOGY = '/technology',
  NOT_READY="#"
}

export enum BreakPoints {
  SM = 576,
  MD = 768,
  LG = 992,
  XL = 1200
}

export type SpaceTravelData = {
  destinations?: DestinationData[]
  crew?: CrewData[]
  technologies?: TechnologyData[]
}

export type DestinationData = {
  name: string
  images: {
    png: string
    webp: string
  }
  description: string
  distance: string
  travel: string
}

export type CrewData = {
  name: string
  images: {
    png: string
    webp: string
  }
  role: string
  bio: string
}

export type TechnologyData = {
  name: string
  images: {
    portrait: string
    landscape: string
  }
  description: string
}