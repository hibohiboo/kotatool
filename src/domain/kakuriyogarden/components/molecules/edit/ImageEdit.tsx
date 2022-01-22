import React from 'react'
import Dropzone from 'react-dropzone'
import Image from 'next/image'

const ImageEdit = React.memo<{
  label: string
  prevUrl: string
  onDrop: any
}>(({ label, prevUrl, onDrop }) => {
  return (
    <div>
      <Dropzone onDrop={onDrop} accept="image/*">
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <div
              style={{
                width: '50px',
                height: '50px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {prevUrl ? (
                <Image layout="fill" alt={label} src={prevUrl} />
              ) : (
                <></>
              )}
            </div>
            <input {...getInputProps()} />
          </div>
        )}
      </Dropzone>
    </div>
  )
})
ImageEdit.displayName = 'ImageEdit'
export default ImageEdit
