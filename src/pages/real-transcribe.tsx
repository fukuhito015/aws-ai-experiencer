import axios from 'axios'
import React from 'react'
import { Button } from '../components/common/Button'
import { Layout } from '../components/common/Layout'

export default function TranscribeDemo() {
  const recoderRef = React.useRef<MediaRecorder | null>(null)
  const [status, setStatus] = React.useState('waiting')
  const [transcripts, setTranscripts] = React.useState<{ alternatives: { content: string }[]; start_time: number; end_time: number }[]>([])

  const onInitialize = React.useCallback(async () => {
    try {
      const chunks: Blob[] = []
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      let type = ''
      recorder.ondataavailable = (event) => {
        type = event.data.type
        chunks.push(event.data)
      }
      recorder.onstop = async () => {
        try {
          const blob = new Blob(chunks, { type: type })
          setStatus('converting')
          await transcribe(blob)
        } catch (err) {
          console.trace(err)
        } finally {
          setStatus('waiting')
        }
      }
      recoderRef.current = recorder
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message)
      }
      console.trace(err)
    }
  }, [])

  const transcribe = async (blob: Blob) => {
    const params = new FormData()
    params.append('file', blob)
    const { data } = await axios.post<FormData, any>('/api/transcribe', params, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    setTranscripts(data.results.items)
  }

  React.useEffect(() => {
    onInitialize()
  }, [onInitialize])

  const onRec = React.useCallback(async () => {
    recoderRef.current?.start()
    setTranscripts([])
    setStatus('playing')
  }, [])

  const onStop = React.useCallback(() => {
    recoderRef.current?.stop()
  }, [])

  return (
    <Layout>
      <div className='space-y-3 space-x-3'>
        {status === 'waiting' && <Button onClick={onRec}>音声を録音する</Button>}
        {status === 'playing' && (
          <Button onClick={onStop} className='bg-red-500 hover:bg-red-600'>
            音声を終了
          </Button>
        )}
        {status === 'converting' && <div>処理中...</div>}
      </div>
    </Layout>
  )
}
