export const fetcher = async (input, init) => {
  const res = await fetch(input, {
    // credentials: 'include',
    // mode: 'cors',
    ...init,
  })
  if (!res.ok) {
    throw Error(res.statusText)
  }

  return await res.json()
}

export type JsonFetcher = () => Promise<Record<string, unknown>>
