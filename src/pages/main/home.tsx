import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Footer from '~/components/common/molecules/Footer'
import SocialMeta from '~/components/common/atoms/SocialMeta'
const title = 'こたつーる ホーム'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
      </Head>
      <SocialMeta title={title} />
      <main className={styles.main}>
        <h1 className={styles.title}>ログインありがとうございます</h1>
      </main>

      <Footer />
    </div>
  )
}
