import { fetchAccessNumber } from '~/lib/apiClient/accessCounter'

describe('AccessCounterの取得', () => {
  test('必要なデータのみ抜き出していること', async () => {
    const x = await fetchAccessNumber(() =>
      Promise.resolve({ accessNumber: 123, b: 1 }),
    )
    expect(x).toStrictEqual({ accessNumber: 123 })
  })
})
