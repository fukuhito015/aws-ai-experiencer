import { Comprehend } from 'aws-sdk'
import axios from 'axios'
import React from 'react'
import { Button } from '../components/common/Button'
import { Layout } from '../components/common/Layout'
import { Textarea } from '../components/common/Textarea'

export default function CompreheadDemo() {
  const [sourceText, setSourceText] = React.useState('すごいね')
  const [detectSentiment, setDetectSentiment] = React.useState<Comprehend.DetectSentimentResponse | null>(null)

  const onComprehead = async () => {
    try {
      const { data } = await axios.post<Comprehend.DetectSentimentResponse>('/api/comprehead', { text: sourceText })
      setDetectSentiment(data)
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
        <Button onClick={onComprehead}>文章から感情を読み取る</Button>
        {detectSentiment && (
          <div className='my-3'>
            <table className='min-w-full'>
              <thead className='bg-white border-b'>
                <tr>
                  <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>Status</th>
                  <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>Positive</th>
                  <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>Negative</th>
                  <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>Neutral</th>
                </tr>
              </thead>
              <tbody>
                <tr className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'>
                  <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{detectSentiment.Sentiment}</td>
                  <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{detectSentiment.SentimentScore?.Positive}</td>
                  <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{detectSentiment.SentimentScore?.Negative}</td>
                  <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{detectSentiment.SentimentScore?.Neutral}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  )
}
