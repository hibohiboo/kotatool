import Footer from '~/layouts/molecules/Footer'
import { useSignIn } from '~/foundations/auth/useAuth'
import WrapperContainer from '~/layouts/atoms/WrapperContainer'
import Link from 'next/link'
export default function Home() {
  const user = useSignIn()
  return (
    <WrapperContainer>
      <main>
        <h1>ホーム</h1>
        <p>ログインありがとうございます</p>
        <p>{user ? user.displayName : 'ログイン中'}</p>
        <ul>
          <li>
            <Link href="/kakuriyogarden/characters/edit">カクリヨガーデン</Link>
          </li>
        </ul>
      </main>
      <Footer />
    </WrapperContainer>
  )
}
