import * as t from 'io-ts'

export const typedDecoder = <T>(
  typeC: t.Type<T>,
  json: Record<string, unknown>,
): T => {
  const either = typeC.decode(json)
  if (either._tag === 'Left') {
    console.error(either.left)
    throw either.left
  }
  return either.right
}
