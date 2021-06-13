import * as t from 'io-ts'
import { isRight, map, right } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'
// https://www.puzzle.ch/de/blog/articles/2019/09/25/data-contracts-and-transformations-with-io-ts
type PhoneNumber = string
// https://qiita.com/ken97/items/9276f59f3148bb8fbe67
const RegexPhoneNumber = /^(0\d{2,3})-?(\d{1,4})-?(\d{4})$/
const RegexMobilePhoneNumber = /^(070|080|090)-?(\d{4})-?(\d{4})$/

const isPhoneNumber = (input: unknown): input is PhoneNumber =>
  RegexMobilePhoneNumber.test(input.toString()) ||
  RegexPhoneNumber.test(input.toString())

const formatPhoneNumber = (input: PhoneNumber) => {
  const mobile = RegexMobilePhoneNumber.exec(input.toString())
  if (mobile) {
    const [, first, second, last] = mobile
    return `${first}-${second}-${last}`
  }
  const [, first, second, last] = RegexPhoneNumber.exec(input.toString())
  return `${first}-${second}-${last}`
}
export const PhoneNumberCodec = new t.Type<PhoneNumber, string, unknown>(
  // a unique name for this codec
  'PhoneNumber',
  // a custom type guard
  isPhoneNumber,
  // succeeds if a value of type I can be decoded to a value of type A
  // `t.success` and `t.failure` are helpers used to build `Either` instances
  (input, context) =>
    isPhoneNumber(input)
      ? t.success(formatPhoneNumber(input))
      : t.failure(input, context, `電話番号の形式が不正です。 : ${input}`),
  // converts a value of type A to a value of type O
  // `A` and `O` are the same, so `encode` is just the identity function
  t.identity,
)
