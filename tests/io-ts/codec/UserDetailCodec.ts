import * as t from 'io-ts'

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
