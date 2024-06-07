import aws, { S3 } from 'aws-sdk'
import { AWS_ACCESS_KEY_ID, AWS_RESION, AWS_S3_BUCKET_NAME, AWS_SECRET_ACCESS_KEY } from '../config'

export type S3UploadResponse = { bucket: string; region: string; key: string; url: string }

class s3Service {
  async uplaod(key: string, fileBuffer: any): Promise<S3UploadResponse> {
    const s3 = new S3({
      region: AWS_RESION,
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    })
    const s3Params: S3.Types.PutObjectRequest = {
      Bucket: AWS_S3_BUCKET_NAME,
      Key: key,
      Body: fileBuffer,
    }
    return await new Promise((resolve, reject) => {
      s3.putObject(s3Params, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve({
            bucket: s3Params.Bucket,
            region: AWS_RESION,
            key: s3Params.Key,
            url: `https://${s3Params.Bucket}.s3.${AWS_RESION}.amazonaws.com/${encodeURI(s3Params.Key)}`,
          })
        }
      })
    })
  }

  download({ bucket, region, key }: { bucket: string; region: string; key: string }) {
    const s3 = new aws.S3({
      region: region,
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
      httpOptions: { timeout: 0 },
    })
    const s3Params = {
      Bucket: bucket,
      Key: key,
    }
    return s3
      .getObject(s3Params)
      .on('error', (err: any) => {
        console.trace(err)
        throw new Error('ダウンロードに失敗しました。')
      })
      .createReadStream()
  }
}

export const S3Service = new s3Service()
