import * as t from 'io-ts'
import { fold, isRight } from 'fp-ts/Either'
import { pipe } from 'fp-ts/pipeable'
import { requiredString } from './validation'

type UserName = string

export const UserNameCodec = new t.Type<UserName, string, unknown>(
  'UserName',
  (i): i is UserName => isRight(requiredString(i)),
  (input, context) =>
    pipe(
      requiredString(input),
      fold((e) => t.failure(input, context, e), t.success),
    ),
  t.identity,
)
