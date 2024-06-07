// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Translate } from 'aws-sdk'
import axios from 'axios'
import dayjs from 'dayjs'
import formidable from 'formidable'
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { S3Service } from '../../services/s3.service'
import { TranslateService } from '../../services/transcribe.service'
import { UtilitiesService } from '../../services/utilities.service'

export type GetTranslateResponse = {
  translatedTextes: TranslatedText[]
}

type TranslatedText = Translate.Language & { text: string }

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      if (err) {
        throw err
      }
      if (!(files.file instanceof Array) && files.file.originalFilename) {
        await S3Service.uplaod('demo/sample.webm', fs.createReadStream(files.file.filepath))
        const jobName = `transcribe-job-${dayjs().format('YYYY-MM-DD-HH-mm-ss')}`
        let outputUrl = ''
        await TranslateService.createJob(jobName)
        while (!outputUrl) {
          const result = await TranslateService.getJob(jobName)
          outputUrl = result.TranscriptionJob?.Transcript?.TranscriptFileUri || ''
          await UtilitiesService.sleep(5)
        }
        const { data } = await axios.get(outputUrl)
        res.json({ ...data })
      }
    })
  } catch (err) {
    console.trace(err)
  }
}
