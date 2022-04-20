import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { profileId, songId } = req.body

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/music/add-to-profile`,
    { profileId, musicId: songId }
  )

  res.send(response.data)
}
