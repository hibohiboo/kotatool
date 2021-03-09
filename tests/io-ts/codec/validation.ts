import * as t from 'io-ts'
import { either, left, right, Either, fold, isRight } from 'fp-ts/Either'
type Error = string
export const checkString = (i: unknown): Either<Error, string> => {
  const isString = (i: unknown): i is string => typeof i === 'string'
  if (!isString(i)) {
    return left(`文字列を入力してください`)
  }
  return right(i)
}

export const checkRequired = (i: string): Either<Error, string> => {
  if (!i) {
    return left(`必須項目です`)
  }
  return right(i)
}
export const checkMaxLength = (i: string, n: number): Either<Error, string> => {
  if (i.length > n) {
    return left(`${n}文字以内で入力してください`)
  }
  return right(i)
}

export const checkKana = (i: string): Either<Error, string> => {
  if (!/^[ァ-ヶー\s]+$/.test(i)) {
    return left(`全角カタカナで入力してください`)
  }
  return right(i)
}

export const requiredString = (i: unknown) =>
  either.chain(checkString(i), checkRequired)
