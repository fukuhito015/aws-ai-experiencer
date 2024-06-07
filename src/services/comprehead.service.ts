import { Comprehend } from 'aws-sdk'

import { AWS_ACCESS_KEY_ID, AWS_RESION, AWS_SECRET_ACCESS_KEY } from '../config'

const comprehead = new Comprehend({
  region: AWS_RESION,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
})

class compreheadService {
  async detectSentiment(text: string) {
    return await comprehead.detectSentiment({ LanguageCode: 'ja', Text: text }).promise()
  }
}
export const CompreheadService = new compreheadService()
