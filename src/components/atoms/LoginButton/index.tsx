import classNames from 'classnames'

import Link from 'next/link'
const LoginButton: React.FC<{ href: string; text: string }> = ({
  href,
  text,
}) => {
  return (
    <Link href={href}>
      <a className={classNames('button', 'is-primary', 'is-large')}>{text}</a>
    </Link>
  )
}
export default LoginButton
