import { Rekognition } from 'aws-sdk'

import { AWS_ACCESS_KEY_ID, AWS_RESION, AWS_SECRET_ACCESS_KEY } from '../config'

const rekognition = new Rekognition({
  region: AWS_RESION,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
})

class rekognitionService {
  async compareFaces(sourceImage: Rekognition.CompareFacesRequest['SourceImage'], targetImage: Rekognition.CompareFacesRequest['TargetImage']) {
    return await rekognition.compareFaces({ SourceImage: sourceImage, TargetImage: targetImage }).promise()
  }
  async getCelebrities(sourceImage: Rekognition.RecognizeCelebritiesRequest['Image']) {
    return await rekognition.recognizeCelebrities({ Image: sourceImage }).promise()
  }
}
export const RekognitionService = new rekognitionService()
