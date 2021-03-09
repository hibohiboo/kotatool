import * as t from 'io-ts'
import { pipe } from 'fp-ts/function'
import { fold } from 'fp-ts/Either'
import { ZipCodeCodec } from './ZipCodeCodec'
import { PhoneNumberCodec } from './PhoneNumberCodec'
import { UserNameKanaCodec } from './UserNameKanaCodec'
import { UserNameCodec } from './UserNameCodec'
export const UserDetailCodec = t.type({
  zipcode: ZipCodeCodec,
  phoneNumber: PhoneNumberCodec,
  userName: UserNameCodec,
  userNameKana: t.union([UserNameKanaCodec, t.undefined]),
})
export default UserDetailCodec
export type UserDetail = t.TypeOf<typeof UserDetailCodec>

export const getErrors = <A>(v: t.Validation<A>): Array<string> => {
  return pipe(
    v,
    fold(
      (errors) =>
        errors.map(
          (error) =>
            `${error.context.map(({ key }) => key).join('')}: ${error.message}`,
        ),
      () => ['no errors'],
    ),
  )
}
