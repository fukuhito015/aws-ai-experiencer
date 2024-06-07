// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { CompreheadService } from '../../services/comprehead.service'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { text } = req.body
    const response = await CompreheadService.detectSentiment(text)
    res.json({ ...response })
  } catch (err) {
    console.trace(err)
  }
}
