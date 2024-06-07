import { Translate } from 'aws-sdk'

import { AWS_ACCESS_KEY_ID, AWS_RESION, AWS_SECRET_ACCESS_KEY } from '../config'

const translate = new Translate({
  region: AWS_RESION,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
})

class translateService {
  async getLanguage() {
    const { Languages } = await translate.listLanguages().promise()
    if (!Languages) {
      throw new Error('言語を取得できませんでした。')
    }
    return Languages
  }
  async translate(sourceLanguage: string, targetLanguage: string, text: string) {
    return translate.translateText({ SourceLanguageCode: sourceLanguage, TargetLanguageCode: targetLanguage, Text: text }).promise()
  }
}
export const TranslateService = new translateService()
