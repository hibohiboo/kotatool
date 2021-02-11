import styles from '../../styles/Home.module.css'
import Footer from '~/components/common/molecules/Footer'

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>ホーム</h1>
        <p>ログインありがとうございます</p>
      </main>
      <Footer />
    </div>
  )
}
