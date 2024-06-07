import { Polly } from 'aws-sdk'
import axios from 'axios'
import React from 'react'
import { Button } from '../components/common/Button'
import { Layout } from '../components/common/Layout'
import { Textarea } from '../components/common/Textarea'

export default function PollyDemo() {
  const [value, setValue] = React.useState(
    '私たちコアが触媒として作用し、お客さまと課題に反応する。\n知識と経験と技術に創造力を融合させ、より強く、より激しく活性化させる。'
  )
  const onPolly = async () => {
    try {
      const { data } = await axios.post<Polly.SynthesizeSpeechOutput>('/api/polly', { textMsg: value })
      if (!data.AudioStream) {
        throw new Error('AudioStreamがありません。')
      }
      setAudio(data.AudioStream)
    } catch (err) {
      console.trace(err)
    }
  }

  const setAudio = (audioStream: any) => {
    const audio = document.createElement('audio')
    document.body.appendChild(audio)
    const stream = new Uint8Array(audioStream.data)
    const blob = new Blob([stream.buffer])
    audio.src = URL.createObjectURL(blob)
    audio.play()
  }
  return (
    <Layout>
      <div className='space-y-3'>
        <Textarea
          rows={10}
          className='w-full'
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
        />
        <Button onClick={onPolly}>テキストを音声に変換する</Button>
      </div>
    </Layout>
  )
}
