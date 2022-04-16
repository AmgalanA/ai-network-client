// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/group/get-one/${id}`
  )
  res.send(response.data)
}
