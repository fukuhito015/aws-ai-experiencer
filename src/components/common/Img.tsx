import Image, { ImageProps } from 'next/image'
import style from './img.module.css'

export const Img: React.FC<ImageProps> = ({ alt, ...props }) => {
  return (
    <div className={style.imageContainer}>
      <Image fill={true} alt={alt} {...props} />
    </div>
  )
}
