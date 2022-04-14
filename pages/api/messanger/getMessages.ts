// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { IChat } from '../../../types/chat/IChat'
import { IMessage } from '../../../types/message/IMessage'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { firstProfileId, secondProfileId } = req.body

  const response = await axios.post(
    `${process.env.BASE_URL}/chat/get-chat-by-profiles`,
    req.body
  )

  res.send(response.data)
}
