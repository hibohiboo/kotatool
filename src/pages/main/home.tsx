import Footer from '~/layouts/molecules/Footer'
import { useSignIn } from '~/foundations/auth/useAuth'
import WrapperContainer from '~/layouts/atoms/WrapperContainer'
export default function Home() {
  const user = useSignIn()
  return (
    <WrapperContainer>
      <main>
        <h1>ホーム</h1>
        <p>ログインありがとうございます</p>
        <p>{user ? user.displayName : 'ログイン中'}</p>
      </main>
      <Footer />
    </WrapperContainer>
  )
}
