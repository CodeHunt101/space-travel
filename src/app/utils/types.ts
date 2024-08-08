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