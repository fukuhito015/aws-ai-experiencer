import { Rekognition } from 'aws-sdk'
import axios from 'axios'
import React from 'react'
import { Button } from '../components/common/Button'
import { Img } from '../components/common/Img'
import { Layout } from '../components/common/Layout'
import { UploadForm } from '../components/common/UploadForm'
import { S3UploadResponse } from '../services/s3.service'

export type Response = Rekognition.CompareFacesResponse & {
  left: Rekognition.RecognizeCelebritiesResponse
  right: Rekognition.RecognizeCelebritiesResponse
}
export default function TranslateDemo() {
  const [sourceImage, setSourceImage] = React.useState<S3UploadResponse | null>(null)
  const [targetImage, setTargetImage] = React.useState<S3UploadResponse | null>(null)

  const [response, setResponse] = React.useState<Response | null>(null)

  const onCompareFaces = async () => {
    try {
      const { data } = await axios.post<Response>('/api/compare-faces', {
        sourceImage: { S3Object: { Bucket: sourceImage?.bucket, Name: sourceImage?.key } },
        targetImage: { S3Object: { Bucket: targetImage?.bucket, Name: targetImage?.key } },
      })
      setResponse(data)
      console.log(data)
    } catch (err) {
      console.trace(err)
    }
  }

  const uploadFace = async (file: File) => {
    console.log(file)
    const params = new FormData()
    params.append('file', file)
    const { data } = await axios.post<FormData, { data: S3UploadResponse }>('/api/s3', params, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data
  }

  return (
    <Layout>
      <div className='space-y-3'>
        <div className='flex space-x-5'>
          <div className='w-60'>
            {sourceImage ? (
              <div
                className='flex flex-col items-center space-y-3 w-60'
                onClick={() => {
                  setSourceImage(null)
                  setResponse(null)
                }}
              >
                <Img src={sourceImage.url} alt='sourceImage' />
              </div>
            ) : (
              <UploadForm
                onInputChange={async (file) => {
                  const data = await uploadFace(file)
                  setSourceImage(data)
                }}
              />
            )}
          </div>
          <div className='w-60'>
            {targetImage ? (
              <div
                className='flex flex-col items-center space-y-3 w-60'
                onClick={() => {
                  setTargetImage(null)
                  setResponse(null)
                }}
              >
                <Img src={targetImage.url} alt='targetImage' />
              </div>
            ) : (
              <UploadForm
                onInputChange={async (file) => {
                  const data = await uploadFace(file)
                  setTargetImage(data)
                }}
              />
            )}
          </div>
        </div>
        <div className='flex space-x-5'>
          <Button onClick={onCompareFaces} disabled={!sourceImage || !targetImage}>
            顔写真を照合する
          </Button>
        </div>
        {response && sourceImage && targetImage && (
          <div>
            {response.FaceMatches && response.FaceMatches.length > 0 && (
              <>
                <h2>同一人物</h2>
                {response.left.CelebrityFaces && <div>{response.left.CelebrityFaces[0].Name}</div>}
              </>
            )}
            {response.UnmatchedFaces && response.UnmatchedFaces.length > 0 && (
              <>
                <h2>別人...</h2>
                {response.left.CelebrityFaces && response.left.CelebrityFaces.length > 0 && <div>左：{response.left.CelebrityFaces[0].Name}</div>}
                {response.right.CelebrityFaces && response.right.CelebrityFaces.length > 0 && <div>右：{response.right.CelebrityFaces[0].Name}</div>}
              </>
            )}
          </div>
        )}
      </div>
    </Layout>
  )
}
