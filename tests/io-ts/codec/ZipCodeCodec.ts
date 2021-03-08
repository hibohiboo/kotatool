import * as t from 'io-ts'
import { isRight, map, right } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'

type ZipCode = number
const RegexZipCode = /^(\d{3})-?(\d{4})$/

const isZipCode = (input: unknown): input is ZipCode =>
  RegexZipCode.test(input.toString())

const formatZipCode = (input: unknown) => {
  return Number(input.toString().replace('-', ''))
}
export const ZipCodeCodec = new t.Type<ZipCode, string, unknown>(
  // a unique name for this codec
  'ZipCode',
  // a custom type guard
  isZipCode,
  // succeeds if a value of type I can be decoded to a value of type A
  // `t.success` and `t.failure` are helpers used to build `Either` instances
  (input, context) =>
    isZipCode(input)
      ? t.success(formatZipCode(input))
      : t.failure(input, context, `郵便番号の形式が不正です。 : ${input}`),
  // converts a value of type A to a value of type O
  // `A` and `O` are the same, so `encode` is just the identity function
  (a: ZipCode) => {
    const [, first, last] = RegexZipCode.exec(a.toString())
    return `${first}-${last}`
  },
)
