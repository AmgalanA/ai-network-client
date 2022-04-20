import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { profileId, songId } = req.body

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/music/check-if-profile-has-song`,
    { profileId, songId }
  )

  res.send(response.data)
}
