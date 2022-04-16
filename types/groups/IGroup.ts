import { IPost } from '../post/IPost'
import { IProfile } from '../profile/IProfile'

export interface IGroup {
  id: number
  description: string
  creatorId: number
  imageUrl: string
  members: IProfile[]
  name: string
  createdAt: string
  posts: IPost[]
}
