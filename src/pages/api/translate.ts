// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Translate } from 'aws-sdk'
import type { NextApiRequest, NextApiResponse } from 'next'
import { TranslateService } from '../../services/translate.service'

export type GetTranslateResponse = {
  translatedTextes: TranslatedText[]
}

type TranslatedText = Translate.Language & { text: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<GetTranslateResponse>) {
  try {
    const { sourceText } = req.body
    const langs = await TranslateService.getLanguage()
    const translatedTextes: TranslatedText[] = []
    for (const lang of langs.filter((lang) => ['en', 'ar', 'nl', 'th', 'ko', 'zh', 'ja'].some((langCode) => langCode === lang.LanguageCode))) {
      if (lang.LanguageCode === 'auto') {
        continue
      }
      const text = await TranslateService.translate('ja', lang.LanguageCode, sourceText)
      translatedTextes.push({ ...lang, text: text.TranslatedText })
    }
    res.json({ translatedTextes })
  } catch (err) {
    console.trace(err)
  }
}
