// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { IChat } from '../../../types/chat/IChat'
import { IMessage } from '../../../types/message/IMessage'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { text, senderId, chatId } = req.body

  const response = await axios.post<IMessage[]>(
    `${process.env.BASE_URL}/chat/send-message`,
    req.body
  )

  res.send(response.data)
}
