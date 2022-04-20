import { ISong } from '../music/ISong'

export interface IAlbum {
  id: number
  name: string
  description: string
  picture: string
  songs: ISong[]
  listens: number
  creatorId: number
}
