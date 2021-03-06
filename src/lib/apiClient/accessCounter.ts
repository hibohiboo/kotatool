import * as t from "io-ts";
import { typedDecoder } from './decode'

type FetchFunc = () => Promise<object>
const apiUrl = process.env.NEXT_PUBLIC_GAS_ACCESS_NUMBER
const fetchJsonNumber = async () => (await fetch(apiUrl, { method: 'POST' })).json()
const TAccessNumber = t.exact(t.type({ accessNumber: t.number }));

export const fetchAccessNumber = async (fetchJson: FetchFunc = fetchJsonNumber) => typedDecoder(TAccessNumber, await fetchJson())
