import * as t from 'io-ts'
import { either, Either, fold, isRight } from 'fp-ts/Either'
import { pipe } from 'fp-ts/pipeable'
import {
  checkString,
  checkRequired,
  checkMaxLength,
  checkKana,
} from './validation'

// https://tech-lab.sios.jp/archives/18574
type UserNameKana = string

const validate = (input: unknown): Either<string, string> => {
  const i1 = checkString(input)
  const i2 = either.chain(i1, (i) => checkRequired(i))
  const i3 = either.chain(i2, (i) => checkMaxLength(i, 5))
  const i4 = either.chain(i3, (i) => checkKana(i))

  return i4
}

// validateと同じことを行う関数
const validate2 = (input: unknown) =>
  pipe(
    checkString(input),
    (output) => either.chain(output, checkRequired),
    (output) => either.chain(output, (o) => checkMaxLength(o, 5)),
    (output) => either.chain(output, checkKana),
  )

export const UserNameKanaCodec = new t.Type<UserNameKana, string, unknown>(
  'UserNameKana',
  (i): i is UserNameKana => isRight(validate(i)),
  (input, context) =>
    pipe(
      validate2(input),
      fold((e) => t.failure(input, context, e), t.success),
    ),
  t.identity,
)
