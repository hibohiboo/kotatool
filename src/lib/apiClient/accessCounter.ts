import * as t from "io-ts";
import { typedDecoder } from './decoder'
import { fetcher, JsonFetcher } from './fetcher'
import type { AccessNumber } from '~/types/openapi'

const TAccessNumber = t.exact(t.type({ accessNumber: t.number }));
const accessNumberFetcher = () => fetcher(process.env.NEXT_PUBLIC_GAS_ACCESS_NUMBER, { method: 'POST' })

export const fetchAccessNumber =
    async (fetchJson: JsonFetcher =  accessNumberFetcher): Promise<AccessNumber> => typedDecoder(TAccessNumber, await fetchJson())
