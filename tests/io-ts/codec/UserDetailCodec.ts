import * as t from 'io-ts'
import { pipe } from 'fp-ts/function'
import { fold } from 'fp-ts/Either'
import { ZipCodeCodec } from './ZipCodeCodec'
import { PhoneNumberCodec } from './PhoneNumberCodec'
export const UserDetailCodec = t.type({
  zipcode: ZipCodeCodec,
  phoneNumber: PhoneNumberCodec,
})
export default UserDetailCodec

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
