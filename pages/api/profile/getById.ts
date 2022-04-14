import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import jwt_decode from 'jwt-decode'

export default async function getById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body

  const response = await axios.get(
    `${process.env.BASE_URL}/profile/get-by-id/${id}`
  )
  res.send(response.data)
}
