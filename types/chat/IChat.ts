import { IMessage } from '../message/IMessage'

export interface IChat {
  id: number
  firstProfileId: number
  secondProfileId: number
  messages: IMessage[]
}
