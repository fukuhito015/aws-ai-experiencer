// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PollyService } from '../../services/polly.service'

type Data = {
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { textMsg } = req.body
    const [voice] = await PollyService.getVoices()
    if (!voice.Id) {
      throw new Error('VoiceIdを取得できませんでした。')
    }
    const pollyResponse = await PollyService.speech(voice.Id, textMsg)
    if (!pollyResponse) {
      throw new Error('VoiceIdを取得できませんでした。')
    }
    res.setHeader('Content-Type', 'audio/mpeg')
    res.send(pollyResponse)
  } catch (err) {}
}
