import { FC } from 'react'
import classNames from 'classnames'

import Link from 'next/link'
const LoginButton: FC<{ href: string; text: string }> = ({ href, text }) => {
  return (
    <Link href={href}>
      <a className={classNames('btn', 'btn-primary', 'btn-lg')}>{text}</a>
    </Link>
  )
}
export default LoginButton
