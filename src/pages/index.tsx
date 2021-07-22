import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import AccessCounter from '~/components/access-counter'
import Footer from '~/layouts/molecules/Footer'
import SocialMeta from '~/layouts/atoms/SocialMeta'
import LoginButton from '~/components/atoms/LoginButton'
import routes from '~/lib/routes'
import Image from 'next/image'
const title = 'こたつーる'

export default function Home() {
  return (
    <div className={styles.kotaContainer}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SocialMeta title={title} />

      <main className={styles.kotaMain}>
        <h1 className={styles.kotaTitle}>{`${title}🍊`}</h1>
        <div className={styles.kotaMainArea}>
          <Image
            className={styles.kotaHeroImage}
            src="/assets/top.jpg"
            alt="おやすみなさい"
            width={500}
            height={379}
          />
          <AccessCounter />
        </div>
        <LoginButton href={routes.home} text="こたつに入る" />
        <ul className={styles.kotaUl}>
          <li>ようこそいらっしゃいました</li>
          <li>適当に入ってまったりしてってください</li>
          <li>気が向いたときに更新してます</li>
          <li>おやすみなさい</li>
        </ul>
      </main>

      <Footer />
    </div>
  )
}
