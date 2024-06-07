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
      {transcripts.length > 0 && (
        <div className='my-3'>
          <table className='min-w-full'>
            <thead className='bg-white border-b'>
              <tr>
                <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>content</th>
                <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>start_time</th>
                <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>end_time</th>
              </tr>
            </thead>
            <tbody>
              {transcripts.map((script, index) => {
                const [alternative] = script.alternatives
                return (
                  <tr key={index} className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'>
                    <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{alternative.content}</td>
                    <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{script.start_time}ms</td>
                    <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{script.end_time}ms </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  )
}
