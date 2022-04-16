import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import jwt_decode from 'jwt-decode'

export default async function getById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let response
  const { name, secondName, status, profileId } = req.body
  if (name) {
    response = await axios.post(`${process.env.BASE_URL}/profile/change-name`, {
      name,
      id: profileId,
    })
  }
  if (secondName) {
    response = await axios.post(
      `${process.env.BASE_URL}/profile/change-second-name`,
      { secondName, id: profileId }
    )
  }
  if (status) {
    response = await axios.post(
      `${process.env.BASE_URL}/profile/change-status`,
      { status, id: profileId }
    )
  }
  res.send(response?.data)
}
