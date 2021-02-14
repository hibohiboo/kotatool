import Footer from '~/layouts/molecules/Footer'
import { useSignIn } from '~/foundations/auth/useAuth'

export default function Home() {
  const user = useSignIn()
  return (
    <div>
      <main>
        <h1>ホーム</h1>
        <p>ログインありがとうございます</p>
        <p>{user ? user.displayName : 'ログイン中'}</p>
      </main>
      <Footer />
    </div>
  )
}
