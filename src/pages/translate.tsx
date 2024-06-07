import axios from 'axios'
import React from 'react'
import { Button } from '../components/common/Button'
import { Layout } from '../components/common/Layout'
import { Textarea } from '../components/common/Textarea'
import { GetTranslateResponse } from './api/translate'

export default function TranslateDemo() {
  const [sourceText, setSourceText] = React.useState(
    '私たちコアが触媒として作用し、お客さまと課題に反応する。\n知識と経験と技術に創造力を融合させ、より強く、より激しく活性化させる。'
  )
  const [translatedTextes, setTranslatedTextes] = React.useState<GetTranslateResponse['translatedTextes']>([])

  const onTranslate = async () => {
    try {
      const { data } = await axios.post<GetTranslateResponse>('/api/translate', { sourceText: sourceText })
      setTranslatedTextes(data.translatedTextes)
    } catch (err) {
      console.trace(err)
    }
  }

  return (
    <Layout>
      <div className='space-y-3'>
        <div className='space-x-5'>
          <div>
            <Textarea
              className='w-full'
              value={sourceText}
              onChange={(e) => {
                setSourceText(e.target.value)
              }}
              placeholder='日本語を入力'
            />
          </div>
        </div>
        <Button onClick={onTranslate}>日本語を翻訳する</Button>
        <div className='grid grid-cols-4 gap-4'>
          {translatedTextes.length > 0 &&
            translatedTextes.map((text, i) => (
              <div key={i} className='border p-3'>
                <div className='bottom-2'>{text.LanguageName}</div>
                <div>{text.text}</div>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  )
}
