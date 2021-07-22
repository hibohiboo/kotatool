import { Error } from '~/domain/webdb-sample/components/atoms/Error'
import { RequireLogin } from '~/domain/webdb-sample/components/molecules/RequireLogin'
import { ErrorProps } from 'next/error'
// ___________________________________________________________________________
//
function AppError({ statusCode, title }: ErrorProps) {
  if (statusCode === 401) {
    return <RequireLogin />
  }
  return <Error statusCode={statusCode} title={title} />
}
// ___________________________________________________________________________
//
export default AppError
