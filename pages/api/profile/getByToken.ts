import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import jwt_decode from 'jwt-decode'

export interface IToken {
  email: string
  id: number
  password: string
}

export default async function get(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.body

  const decodedToken = jwt_decode<IToken>(token)
  const response = await axios.get(
    `${process.env.BASE_URL}/profile/get/${decodedToken.email}`
  )

  res.status(200).json(response.data)
}
