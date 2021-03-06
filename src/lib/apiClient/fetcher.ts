import * as t from "io-ts";
import { typedDecoder } from './decoder'
type TypedFetcher<T> = (input: RequestInfo, init?: RequestInit) => Promise<T>
export const typedFetcher = <T>(typeC: t.Type<T>): TypedFetcher<T> => async (input, init) => {
  const res = await fetch(input, {
    // credentials: 'include',
    // mode: 'cors',
    ...init,
  })
  if (!res.ok) {
    throw Error(res.statusText)
  }

  return typedDecoder(typeC, await res.json())
}
