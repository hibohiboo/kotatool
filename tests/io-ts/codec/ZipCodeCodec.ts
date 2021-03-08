import * as t from 'io-ts'
import { isRight, map, right } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'
// https://www.puzzle.ch/de/blog/articles/2019/09/25/data-contracts-and-transformations-with-io-ts
type ZipCode = string
const RegexZipCode = /^(\d{3})-?(\d{4})/

const isZipCode = (input: unknown): input is ZipCode =>
  RegexZipCode.test(input.toString())

const formatZipCode = (input: ZipCode) => {
  const [, first, last] = RegexZipCode.exec(input.toString())
  return `${first}-${last}`
}
export const ZipCodeCodec = new t.Type<ZipCode, string, unknown>(
  // a unique name for this codec
  'kota-zip-code',
  // a custom type guard
  isZipCode,
  // succeeds if a value of type I can be decoded to a value of type A
  // `t.success` and `t.failure` are helpers used to build `Either` instances
  (input, context) =>
    isZipCode(input)
      ? t.success(formatZipCode(input))
      : t.failure(input, context),
  // converts a value of type A to a value of type O
  // `A` and `O` are the same, so `encode` is just the identity function
  t.identity,
)
