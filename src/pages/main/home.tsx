import styles from '../../styles/Home.module.css'
import Footer from '~/components/common/molecules/Footer'
import { useSignIn } from '~/foundations/auth/useAuth'

export default function Home() {
  const user = useSignIn()
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>ホーム</h1>
        <p>ログインありがとうございます</p>
        <p>{user ? user.displayName : 'ログイン中'}</p>
      </main>
      <Footer />
    </div>
  )
}
