import * as t from 'io-ts'
import { either } from 'fp-ts/Either'
import { format, parseISO } from 'date-fns'
// https://qiita.com/suin/items/296740d22624b530f93a

export const UtcDateFromStringCodec = new t.Type(
  'DateFromString',
  (u): u is Date => u instanceof Date,
  (u, c) =>
    either.chain(t.string.validate(u, c), (s) => {
      const d = parseISO(s)
      return isNaN(d.getTime())
        ? t.failure(u, c, `時刻を入力してください : ${u}`)
        : t.success(d)
    }),
  (a) => format(a, "yyyy-MM-dd'T'HH:mm:ss"),
)
