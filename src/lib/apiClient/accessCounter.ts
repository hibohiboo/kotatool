import * as t from "io-ts";
import { typedDecoder } from './decoder'
import { typedFetcher } from './fetcher'

type FetchFunc = () => Promise<object>
const apiUrl = process.env.NEXT_PUBLIC_GAS_ACCESS_NUMBER
const TAccessNumber = t.exact(t.type({ accessNumber: t.number }));
const fetcher = typedFetcher(TAccessNumber)

export const fetchAccessNumber = async (fetchJson?: FetchFunc) =>
    fetchJson ? typedDecoder(TAccessNumber, await fetchJson())
              : fetcher(apiUrl, { method: 'POST' })
