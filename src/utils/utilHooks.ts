import { useEffect, useLayoutEffect } from 'react'

// https://eight-bites.blog/2021/05/uselayouteffect-ssr/
export const useIsomorphicEffect = () => {
  return typeof window !== 'undefined' ? useLayoutEffect : useEffect
}
