// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { RekognitionService } from '../../services/rekognition.service'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    //
    const { sourceImage, targetImage } = req.body
    const response = await RekognitionService.compareFaces(sourceImage, targetImage)
    const sourceCelebrity = await RekognitionService.getCelebrities(sourceImage)
    const targetCelebrity = await RekognitionService.getCelebrities(targetImage)
    res.json({ ...response, left: sourceCelebrity, right: targetCelebrity })
  } catch (err) {
    console.trace(err)
  }
}
