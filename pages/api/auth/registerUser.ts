import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const payload = req.body
    const response = await axios.post(
      `${process.env.BASE_URL}/auth/register`,
      payload
    )
    res.status(200).json({ data: response.data })
  } catch (error: any) {
    console.log('Error: ', error)
    res.status(500).json({ message: `User with that email already exists.` })
  }
}
