import { ZipCodeCodec } from './codec/ZipCodeCodec'
import { isRight, map, right } from 'fp-ts/lib/Either'
import { PathReporter } from 'io-ts/PathReporter'

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
  test('エンコードできること', () => {
    const x = ZipCodeCodec.decode(JSON.parse(`"0000000"`))
    if (x._tag === 'Right') {
      expect(ZipCodeCodec.encode(x.right)).toStrictEqual('000-0000')
    } else {
      expect(false).toBeTruthy()
    }
  })
  test('郵便番号が不正な場合に失敗すること', () => {
    const x = ZipCodeCodec.decode(JSON.parse(`"000--0000"`))
    expect(isRight(x)).toBeFalsy()
  })
  test('郵便番号が不正な場合にエラーメッセージを取得できること', () => {
    const x = ZipCodeCodec.decode(JSON.parse(`"000--0000"`))
    expect(PathReporter.report(x)).toStrictEqual([
      'Invalid value "000--0000" supplied to : ZipCode',
    ])
  })
})
