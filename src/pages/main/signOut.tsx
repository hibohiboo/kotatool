import styles from '../../styles/Home.module.scss'
import Footer from '~/layouts/molecules/Footer'
import { useSignOut } from '~/foundations/auth/useAuth'
import LinkButton from '~/components/atoms/LinkButton'
import routes from '~/lib/routes'
export default function Page() {
  useSignOut()

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>サインアウト</h1>
        <p>ご利用ありがとうございました</p>
        <LinkButton href={routes.test} text="test" />
      </main>
      <Footer />
    </div>
  )
}
