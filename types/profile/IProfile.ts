import { IAlbum } from '../album/IAlbum'
import { IGroup } from '../groups/IGroup'
import { ISong } from '../music/ISong'

export interface IProfile {
  id: number
  email: string
  authId: number
  avatar: string
  lastSeen: string
  name: string
  secondName: string
  status: string
  songs: ISong[]
  groups: IGroup[]
  albums: IAlbum[]
}
