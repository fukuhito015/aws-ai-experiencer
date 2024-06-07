import {
  StartStreamTranscriptionCommand,
  StartStreamTranscriptionCommandInput,
  TranscribeStreamingClient,
} from '@aws-sdk/client-transcribe-streaming'
import { TranscribeService as AwsTranscribeService } from 'aws-sdk'
import { ReadStream } from 'fs'

import { AWS_ACCESS_KEY_ID, AWS_RESION, AWS_S3_BUCKET_NAME, AWS_SECRET_ACCESS_KEY } from '../config'

const transcribe = new AwsTranscribeService({
  region: AWS_RESION,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
})

class transcribeService {
  async getJob(jobName: string) {
    return await transcribe.getTranscriptionJob({ TranscriptionJobName: jobName }).promise()
  }
  async createJob(jobName: string) {
    return await transcribe
      .startTranscriptionJob({
        TranscriptionJobName: jobName,
        LanguageCode: 'ja-JP',
        MediaFormat: 'webm',
        Media: { MediaFileUri: `https://${AWS_S3_BUCKET_NAME}.s3.${AWS_RESION}.amazonaws.com/demo/sample.webm` },
      })
      .promise()
  }

  async realTimeTranscribe(audio: ReadStream) {
    const client = new TranscribeStreamingClient({
      region: AWS_RESION,
      credentials: { accessKeyId: AWS_ACCESS_KEY_ID, secretAccessKey: AWS_SECRET_ACCESS_KEY },
    })
    const params: StartStreamTranscriptionCommandInput = {
      LanguageCode: 'ja-JP',
      MediaEncoding: 'pcm',
      MediaSampleRateHertz: 16000,
      AudioStream: (async function* () {
        for await (const chunk of audio) {
          yield { AudioEvent: { AudioChunk: chunk } }
        }
      })(),
    }
    const command = new StartStreamTranscriptionCommand(params)
    const response = await client.send(command)
    if (!response.TranscriptResultStream) {
      throw new Error('応答がありません。')
    }
    try {
      for await (const event of response.TranscriptResultStream) {
        console.log(JSON.stringify(event))
      }
    } catch (err) {
      console.log('error')
      console.log(err)
    }
  }
}
export const TranslateService = new transcribeService()
