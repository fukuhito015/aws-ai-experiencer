// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Translate } from 'aws-sdk'
import formidable from 'formidable'
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { S3Service, S3UploadResponse } from '../../services/s3.service'

export type GetTranslateResponse = {
  translatedTextes: TranslatedText[]
}

type TranslatedText = Translate.Language & { text: string }

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<S3UploadResponse>) {
  try {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      if (err) {
        throw err
      }
      if (!(files.file instanceof Array) && files.file.originalFilename) {
        const response = await S3Service.uplaod('demo/images/' + files.file.originalFilename, fs.createReadStream(files.file.filepath))
        res.json({ ...response })
      }
    })
  } catch (err) {
    console.trace(err)
  }
}
