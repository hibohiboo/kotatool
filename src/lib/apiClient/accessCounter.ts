import * as t from "io-ts";
import type { AccessNumber } from '~/types/openapi'
const apiUrl = process.env.NEXT_PUBLIC_GAS_ACCESS_NUMBER
const fetchJsonNumber = async () => {
  const response = await fetch(apiUrl, { method: 'POST' })
  const json: AccessNumber = await response.json()
  return json
}

const TAccessNumber = t.exact(t.type({ accessNumber: t.number }));
const typedDecoder = <T>(typeC: t.Type<T>, json: object): T => {
  const either = typeC.decode(json);
  if (either._tag === 'Left'){
    throw either.left
  }
  return either.right
}
type FetchFunc = () => Promise<object>

export const fetchAccessNumber = async (fetchJson: FetchFunc = fetchJsonNumber) =>{
  return typedDecoder(TAccessNumber, await fetchJson())
}
