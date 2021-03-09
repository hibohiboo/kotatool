import * as t from 'io-ts'
import { either, left, right, Either, fold, isRight } from 'fp-ts/Either'
import { pipe } from 'fp-ts/pipeable'
// https://tech-lab.sios.jp/archives/18574
type UserNameKana = string

const checkString = (i: unknown): Either<string, string> => {
  const isString = (i: unknown): i is string => typeof i === 'string'
  if (!isString(i)) {
    return left(`文字列を入力してください`)
  }
  return right(i)
}
const checkRequired = (i: string): Either<string, string> => {
  if (!i) {
    return left(`必須項目です`)
  }
  return right(i)
}
const checkMaxLength = (i: string, n: number): Either<string, string> => {
  if (i.length > n) {
    return left(`${n}文字以内で入力してください`)
  }
  return right(i)
}

const checkKana = (i: string): Either<string, string> => {
  if (!/^[ァ-ヶー\s]+$/.test(i)) {
    return left(`全角カタカナで入力してください`)
  }
  return right(i)
}

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
