import Image from 'next/image'
import { Button } from '~/domain/webdb-sample/components/atoms/Button'
import { signIn, signOut, useSession } from 'next-auth/client'
import styles from './styles.module.css'
// ___________________________________________________________________________
//
export function User() {
  const [session] = useSession()
  return (
    <div className={styles.module}>
      <div className={styles.user}>
        <p className={styles.name}>
          {session?.user?.name ? session.user.name : 'Guest User'}
        </p>
        <p className={styles.avatar}>
          {session?.user && typeof session.user.image === 'string' && (
            <Image
              src={session.user.image}
              width="230"
              height="230"
              alt="user image"
            />
          )}
        </p>
        <div className={styles.signInOut}>
          {session ? (
            <Button onClick={() => signOut()}>SIGN OUT</Button>
          ) : (
            <Button onClick={() => signIn()}>SIGN IN</Button>
          )}
        </div>
      </div>
    </div>
  )
}
