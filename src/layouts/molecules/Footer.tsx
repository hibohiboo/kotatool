import styles from './Footer.module.scss'
import Image from 'next/image'

const Footer = () => (
  <footer className={styles.kotaFooter}>
    <small className={styles.kotaCopyRight}>© 2021 hibo</small>
    <a
      href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
      target="_blank"
      rel="noopener noreferrer"
    >
      Powered by{' '}
      <Image
        src="/vercel.svg"
        alt="Vercel Logo"
        className={styles.kotaLogo}
        width={283 / 8}
        height={64 / 8}
        layout="intrinsic"
      />
    </a>
  </footer>
)
export default Footer
