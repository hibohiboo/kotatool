import { isRight, map, right, left } from 'fp-ts/lib/Either'
import { PathReporter } from 'io-ts/PathReporter'
import { isLeft } from 'fp-ts/lib/These'
import { parseISO } from 'date-fns'
import { UsersFormCodec } from './codec/UsersFormCodec'
import { ZipCodeCodec } from './codec/ZipCodeCodec'
import { PhoneNumberCodec } from './codec/PhoneNumberCodec'
import { UserDetailCodec } from './codec/UserDetailCodec'
import { UserNameKanaCodec } from './codec/UserNameKanaCodec'
import { UtcDateFromStringCodec } from './codec/UtcDateFromStringCodec'
import { getErrors } from './codec/validation'

describe('郵便番号チェック', () => {
  test('郵便番号が正しい場合 ハイフンあり', () => {
    const x = ZipCodeCodec.decode(JSON.parse(`"509-0000"`))
    if (x._tag === 'Right') {
      expect(x.right).toStrictEqual(5090000)
    }
    // 上記と同じ意味となる
    expect(x).toStrictEqual(right(5090000))
  })
  test('郵便番号が正しい場合 ハイフンなし', () => {
    const x = ZipCodeCodec.decode(JSON.parse(`"5090000"`))
    expect(x).toStrictEqual(right(5090000))
  })
  test('エンコードできること', () => {
    const x = ZipCodeCodec.decode(JSON.parse(`"5090000"`))
    if (x._tag === 'Right') {
      expect(ZipCodeCodec.encode(x.right)).toStrictEqual('509-0000')
    } else {
      expect(false).toBeTruthy()
    }
  })
  test('郵便番号が不正な場合に失敗すること', () => {
    const x = ZipCodeCodec.decode(JSON.parse(`"509--0000"`))
    expect(isRight(x)).toBeFalsy()
  })
  test('郵便番号が不正な場合にエラーメッセージを取得できること', () => {
    const x = ZipCodeCodec.decode(JSON.parse(`"509--0000"`))
    expect(PathReporter.report(x)).toStrictEqual([
      '郵便番号の形式が不正です。 : 509--0000',
    ])
  })
  test('郵便番号が空白の場合に失敗すること', () => {
    const x = ZipCodeCodec.decode(JSON.parse(`""`))
    expect(PathReporter.report(x)).toStrictEqual(['郵便番号は必須です'])
  })
  test('郵便番号がnullの場合に失敗すること', () => {
    const x = ZipCodeCodec.decode(JSON.parse(`null`))
    expect(PathReporter.report(x)).toStrictEqual(['郵便番号は必須です'])
  })
  test('郵便番号がundefinedの場合に失敗すること', () => {
    const x = ZipCodeCodec.decode(JSON.parse(`null`))
    expect(PathReporter.report(x)).toStrictEqual(['郵便番号は必須です'])
  })
})

describe('電話番号チェック', () => {
  test('電話番号が正しい場合 ハイフンあり', () => {
    const x = PhoneNumberCodec.decode(JSON.parse(`"0000-00-0000"`))
    expect(x).toStrictEqual(right('0000-00-0000'))
  })
  test('電話番号が正しい場合 ハイフンなし フォーマットされること', () => {
    const x = PhoneNumberCodec.decode(JSON.parse(`"0000000000"`))
    expect(x).toStrictEqual(right('0000-00-0000'))
  })
  test('携帯電話番号が正しい場合 ハイフンなし フォーマットされること', () => {
    const x = PhoneNumberCodec.decode(JSON.parse(`"09000000000"`))
    expect(x).toStrictEqual(right('090-0000-0000'))
  })
  test('エンコードできること', () => {
    const x = PhoneNumberCodec.decode(JSON.parse(`"0000000000"`))
    if (x._tag === 'Right') {
      expect(PhoneNumberCodec.encode(x.right)).toStrictEqual('0000-00-0000')
    } else {
      expect(false).toBeTruthy()
    }
  })
  test('電話番号が不正な場合に失敗すること', () => {
    const x = PhoneNumberCodec.decode(JSON.parse(`"000--0000"`))
    expect(isRight(x)).toBeFalsy()
  })
  test('電話番号が不正な場合にエラーメッセージを取得できること', () => {
    const x = PhoneNumberCodec.decode(JSON.parse(`"000--0000"`))
    expect(PathReporter.report(x)).toStrictEqual([
      '電話番号の形式が不正です。 : 000--0000',
    ])
  })
})

describe('名前（カナ）チェック', () => {
  test('名前（カナ）が正しい場合', () => {
    const x = UserNameKanaCodec.decode(JSON.parse(`"ア"`))
    expect(x).toStrictEqual(right('ア'))
  })
  test('エンコードできること', () => {
    const x = UserNameKanaCodec.decode(JSON.parse(`"ア"`))
    if (x._tag === 'Right') {
      expect(UserNameKanaCodec.encode(x.right)).toStrictEqual('ア')
    } else {
      expect(false).toBeTruthy()
    }
  })

  test('名前（カナ）がnullの場合に失敗すること', () => {
    const x = UserNameKanaCodec.decode(JSON.parse(`null`))
    expect(PathReporter.report(x)).toStrictEqual(['文字列を入力してください'])
  })
  test('名前（カナ）がundefinedの場合に失敗すること', () => {
    const x = UserNameKanaCodec.decode(JSON.parse(`null`))
    expect(PathReporter.report(x)).toStrictEqual(['文字列を入力してください'])
  })
  test('名前（カナ）が数字の場合に失敗すること', () => {
    const x = UserNameKanaCodec.decode(JSON.parse(`1`))
    expect(PathReporter.report(x)).toStrictEqual(['文字列を入力してください'])
  })
  test('名前（カナ）がオブジェクトの場合に失敗すること', () => {
    const x = UserNameKanaCodec.decode(JSON.parse(`{}`))
    expect(PathReporter.report(x)).toStrictEqual(['文字列を入力してください'])
  })
  test('名前（カナ）が配列の場合に失敗すること', () => {
    const x = UserNameKanaCodec.decode(JSON.parse(`[]`))
    expect(PathReporter.report(x)).toStrictEqual(['文字列を入力してください'])
  })
  test('名前（カナ）が空白の場合に失敗すること', () => {
    const x = UserNameKanaCodec.decode(JSON.parse(`""`))
    expect(PathReporter.report(x)).toStrictEqual(['必須項目です'])
  })
  test('名前（カナ）が最大文字数より大きいときに失敗すること', () => {
    const x = UserNameKanaCodec.decode(JSON.parse(`"アアアアアアアアア"`))
    expect(PathReporter.report(x)).toStrictEqual([
      '5文字以内で入力してください',
    ])
  })
  test('名前（カナ）がひらがなの時に失敗すること', () => {
    const x = UserNameKanaCodec.decode(JSON.parse(`"あ"`))
    expect(PathReporter.report(x)).toStrictEqual([
      '全角カタカナで入力してください',
    ])
  })
  test('名前（カナ）が漢字の時に失敗すること', () => {
    const x = UserNameKanaCodec.decode(JSON.parse(`"亜"`))
    expect(PathReporter.report(x)).toStrictEqual([
      '全角カタカナで入力してください',
    ])
  })
  test('名前（カナ）が英語の時に失敗すること', () => {
    const x = UserNameKanaCodec.decode(JSON.parse(`"a"`))
    expect(PathReporter.report(x)).toStrictEqual([
      '全角カタカナで入力してください',
    ])
  })
  test('名前（カナ）が半角ｶﾅの時に失敗すること', () => {
    const x = UserNameKanaCodec.decode(JSON.parse(`"ｶﾅ"`))
    expect(PathReporter.report(x)).toStrictEqual([
      '全角カタカナで入力してください',
    ])
  })
})
const userDetailJsonInput = {
  zipcode: '509-0000',
  phoneNumber: '09000000000',
  userName: 'テスト',
}
const userDetailJsonExpected = {
  zipcode: 5090000,
  phoneNumber: '090-0000-0000',
  userName: 'テスト',
  userNameKana: undefined,
}
const userDetailJsonInputKana = {
  ...userDetailJsonInput,
  userNameKana: 'テスト',
}
const userDetailJsonExpectedKana = {
  ...userDetailJsonExpected,
  userNameKana: 'テスト',
}
describe('ユーザ詳細チェック', () => {
  test('ユーザ詳細が正しい場合', () => {
    const x = UserDetailCodec.decode(userDetailJsonInput)
    expect(x).toStrictEqual(right(userDetailJsonExpected))
  })
  test('ユーザ詳細が正しい場合 カナあり', () => {
    const x = UserDetailCodec.decode(userDetailJsonInputKana)
    expect(x).toStrictEqual(
      right({ ...userDetailJsonExpected, userNameKana: 'テスト' }),
    )
  })
  test('エンコードできること', () => {
    const x = UserDetailCodec.decode(userDetailJsonInput)
    if (isRight(x)) {
      expect(UserDetailCodec.encode(x.right)).toStrictEqual({
        phoneNumber: '090-0000-0000',
        zipcode: '509-0000',
        userName: 'テスト',
        userNameKana: undefined,
      })
    } else {
      expect(false).toBeTruthy()
    }
  })
  test('ユーザ詳細が不正な場合に失敗すること', () => {
    const x = UserDetailCodec.decode({
      zipcode: '',
      phoneNumber: '',
    })
    expect(isRight(x)).toBeFalsy()
  })
  test('ユーザ詳細が不正な場合にエラーメッセージを取得できること', () => {
    const x = UserDetailCodec.decode({
      zipcode: '',
      phoneNumber: 'b',
    })
    expect(getErrors(x)).toStrictEqual([
      'zipcode: 郵便番号は必須です',
      'phoneNumber: 電話番号の形式が不正です。 : b',
      'userName: 文字列を入力してください',
    ])
  })
})

describe('日時チェック', () => {
  test('日時が正しい場合', () => {
    const x = UtcDateFromStringCodec.decode(JSON.parse(`"2000-01-01T00:00:00"`))
    expect(x).toStrictEqual(right(parseISO('2000-01-01T00:00:00')))
  })
  test('エンコードできること', () => {
    const x = UtcDateFromStringCodec.decode(JSON.parse(`"2000-01-01T00:00:00"`))
    if (isRight(x)) {
      expect(UtcDateFromStringCodec.encode(x.right)).toStrictEqual(
        '2000-01-01T00:00:00',
      )
    } else {
      expect(false).toBeTruthy()
    }
  })
  test('日時が不正な場合に失敗すること', () => {
    const x = UtcDateFromStringCodec.decode(JSON.parse(`"000--0000"`))
    expect(isRight(x)).toBeFalsy()
  })
  test('日時が不正な場合にエラーメッセージを取得できること', () => {
    const x = UtcDateFromStringCodec.decode(JSON.parse(`"000--0000"`))
    expect(PathReporter.report(x)).toStrictEqual([
      '時刻を入力してください : 000--0000',
    ])
  })
})

describe('ユーザ詳細チェック', () => {
  test('ユーザ詳細が正しい場合', () => {
    const x = UsersFormCodec.decode({
      error: '',
      userDetail: [userDetailJsonInputKana],
    })
    expect(x).toStrictEqual(
      right({
        error: '',
        userDetail: [userDetailJsonExpectedKana],
      }),
    )
  })
  test('ユーザ詳細が不正な場合', () => {
    const x = UsersFormCodec.decode({
      error: '',
      userDetail: [{ ...userDetailJsonInputKana, userName: '' }],
    })
    expect(PathReporter.report(x)).toStrictEqual([
      'userDetail0userName: 必須項目です',
    ])
  })
})
