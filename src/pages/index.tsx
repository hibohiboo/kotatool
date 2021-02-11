import Head from 'next/head'
import styles from '../styles/Home.module.css'
import AccessCounter from '~/components/access-counter'
import Footer from '~/components/common/molecules/Footer'
import SocialMeta from '~/components/common/atoms/SocialMeta'
import LoginButton from '~/components/atoms/LoginButton'
import routes from '~/lib/routes'
const title = 'こたつーる'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SocialMeta title={title} />

      <main className={styles.main}>
        <h1 className={styles.title}>{`${title}🍊`}</h1>
        <img
          className={styles.heroImage}
          src="/assets/top.jpg"
          alt="おやすみなさい"
        />
        <AccessCounter />
        <LoginButton href={routes.home} text="こたつに入る" />
      </main>

      <Footer />
    </div>
  )
}
