import * as t from 'io-ts'
import { fold, isRight } from 'fp-ts/Either'
import { pipe } from 'fp-ts/pipeable'
import { UserDetailCodec } from './UserDetailCodec'
import { joinErrors } from './validation'
const _usersFormCodec = t.type({
  error: t.string,
  userDetail: t.array(UserDetailCodec),
})
type UsersForm = t.TypeOf<typeof _usersFormCodec>

export const UsersFormCodec = new t.Type<UsersForm, string, unknown>(
  'UsersForm',
  (i): i is UsersForm => _usersFormCodec.is(i),
  (input, context) =>
    pipe(
      _usersFormCodec.validate(input, context),
      fold(
        (e) => t.failure(input, context, joinErrors(e).join(',')),
        t.success,
      ),
    ),
  (i) => JSON.stringify(_usersFormCodec.encode(i)),
)
