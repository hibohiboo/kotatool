import * as t from 'io-ts'
import { isRight, map, right } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'

type ZipCode = number
const RegexZipCode = /^(\d{3})-?(\d{4})$/

const isZipCode = (input: unknown): input is ZipCode =>
  input && RegexZipCode.test(input.toString())

const formatZipCode = (input: unknown) => {
  return Number(input.toString().replace('-', ''))
}
const createErrorMessage = (input: unknown) => {
  if (!input) return '郵便番号は必須です'
  return `郵便番号の形式が不正です。 : ${input}`
}
export const ZipCodeCodec = new t.Type<ZipCode, string, unknown>(
  // 型名。codecで一意にする必要がある。
  'ZipCode',
  // タイプガード
  isZipCode,
  // タイプガードに成功したら、デコードできたものとする。失敗したら、failureの第三引数にエラーメッセージを設定
  (input, context) =>
    isZipCode(input)
      ? t.success(formatZipCode(input))
      : t.failure(input, context, createErrorMessage(input)),
  // エンコードするときの変換関数。t.Type<A, O, I>で、AをOに変換する関数を書く。今回はA=ZipCode, O=string
  (a: ZipCode) => {
    const [, first, last] = RegexZipCode.exec(a.toString())
    return `${first}-${last}`
  },
)
