import { IComment } from './comment/IComment'

export interface IPost {
  id: number
  title: string
  text: string
  postedAt: string
  imageUrl: string
  creatorId: string
  comments: IComment[]
  groupId: number | null
}
