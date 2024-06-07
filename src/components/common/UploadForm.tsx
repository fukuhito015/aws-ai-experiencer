import React from 'react'

type UploadFormProps = { onInputChange: (files: File) => void }

export const UploadForm: React.FC<UploadFormProps> = ({ onInputChange }) => {
  const fileRef = React.useRef<any>(null)
  return (
    <div
      className='hover:border-gray-300 hover:bg-gray-100'
      onDrop={(e) => {
        e.preventDefault()
        const [file] = Array.from(e.dataTransfer.files)
        onInputChange(file)
      }}
      onDragOver={(e) => {
        e.preventDefault()
      }}
    >
      <label className='hover:cursor-pointer'>
        <div className='flex h-72 w-full flex-col items-center justify-center border-4 border-dashed'>
          <div className='flex flex-col items-center pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600'>
            <p className='pt-1'>顔写真をアップロード</p>
          </div>
        </div>
        <input
          className='invisible absolute'
          type='file'
          accept='.png,.jpg'
          ref={fileRef}
          multiple={true}
          onChange={(e) => {
            if (fileRef.current?.files) {
              onInputChange(fileRef.current.files[0])
              fileRef.current.value = ''
            }
          }}
        />
      </label>
    </div>
  )
}
