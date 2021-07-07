import { useCallback, useState } from 'react'
import { createSetImageFile } from '~/utils/formHelper'

export const useCharacterImage = (prevUrlBase: string) => {
  const [prevUrl, setPrevUrl] = useState(prevUrlBase)
  const [, setFile] = useState<File>(null)

  const setImageFile = createSetImageFile(setFile, setPrevUrl)
  const handleOnDrop = useCallback(
    (files: File[]) => {
      setImageFile(files[0])
    },
    [setImageFile],
  )
  return [prevUrl, handleOnDrop, setPrevUrl] as const
}
