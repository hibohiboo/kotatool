import React from 'react'
import Dropzone from 'react-dropzone'

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
              }}
            >
              {prevUrl ? (
                <img style={{ width: '100%' }} alt={label} src={prevUrl} />
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
