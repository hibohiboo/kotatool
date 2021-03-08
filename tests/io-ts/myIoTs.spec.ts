import { ZipCodeCodec } from './codec/ZipCodeCodec'
import { isRight, map, right } from 'fp-ts/lib/Either'

describe('郵便番号チェック', () => {
  test('郵便番号が正しい場合 ハイフンあり', () => {
    const x = ZipCodeCodec.decode(JSON.parse(`"000-0000"`))
    if (x._tag === 'Right') {
      expect(x.right).toStrictEqual('000-0000')
    }
    // 上記と同じ意味となる
    expect(x).toStrictEqual(right('000-0000'))
  })
  test('郵便番号が正しい場合 ハイフンなし フォーマットされること', () => {
    const x = ZipCodeCodec.decode(JSON.parse(`"0000000"`))
    expect(x).toStrictEqual(right('000-0000'))
  })
  test('郵便番号が不正な場合に失敗すること', () => {
    const x = ZipCodeCodec.decode(JSON.parse(`"000--0000"`))
    expect(isRight(x)).toBeFalsy()
  })
})
