import styles from '../../styles/Home.module.scss'
import Footer from '~/layouts/molecules/Footer'
import { useAuth } from '~/foundations/auth/useAuth'

export default function Page() {
  const user = useAuth()
  if (!user) return <></>
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>test</h1>
        <p>{process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}</p>
      </main>
      <Footer />
    </div>
  )
}
