import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const payload = req.body
    const response = await axios.post(
      `${process.env.BASE_URL}/auth/login`,
      payload
    )
    res.status(200).json(response.data)
  } catch (error: any) {
    res.status(500).json({ message: `User is not found.` })
  }
}
