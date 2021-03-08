import { isRight, map, right } from 'fp-ts/lib/Either'
import { PathReporter } from 'io-ts/PathReporter'
import { ZipCodeCodec } from './codec/ZipCodeCodec'
import { PhoneNumberCodec } from './codec/PhoneNumberCodec'

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
      '郵便番号の形式が不正です。 : 000--0000',
    ])
  })
})

describe('電話番号チェック', () => {
  test('電話番号が正しい場合 ハイフンあり', () => {
    const x = PhoneNumberCodec.decode(JSON.parse(`"0000-00-0000"`))
    if (x._tag === 'Right') {
      expect(x.right).toStrictEqual('0000-00-0000')
    }
    // 上記と同じ意味となる
    expect(x).toStrictEqual(right('0000-00-0000'))
  })
  test('電話番号が正しい場合 ハイフンなし フォーマットされること', () => {
    const x = PhoneNumberCodec.decode(JSON.parse(`"0000000000"`))
    expect(x).toStrictEqual(right('0000-00-0000'))
  })
  test('携帯電話番号が正しい場合 ハイフンなし フォーマットされること', () => {
    const x = PhoneNumberCodec.decode(JSON.parse(`"09000000000"`))
    expect(x).toStrictEqual(right('090-0000-0000'))
  })
  test('エンコードできること', () => {
    const x = PhoneNumberCodec.decode(JSON.parse(`"0000000000"`))
    if (x._tag === 'Right') {
      expect(PhoneNumberCodec.encode(x.right)).toStrictEqual('0000-00-0000')
    } else {
      expect(false).toBeTruthy()
    }
  })
  test('電話番号が不正な場合に失敗すること', () => {
    const x = PhoneNumberCodec.decode(JSON.parse(`"000--0000"`))
    expect(isRight(x)).toBeFalsy()
  })
  test('電話番号が不正な場合にエラーメッセージを取得できること', () => {
    const x = PhoneNumberCodec.decode(JSON.parse(`"000--0000"`))
    expect(PathReporter.report(x)).toStrictEqual([
      '電話番号の形式が不正です。 : 000--0000',
    ])
  })
})
