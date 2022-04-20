import { IAlbum } from '../album/IAlbum'
import { ICommentSong } from './ICommentSong'

export interface ISong {
  id: number
  name: string
  artist: string
  creatorId: number
  description: string
  listens: number
  picture: string
  audio: string
  comments: ICommentSong[]
  albums: IAlbum[]
}
