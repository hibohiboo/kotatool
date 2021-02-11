import styles from './LoginButton.module.scss'
import Link from 'next/link'
const LoginButton: React.FC<{ href: string; text: string }> = ({
  href,
  text,
}) => {
  return (
    <Link href={href}>
      <a className={styles.btn}>{text}</a>
    </Link>
  )
}
export default LoginButton
