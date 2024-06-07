import { Polly } from 'aws-sdk'
import { VoiceId } from 'aws-sdk/clients/polly'

import { AWS_ACCESS_KEY_ID, AWS_RESION, AWS_SECRET_ACCESS_KEY } from '../config'

const polly = new Polly({
  region: AWS_RESION,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
})

class pollyService {
  async getVoices() {
    const { Voices } = await polly.describeVoices({ LanguageCode: 'ja-JP' }).promise()
    if (!Voices) {
      throw new Error('音声を取得できませんでした。')
    }
    return Voices
  }
  async speech(voiceId: VoiceId, text: string) {
    const speechParams = {
      OutputFormat: 'mp3',
      VoiceId: voiceId,
      Text: text,
      SampleRate: '22050',
      TextType: 'text',
    }
    return polly.synthesizeSpeech(speechParams).promise()
  }
}
export const PollyService = new pollyService()
